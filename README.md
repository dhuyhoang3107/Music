# Zing MP3 Clone

Một bản clone giao diện và chức năng cơ bản của [Zing MP3](https://zingmp3.vn) gồm **front-end SPA bằng vanilla JS** + **backend Node.js / Express** ký request và stream nhạc trực tiếp từ Zing MP3.

## Tính năng

### Front-end
- **Giao diện chuẩn Zing MP3**: sidebar, search topbar, content, player bar cố định, queue panel.
- **Dark theme tím** + gradient hero banner.
- **Trang chủ** với banner, lưới playlist, Mới Phát Hành, Bảng xếp hạng #zingchart.
- **SPA routing** cho 13 trang: Cá Nhân, Khám Phá, **Zing Live**, #zingchart, Radio, Theo Dõi, Nhạc Mới, Thể Loại, Top 100, MV, Thư Viện, Yêu Thích, Gần Đây.
- **Phát nhạc đầy đủ**: play/pause, next/prev, shuffle, repeat, tua, volume + mute, auto-next.
- **Hàng đợi phát** (queue panel) với 2 tab Danh sách phát / Nghe gần đây.
- **Yêu thích** + lưu state trong `localStorage`.
- **Tìm kiếm thời gian thực** trên cả thư viện cục bộ **và** Zing MP3.
- **Responsive**: drawer sidebar, mini player, 2-column card grid trên mobile.

### Backend & live streaming
- **Backend Express** ký request HMAC-SHA512 + SHA256 theo scheme của Zing MP3.
- **Lấy dữ liệu trực tiếp** từ `zingmp3.vn`: trang chủ, playlist gợi ý, top 100, BXH, search, chi tiết playlist, URL streaming.
- **Audio proxy** (`/api/stream`) bypass referer / hot-link protection của CDN, support Range request (tua/seek MP3).
- **Hot-load** trong UI: khi backend online, trang chủ tự động hiện section "Đề Xuất Từ Zing MP3" với badge `LIVE`, search hiển thị cả kết quả online + local, badge xanh "Zing MP3 LIVE" góc dưới phải.
- **Graceful degradation**: nếu backend offline, ứng dụng vẫn chạy với thư viện nhạc cục bộ.
- **Toast** thông báo lỗi (vd: bài VIP, bài bị giới hạn vùng) và tự động bỏ qua bài lỗi.

## Cấu trúc

```
.
├── index.html        # Layout chính
├── styles.css        # Toàn bộ CSS (responsive)
├── app.js            # SPA: state, player, routing, search, queue, online integration
├── server.js         # Express backend + Zing MP3 API proxy + audio stream proxy
├── package.json
└── README.md
```

## Chạy

### Cách 1 — Full features (có nhạc trực tiếp từ Zing MP3)

```bash
npm install
npm start
```

Mở `http://localhost:3000` — sẽ thấy badge `Zing MP3 LIVE` xanh và section "Đề Xuất Từ Zing MP3".

> **Lưu ý**: Một số bài VIP hoặc nội dung bị giới hạn vùng (geo-locked) sẽ không phát được; ứng dụng tự động báo toast và chuyển bài. Backend cần kết nối internet đến `zingmp3.vn`.

### Cách 2 — Static only (chỉ thư viện cục bộ)

```bash
python3 -m http.server 8080
# rồi truy cập http://localhost:8080
```

Khi không có backend, ứng dụng vẫn hoạt động đầy đủ với 34 bài nhạc cục bộ kế thừa.

## API endpoints (backend)

| Endpoint | Mô tả |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/search?q=...` | Tìm bài hát trên Zing MP3 |
| `GET /api/multi-search?q=...` | Tìm tổng hợp (bài + playlist) |
| `GET /api/home` | Trang chủ (playlist gợi ý + new release) |
| `GET /api/top100` | Top 100 |
| `GET /api/chart-home` | BXH realtime |
| `GET /api/playlist/:id` | Chi tiết playlist |
| `GET /api/song-url?id=...` | Lấy URL streaming |
| `GET /api/stream?id=...` | Proxy stream MP3 (hỗ trợ Range) |

## Ghi chú kỹ thuật

- Signature scheme: `sig = HMAC_SHA512( apiPath + SHA256(sortedSignedParams), SECRET_KEY )`. Mỗi endpoint có một subset cố định các tham số được ký (xem comment trong `server.js`).
- API key & secret là khóa public của Zing MP3 web — được rút từ JS bundle của trang.
- Cookie phiên được lấy tự động từ `https://zingmp3.vn` và cache 30 phút.
- Project chỉ phục vụ mục đích học tập, không sử dụng cho thương mại.
