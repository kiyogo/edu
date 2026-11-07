export interface ChapterInfo {
  id: string;
  index: string;
  title: string;
  highlight: string;
  kicker: string;
  range: [number, number]; // [startProgress, endProgress]
}

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 'intro',
    index: '01',
    title: 'Giáo dục.',
    highlight: 'Đang chuyển mình.',
    kicker: 'CHAPTER ONE — KHỞI ĐẦU',
    range: [0.0, 0.12],
  },
  {
    id: 'aperture',
    index: '02',
    title: 'Một nền tảng.',
    highlight: 'Muôn kết nối.',
    kicker: 'THE IDEA — HỆ SINH THÁI',
    range: [0.12, 0.25],
  },
  {
    id: 'vietnam',
    index: '03',
    title: 'Cho một',
    highlight: 'Việt Nam mới.',
    kicker: 'KẾT NỐI TOÀN DIỆN',
    range: [0.25, 0.38],
  },
  {
    id: 'school',
    index: '04',
    title: 'Học đường.',
    highlight: 'Một góc nhìn mới.',
    kicker: 'SẢN PHẨM — WEB-HOC-TAP',
    range: [0.38, 0.50],
  },
  {
    id: 'editorial',
    index: '05',
    title: 'Những điều phức tạp.',
    highlight: 'Trở nên rõ ràng.',
    kicker: 'DATA AS A STORY',
    range: [0.50, 0.62],
  },
  {
    id: 'mobile',
    index: '06',
    title: 'Trong',
    highlight: 'tầm tay.',
    kicker: 'MOBILE ORBIT 360°',
    range: [0.62, 0.75],
  },
  {
    id: 'library',
    index: '07',
    title: 'Tri thức & AI.',
    highlight: 'Không giới hạn.',
    kicker: 'DIGITAL LIBRARY & KIYO AI',
    range: [0.75, 0.88],
  },
  {
    id: 'ending',
    index: '08',
    title: 'Cho hành trình',
    highlight: 'phía trước.',
    kicker: 'KIYOEDU 2026',
    range: [0.88, 1.0],
  },
];

export const VIDEO_CONFIG = {
  src: '/videos/kiyoedu-cinematic.mp4',
  duration: 20,
  trackHeightMultiplier: 8, // 8 * 100vh = 800vh
  lerpFactor: 0.12,
};
