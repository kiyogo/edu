export interface StoryboardAct {
  id: string;
  actNumber: string;
  kicker: string;
  title: string;
  highlight: string;
  subtitle: string;
  range: [number, number]; // [start, end] on 0.00 to 1.00 timeline
  badge?: string;
  products?: {
    name: string;
    tech: string;
    status: 'hoan_thien' | 'dang_phat_trien' | 'dinh_huong';
    statusLabel: string;
  }[];
}

export const STORYBOARD: StoryboardAct[] = [
  {
    id: 'spark',
    actNumber: '01',
    kicker: 'MÀN I / KHỞI NGUYÊN TRI THỨC',
    title: 'Tương lai giáo dục.',
    highlight: 'Bắt đầu từ trang sách hôm nay.',
    subtitle: 'Khởi đầu một kỷ nguyên số hóa, nơi mỗi con chữ và bài học đều trở thành nguồn cảm hứng bất tận.',
    range: [0.0, 0.14],
  },
  {
    id: 'vietnam',
    actNumber: '02',
    kicker: 'MÀN II / NON SÔNG & CON NGƯỜI',
    title: 'Từ non sông Việt Nam.',
    highlight: 'Cho thế hệ vươn tầm thế giới.',
    subtitle: 'Mỗi mái trường trên dải đất hình chữ S đều xứng đáng được tiếp cận công nghệ học tập chuẩn mực và tiên tiến nhất.',
    range: [0.14, 0.29],
  },
  {
    id: 'campus',
    actNumber: '03',
    kicker: 'MÀN III / KHÔNG GIAN GIẢNG ĐƯỜNG',
    title: 'Mỗi ngày đến trường.',
    highlight: 'Là một bước chuyển mình của ước mơ.',
    subtitle: 'Kết nối thầy cô, học trò và phụ huynh trong một môi trường giáo dục thấu hiểu, hiện đại và tràn đầy năng lượng.',
    range: [0.29, 0.44],
  },
  {
    id: 'focus',
    actNumber: '04',
    kicker: 'MÀN IV / TẬN TÂM RÈN LUYỆN',
    title: 'Lấy người học làm trung tâm.',
    highlight: 'Thấu hiểu từng tiến bộ nhỏ nhất.',
    subtitle: 'Theo dõi sát sao hành trình học tập, phát hiện tiềm năng và bồi dưỡng thế mạnh riêng của mỗi học sinh.',
    range: [0.44, 0.58],
  },
  {
    id: 'platform',
    actNumber: '05',
    kicker: 'MÀN V / NỀN TẢNG KIYOEDU',
    title: 'Hệ thống Quản lý Học sinh.',
    highlight: 'Minh bạch, trực quan và chuẩn hóa.',
    subtitle: 'Quản lý hồ sơ, lớp học, giáo viên, chuyên cần và sổ điểm điện tử — Dự án Web-Học-Tập đang tích cực phát triển.',
    range: [0.58, 0.74],
    badge: 'THỰC TẾ SẢN PHẨM TRONG HỆ THỐNG',
    products: [
      {
        name: 'Web Quản Lý Học Sinh',
        tech: 'React · TypeScript · Vite · Tailwind',
        status: 'hoan_thien',
        statusLabel: 'Đã hoàn thiện',
      },
      {
        name: 'API Backend Trung Tâm',
        tech: 'Node.js · Express · MySQL',
        status: 'hoan_thien',
        statusLabel: 'Đã hoàn thiện',
      },
      {
        name: 'App Android Sổ Liên Lạc',
        tech: 'Kotlin · Jetpack Compose · Material 3',
        status: 'hoan_thien',
        statusLabel: 'Đã phát triển',
      },
      {
        name: 'Web Học Tập (Web-Hoc-Tap)',
        tech: 'Next.js 14 · NestJS · PostgreSQL · Redis',
        status: 'dang_phat_trien',
        statusLabel: 'Đang phát triển',
      },
    ],
  },
  {
    id: 'ai',
    actNumber: '06',
    kicker: 'MÀN VI / TRÍ TUỆ NHÂN TẠO',
    title: 'Kiyo AI & Thư viện số.',
    highlight: 'Mở rộng biên giới học tập cá nhân hóa.',
    subtitle: 'Định hướng nghiên cứu trợ lý AI phân tích năng lực và gợi ý tài liệu học tập phù hợp theo từng lộ trình cá nhân.',
    range: [0.74, 0.88],
    badge: 'ĐỊNH HƯỚNG NGHIÊN CỨU & PHÁT TRIỂN',
  },
  {
    id: 'future',
    actNumber: '07',
    kicker: 'MÀN VII / HÀNH TRÌNH PHÍA TRƯỚC',
    title: 'KIYOEDU.',
    highlight: 'Kiến tạo tương lai giáo dục Việt Nam.',
    subtitle: 'Nền tảng công nghệ giáo dục đồng bộ, mã nguồn mở và phụng sự thế hệ tương lai.',
    range: [0.88, 1.0],
  },
];

export const MASTER_VIDEO_CONFIG = {
  src: '/videos/kiyoedu-master-film.mp4',
  duration: 31.90, // seconds
  scrollTrackHeightVh: 1200, // 1200vh for luxurious, granular scrubbing control
};
