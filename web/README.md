# KiyoEdu — Continuous Cinematic Scrollytelling V5

**Một website Vite / React / TypeScript / GSAP ScrollTrigger, cuộn dọc liên tục theo trình duyệt.** Đây là bản thay thế kiến trúc cuộn kiểu slide trong V4.

## Sửa gì ở V5?

- Không còn `.stage-sticky` hoặc `position: sticky` cho toàn màn hình: các composition hiện nằm trong **document flow**.
- Không còn các chapter height nhân 260–335svh, `ScrollTrigger.pin`, scroll snapping, wheel hijacking hoặc gọi `scrollTo` khi người xem lăn chuột.
- Các GSAP timeline theo dõi **tiến độ khối ảnh đi qua viewport** (`top 90%` → `bottom 15%`), không dùng đoạn cuộn giả để chạy một slide.
- Đàn chim, đường kết nối Bắc–Trung–Nam, chuyển động zoom, ảnh xoay và các nhóm ảnh vẫn được giữ. Khi cuộn ngược, animation được thiết kế để đảo chiều.
- **82 vị trí ảnh** vẫn có ID riêng. Trang chỉ dùng ảnh demo mặc định cho đến khi bạn thay.

## Chạy trên Windows

1. Giải nén ZIP vào `E:\DATA\source\edu\web` hoặc một thư mục khác.
2. Cài Node.js LTS kèm npm nếu chưa có.
3. Nhấp đúp **`START.bat`**. Lần đầu cần Internet để `npm install` các thư viện.
4. Website chạy tại `http://127.0.0.1:5173/`; tệp BAT tự chờ và mở trình duyệt khi server sẵn sàng.
5. Nhấp đúp **`BUILD.bat`** để build bản production vào `dist/`.

Nếu dự án cũ đang nằm trong thư mục đó, hãy **sao lưu trước khi thay thế**. File ZIP chứa dự án Vite đầy đủ và có thể chạy ở thư mục độc lập. Không copy đè vào thư mục đang có thay đổi riêng mà chưa sao lưu.

## Thay ảnh riêng lẻ

Tệp ảnh mặc định: `public/images/demo.jpg`.

Bộ cấu hình: `src/data/images.ts`.

Ví dụ đưa ảnh của bạn vào `public/images/grades.webp`, sau đó thêm cuối `src/data/images.ts`:

```ts
images.school03.src = '/images/grades.webp';
images.school03.objectPosition = 'center top';
```

Chỉ `school03` thay đổi. Các ảnh khác vẫn hiển thị demo. Hỗ trợ `.jpg`, `.png`, `.webp`, `.avif`. Thành phần `Photo` fallback khi một đường dẫn tùy chỉnh bị lỗi. Mỗi ảnh có thể chỉnh `aspectRatio` và `objectPosition`.

82 vị trí được chia thành: Hero (4), Ecosystem (8), Vietnam (6), School (12), Analytics (8), Management (8), Mobile (10), Library (8), Quiz (6), AI (6), Ending (6). Danh sách trong `IMAGE_SLOTS.csv`.

## Điều khiển chuyển động

`src/motion/initCinematicMotion.ts` là nơi tạo GSAP ScrollTrigger timeline. Nó **không can thiệp scroll**; chỉ thay đổi transform, opacity, và đường SVG khi ảnh di chuyển qua viewport.

`src/styles/global.css` quyết định bố cục và responsive. `.flow-stage` được định nghĩa `position: relative`, không dùng sticky. Hình ảnh có thể đặt absolute bên trong một khung composition có kích thước thực; bản thân composition vẫn nằm trong luồng tài liệu bình thường.

`prefers-reduced-motion: reduce` tắt hoạt ảnh phức tạp, đồng thời vẫn hiển thị những nút SVG trong nhóm kết nối Việt Nam.

## Trạng thái sản phẩm và nguồn dữ liệu

- `web-hoc-tap`: đang phát triển.
- Mobile: dự kiến phát triển.
- Quiz Arena / KIYO AI: concept.
- Tất cả ảnh hiện tại là ảnh **minh họa**, không phải sản phẩm đã xuất bản.
- Hình SVG nối Bắc–Trung–Nam chỉ là hình tượng kết nối, **không phải bản đồ địa lý chính xác**.

## Kiểm thử

Xem `TEST_REPORT.md` đi kèm. Trong môi trường bàn giao có thể kiểm tra **DOM/CSS cuộn tự nhiên, 82 ảnh, responsive, cú pháp TSX, cú pháp CSS**; không thể tải npm vì DNS bị chặn, do đó **chưa xác nhận** quá trình build Vite production hoặc chuyển động GSAP thực tế. Cần chạy `START.bat` và thử cuộn bằng chuột / touchpad / cảm ứng, kể cả cuộn ngược, trên máy có npm hoạt động.
