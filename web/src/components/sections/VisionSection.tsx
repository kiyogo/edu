import React from 'react';
import { Compass, Sparkles, Layers, Lightbulb, Target } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles size={24} color="var(--brand-primary)" />,
      tag: '01 / TRIẾT LÝ',
      title: 'Lấy người học làm trung tâm',
      desc: 'Giáo dục hiện đại không còn là sự áp đặt một chiều. KiyoEdu xây dựng không gian nơi từng học sinh được công nhận năng lực riêng biệt, tôn trọng nhịp độ phát triển và khuyến khích niềm đam mê tự khám phá tri thức.',
    },
    {
      icon: <Layers size={24} color="var(--brand-primary)" />,
      tag: '02 / CHUẨN MỰC',
      title: 'Bám sát Chương trình GDPT 2018',
      desc: 'Chuyển trọng tâm từ truyền thụ kiến thức rời rạc sang phát triển toàn diện 5 phẩm chất chủ yếu và 10 năng lực cốt lõi. Sổ điểm, ngân hàng đề thi và quy trình đánh giá đều được lập trình tuân thủ Thông tư 22 và Thông tư 27 của Bộ GD&ĐT.',
    },
    {
      icon: <Compass size={24} color="var(--brand-primary)" />,
      tag: '03 / CÔNG NGHỆ',
      title: 'Liền mạch & Không gián đoạn',
      desc: 'Xóa bỏ hoàn toàn tình trạng tam sao thất bản giữa giấy tờ và các ứng dụng rời rạc. Một luồng dữ liệu chuẩn hóa duy nhất chảy thông suốt từ văn phòng Ban Giám Hiệu đến bàn giáo viên, ứng dụng phụ huynh và học sinh.',
    },
    {
      icon: <Target size={24} color="var(--brand-primary)" />,
      tag: '04 / TƯƠNG LAI',
      title: 'Tự chủ & Khai phóng số',
      desc: 'Trang bị cho học sinh năng lực công nghệ và thói quen tự học suốt đời thông qua nền tảng làm bài trực tuyến, đấu trường tri thức tương tác và định hướng trợ lý trí tuệ nhân tạo nhân văn.',
    },
  ];

  return (
    <section
      id="tam-nhin"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="kiyo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: 'clamp(40px, 6vh, 64px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Tầm nhìn & Sứ mệnh</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Giáo dục không phải là đổ đầy một chiếc bình,{' '}
            <span className="kiyo-display-serif">mà là thắp lên một ngọn lửa.</span>
          </h2>
          <p className="kiyo-subtitle">
            Trong kỷ nguyên số, một phần mềm giáo dục đúng nghĩa không đơn thuần ghi chép điểm số. KiyoEdu được sinh ra nhằm giải phóng thầy cô khỏi áp lực sổ sách hành chính, kết nối sợi dây đồng hành giữa gia đình và nhà trường, và trao quyền tự chủ học tập cho thế hệ trẻ Việt Nam.
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
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 28px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--brand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {pillar.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Quote Box */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 4vw, 40px)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lightbulb size={20} color="var(--brand-primary)" />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
              }}
            >
              Cam kết định hướng tương lai
            </span>
          </div>
          <p
            style={{
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >
            "Chúng tôi không xem KiyoEdu là một phần mềm quản trị khô cứng. KiyoEdu là hạ tầng số phục vụ con người — nơi thầy cô có thêm thời gian cho bài giảng cảm xúc, phụ huynh nhìn thấy nỗ lực từng ngày của con, và học sinh tìm thấy niềm cảm hứng học tập tự thân."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Đội ngũ Nghiên cứu & Phát triển KiyoEdu
            </span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Hà Nội & TP. Hồ Chí Minh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
