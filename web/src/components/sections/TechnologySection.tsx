import React from 'react';
import {
  Lock,
  Server,
  KeyRound,
  FileCode2,
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const securityPillars = [
    {
      icon: <Lock size={22} color="var(--brand-primary)" />,
      title: 'Bảo vệ dữ liệu chuẩn Nghị định 13/2023/NĐ-CP',
      desc: 'Thông tin nhân thân, căn cước công dân và học bạ của học sinh được phân loại là dữ liệu cá nhân nhạy cảm, mã hóa đầu cuối với chuẩn AES-256 và truyền tải qua giao thức TLS 1.3.',
    },
    {
      icon: <KeyRound size={22} color="var(--brand-primary)" />,
      title: 'Phân quyền vai trò hạt mịn (RBAC)',
      desc: 'Giáo viên bộ môn chỉ có quyền nhập điểm lớp được phân công giảng dạy. Giáo viên chủ nhiệm quản lý nề nếp và nhận xét sổ liên lạc. Ban giám hiệu giữ quyền duyệt và khóa sổ kỳ thi.',
    },
    {
      icon: <FileCode2 size={22} color="var(--brand-primary)" />,
      title: 'Kiểm toán lưu vết sửa điểm (Audit Logging)',
      desc: 'Mọi thao tác thay đổi điểm số sau khi đã lưu đều được ghi nhận vào nhật ký kiểm toán không thể xóa: danh tính người sửa, IP, thời điểm chính xác, điểm cũ, điểm mới và lý do điều chỉnh.',
    },
    {
      icon: <Server size={22} color="var(--brand-primary)" />,
      title: 'Kiến trúc tải cao & Dự phòng thảm họa',
      desc: 'Sẵn sàng phục vụ hơn 5.000 người dùng truy cập đồng thời vào các đợt cao điểm nộp bài trắc nghiệm và tra cứu điểm thi cuối kỳ với thời gian phản hồi API trung bình dưới 85ms.',
    },
  ];

  return (
    <section
      id="cong-nghe"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="kiyo-container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Hạ tầng Kỹ thuật & An toàn Thông tin</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Bảo mật tối thượng:{' '}
            <span className="kiyo-display-serif">An toàn học đường là ưu tiên hàng đầu.</span>
          </h2>
          <p className="kiyo-subtitle">
            Dữ liệu học đường liên quan trực tiếp đến tương lai và quyền riêng tư của học sinh. KiyoEdu áp dụng các tiêu chuẩn an toàn thông tin khắt khe nhất trong kiến trúc hệ thống để bảo vệ nhà trường trước mọi nguy cơ rò rỉ hay can thiệp trái phép.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {securityPillars.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px 24px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '18px',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture Specs Box */}
        <div
          style={{
            backgroundColor: 'var(--bg-dark)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px, 4vw, 40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#70BA93',
                marginBottom: '12px',
              }}
            >
              Kiến trúc kỹ thuật chuẩn mở
            </div>
            <h3
              style={{
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '16px',
              }}
            >
              Tự chủ hạ tầng, triển khai linh hoạt On-Premise hoặc Cloud
            </h3>
            <p style={{ fontSize: '14px', color: '#B5C7BD', lineHeight: 1.65 }}>
              KiyoEdu sẵn sàng triển khai trên hạ tầng máy chủ riêng của Nhà trường / Sở GD&ĐT hoặc môi trường Đám mây (AWS / Google Cloud / Cloud trong nước) với cấu hình Docker hóa trọn gói.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {[
              { label: 'Độ trễ API trung bình', val: '< 85 ms' },
              { label: 'Mức độ sẵn sàng SLA', val: '99.95%' },
              { label: 'Mã hóa lưu trữ', val: 'AES-256 bit' },
              { label: 'Tương thích di động', val: 'Android 8.0+' },
            ].map((stat, sIdx) => (
              <div
                key={sIdx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#88A395', fontWeight: 600, marginBottom: '6px' }}>
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {stat.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
