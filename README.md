# Zing MP3 Clone

Một bản clone giao diện và chức năng cơ bản của [Zing MP3](https://zingmp3.vn) được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript thuần**, không dùng framework.

## Tính năng

- **Giao diện chuẩn Zing MP3**: Sidebar điều hướng, thanh tìm kiếm trên cùng, khu vực nội dung chính, thanh phát nhạc cố định ở cuối, panel hàng đợi (queue) bên phải.
- **Dark theme tím** đặc trưng + gradient hero banner.
- **Trang chủ** gồm: Banner gợi ý, lưới playlist gợi ý, Mới phát hành, Bảng xếp hạng #zingchart.
- **Điều hướng nhiều trang ảo (SPA)**: Cá Nhân, Khám Phá, #zingchart, Radio, Theo Dõi, Nhạc Mới, Thể Loại, Top 100, MV, Thư Viện, Yêu Thích, Gần Đây.
- **Phát nhạc đầy đủ**:
  - Play / Pause
  - Next / Previous
  - Phát ngẫu nhiên (Shuffle)
  - Lặp lại bài (Repeat)
  - Tua bằng thanh tiến trình
  - Điều chỉnh âm lượng + nút mute
  - Tự động phát bài tiếp theo khi kết thúc
- **Hàng đợi phát**: Mở/đóng panel bên phải, chuyển giữa Danh sách phát và Nghe gần đây.
- **Yêu thích** bài hát (lưu vào `localStorage`).
- **Tìm kiếm thời gian thực** theo tên bài, nghệ sĩ, album.
- **Chi tiết playlist**: Click playlist để xem danh sách bài và phát toàn bộ.
- **Lưu trạng thái** vào `localStorage`: hàng đợi, bài hiện tại, âm lượng, shuffle, repeat, danh sách yêu thích, nghe gần đây.

## Cấu trúc

```
.
├── index.html   # Layout chính (sidebar, topbar, content, player bar, queue panel)
├── styles.css   # Toàn bộ CSS theo phong cách Zing MP3
├── app.js       # Logic SPA, dữ liệu bài hát/playlist, player, queue, search
└── README.md
```

## Chạy thử

Chỉ cần mở `index.html` bằng trình duyệt. Để tránh các vấn đề CORS với một số file MP3 từ CDN bên ngoài, có thể chạy local server:

```bash
python3 -m http.server 8080
# rồi truy cập http://localhost:8080
```

## Ghi chú

- Dữ liệu bài hát được nhúng tĩnh trong `app.js` để demo. Một số đường dẫn MP3 trỏ tới CDN bên ngoài — nếu link hết hạn, hãy thay bằng nguồn nhạc khác.
- Project chỉ phục vụ mục đích học tập, không sử dụng cho thương mại.
