import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  FileCheck,
  Shield,
  Wifi,
  Battery,
  Send,
} from 'lucide-react';

export const AndroidAppSection: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'today' | 'grades' | 'chat'>('today');

  return (
    <section
      id="ung-dung-di-dong"
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
            <span>Ứng dụng Di động · Native Kotlin & Jetpack Compose</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Sổ liên lạc điện tử bỏ túi:{' '}
            <span className="kiyo-display-serif">Gắn kết gia đình và nhà trường.</span>
          </h2>
          <p className="kiyo-subtitle">
            Dự án <code>android-quan-ly-hoc-sinh</code> được phát triển hoàn toàn bằng ngôn ngữ Native Kotlin với giao diện hiện đại Jetpack Compose Material 3. Mang đến trải nghiệm mượt mà 120Hz, bảo mật vân tay và thông báo đẩy chuyên cần tức thời.
          </p>
        </div>

        {/* 2 Columns: Left specs, Right interactive Phone mockup */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Tech Specs & Highlights */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--brand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Bell size={18} color="var(--brand-primary)" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                    Thông báo chuyên cần tức thời (Firebase FCM)
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Ngay khi giáo viên chủ nhiệm hoàn tất điểm danh lúc 07:15 sáng, phụ huynh nhận được thông báo rung trên điện thoại: <em>"Nguyễn Hoàng Long đã có mặt tại lớp 10A1 an toàn."</em>
                </p>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--brand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileCheck size={18} color="var(--brand-primary)" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                    Gửi đơn xin nghỉ phép số hóa 1-click
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thay thế đơn viết tay dễ thất lạc. Phụ huynh chọn ngày nghỉ, đính kèm giấy khám bác sĩ và gửi trực tiếp tới giáo viên chủ nhiệm để duyệt trên hệ thống chỉ với một chạm.
                </p>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--brand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Shield size={18} color="var(--brand-primary)" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                    Native Android Architecture
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Kiến trúc MVVM Clean Architecture, Kotlin Coroutines, Retrofit 2 với cơ chế Cache Offline Room Database. Vận hành ổn định ngay cả khi phụ huynh đang ở khu vực sóng mạng yếu.
                </p>
              </div>
            </div>

            {/* Screen Selector Buttons */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Chọn màn hình mô phỏng bên phải:
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { id: 'today', label: '1. Hôm nay & Điểm danh' },
                  { id: 'grades', label: '2. Sổ điểm điện tử' },
                  { id: 'chat', label: '3. Nhắn tin cô chủ nhiệm' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(tab.id as any)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: activeScreen === tab.id ? 'var(--brand-primary)' : '#FFFFFF',
                      color: activeScreen === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity Phone Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '320px',
                height: '640px',
                backgroundColor: '#0F1A15',
                borderRadius: '44px',
                padding: '12px',
                boxShadow: '0 25px 60px -15px rgba(20, 40, 32, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                position: 'relative',
              }}
            >
              {/* Dynamic Island / Camera Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90px',
                  height: '20px',
                  backgroundColor: '#000000',
                  borderRadius: '12px',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1A2F24' }} />
              </div>

              {/* Phone Screen Canvas */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#F8F9F6',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Mobile Status Bar */}
                <div
                  style={{
                    padding: '8px 20px 4px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#172B23',
                  }}
                >
                  <span>07:30</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Wifi size={12} />
                    <Battery size={13} />
                  </div>
                </div>

                {/* Mobile App Header */}
                <div
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid #EAEFEA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10px', color: '#798E82', fontWeight: 600 }}>SỔ LIÊN LẠC ĐIỆN TỬ</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#172B23' }}>
                      Nguyễn Hoàng Long
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand-primary)',
                      padding: '3px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    Lớp 10A1
                  </span>
                </div>

                {/* Mobile Screen Content */}
                <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                  {activeScreen === 'today' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Attendance Card */}
                      <div
                        style={{
                          backgroundColor: '#E8F5EE',
                          borderRadius: '14px',
                          padding: '14px',
                          border: '1px solid #C5E5D1',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <CheckCircle2 size={16} color="#166534" />
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>
                            ĐIỂM DANH HÔM NAY
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#172B23' }}>
                          Có mặt đúng giờ lúc 07:12
                        </div>
                        <div style={{ fontSize: '11px', color: '#52665B', marginTop: '2px' }}>
                          Giáo viên chủ nhiệm: Cô Lê Thị Mai đã xác nhận.
                        </div>
                      </div>

                      {/* Timetable widget */}
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '14px',
                          padding: '14px',
                          border: '1px solid #EAEFEA',
                        }}
                      >
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#798E82', marginBottom: '8px' }}>
                          THỜI KHÓA BIỂU BUỔI SÁNG
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tiết 1-2: Toán học</span>
                            <strong style={{ color: 'var(--brand-primary)' }}>Phòng 302</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tiết 3: Tiếng Anh</span>
                            <strong style={{ color: 'var(--brand-primary)' }}>Phòng 302</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tiết 4-5: Vật lý</span>
                            <strong style={{ color: 'var(--brand-primary)' }}>Lab Lý</strong>
                          </div>
                        </div>
                      </div>

                      {/* Meal Menu */}
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '14px',
                          padding: '14px',
                          border: '1px solid #EAEFEA',
                        }}
                      >
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#798E82', marginBottom: '6px' }}>
                          THỰC ĐƠN BÁN TRÚ TRƯA
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#172B23' }}>
                          Sườn xào chua ngọt · Canh cua rau đay · Tráng miệng thanh long
                        </div>
                      </div>
                    </div>
                  )}

                  {activeScreen === 'grades' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '14px',
                          padding: '14px',
                          border: '1px solid #EAEFEA',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: '#798E82', fontWeight: 600 }}>ĐTB TÍCH LŨY HIỆN TẠI</div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                          9.0
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>
                          XẾP LOẠI: XUẤT SẮC
                        </div>
                      </div>

                      {[
                        { sub: 'Toán học', score: '9.5', note: 'Bài giữa kỳ đạt điểm tối đa' },
                        { sub: 'Ngữ văn', score: '8.5', note: 'Bài văn lập luận chặt chẽ' },
                        { sub: 'Tiếng Anh', score: '9.0', note: 'Phát âm chuẩn, từ vựng phong phú' },
                        { sub: 'Vật lý', score: '8.8', note: 'Thực hành thí nghiệm tốt' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            border: '1px solid #EAEFEA',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.sub}</div>
                            <div style={{ fontSize: '11px', color: '#798E82' }}>{item.note}</div>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                            {item.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeScreen === 'chat' && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div
                          style={{
                            alignSelf: 'flex-start',
                            backgroundColor: '#FFFFFF',
                            padding: '10px 12px',
                            borderRadius: '12px 12px 12px 2px',
                            fontSize: '12px',
                            maxWidth: '85%',
                            border: '1px solid #EAEFEA',
                          }}
                        >
                          Chào anh Hùng, tuần này em Long làm bài kiểm tra Toán rất xuất sắc và hỗ trợ các bạn trong nhóm nhiệt tình ạ!
                        </div>
                        <div
                          style={{
                            alignSelf: 'flex-end',
                            backgroundColor: 'var(--brand-primary)',
                            color: '#FFFFFF',
                            padding: '10px 12px',
                            borderRadius: '12px 12px 2px 12px',
                            fontSize: '12px',
                            maxWidth: '85%',
                          }}
                        >
                          Dạ cảm ơn cô Mai nhiều ạ. Gia đình rất mừng khi thấy cháu tiến bộ và chăm ngoan!
                        </div>
                      </div>

                      {/* Mini input bar */}
                      <div
                        style={{
                          marginTop: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#FFFFFF',
                          padding: '6px 10px',
                          borderRadius: '20px',
                          border: '1px solid #EAEFEA',
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Gửi tin nhắn..."
                          readOnly
                          style={{ border: 'none', outline: 'none', fontSize: '11px', flex: 1, background: 'transparent' }}
                        />
                        <Send size={14} color="var(--brand-primary)" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Bottom Navigation */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid #EAEFEA',
                    padding: '8px 20px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  <span
                    onClick={() => setActiveScreen('today')}
                    style={{ color: activeScreen === 'today' ? 'var(--brand-primary)' : '#798E82', cursor: 'pointer' }}
                  >
                    Hôm nay
                  </span>
                  <span
                    onClick={() => setActiveScreen('grades')}
                    style={{ color: activeScreen === 'grades' ? 'var(--brand-primary)' : '#798E82', cursor: 'pointer' }}
                  >
                    Bảng điểm
                  </span>
                  <span
                    onClick={() => setActiveScreen('chat')}
                    style={{ color: activeScreen === 'chat' ? 'var(--brand-primary)' : '#798E82', cursor: 'pointer' }}
                  >
                    Tin nhắn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
