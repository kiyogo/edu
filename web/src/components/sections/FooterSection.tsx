import React, { useState } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Heart,
} from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#12251D',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pre-footer Call to Action */}
      <div
        style={{
          paddingTop: 'clamp(80px, 10vh, 120px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="kiyo-container" style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(59, 128, 96, 0.3)',
              color: '#70BA93',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '24px',
              border: '1px solid rgba(59, 128, 96, 0.5)',
            }}
          >
            <Sparkles size={14} />
            <span>Đồng hành cùng Chuyển đổi số Giáo dục</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '820px',
              margin: '0 auto 24px auto',
              color: '#FFFFFF',
            }}
          >
            Sẵn sàng kiến tạo một môi trường giáo dục{' '}
            <span style={{ fontStyle: 'italic', color: '#70BA93', fontWeight: 400, fontFamily: 'var(--font-serif)' }}>
              hạnh phúc và minh bạch?
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: '#A5BCB0',
              maxWidth: '640px',
              margin: '0 auto 40px auto',
              lineHeight: 1.65,
            }}
          >
            Đăng ký trải nghiệm giải pháp KiyoEdu cho trường học hoặc tổ chức giáo dục của bạn ngay hôm nay. Đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ đào tạo và chuẩn hóa dữ liệu tận nơi.
          </p>

          {/* Form or CTA buttons */}
          {!isSubscribed ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                maxWidth: '520px',
                margin: '0 auto 32px auto',
              }}
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Nhập email trường học hoặc cá nhân..."
                style={{
                  flex: '1 1 280px',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1C4837')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
              >
                <span>Đăng ký tư vấn</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                color: '#4ADE80',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                marginBottom: '32px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={18} />
              <span>Cảm ơn bạn! Chuyên viên tư vấn KiyoEdu sẽ liên hệ qua email trong vòng 24 giờ.</span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
              fontSize: '13px',
              color: '#8BA496',
            }}
          >
            <span>✓ Dùng thử nghiệm miễn phí 60 ngày</span>
            <span>✓ Cam kết tương thích CSDL ngành GD&ĐT</span>
            <span>✓ Hỗ trợ kỹ thuật 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div
        style={{
          paddingTop: '60px',
          paddingBottom: '48px',
        }}
      >
        <div className="kiyo-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              marginBottom: '60px',
            }}
          >
            {/* Col 1: Brandmark */}
            <div style={{ maxWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#FFFFFF',
                  }}
                >
                  K
                </div>
                <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
                  Kiyo<span style={{ color: '#70BA93' }}>Edu</span>
                </span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#97AFA2', lineHeight: 1.6, marginBottom: '20px' }}>
                Hệ sinh thái công nghệ giáo dục hiện đại cho trường học Việt Nam. Kết nối nhà trường, giáo viên, học sinh và gia đình.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://github.com/sonnguyen-k/edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Giải pháp */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#70BA93',
                  marginBottom: '16px',
                }}
              >
                Giải pháp & Mô đun
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#A5BCB0' }}>
                <li><a href="#quan-ly-hoc-sinh" style={{ transition: 'color 0.2s' }}>Quản lý học sinh 360°</a></li>
                <li><a href="#so-diem-dien-tu" style={{ transition: 'color 0.2s' }}>Sổ điểm Thông tư 22</a></li>
                <li><a href="#web-hoc-tap" style={{ transition: 'color 0.2s' }}>Đấu trường Realtime Quiz</a></li>
                <li><a href="#ung-dung-di-dong" style={{ transition: 'color 0.2s' }}>Sổ liên lạc di động Android</a></li>
                <li><a href="#kiyo-ai" style={{ transition: 'color 0.2s' }}>Kiyo AI Socratic Companion</a></li>
              </ul>
            </div>

            {/* Col 3: Tài nguyên */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#70BA93',
                  marginBottom: '16px',
                }}
              >
                Tài liệu & Chuẩn mực
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#A5BCB0' }}>
                <li><span>Thông tư 22/2021/TT-BGDĐT</span></li>
                <li><span>Khung chương trình GDPT 2018</span></li>
                <li><span>Quy chuẩn CSDL ngành EMIS</span></li>
                <li><span>Nghị định 13 về Dữ liệu cá nhân</span></li>
                <li><a href="#he-sinh-thai" style={{ transition: 'color 0.2s' }}>Trạng thái mã nguồn 5 repo</a></li>
              </ul>
            </div>

            {/* Col 4: Liên hệ */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#70BA93',
                  marginBottom: '16px',
                }}
              >
                Văn phòng & Hỗ trợ
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#A5BCB0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={16} color="#70BA93" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Khu Công nghệ cao Hòa Lạc, TP. Hà Nội & TP. Hồ Chí Minh</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} color="#70BA93" style={{ flexShrink: 0 }} />
                  <span>contact@kiyoedu.vn</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} color="#70BA93" style={{ flexShrink: 0 }} />
                  <span>Hotline: 1900 8866 (Nhánh 2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div
            style={{
              paddingTop: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              fontSize: '12px',
              color: '#789384',
            }}
          >
            <div>
              © 2026 KiyoEdu. Bản quyền thuộc về Dự án Phát triển Hệ sinh thái Công nghệ Giáo dục KiyoEdu Việt Nam.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Xây dựng với tâm huyết vì nền giáo dục Việt Nam</span>
              <Heart size={14} color="#EF4444" fill="#EF4444" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
