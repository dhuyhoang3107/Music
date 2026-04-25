/* ===================================================================
 * Zing MP3 Clone - Backend
 * -------------------------------------------------------------------
 * Express server that:
 *   - Serves the static front-end (index.html / styles.css / app.js)
 *   - Proxies requests to ZingMP3's private API (zingmp3.vn) using the
 *     official HMAC-SHA512 + SHA256 signature scheme so the player can
 *     stream real songs.
 *   - Streams the actual MP3 bytes back to the browser to bypass the
 *     hot-link / referer protection on Zing's CDN.
 *
 * The signing/version scheme is based on public reverse-engineering of
 * the mobile site (m.zingmp3.vn) and the npm package zingmp3-api-full-v2.
 * =================================================================== */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ZING_BASE = 'https://zingmp3.vn';
const VERSION = '1.6.34';
const API_KEY = '88265e23d4284f25963e6eedac8fbfa3';
const SECRET_KEY = '2aa2d1c561e809b267f3638c4a307aab';

const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
const hmac512 = (data, key = SECRET_KEY) =>
    crypto.createHmac('sha512', key).update(Buffer.from(data, 'utf8')).digest('hex');

/**
 * Build sig = HMAC_SHA512( apiPath + SHA256(sortedParams), SECRET_KEY )
 *  - sortedParams = key=value joined alphabetically (excluding apiKey & sig)
 *  - All param values are coerced to strings.
 */
function sign(apiPath, params) {
    const keys = Object.keys(params)
        .filter(k => k !== 'apiKey' && k !== 'sig')
        .sort();
    const concat = keys.map(k => `${k}=${params[k]}`).join('');
    return hmac512(apiPath + sha256(concat));
}

/* -------------------------------------------------------------------
 *  Cookie management - Zing requires a session cookie before serving.
 * ----------------------------------------------------------------- */
let cachedCookie = null;
let cachedCookieTime = 0;

async function getCookie() {
    if (cachedCookie && Date.now() - cachedCookieTime < 30 * 60 * 1000) return cachedCookie;
    const res = await axios.get(ZING_BASE + '/', {
        timeout: 10000,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        },
        validateStatus: s => s < 500
    });
    const setCookie = res.headers['set-cookie'] || [];
    const cookieStr = setCookie.map(c => c.split(';')[0]).join('; ');
    cachedCookie = cookieStr;
    cachedCookieTime = Date.now();
    return cachedCookie;
}

/* -------------------------------------------------------------------
 *  Generic call helper.
 * ----------------------------------------------------------------- */
async function callZing(apiPath, sigParams = {}, extraParams = {}) {
    // sigParams: parameters that are part of the signature body
    // extraParams: parameters not in signature (rare; usually all are signed)
    const ctime = String(Math.floor(Date.now() / 1000));
    const fullSigBody = { ctime, version: VERSION, ...sigParams };
    const sig = sign(apiPath, fullSigBody);
    const finalParams = { ...fullSigBody, ...extraParams, apiKey: API_KEY, sig };

    const cookie = await getCookie();
    const { data } = await axios.get(ZING_BASE + apiPath, {
        params: finalParams,
        timeout: 15000,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://zingmp3.vn/',
            Origin: 'https://zingmp3.vn',
            Cookie: cookie || ''
        }
    });
    return data;
}

/* -------------------------------------------------------------------
 *  Per-endpoint helpers.
 *
 *  IMPORTANT: only certain parameters go into the signature body for
 *  each endpoint (see zingmp3-api-full-v2). Free-text params like `q`
 *  and `alias` are SENT in the URL but NOT signed.
 *
 *  signedParams  = parameters included in the HMAC body
 *  unsignedParams = parameters appended to the request URL only
 * ----------------------------------------------------------------- */
const Zing = {
    search: (q, page = '1', count = '30') =>
        callZing('/api/v2/search', { count, page, type: 'song' }, { q }),
    multiSearch: q => callZing('/api/v2/search/multi', {}, { q }),
    suggest: () => callZing('/api/v2/app/get/recommend-keyword', {}),
    home: () => callZing('/api/v2/page/get/home', { count: '30', page: '1' }, { segmentId: '-1' }),
    top100: () => callZing('/api/v2/page/get/top-100', {}),
    chartHome: () => callZing('/api/v2/page/get/chart-home', {}),
    newReleaseChart: () => callZing('/api/v2/page/get/newrelease-chart', {}),
    detailPlaylist: id => callZing('/api/v2/page/get/playlist', { id }),
    songInfo: id => callZing('/api/v2/song/get/info', { id }),
    songStreaming: id => callZing('/api/v2/song/get/streaming', { id }),
    lyric: id => callZing('/api/v2/lyric/get/lyric', { id })
};

/* -------------------------------------------------------------------
 *  Normalization to the shape our front-end expects.
 * ----------------------------------------------------------------- */
function normalizeSong(z) {
    if (!z) return null;
    const id = z.encodeId || z.id;
    if (!id) return null;
    return {
        id: 'zmp3:' + id,
        zingId: id,
        name: z.title,
        artist: z.artistsNames || (z.artists || []).map(a => a.name).join(', ') || 'Unknown',
        album: (z.album && z.album.title) || z.albumTitle || '',
        duration: z.duration || 0,
        image: ((z.thumbnailM || z.thumbnail || '') + '').replace(/^http:/, 'https:'),
        path: '',
        genre: 'online',
        source: 'zmp3'
    };
}

function normalizePlaylist(z) {
    if (!z) return null;
    const id = z.encodeId || z.id;
    if (!id) return null;
    return {
        id: 'zmp3-pl:' + id,
        zingId: id,
        title: z.title,
        subtitle: z.sortDescription || z.artistsNames || z.description || '',
        cover: ((z.thumbnailM || z.thumbnail || '') + '').replace(/^http:/, 'https:'),
        songIds: []
    };
}

/* ===================================================================
 *  Express app
 * ================================================================ */
const app = express();
app.use(cors());
app.use(express.json());

const safe = (h) => async (req, res) => {
    try {
        await h(req, res);
    } catch (err) {
        console.error(`[${req.path}] ${err.message}`);
        if (!res.headersSent) {
            res.status(502).json({ error: 'Upstream failed', detail: err.message });
        }
    }
};

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

/* ----- Search ----- */
app.get('/api/search', safe(async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ songs: [] });
    const data = await Zing.search(q);
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const items = (data && data.data && (data.data.items || data.data.songs)) || [];
    res.json({ songs: items.map(normalizeSong).filter(Boolean) });
}));

app.get('/api/multi-search', safe(async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ songs: [], playlists: [] });
    const data = await Zing.multiSearch(q);
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const counters = (data && data.data && data.data.counter) || {};
    const songs = ((counters.song && counters.song.items) || []).map(normalizeSong).filter(Boolean);
    const playlists = ((counters.playlist && counters.playlist.items) || []).map(normalizePlaylist).filter(Boolean);
    res.json({ songs, playlists });
}));

/* ----- Home (suggested playlists + new releases) ----- */
app.get('/api/home', safe(async (_req, res) => {
    const data = await Zing.home();
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const items = (data && data.data && data.data.items) || [];
    const playlists = [];
    const songs = [];
    for (const sec of items) {
        if (!sec || !sec.items) continue;
        const t = sec.sectionType || sec.viewType;
        if (t === 'playlist') {
            for (const it of sec.items.slice(0, 12)) {
                const p = normalizePlaylist(it);
                if (p) playlists.push(p);
            }
        } else if (t === 'new-release' || t === 'newRelease') {
            const release = sec.items;
            const arr = Array.isArray(release) ? release : [];
            for (const it of arr.slice(0, 12)) {
                const s = normalizeSong(it);
                if (s) songs.push(s);
            }
        }
    }
    res.json({ playlists: playlists.slice(0, 12), songs: songs.slice(0, 12) });
}));

/* ----- Top 100 / Charts ----- */
app.get('/api/top100', safe(async (_req, res) => {
    const data = await Zing.top100();
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const items = (data && data.data) || [];
    const playlists = (Array.isArray(items) ? items : []).map(normalizePlaylist).filter(Boolean);
    res.json({ playlists: playlists.slice(0, 30) });
}));

app.get('/api/chart-home', safe(async (_req, res) => {
    const data = await Zing.chartHome();
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const obj = (data && data.data) || {};
    const songs = (obj.RTChart && obj.RTChart.items) || obj.song?.items || [];
    res.json({
        songs: songs.slice(0, 20).map(normalizeSong).filter(Boolean),
        chartTitle: obj.RTChart?.title || '#zingchart'
    });
}));

/* ----- Playlist detail ----- */
app.get('/api/playlist/:id', safe(async (req, res) => {
    const data = await Zing.detailPlaylist(req.params.id);
    if (data && data.err && data.err !== 0) throw new Error('Zing: ' + data.msg);
    const obj = (data && data.data) || {};
    const songs = ((obj.song && obj.song.items) || []).map(normalizeSong).filter(Boolean);
    res.json({
        id: 'zmp3-pl:' + (obj.encodeId || req.params.id),
        zingId: obj.encodeId || req.params.id,
        title: obj.title,
        subtitle: obj.sortDescription || obj.artistsNames || '',
        cover: ((obj.thumbnailM || obj.thumbnail || '') + '').replace(/^http:/, 'https:'),
        songs
    });
}));

/* ----- Song streaming URL ----- */
async function fetchStreamingUrl(zingId) {
    const data = await Zing.songStreaming(zingId);
    if (!data || (data.err && data.err !== 0)) {
        throw new Error('Zing: ' + (data && data.msg) || 'unknown');
    }
    const d = data.data || {};
    // Order: 320 -> 128 -> any string url (lossless usually requires VIP)
    const candidate =
        d['320'] ||
        d['128'] ||
        d.lossless ||
        Object.values(d).find(v => typeof v === 'string' && v.startsWith('http'));
    return candidate;
}

app.get('/api/song-url', safe(async (req, res) => {
    const id = (req.query.id || '').trim();
    if (!id) return res.status(400).json({ error: 'missing id' });
    const url = await fetchStreamingUrl(id);
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
        return res.status(403).json({ error: 'Streaming URL not available (likely VIP-only)' });
    }
    res.json({ url });
}));

/* ----- Audio stream proxy (handles Range requests) ----- */
app.get('/api/stream', async (req, res) => {
    const id = (req.query.id || '').trim();
    if (!id) return res.status(400).send('missing id');
    try {
        const url = await fetchStreamingUrl(id);
        if (!url || typeof url !== 'string' || !url.startsWith('http')) {
            return res.status(403).send('Streaming URL not available (VIP only?)');
        }

        const range = req.headers.range;
        const upstream = await axios.get(url, {
            responseType: 'stream',
            timeout: 25000,
            headers: {
                ...(range ? { Range: range } : {}),
                Referer: 'https://zingmp3.vn/',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10) Mobile'
            },
            validateStatus: s => s >= 200 && s < 400
        });

        res.status(upstream.status);
        ['content-type', 'content-length', 'content-range', 'accept-ranges', 'cache-control'].forEach(h => {
            const v = upstream.headers[h];
            if (v) res.setHeader(h, v);
        });
        if (!upstream.headers['content-type']) res.setHeader('Content-Type', 'audio/mpeg');
        upstream.data.pipe(res);
        upstream.data.on('error', err => {
            console.error('stream pipe error', err.message);
            try { res.end(); } catch {}
        });
    } catch (err) {
        console.error('stream error', err.message);
        if (!res.headersSent) res.status(502).send('Stream failed: ' + err.message);
    }
});

/* ----- Static front-end ----- */
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

app.listen(PORT, () => {
    console.log(`\n  Zing MP3 Clone running:  http://localhost:${PORT}\n`);
    console.log('  API endpoints:');
    console.log('    GET /api/health');
    console.log('    GET /api/search?q=...');
    console.log('    GET /api/multi-search?q=...');
    console.log('    GET /api/home');
    console.log('    GET /api/top100');
    console.log('    GET /api/chart-home');
    console.log('    GET /api/playlist/:id');
    console.log('    GET /api/song-url?id=...');
    console.log('    GET /api/stream?id=...\n');
});
