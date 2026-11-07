# BÁO CÁO KIỂM THỬ — KiyoEdu Continuous Scroll V5

## Đã thực hiện

- Giải nén và sửa trực tiếp mã nguồn bản KiyoEdu V4 có sẵn trong hội thoại.
- Viết lại CSS layout theo normal document flow: không còn fullscreen sticky stage, không còn các section có chiều cao 260–335svh.
- Viết lại `initCinematicMotion.ts` để tạo timeline theo khối ảnh thực tế với các trigger tiến độ khi khối đó đi qua viewport. Không có `pin`, không có wheel/touch intercept.
- Kiểm tra cú pháp TypeScript/TSX bằng TypeScript transpileModule: 7 tệp nguồn, 0 lỗi cú pháp.
- Kiểm tra phân tích cú pháp CSS bằng PostCSS: hợp lệ.
- Tạo **bản kiểm thử bố cục tĩnh** từ chính TSX/CSS nguồn với renderer React tối giản tạm thời. Bản này không chạy React thật, GSAP hay Vite.
- Dùng Chromium/Playwright `set_content` để kiểm tra bố cục, cuộn và ảnh ở 1440×900, 768×1024, 390×844, 320×640.
- Cả 4 viewport: 82 `<img>` (cùng demo), 0 ảnh lỗi, `scrollWidth == innerWidth`, 0 `.flow-stage` sticky và scroll snap là `none`.
- Cuộn tới 0%, 25%, 50%, 75%, 100% chiều dài trang và đo bounding rect của Hero/Product: các vị trí biến đổi theo `scrollY`, không bị ghim tại một khung hình.
- Ở 1440×900: `scrollHeight` ~24.130 px; ở 390×844: ~14.346 px. Đây là chiều dài nội dung 82 ảnh, không phải một chuỗi trang giả.
- Đã xem trước screenshot hero desktop/mobile và ảnh minh họa phần giữa trang.

## Chưa thể xác minh

- `npm install`: kết nối DNS `registry.npmjs.org` trả `EAI_AGAIN` trong môi trường hiện tại.
- Vì chưa có React/Vite/GSAP thực tế trong `node_modules`, **chưa thể chạy `npm run build` hoặc kiểm tra runtime GSAP trong Chromium**.
- Chưa kiểm tra `START.bat` / `BUILD.bat` trên Windows vì đây là máy Linux.
- Kiểm thử wheel/touchpad thiết bị thật, FPS, memory và animation frame timing cần thực hiện khi Vite chạy trên máy người dùng.

## Các bước nghiệm thu trên máy Windows

1. Chạy `START.bat` rồi kiểm tra trang bằng Chrome/Edge.
2. Cuộn từng bước 100–200px qua toàn bộ trang, bảo đảm ảnh và nội dung di chuyển cùng trang, không dừng thành slide.
3. Cuộn ngược để kiểm tra hiệu ứng quay lại; kéo thanh cuộn để dừng tại điểm bất kỳ.
4. Thử trên thiết bị mobile và với `prefers-reduced-motion: reduce`.
5. Mở DevTools, xác minh không có lỗi JS hoặc ảnh; chạy `BUILD.bat`.

Các kết quả bố cục tĩnh **không được xem là bằng chứng** rằng animation GSAP hoặc build Vite production đã hoạt động thành công.
