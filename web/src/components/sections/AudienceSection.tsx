import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  BookOpen,
  Heart,
  CheckCircle2,
} from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const [activePersona, setActivePersona] = useState<number>(0);

  const personas = [
    {
      id: 'admin',
      role: 'Ban Giám Hiệu & Quản lý',
      badge: 'Điều hành cấp trường',
      icon: <Building2 size={24} />,
      headline: 'Tầm nhìn 360 độ về chất lượng và vận hành nhà trường',
      desc: 'Giúp lãnh đạo nhà trường nắm bắt chính xác dữ liệu thực tế tại từng lớp học theo thời gian thực mà không cần chờ báo cáo giấy tờ chậm trễ.',
      metrics: [
        { label: 'Thời gian tổng hợp báo cáo', val: 'Từ 5 ngày → 30 giây' },
        { label: 'Độ chính xác dữ liệu', val: '100% kiểm toán lưu vết' },
        { label: 'Chuẩn định dạng Bộ GD&ĐT', val: 'Tương thích 100% CSDL' },
      ],
      features: [
        'Dashboard điều hành thời gian thực: Tỷ lệ chuyên cần toàn trường, phổ điểm các khối lớp.',
        'Quy trình phê duyệt chặt chẽ: Khóa sổ điểm theo phân kỳ, kiểm duyệt sửa điểm có lý do.',
        'Báo cáo thống kê tự động xuất định dạng Excel/PDF chuẩn mẫu Bộ Giáo dục và Đào tạo.',
        'Quản lý phân công chuyên môn giáo viên và phát hiện xung đột thời khóa biểu tự động.',
      ],
    },
    {
      role: 'Giáo viên Bộ môn & Chủ nhiệm',
      badge: 'Nghiệp vụ sư phạm',
      icon: <GraduationCap size={24} />,
      headline: 'Giải phóng 70% thời gian giấy tờ hành chính',
      desc: 'Để thầy cô tập trung trọn vẹn tâm huyết cho bài giảng và lắng nghe tâm tư học sinh, thay vì miệt mài gõ công thức tính điểm và ghi sổ liên lạc thủ công.',
      metrics: [
        { label: 'Thời gian nhập điểm', val: 'Giảm 75% với phím tắt' },
        { label: 'Tự động tính toán', val: 'ĐTBmhk Thông tư 22' },
        { label: 'Giao bài & chấm tự động', val: 'Tiết kiệm 8h/tuần' },
      ],
      features: [
        'Giao diện nhập điểm siêu tốc: Nhập bằng phím số tự chuyển ô hoặc Import từ bảng tính Excel.',
        'Sổ chủ nhiệm thông minh: Sơ đồ lớp động, ghi nhận nề nếp thi đua, thông báo gia đình 1-click.',
        'Tạo đề thi trắc nghiệm từ ngân hàng câu hỏi phân cấp ma trận chuẩn GDPT 2018.',
        'Hệ thống tự động chấm trắc nghiệm và thống kê các câu học sinh làm sai nhiều nhất.',
      ],
    },
    {
      role: 'Học sinh',
      badge: 'Trải nghiệm học tập',
      icon: <BookOpen size={24} />,
      headline: 'Chủ động làm chủ hành trình tri thức của chính mình',
      desc: 'Không gian học tập hiện đại giúp học sinh xây dựng thói quen tự giác, theo dõi sự tiến bộ cá nhân và tìm thấy niềm vui trong mỗi bài kiểm tra trắc nghiệm.',
      metrics: [
        { label: 'Tra cứu điểm số', val: 'Tức thời & Minh bạch' },
        { label: 'Đấu trường trực tuyến', val: 'Tương tác theo thời gian thực' },
        { label: 'Học liệu số hóa', val: 'Truy cập mọi lúc mọi nơi' },
      ],
      features: [
        'Xem chi tiết điểm số, lời phê và lời giải bài kiểm tra ngay sau khi giáo viên công bố.',
        'Thời khóa biểu cá nhân và lịch nhắc hạn bài tập về nhà thông minh.',
        'Tham gia đấu trường trắc nghiệm Realtime Quiz với bạn bè trong lớp qua mã PIN.',
        'Luyện tập câu hỏi phân hóa theo từng mức độ để củng cố các phần kiến thức còn hổng.',
      ],
    },
    {
      role: 'Phụ huynh học sinh',
      badge: 'Đồng hành gia đình',
      icon: <Heart size={24} />,
      headline: 'Yên tâm đồng hành cùng con trong môi trường an toàn',
      desc: 'Ứng dụng di động Sổ liên lạc số riêng tư giúp cha mẹ luôn hiện diện bên con, thấu hiểu điểm mạnh và kịp thời hỗ trợ khi con cần.',
      metrics: [
        { label: 'Thông báo chuyên cần', val: 'Nhận ngay khi con vào lớp' },
        { label: 'Bảo mật điểm thi', val: 'Gửi riêng tới từng gia đình' },
        { label: 'Kết nối chủ nhiệm', val: 'Kênh chat 1-1 xác thực' },
      ],
      features: [
        'Nhận thông báo Push trên điện thoại ngay khi giáo viên điểm danh con có mặt lúc 07:15.',
        'Xem bảng điểm chi tiết và biểu đồ tiến bộ học tập của con mà không áp lực so sánh công khai.',
        'Trao đổi trực tiếp, gửi đơn xin nghỉ học có phép có chữ ký điện tử qua ứng dụng di động.',
        'Cập nhật thực đơn bán trú, lịch học bồi dưỡng và các khoản thu học phí minh bạch.',
      ],
    },
  ];

  const current = personas[activePersona];

  return (
    <section
      id="doi-tuong-su-dung"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="kiyo-container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Hệ sinh thái đa vai trò</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Bốn trụ cột kết nối:{' '}
            <span className="kiyo-display-serif">Một nền tảng, vẹn toàn giá trị.</span>
          </h2>
          <p className="kiyo-subtitle">
            KiyoEdu được thiết kế riêng biệt cho từng vai trò trong môi trường sư phạm, đảm bảo tính thuận tiện tối đa trong thao tác hàng ngày và bảo vệ quyền riêng tư của mọi đối tượng.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {personas.map((p, idx) => {
            const isActive = activePersona === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePersona(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? 'var(--brand-primary)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  border: isActive
                    ? '1px solid var(--brand-primary)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'var(--brand-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#FFFFFF' : 'var(--brand-primary)',
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                      opacity: isActive ? 0.85 : 0.6,
                    }}
                  >
                    {p.badge}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{p.role}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Showcase Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            padding: 'clamp(28px, 4vw, 48px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Narrative & Metrics */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--brand-primary)',
                  marginBottom: '12px',
                }}
              >
                {current.badge}
              </div>
              <h3
                style={{
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.25,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                {current.headline}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                }}
              >
                {current.desc}
              </p>

              {/* Key Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '16px',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {current.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        color: 'var(--brand-primary)',
                      }}
                    >
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Key Feature Bullet Points */}
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '18px',
                }}
              >
                Khả năng nổi bật cho {current.role}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {current.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14.5px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.55,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      color="var(--brand-primary)"
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
