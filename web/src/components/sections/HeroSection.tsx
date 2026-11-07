import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'analytics'>('students');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleStudents = [
    { id: 'HS001', name: 'Nguyễn Hoàng Long', gender: 'Nam', dob: '14/08/2008', math: 9.2, phy: 8.8, chem: 9.0, gpa: 9.0, rank: 'Xuất sắc', att: '100%' },
    { id: 'HS002', name: 'Trần Thị Mai Anh', gender: 'Nữ', dob: '22/03/2008', math: 8.5, phy: 9.0, chem: 8.6, gpa: 8.7, rank: 'Giỏi', att: '98%' },
    { id: 'HS003', name: 'Lê Quốc Bảo', gender: 'Nam', dob: '05/11/2008', math: 8.0, phy: 7.8, chem: 8.2, gpa: 8.0, rank: 'Khá', att: '96%' },
    { id: 'HS004', name: 'Vũ Thảo Nguyên', gender: 'Nữ', dob: '19/09/2008', math: 8.8, phy: 8.5, chem: 8.9, gpa: 8.7, rank: 'Giỏi', att: '100%' },
    { id: 'HS005', name: 'Phạm Minh Đức', gender: 'Nam', dob: '02/01/2008', math: 9.5, phy: 9.4, chem: 9.6, gpa: 9.5, rank: 'Xuất sắc', att: '100%' },
  ];

  const filteredStudents = sampleStudents.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      style={{
        paddingTop: 'clamp(110px, 14vh, 150px)',
        paddingBottom: 'clamp(60px, 9vh, 100px)',
        position: 'relative',
        background: 'linear-gradient(180deg, #F8F9F6 0%, #FFFFFF 100%)',
      }}
    >
      <div className="kiyo-container">
        {/* Top Kicker */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="kiyo-kicker">
            <span className="kiyo-kicker-dot" />
            <span>KiyoEdu · Nền tảng Giáo dục Số Hiện đại</span>
          </div>
        </div>

        {/* Hero Editorial Heading */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 24px auto' }}>
          <h1 className="kiyo-display-title">
            Một tương lai tốt hơn{' '}
            <span className="kiyo-display-serif">cho giáo dục.</span>
          </h1>
        </div>

        {/* Hero Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
          <p className="kiyo-subtitle" style={{ margin: '0 auto' }}>
            KiyoEdu kết nối nhà trường, giáo viên, học sinh và phụ huynh trên một hệ sinh thái đồng bộ. Minh bạch dữ liệu học đường, tinh gọn nghiệp vụ và thấu hiểu từng hành trình học tập.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '54px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#platform"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--brand-primary)',
              color: 'var(--text-inverse)',
              padding: '14px 28px',
              borderRadius: 'var(--radius-full)',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(36, 91, 69, 0.28)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
          >
            <span>Khám phá Nền tảng</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="#ecosystem"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              padding: '14px 26px',
              borderRadius: 'var(--radius-full)',
              fontSize: '15px',
              fontWeight: 600,
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-primary)';
              e.currentTarget.style.color = 'var(--brand-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <span>Xem Hệ sinh thái Sản phẩm</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(20px, 4vw, 48px)',
            marginBottom: '48px',
            flexWrap: 'wrap',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="var(--brand-primary)" />
            <span>Chuẩn bảo mật dữ liệu học đường</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color="var(--brand-primary)" />
            <span>Phân quyền 4 đối tượng chuẩn mực</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="var(--brand-primary)" />
            <span>Bám sát CT GDPT 2018</span>
          </div>
        </div>

        {/* REAL INTERACTIVE PRODUCT WORKSTATION SHOWCASE (No 3D, No stock photos, Pure High-End Product UI) */}
        <div
          id="demo"
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-card-hover)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
        >
          {/* Mockup Window Titlebar */}
          <div
            style={{
              padding: '12px 18px',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Window control dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
            </div>

            {/* Address Bar */}
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                background: 'var(--bg-card)',
                padding: '4px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: 'var(--brand-primary)' }}>🔒</span>
              <span>app.kiyoedu.vn/quan-ly-hoc-sinh/lop-12a1</span>
            </div>

            <div style={{ width: '40px' }} />
          </div>

          {/* Workstation Inner Content */}
          <div style={{ padding: '24px clamp(16px, 3vw, 32px)' }}>
            {/* Sub-header inside app */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Lớp 12A1 · Ban Tự Nhiên
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  GVCN: ThS. Nguyễn Hoàng Long · Năm học 2025–2026
                </p>
              </div>

              {/* Interactive View Switcher Tabs */}
              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg-surface)',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)',
                  gap: '4px',
                }}
              >
                <button
                  onClick={() => setActiveTab('students')}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    background: activeTab === 'students' ? 'var(--bg-card)' : 'transparent',
                    color: activeTab === 'students' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'students' ? 'var(--shadow-subtle)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Danh sách học sinh (38)
                </button>
                <button
                  onClick={() => setActiveTab('grades')}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    background: activeTab === 'grades' ? 'var(--bg-card)' : 'transparent',
                    color: activeTab === 'grades' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'grades' ? 'var(--shadow-subtle)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Sổ điểm điện tử
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    background: activeTab === 'analytics' ? 'var(--bg-card)' : 'transparent',
                    color: activeTab === 'analytics' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'analytics' ? 'var(--shadow-subtle)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Phân tích học lực
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 18px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Sĩ số hiện diện</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--brand-primary)', marginTop: '2px' }}>38 / 38</div>
                <div style={{ fontSize: '11px', color: 'var(--status-success-text)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <CheckCircle2 size={12} /> Chuyên cần 100% hôm nay
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 18px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Điểm TB Học kỳ I</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>8.65</div>
                <div style={{ fontSize: '11px', color: 'var(--status-success-text)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <TrendingUp size={12} /> Tăng +0.35 so với giữa kỳ
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 18px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Xếp loại Giỏi & Xuất sắc</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--brand-primary)', marginTop: '2px' }}>28 HS</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Chiếm 73.6% toàn lớp</div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 18px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Đồng bộ App Android</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--status-success-text)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Thời gian thực
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Phụ huynh nhận tin tức thời</div>
              </div>
            </div>

            {/* Tab 1: Live Interactive Table */}
            {activeTab === 'students' && (
              <div>
                {/* Search in mockup */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--bg-surface)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                      flex: 1,
                      maxWidth: '320px',
                    }}
                  >
                    <Search size={14} color="var(--text-muted)" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm học sinh trong lớp..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '13px',
                        width: '100%',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-surface)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <Filter size={13} />
                    <span>Học lực: Tất cả</span>
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-surface)', color: 'var(--brand-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Mã HS</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Họ và tên</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Giới tính</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Ngày sinh</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Chuyên cần</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Điểm TB</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700 }}>Xếp loại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((s, idx) => (
                        <tr
                          key={s.id}
                          style={{
                            borderBottom: '1px solid var(--border-subtle)',
                            background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface-subtle)',
                          }}
                        >
                          <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{s.id}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{s.gender}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{s.dob}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--brand-primary)', fontWeight: 600 }}>{s.att}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--brand-primary)' }}>{s.gpa}</td>
                          <td style={{ padding: '10px 14px' }}>
                            <span
                              style={{
                                padding: '3px 8px',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: s.rank === 'Xuất sắc' ? '#E3F4EA' : s.rank === 'Giỏi' ? '#EBF3FE' : '#FFF4E5',
                                color: s.rank === 'Xuất sắc' ? '#196C3D' : s.rank === 'Giỏi' ? '#1E60D5' : '#B25E09',
                              }}
                            >
                              {s.rank}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Gradebook View */}
            {activeTab === 'grades' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-surface)', color: 'var(--brand-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '10px 14px' }}>Họ và tên</th>
                      <th style={{ padding: '10px 14px' }}>Toán</th>
                      <th style={{ padding: '10px 14px' }}>Vật lý</th>
                      <th style={{ padding: '10px 14px' }}>Hóa học</th>
                      <th style={{ padding: '10px 14px' }}>Điểm TB</th>
                      <th style={{ padding: '10px 14px' }}>Trạng thái khóa sổ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleStudents.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--brand-primary)', fontWeight: 600 }}>{s.math}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--brand-primary)', fontWeight: 600 }}>{s.phy}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--brand-primary)', fontWeight: 600 }}>{s.chem}</td>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{s.gpa}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--status-success-text)', fontSize: '12px' }}>
                          ✓ Đã duyệt điểm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Analytics View */}
            {activeTab === 'analytics' && (
              <div style={{ padding: '16px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>Học sinh Xuất sắc (GPA ≥ 9.0)</span>
                      <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>26.3% (10 HS)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '26.3%', height: '100%', background: 'var(--brand-primary)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>Học sinh Giỏi (8.0 ≤ GPA &lt; 9.0)</span>
                      <span style={{ fontWeight: 700, color: 'var(--brand-accent)' }}>47.3% (18 HS)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '47.3%', height: '100%', background: 'var(--brand-accent)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>Học sinh Khá (6.5 ≤ GPA &lt; 8.0)</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>26.4% (10 HS)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '26.4%', height: '100%', background: '#9EB3A7' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
