import React from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  GitBranch,
  Code,
  Server,
  Smartphone,
  Globe,
  Cpu,
} from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const projects = [
    {
      id: 'web-quan-ly-hoc-sinh',
      name: 'web-quan-ly-hoc-sinh',
      title: 'Cổng Quản lý Học sinh & Sổ điểm',
      type: 'Web Application',
      icon: <Globe size={20} color="var(--brand-primary)" />,
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
      role: 'Quản trị trường học, phân lớp, nhập điểm, sổ chủ nhiệm, điểm danh và xuất báo cáo chuẩn Bộ GD&ĐT.',
      status: 'Hoàn thiện (Production Ready)',
      statusType: 'success',
      progress: '100%',
    },
    {
      id: 'api-quan-ly-hoc-sinh',
      name: 'api-quan-ly-hoc-sinh',
      title: 'Hệ thống Máy chủ API Trung tâm',
      type: 'Backend RESTful API',
      icon: <Server size={20} color="var(--brand-primary)" />,
      stack: ['Node.js', 'Express', 'MySQL', 'JWT Auth'],
      role: 'Xác thực phân quyền RBAC đa cấp, lưu vết kiểm toán sửa điểm, đối soát công thức Thông tư 22.',
      status: 'Hoàn thiện (Production Ready)',
      statusType: 'success',
      progress: '100%',
    },
    {
      id: 'android-quan-ly-hoc-sinh',
      name: 'android-quan-ly-hoc-sinh',
      title: 'Ứng dụng Sổ liên lạc Di động',
      type: 'Mobile Native App',
      icon: <Smartphone size={20} color="var(--brand-primary)" />,
      stack: ['Native Kotlin', 'Jetpack Compose', 'Retrofit 2', 'Room DB'],
      role: 'Sổ liên lạc phụ huynh bỏ túi, thông báo điểm danh tức thời, tra cứu điểm thi và gửi đơn xin phép.',
      status: 'Thử nghiệm & Đóng gói (Beta)',
      statusType: 'beta',
      progress: '92%',
    },
    {
      id: 'web-hoc-tap',
      name: 'web-hoc-tap',
      title: 'Nền tảng Học tập & Đấu trường Quiz',
      type: 'Next.js Fullstack',
      icon: <Code size={20} color="var(--brand-primary)" />,
      stack: ['Next.js', 'NestJS', 'Prisma', 'Socket.io', 'PostgreSQL'],
      role: 'Ngân hàng câu hỏi ma trận 4 cấp độ GDPT 2018, thi đấu trắc nghiệm realtime theo phòng PIN, bài tập số.',
      status: 'Đang phát triển tích cực',
      statusType: 'dev',
      progress: '65%',
    },
    {
      id: 'kiyo-ai-core',
      name: 'kiyo-ai-core',
      title: 'Bộ máy Trí tuệ Nhân tạo Socratic',
      type: 'AI / R&D Service',
      icon: <Cpu size={20} color="var(--brand-primary)" />,
      stack: ['Python', 'FastAPI', 'RAG Framework', 'LLM Pipeline'],
      role: 'Trợ lý học sinh gợi mở Socratic, hỗ trợ giáo viên thiết kế kế hoạch bài dạy chuẩn CV 5512.',
      status: 'Nghiên cứu & Thử nghiệm',
      statusType: 'rnd',
      progress: '35%',
    },
  ];

  return (
    <section
      id="he-sinh-thai"
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
            <span>Minh bạch Hệ sinh thái & Tiến độ</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Toàn cảnh 5 dự án thành phần:{' '}
            <span className="kiyo-display-serif">Rõ ràng, trung thực và nhất quán.</span>
          </h2>
          <p className="kiyo-subtitle">
            Chúng tôi cam kết cung cấp thông tin trung thực tuyệt đối về tiến độ phát triển của từng phân hệ trong giải pháp KiyoEdu. Không phóng đại tính năng chưa hoàn thiện và liên tục cập nhật theo lộ trình công khai.
          </p>
        </div>

        {/* Ecosystem Table / Cards */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {/* Table Header Bar */}
          <div
            style={{
              padding: '16px 28px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={18} color="var(--brand-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Bảng theo dõi trạng thái phân hệ phần mềm KiyoEdu
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              Phiên bản hệ sinh thái: v2.6.4 · Cập nhật Q4/2026
            </div>
          </div>

          {/* List of projects */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {projects.map((proj, idx) => {
              const isLast = idx === projects.length - 1;
              let badgeBg = 'var(--status-dev-bg)';
              let badgeColor = 'var(--status-dev-text)';
              let badgeIcon = <Clock size={13} />;

              if (proj.statusType === 'success') {
                badgeBg = 'var(--status-success-bg)';
                badgeColor = 'var(--status-success-text)';
                badgeIcon = <CheckCircle2 size={13} />;
              } else if (proj.statusType === 'beta') {
                badgeBg = '#E0F2FE';
                badgeColor = '#0369A1';
                badgeIcon = <Sparkles size={13} />;
              } else if (proj.statusType === 'rnd') {
                badgeBg = '#F3E8FF';
                badgeColor = '#7E22CE';
                badgeIcon = <GitBranch size={13} />;
              }

              return (
                <div
                  key={proj.id}
                  style={{
                    padding: 'clamp(20px, 3vw, 28px)',
                    borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(240px, 1.2fr) minmax(260px, 1.8fr) minmax(180px, 1fr)',
                    gap: '24px',
                    alignItems: 'center',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  {/* Col 1: Identity & Name */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--brand-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {proj.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {proj.title}
                        </h3>
                        <div
                          style={{
                            fontSize: '12px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {proj.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Role & Tech Stack */}
                  <div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
                      {proj.role}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.stack.map((stk, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Status & Progress */}
                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        marginBottom: '8px',
                      }}
                    >
                      {badgeIcon}
                      <span>{proj.status}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          flex: 1,
                          height: '6px',
                          backgroundColor: 'var(--bg-surface)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: proj.progress,
                            height: '100%',
                            backgroundColor:
                              proj.statusType === 'success'
                                ? 'var(--brand-primary)'
                                : proj.statusType === 'beta'
                                ? '#0284C7'
                                : '#D97706',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {proj.progress}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
