/* =====================================================
   Zing MP3 Clone - app.js
   A single-page music app inspired by zingmp3.vn
   ===================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const STORAGE_KEY = 'ZMP3_CLONE_STATE_V1';

/* -----------------------------------------------------
   DATA - Songs
   ----------------------------------------------------- */
const SONGS = [
    {
        id: 's1',
        name: 'Bước Qua Nhau',
        artist: 'Vũ',
        album: 'Bước Qua Nhau (Single)',
        duration: 271,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688',
        image: 'https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg',
        genre: 'vpop'
    },
    {
        id: 's2',
        name: 'Ái Nộ',
        artist: 'Masew, Khôi Vũ',
        album: 'Ái Nộ',
        duration: 218,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705',
        image: 'https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg',
        genre: 'vpop'
    },
    {
        id: 's3',
        name: 'Muộn Rồi Mà Sao Còn',
        artist: 'Sơn Tùng M-TP',
        album: 'Muộn Rồi Mà Sao Còn',
        duration: 256,
        path: 'https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546',
        image: 'https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg',
        genre: 'vpop'
    },
    {
        id: 's4',
        name: 'Thức Giấc',
        artist: 'Da LAB',
        album: 'Thức Giấc',
        duration: 264,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708',
        image: 'https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg',
        genre: 'vpop'
    },
    {
        id: 's5',
        name: 'Độ Tộc 2',
        artist: 'Masew, Độ Mixi, Phúc Du, Pháo',
        album: 'Độ Tộc 2',
        duration: 240,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785',
        image: 'https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg',
        genre: 'vpop'
    },
    {
        id: 's6',
        name: 'Chúng Ta Sau Này',
        artist: 'T.R.I',
        album: 'Chúng Ta Sau Này',
        duration: 247,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875',
        image: 'https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg',
        genre: 'vpop'
    },
    {
        id: 's7',
        name: 'Dịu Dàng Em Đến',
        artist: 'ERIK, NinjaZ',
        album: 'Dịu Dàng Em Đến',
        duration: 223,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938',
        image: 'https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg',
        genre: 'vpop'
    },
    {
        id: 's8',
        name: 'Hương',
        artist: 'Văn Mai Hương, Negav',
        album: 'Hương',
        duration: 252,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027',
        image: 'https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg',
        genre: 'vpop'
    },
    {
        id: 's9',
        name: 'Miên Man',
        artist: 'DUTZUX',
        album: 'Miên Man',
        duration: 235,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090',
        image: 'https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg',
        genre: 'vpop'
    },
    {
        id: 's10',
        name: 'Có Hẹn Với Thanh Xuân',
        artist: 'MONSTAR',
        album: 'Có Hẹn Với Thanh Xuân',
        duration: 244,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161',
        image: 'https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg',
        genre: 'vpop'
    },
    {
        id: 's11',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        album: 'F*CK LOVE 3: OVER YOU',
        duration: 141,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802',
        image: 'https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg',
        genre: 'us-uk'
    },
    {
        id: 's12',
        name: 'All Too Well (10 Minute Version)',
        artist: 'Taylor Swift',
        album: "Red (Taylor's Version)",
        duration: 613,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/AllTooWell10MinuteVersionTaylorsVersion-TaylorSwift-7120438.mp3?st=moySlM-gRk8kpSEQdA729g&e=1638673508',
        image: 'https://avatar-nct.nixcdn.com/song/2021/11/23/d/a/a/e/1637643196932_300.jpg',
        genre: 'us-uk'
    },
    {
        id: 's13',
        name: 'Equal In The Darkness',
        artist: 'Steve Aoki, Jolin Tsai, MAX',
        album: 'Equal In The Darkness',
        duration: 198,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/EqualInTheDarkness-SteveAokiThaiYLamJolinTsaiMAX-7116228.mp3?st=1TO5aq2W9pnBPnKJ-0BwLA&e=1638673651',
        image: 'https://avatar-nct.nixcdn.com/song/2021/10/27/0/c/c/3/1635299658476_300.jpg',
        genre: 'us-uk'
    },
    {
        id: 's14',
        name: 'Always Love You',
        artist: 'Elton John, Young Thug, Nicki Minaj',
        album: 'The Lockdown Sessions',
        duration: 204,
        path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio203/AlwaysLoveYou-EltonJohnYoungThugNickiMinaj-7114807.mp3?st=FjWol1PzZ4cmEPzH-8rKdQ&e=1638673737',
        image: 'https://avatar-nct.nixcdn.com/song/2021/10/21/c/d/d/a/1634797395961.jpg',
        genre: 'us-uk'
    },
    {
        id: 's15',
        name: "Wildest Dreams (Taylor's Version)",
        artist: 'Taylor Swift',
        album: "Red (Taylor's Version)",
        duration: 220,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/WildestDreamsTaylorsVersion-TaylorSwift-7090980.mp3?st=MqTkbQYsSI-Wri68OiCggA&e=1638673817',
        image: 'https://avatar-nct.nixcdn.com/song/2021/09/17/5/a/b/4/1631889063619_300.jpg',
        genre: 'us-uk'
    },
    {
        id: 's16',
        name: 'Lonely',
        artist: 'Justin Bieber, benny blanco',
        album: 'Lonely',
        duration: 169,
        path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio197/Lonely-JustinBieberbennyblanco-6993497.mp3?st=HfdveKXgMQiQEl5_nrafHg&e=1638784621',
        image: 'https://avatar-nct.nixcdn.com/song/2020/10/16/7/4/6/2/1602823109092.jpg',
        genre: 'us-uk'
    },
    {
        id: 's17',
        name: 'Intentions',
        artist: 'Justin Bieber, Quavo',
        album: 'Changes',
        duration: 213,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui995/Intentions-JustinBieberQuavo-6217997.mp3?st=hcdpQpM3beevQ-_6KJ82dA&e=1638784782',
        image: 'https://avatar-nct.nixcdn.com/song/2020/02/07/2/0/7/2/1581052824234.jpg',
        genre: 'us-uk'
    },
    {
        id: 's18',
        name: 'Hold On',
        artist: 'Justin Bieber',
        album: 'Justice',
        duration: 170,
        path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio201/HoldOn-JustinBieber-7103059.mp3?st=Jb7CePADDk5Lz9NMD9pSAQ&e=1638784678',
        image: 'https://avatar-nct.nixcdn.com/song/2021/03/05/2/1/7/c/1614931554567.jpg',
        genre: 'us-uk'
    },
    {
        id: 's19',
        name: 'Monster',
        artist: 'Shawn Mendes, Justin Bieber',
        album: 'Monster',
        duration: 178,
        path: 'https://c1-ex-swe.nixcdn.com/Unv_Audio188/Monster-ShawnMendesJustinBieber-6838261.mp3?st=w65iy6S0b1mtDlUnsZOceA&e=1638784732',
        image: 'https://avatar-nct.nixcdn.com/song/2020/11/23/0/2/3/c/1606100084558.jpg',
        genre: 'us-uk'
    },
    {
        id: 's20',
        name: 'All Around Me',
        artist: 'Justin Bieber',
        album: 'Changes',
        duration: 200,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui995/AllAroundMe-JustinBieber-6223828.mp3?st=vvGCbil4vC_5l_05XNgOtw&e=1638873647',
        image: 'https://avatar-nct.nixcdn.com/song/2020/02/14/a/9/d/b/1581658518670.jpg',
        genre: 'us-uk'
    },
    {
        id: 's21',
        name: 'Haru Haru',
        artist: 'BIGBANG',
        album: 'Stand Up',
        duration: 252,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/HaruHaru-BIGBANG-6291516.mp3?st=Gspt0qSx7rVZoYeM-x2jXA&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2020/06/09/2/d/0/7/1591688793624.jpg',
        genre: 'kpop'
    },
    {
        id: 's22',
        name: 'Loser',
        artist: 'BIGBANG',
        album: 'M',
        duration: 224,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/Loser-BIGBANG-6291940.mp3?st=Lhof5KoX62zevt2ZEXBP-A&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734574215.jpg',
        genre: 'kpop'
    },
    {
        id: 's23',
        name: "Let's Not Fall In Love",
        artist: 'BIGBANG',
        album: 'E',
        duration: 217,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/LetSNotFallInLove-BIGBANG-6292282.mp3?st=fcFmzvoy9t6mhv487BnahA&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734613690.jpg',
        genre: 'kpop'
    },
    {
        id: 's24',
        name: 'Blue',
        artist: 'BIGBANG',
        album: 'Alive',
        duration: 232,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=g0jDh_aS0bi75C3ZD9FhvA&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/08/08/1/e/0/1/1565247252132.jpg',
        genre: 'kpop'
    },
    {
        id: 's25',
        name: 'Bang Bang Bang',
        artist: 'BIGBANG',
        album: 'A',
        duration: 220,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/BangBangBang-BIGBANG-6293092.mp3?st=6I573fkPVGoqOxI43cIGVw&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734586323.jpg',
        genre: 'kpop'
    },
    {
        id: 's26',
        name: 'If You',
        artist: 'BIGBANG',
        album: 'M',
        duration: 273,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/IfYou-BIGBANG-6292294.mp3?st=xp-NrUXRQJTWzQabivltww&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734599196.jpg',
        genre: 'kpop'
    },
    {
        id: 's27',
        name: 'Celebrity',
        artist: 'IU',
        album: 'Celebrity',
        duration: 213,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1011/Celebrity-IU-6938138.mp3?st=iM5VWwaQtj1ImVGkz3bq8Q&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2021/03/01/7/7/d/0/1614570355625.jpg',
        genre: 'kpop'
    },
    {
        id: 's28',
        name: 'Blueming',
        artist: 'IU',
        album: 'Love Poem',
        duration: 218,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui992/Blueming-IU-6138404.mp3?st=HGiSqSggzq_yx7A8dWC5aQ&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2019/11/18/b/0/e/0/1574073260102.jpg',
        genre: 'kpop'
    },
    {
        id: 's29',
        name: 'Love Scenario',
        artist: 'iKON',
        album: 'Return',
        duration: 211,
        path: 'https://c1-ex-swe.nixcdn.com/YG_Audio1/LoveScenario-iKON-6292220.mp3?st=GquH-Wmqa8cjZfNqRgIM7w&e=1638783344',
        image: 'https://avatar-nct.nixcdn.com/song/2018/01/25/5/2/d/e/1516873006451.jpg',
        genre: 'kpop'
    },
    {
        id: 's30',
        name: 'Sứ Thanh Hoa',
        artist: 'Châu Kiệt Luân',
        album: 'I Am Not Du Wei',
        duration: 235,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui964/SuThanhHoa-ChauKietLuanJayChou-108110.mp3?st=ieBMFvjQWp7apqOrblPsiQ&e=1638784935',
        image: 'https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565165369019.jpg',
        genre: 'cpop'
    },
    {
        id: 's31',
        name: 'Mạc Ly (Gia Nam Truyện OST)',
        artist: 'Cúc Tịnh Y',
        album: 'Gia Nam Truyện OST',
        duration: 215,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MacLyGiaNamTruyenOST-CucTinhYJuJingYi-7114103.mp3?st=1kYhMVrtp1prZDQLxMbXzQ&e=1638784935',
        image: 'https://avatar-nct.nixcdn.com/song/2021/10/26/8/1/f/e/1635241730249.jpg',
        genre: 'cpop'
    },
    {
        id: 's32',
        name: 'Tay Trái Chỉ Trăng',
        artist: 'Tát Đỉnh Đỉnh',
        album: 'Hương Mật Tựa Khói Sương OST',
        duration: 268,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui962/TayTraiChiTrang-TatDinhDinhSaDingDing-5431513.mp3?st=R7nm-Q6FxpUL0UxCDMq2ig&e=1638784935',
        image: 'https://avatar-nct.nixcdn.com/song/2019/05/02/d/4/7/3/1556786602391.jpg',
        genre: 'cpop'
    },
    {
        id: 's33',
        name: 'Mang Chủng',
        artist: 'Âm Khuyết Thi Thính, Triệu Phương Tịnh',
        album: 'Mang Chủng',
        duration: 260,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui983/MangChung-TrieuPhuongTinhAmKhuyetThiThinh-5989054.mp3?st=9WINGtCn0ciu3GtGJODdrQ&e=1638784935',
        image: 'https://avatar-nct.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395.jpg',
        genre: 'cpop'
    },
    {
        id: 's34',
        name: 'Đồng Thoại',
        artist: 'Quang Lương',
        album: 'Đồng Thoại',
        duration: 245,
        path: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui946/DongThoai-MichaelWongQuangLuong-161624.mp3?st=lVaJblR1dnRj2csOFwvkRA&e=1638784935',
        image: 'https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565163727207.jpg',
        genre: 'cpop'
    }
];

const SONG_BY_ID = Object.fromEntries(SONGS.map(s => [s.id, s]));

/* -----------------------------------------------------
   DATA - Playlists, charts, banners
   ----------------------------------------------------- */
const PLAYLISTS = [
    {
        id: 'pl-vpop-hot',
        title: 'V-Pop Đỉnh Cao',
        subtitle: 'Sơn Tùng M-TP, Vũ, Da LAB...',
        songIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']
    },
    {
        id: 'pl-usuk-chill',
        title: 'US-UK Chill Vibes',
        subtitle: 'Justin Bieber, Taylor Swift...',
        songIds: ['s11', 's12', 's15', 's17', 's18', 's19', 's20']
    },
    {
        id: 'pl-kpop-bigbang',
        title: 'BIGBANG Best',
        subtitle: 'Tuyển tập BIGBANG bất hủ',
        songIds: ['s21', 's22', 's23', 's24', 's25', 's26']
    },
    {
        id: 'pl-iu',
        title: 'IU - Indie Princess',
        subtitle: 'Những giai điệu ngọt ngào',
        songIds: ['s27', 's28']
    },
    {
        id: 'pl-cpop',
        title: 'C-Pop Bất Hủ',
        subtitle: 'Châu Kiệt Luân, Cúc Tịnh Y...',
        songIds: ['s30', 's31', 's32', 's33', 's34']
    },
    {
        id: 'pl-justin',
        title: 'Justin Bieber Collection',
        subtitle: 'Tuyển chọn các hit của JB',
        songIds: ['s11', 's16', 's17', 's18', 's19', 's20']
    },
    {
        id: 'pl-vpop-rap',
        title: 'V-Rap Mới Nhất',
        subtitle: 'Phúc Du, Pháo, Negav...',
        songIds: ['s5', 's8', 's2', 's9']
    },
    {
        id: 'pl-relax',
        title: 'Nhạc Hoa Nhẹ Nhàng',
        subtitle: 'Thư giãn cùng giai điệu Á Đông',
        songIds: ['s30', 's32', 's34', 's31']
    }
];

PLAYLISTS.forEach(pl => {
    if (!pl.cover) {
        const first = SONG_BY_ID[pl.songIds[0]];
        pl.cover = first ? first.image : '';
    }
});

const NEW_RELEASES = ['s1', 's2', 's3', 's4', 's7', 's9', 's12', 's15'];

const CHART_TOP = ['s3', 's5', 's1', 's8', 's2', 's7', 's4', 's10', 's6', 's9'];

/* -----------------------------------------------------
   STATE
   ----------------------------------------------------- */
const defaultState = {
    queue: PLAYLISTS[0].songIds.slice(),
    currentIndex: 0,
    volume: 0.8,
    isShuffle: false,
    isRepeat: false,
    likedIds: [],
    recentIds: []
};

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...defaultState };
        const parsed = JSON.parse(raw);
        return { ...defaultState, ...parsed };
    } catch {
        return { ...defaultState };
    }
}

function saveState() {
    const { queue, currentIndex, volume, isShuffle, isRepeat, likedIds, recentIds } = state;
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ queue, currentIndex, volume, isShuffle, isRepeat, likedIds, recentIds })
    );
}

let state = loadState();

/* -----------------------------------------------------
   DOM REFS
   ----------------------------------------------------- */
const audio = $('#audio');
const playerBar = $('#playerBar');
const playBtn = $('#playBtn');
const prevBtn = $('#prevBtn');
const nextBtn = $('#nextBtn');
const shuffleBtn = $('#shuffleBtn');
const repeatBtn = $('#repeatBtn');
const progress = $('#progress');
const curTimeEl = $('#curTime');
const durTimeEl = $('#durTime');
const npThumb = $('#npThumb');
const npTitle = $('#npTitle');
const npArtist = $('#npArtist');
const likeBtn = $('#likeBtn');
const volumeEl = $('#volume');
const muteBtn = $('#muteBtn');
const queueBtn = $('#queueBtn');
const queuePanel = $('#queuePanel');
const queueClose = $('#queueClose');
const queueListEl = $('#queueList');
const contentEl = $('#content');
const searchInput = $('#searchInput');

/* -----------------------------------------------------
   HELPERS
   ----------------------------------------------------- */
function fmtTime(sec) {
    if (!sec || isNaN(sec) || !isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function songsByIds(ids) {
    return ids.map(id => SONG_BY_ID[id]).filter(Boolean);
}

function currentSong() {
    const id = state.queue[state.currentIndex];
    return SONG_BY_ID[id];
}

function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* -----------------------------------------------------
   PLAYER LOGIC
   ----------------------------------------------------- */
function loadCurrent({ autoplay = false } = {}) {
    const song = currentSong();
    if (!song) return;
    audio.src = song.path;
    npTitle.textContent = song.name;
    npArtist.textContent = song.artist;
    npThumb.style.backgroundImage = `url('${song.image}')`;
    likeBtn.classList.toggle('active', state.likedIds.includes(song.id));
    likeBtn.querySelector('i').className = state.likedIds.includes(song.id)
        ? 'fa-solid fa-heart'
        : 'fa-regular fa-heart';
    durTimeEl.textContent = fmtTime(song.duration);
    addRecent(song.id);
    if (autoplay) audio.play().catch(() => {});
    refreshActiveStates();
}

function play() {
    audio.play().catch(() => {});
}
function pause() {
    audio.pause();
}
function togglePlay() {
    if (audio.paused) play();
    else pause();
}

function next() {
    if (state.queue.length === 0) return;
    if (state.isShuffle) {
        let idx;
        if (state.queue.length === 1) idx = 0;
        else {
            do {
                idx = Math.floor(Math.random() * state.queue.length);
            } while (idx === state.currentIndex);
        }
        state.currentIndex = idx;
    } else {
        state.currentIndex = (state.currentIndex + 1) % state.queue.length;
    }
    saveState();
    loadCurrent({ autoplay: true });
}

function prev() {
    if (state.queue.length === 0) return;
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    state.currentIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
    saveState();
    loadCurrent({ autoplay: true });
}

function setQueue(songIds, startIndex = 0) {
    state.queue = songIds.slice();
    state.currentIndex = Math.max(0, Math.min(startIndex, songIds.length - 1));
    saveState();
    loadCurrent({ autoplay: true });
    renderQueue();
}

function playSongFromContext(songId, contextSongIds) {
    const ids = contextSongIds && contextSongIds.length ? contextSongIds : [songId];
    const idx = ids.indexOf(songId);
    setQueue(ids, idx >= 0 ? idx : 0);
}

function toggleLike(songId) {
    const i = state.likedIds.indexOf(songId);
    if (i >= 0) state.likedIds.splice(i, 1);
    else state.likedIds.unshift(songId);
    saveState();
    refreshActiveStates();
}

function addRecent(songId) {
    state.recentIds = [songId, ...state.recentIds.filter(id => id !== songId)].slice(0, 30);
    saveState();
}

function setVolume(v) {
    state.volume = Math.max(0, Math.min(1, v));
    audio.volume = state.volume;
    volumeEl.value = Math.round(state.volume * 100);
    volumeEl.style.backgroundSize = `${volumeEl.value}% 100%`;
    muteBtn.querySelector('i').className =
        state.volume === 0 ? 'fa-solid fa-volume-xmark' : state.volume < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
    saveState();
}

/* -----------------------------------------------------
   AUDIO EVENT BINDINGS
   ----------------------------------------------------- */
audio.addEventListener('play', () => {
    playerBar.classList.add('is-playing');
    refreshActiveStates();
});
audio.addEventListener('pause', () => {
    playerBar.classList.remove('is-playing');
    refreshActiveStates();
});
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progress.value = pct;
        progress.style.backgroundSize = `${pct}% 100%`;
    }
    curTimeEl.textContent = fmtTime(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => {
    if (isFinite(audio.duration)) durTimeEl.textContent = fmtTime(audio.duration);
});
audio.addEventListener('ended', () => {
    if (state.isRepeat) {
        audio.currentTime = 0;
        play();
    } else {
        next();
    }
});

/* -----------------------------------------------------
   CONTROL EVENTS
   ----------------------------------------------------- */
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

shuffleBtn.addEventListener('click', () => {
    state.isShuffle = !state.isShuffle;
    shuffleBtn.classList.toggle('active', state.isShuffle);
    saveState();
});
repeatBtn.addEventListener('click', () => {
    state.isRepeat = !state.isRepeat;
    repeatBtn.classList.toggle('active', state.isRepeat);
    saveState();
});

progress.addEventListener('input', e => {
    if (!audio.duration) return;
    audio.currentTime = (audio.duration * e.target.value) / 100;
});

volumeEl.addEventListener('input', e => setVolume(Number(e.target.value) / 100));
muteBtn.addEventListener('click', () => setVolume(state.volume === 0 ? 0.7 : 0));

likeBtn.addEventListener('click', () => {
    const s = currentSong();
    if (s) toggleLike(s.id);
});

queueBtn.addEventListener('click', () => {
    queuePanel.classList.toggle('open');
    queueBtn.classList.toggle('active', queuePanel.classList.contains('open'));
    if (queuePanel.classList.contains('open')) renderQueue();
});
queueClose.addEventListener('click', () => {
    queuePanel.classList.remove('open');
    queueBtn.classList.remove('active');
});

$$('.queue-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        $$('.queue-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderQueue();
    });
});

/* -----------------------------------------------------
   RENDERERS
   ----------------------------------------------------- */
function renderHero() {
    const featured = SONG_BY_ID['s3'];
    return `
        <div class="hero">
            <div class="hero__bg" style="background-image:url('${featured.image}')"></div>
            <div class="hero__content">
                <div class="hero__eyebrow">NHẠC HOT MỖI NGÀY</div>
                <div class="hero__title">${escapeHtml(featured.name)}</div>
                <div class="hero__subtitle">${escapeHtml(featured.artist)} - ${escapeHtml(featured.album)}</div>
                <button class="hero__btn" data-play-song="${featured.id}" data-context="${PLAYLISTS[0].id}">
                    <i class="fa-solid fa-play"></i> Phát ngay
                </button>
            </div>
        </div>
    `;
}

function renderPlaylistCard(pl) {
    return `
        <div class="card" data-playlist="${pl.id}">
            <div class="card__cover" style="background-image:url('${pl.cover}')">
                <div class="card__overlay">
                    <button title="Yêu thích"><i class="fa-regular fa-heart"></i></button>
                    <button class="play" title="Phát"><i class="fa-solid fa-play"></i></button>
                    <button title="Khác"><i class="fa-solid fa-ellipsis"></i></button>
                </div>
            </div>
            <div class="card__title">${escapeHtml(pl.title)}</div>
            <div class="card__subtitle">${escapeHtml(pl.subtitle)}</div>
        </div>
    `;
}

function renderSongCard(s) {
    return `
        <div class="card" data-play-song="${s.id}">
            <div class="card__cover" style="background-image:url('${s.image}')">
                <div class="card__overlay">
                    <button title="Yêu thích" data-like="${s.id}"><i class="fa-regular fa-heart"></i></button>
                    <button class="play" title="Phát"><i class="fa-solid fa-play"></i></button>
                    <button title="Khác"><i class="fa-solid fa-ellipsis"></i></button>
                </div>
            </div>
            <div class="card__title">${escapeHtml(s.name)}</div>
            <div class="card__subtitle">${escapeHtml(s.artist)}</div>
        </div>
    `;
}

function renderChartRow(songId, rank, contextIds) {
    const s = SONG_BY_ID[songId];
    if (!s) return '';
    const rankCls = rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : '';
    return `
        <div class="chart-row" data-play-song="${s.id}" data-context-ids="${contextIds.join(',')}">
            <div class="chart-row__rank ${rankCls}">${String(rank).padStart(2, '0')}</div>
            <div class="chart-row__info">
                <div class="chart-row__thumb" style="background-image:url('${s.image}')"></div>
                <div>
                    <div class="chart-row__title">${escapeHtml(s.name)}</div>
                    <div class="chart-row__artist">${escapeHtml(s.artist)}</div>
                </div>
            </div>
            <div class="chart-row__duration">${fmtTime(s.duration)}</div>
        </div>
    `;
}

function renderSongRow(s, contextIds) {
    return `
        <div class="song-row" data-play-song="${s.id}" data-context-ids="${contextIds.join(',')}">
            <div class="song-row__main">
                <div class="song-row__thumb" style="background-image:url('${s.image}')"></div>
                <div class="song-row__text">
                    <div class="song-row__title">${escapeHtml(s.name)}</div>
                    <div class="song-row__artist">${escapeHtml(s.artist)}</div>
                </div>
            </div>
            <div class="song-row__album">${escapeHtml(s.album)}</div>
            <div class="song-row__duration">${fmtTime(s.duration)}</div>
        </div>
    `;
}

/* -----------------------------------------------------
   ROUTES
   ----------------------------------------------------- */
const routes = {
    home: renderHome,
    discover: renderDiscover,
    zingchart: renderZingChart,
    radio: renderRadio,
    follow: renderFollow,
    vpop: renderVpop,
    genres: renderGenres,
    top100: renderTop100,
    mv: renderMV,
    library: renderLibrary,
    liked: renderLiked,
    recent: renderRecent
};

function navigate(route) {
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.route === route));
    const fn = routes[route] || renderHome;
    contentEl.innerHTML = fn();
    contentEl.scrollTop = 0;
    refreshActiveStates();
}

function renderHome() {
    const newReleases = songsByIds(NEW_RELEASES);
    const featured = PLAYLISTS.slice(0, 4);
    const more = PLAYLISTS.slice(4);
    return `
        ${renderHero()}
        <section class="section">
            <div class="section-head">
                <h2>Gợi Ý Hôm Nay</h2>
                <a href="#" class="more" data-route="discover">TẤT CẢ <i class="fa-solid fa-chevron-right"></i></a>
            </div>
            <div class="quick-grid">
                ${featured.map(renderPlaylistCard).join('')}
            </div>
        </section>

        <section class="section">
            <div class="section-head">
                <h2>Mới Phát Hành</h2>
                <a href="#" class="more" data-route="vpop">TẤT CẢ <i class="fa-solid fa-chevron-right"></i></a>
            </div>
            <div class="quick-grid">
                ${newReleases.map(renderSongCard).join('')}
            </div>
        </section>

        <section class="section">
            <div class="section-head">
                <h2>#zingchart</h2>
                <a href="#" class="more" data-route="zingchart">XEM CHI TIẾT <i class="fa-solid fa-chevron-right"></i></a>
            </div>
            <div class="chart">
                <h3>BXH Bài Hát V-POP</h3>
                <div class="chart__list">
                    ${CHART_TOP.slice(0, 5).map((id, i) => renderChartRow(id, i + 1, CHART_TOP)).join('')}
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-head">
                <h2>Có Thể Bạn Quan Tâm</h2>
            </div>
            <div class="quick-grid">
                ${more.map(renderPlaylistCard).join('')}
            </div>
        </section>
    `;
}

function renderDiscover() {
    return `
        <section class="section">
            <div class="section-head"><h2>Khám Phá - Tất Cả Playlist</h2></div>
            <div class="quick-grid">
                ${PLAYLISTS.map(renderPlaylistCard).join('')}
            </div>
        </section>
    `;
}

function renderZingChart() {
    return `
        <section class="section">
            <div class="section-head"><h2>#zingchart</h2></div>
            <div class="chart">
                <h3>BXH Bài Hát Việt Nam</h3>
                <div class="chart__list">
                    ${CHART_TOP.map((id, i) => renderChartRow(id, i + 1, CHART_TOP)).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderRadio() {
    const radios = PLAYLISTS.slice(0, 4).map(p => ({
        ...p,
        title: 'Radio: ' + p.title,
        subtitle: 'Phát sóng 24/7'
    }));
    return `
        <section class="section">
            <div class="section-head"><h2>Radio Đang Phát</h2></div>
            <div class="quick-grid">
                ${radios.map(renderPlaylistCard).join('')}
            </div>
        </section>
    `;
}

function renderFollow() {
    return `
        <section class="section">
            <div class="section-head"><h2>Theo Dõi</h2></div>
            <p style="color:var(--text-muted)">Bạn chưa theo dõi nghệ sĩ nào. Hãy khám phá thêm!</p>
        </section>
    `;
}

function renderVpop() {
    const vpop = SONGS.filter(s => s.genre === 'vpop');
    const ids = vpop.map(s => s.id);
    return `
        <section class="section">
            <div class="section-head"><h2>Nhạc Mới - V-POP</h2></div>
            <div class="song-list">
                ${vpop.map(s => renderSongRow(s, ids)).join('')}
            </div>
        </section>
    `;
}

function renderGenres() {
    const coverFor = key => (SONGS.find(s => s.genre === key) || SONGS[0]).image;
    const groups = [
        { key: 'vpop', name: 'V-POP', cover: coverFor('vpop') },
        { key: 'us-uk', name: 'US-UK', cover: coverFor('us-uk') },
        { key: 'kpop', name: 'K-POP', cover: coverFor('kpop') },
        { key: 'cpop', name: 'C-POP', cover: coverFor('cpop') }
    ];
    return `
        <section class="section">
            <div class="section-head"><h2>Thể Loại</h2></div>
            <div class="quick-grid">
                ${groups
                    .map(
                        g => `
                    <div class="card" data-genre="${g.key}">
                        <div class="card__cover" style="background-image:url('${g.cover}')">
                            <div class="card__overlay">
                                <button class="play"><i class="fa-solid fa-play"></i></button>
                            </div>
                        </div>
                        <div class="card__title">${g.name}</div>
                        <div class="card__subtitle">Tuyển tập ${g.name}</div>
                    </div>
                `
                    )
                    .join('')}
            </div>
        </section>
    `;
}

function renderTop100() {
    const ids = SONGS.map(s => s.id);
    return `
        <section class="section">
            <div class="section-head"><h2>Top 100 Bài Hát</h2></div>
            <div class="song-list">
                ${SONGS.map(s => renderSongRow(s, ids)).join('')}
            </div>
        </section>
    `;
}

function renderMV() {
    return `
        <section class="section">
            <div class="section-head"><h2>MV Mới Nhất</h2></div>
            <div class="quick-grid">
                ${songsByIds(NEW_RELEASES).map(renderSongCard).join('')}
            </div>
        </section>
    `;
}

function renderLibrary() {
    return `
        <section class="section">
            <div class="section-head"><h2>Thư Viện Của Tôi</h2></div>
            <div class="quick-grid">
                ${PLAYLISTS.map(renderPlaylistCard).join('')}
            </div>
        </section>
    `;
}

function renderLiked() {
    if (!state.likedIds.length) {
        return `
            <section class="section">
                <div class="section-head"><h2>Bài Hát Yêu Thích</h2></div>
                <p style="color:var(--text-muted)">Bạn chưa thích bài hát nào. Nhấn vào trái tim để lưu lại nhé!</p>
            </section>
        `;
    }
    const songs = songsByIds(state.likedIds);
    return `
        <section class="section">
            <div class="section-head"><h2>Bài Hát Yêu Thích</h2></div>
            <div class="song-list">
                ${songs.map(s => renderSongRow(s, state.likedIds)).join('')}
            </div>
        </section>
    `;
}

function renderRecent() {
    if (!state.recentIds.length) {
        return `
            <section class="section">
                <div class="section-head"><h2>Nghe Gần Đây</h2></div>
                <p style="color:var(--text-muted)">Chưa có bài hát nào được phát.</p>
            </section>
        `;
    }
    const songs = songsByIds(state.recentIds);
    return `
        <section class="section">
            <div class="section-head"><h2>Nghe Gần Đây</h2></div>
            <div class="song-list">
                ${songs.map(s => renderSongRow(s, state.recentIds)).join('')}
            </div>
        </section>
    `;
}

/* Playlist detail (when clicking a playlist card) */
function renderPlaylistDetail(plId) {
    const pl = PLAYLISTS.find(p => p.id === plId);
    if (!pl) return navigate('home');
    const songs = songsByIds(pl.songIds);
    contentEl.innerHTML = `
        <section class="section" style="margin-top:14px">
            <div class="hero" style="background:linear-gradient(135deg,#3a1f5a 0%, #c273ed 100%); height:220px;">
                <div class="hero__bg" style="background-image:url('${pl.cover}')"></div>
                <div class="hero__content" style="max-width:80%; display:flex; gap:18px; align-items:center;">
                    <div style="width:160px; height:160px; border-radius:10px; background-image:url('${pl.cover}'); background-size:cover; background-position:center; box-shadow:0 12px 30px -10px rgba(0,0,0,.6);"></div>
                    <div>
                        <div class="hero__eyebrow">PLAYLIST</div>
                        <div class="hero__title">${escapeHtml(pl.title)}</div>
                        <div class="hero__subtitle">${escapeHtml(pl.subtitle)} • ${songs.length} bài hát</div>
                        <button class="hero__btn" id="playPlaylistBtn">
                            <i class="fa-solid fa-play"></i> Phát Tất Cả
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="song-list">
                ${songs.map(s => renderSongRow(s, pl.songIds)).join('')}
            </div>
        </section>
    `;
    contentEl.scrollTop = 0;
    $('#playPlaylistBtn')?.addEventListener('click', () => setQueue(pl.songIds, 0));
    refreshActiveStates();
}

/* -----------------------------------------------------
   QUEUE PANEL RENDER
   ----------------------------------------------------- */
function renderQueue() {
    const activeTab = $('.queue-tab.active')?.dataset.tab || 'queue';
    const ids = activeTab === 'recent' ? state.recentIds : state.queue;
    const songs = songsByIds(ids);
    if (!songs.length) {
        queueListEl.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px;">${
            activeTab === 'recent' ? 'Chưa có bài hát nào trong lịch sử.' : 'Hàng đợi trống.'
        }</div>`;
        return;
    }
    queueListEl.innerHTML = songs
        .map(
            (s, idx) => `
        <div class="queue-item ${activeTab === 'queue' && idx === state.currentIndex ? 'is-active' : ''}"
             data-play-song="${s.id}" data-context-ids="${ids.join(',')}">
            <div class="queue-item__thumb" style="background-image:url('${s.image}')"></div>
            <div class="queue-item__text">
                <div class="queue-item__title">${escapeHtml(s.name)}</div>
                <div class="queue-item__artist">${escapeHtml(s.artist)}</div>
            </div>
            <button class="icon-btn" style="width:30px;height:30px;background:transparent;font-size:12px;" title="Khác">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
    `
        )
        .join('');
}

/* -----------------------------------------------------
   ACTIVE-STATE REFRESH (highlights)
   ----------------------------------------------------- */
function refreshActiveStates() {
    const cur = currentSong();
    const curId = cur ? cur.id : null;
    $$('.song-row').forEach(el => el.classList.toggle('is-active', el.dataset.playSong === curId));
    $$('.chart-row').forEach(el => el.classList.toggle('is-active', el.dataset.playSong === curId));
    if (queuePanel.classList.contains('open')) renderQueue();
}

/* -----------------------------------------------------
   GLOBAL DELEGATION
   ----------------------------------------------------- */
document.addEventListener('click', e => {
    const navLink = e.target.closest('[data-route]');
    if (navLink) {
        e.preventDefault();
        navigate(navLink.dataset.route);
        return;
    }

    const playlistCard = e.target.closest('[data-playlist]');
    if (playlistCard) {
        const overlayPlay = e.target.closest('.card__overlay .play');
        if (overlayPlay) {
            const pl = PLAYLISTS.find(p => p.id === playlistCard.dataset.playlist);
            if (pl) setQueue(pl.songIds, 0);
            return;
        }
        renderPlaylistDetail(playlistCard.dataset.playlist);
        return;
    }

    const genreCard = e.target.closest('[data-genre]');
    if (genreCard) {
        const ids = SONGS.filter(s => s.genre === genreCard.dataset.genre).map(s => s.id);
        if (ids.length) setQueue(ids, 0);
        return;
    }

    const likeTarget = e.target.closest('[data-like]');
    if (likeTarget) {
        e.stopPropagation();
        toggleLike(likeTarget.dataset.like);
        return;
    }

    const songTarget = e.target.closest('[data-play-song]');
    if (songTarget) {
        const ids = (songTarget.dataset.contextIds || '').split(',').filter(Boolean);
        const ctx = songTarget.dataset.context;
        let contextIds = ids;
        if (!contextIds.length && ctx) {
            const pl = PLAYLISTS.find(p => p.id === ctx);
            if (pl) contextIds = pl.songIds;
        }
        playSongFromContext(songTarget.dataset.playSong, contextIds);
        return;
    }
});

/* -----------------------------------------------------
   SEARCH
   ----------------------------------------------------- */
let searchTimer;
searchInput.addEventListener('input', e => {
    clearTimeout(searchTimer);
    const q = e.target.value.trim().toLowerCase();
    searchTimer = setTimeout(() => {
        if (!q) {
            navigate('home');
            return;
        }
        const results = SONGS.filter(
            s =>
                s.name.toLowerCase().includes(q) ||
                s.artist.toLowerCase().includes(q) ||
                s.album.toLowerCase().includes(q)
        );
        const ids = results.map(s => s.id);
        contentEl.innerHTML = `
            <section class="section">
                <div class="section-head"><h2>Kết quả tìm kiếm cho "${escapeHtml(q)}" (${results.length})</h2></div>
                ${
                    results.length
                        ? `<div class="song-list">${results.map(s => renderSongRow(s, ids)).join('')}</div>`
                        : `<p style="color:var(--text-muted)">Không tìm thấy bài hát phù hợp.</p>`
                }
            </section>
        `;
        contentEl.scrollTop = 0;
        refreshActiveStates();
    }, 200);
});

/* -----------------------------------------------------
   INIT
   ----------------------------------------------------- */
function init() {
    if (!state.queue || state.queue.length === 0) {
        state.queue = PLAYLISTS[0].songIds.slice();
        state.currentIndex = 0;
    }
    if (state.currentIndex >= state.queue.length) state.currentIndex = 0;

    setVolume(state.volume);
    shuffleBtn.classList.toggle('active', state.isShuffle);
    repeatBtn.classList.toggle('active', state.isRepeat);

    loadCurrent({ autoplay: false });
    navigate('home');
    renderQueue();
}

init();
