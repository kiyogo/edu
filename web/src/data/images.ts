/** Every visual has its own key. Change ONLY the src for a single image to replace it. */
export type ImageEntry = {
  id: string;
  src: string;
  alt: string;
  aspectRatio: string;
  objectPosition: string;
};
export const DEMO_IMAGE = '/images/demo.jpg';

const specs = [
  ['hero', 4, 'Khung cảnh mở đầu', '16 / 10'],
  ['ecosystem', 8, 'Hệ sinh thái giáo dục', '4 / 3'],
  ['vietnam', 6, 'Kết nối giáo dục Việt Nam', '3 / 4'],
  ['school', 12, 'Hệ thống quản lý học sinh', '16 / 10'],
  ['analytics', 8, 'Phân tích học tập', '16 / 10'],
  ['management', 8, 'Quản lý học đường', '4 / 3'],
  ['mobile', 10, 'Ứng dụng di động KiyoEdu concept', '3 / 5'],
  ['library', 8, 'Thư viện số KiyoEdu', '4 / 3'],
  ['quiz', 6, 'Quiz Arena concept', '16 / 10'],
  ['ai', 6, 'KIYO AI concept', '16 / 10'],
  ['ending', 6, 'Tương lai giáo dục KiyoEdu', '16 / 10'],
] as const;

export const imageGroups: Record<string, ImageEntry[]> = {};
export const images: Record<string, ImageEntry> = {};
for (const [name, count, title, ratio] of specs) {
  imageGroups[name] = Array.from({ length: count }, (_, index) => {
    const id = `${name}${String(index + 1).padStart(2, '0')}`;
    const image: ImageEntry = {
      id,
      src: DEMO_IMAGE,
      alt: `${title} — ảnh demo ${index + 1}`,
      aspectRatio: ratio,
      objectPosition: 'center center',
    };
    images[id] = image;
    return image;
  });
}

// EXAMPLE:
// images.school03.src = '/images/my-real-gradebook.webp';
// images.school03.objectPosition = 'center top';
// All other images still use /images/demo.jpg.
