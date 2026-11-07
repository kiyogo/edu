import React, { useState } from 'react';
import {
  Calculator,
  Award,
  CheckCircle2,
  BarChart2,
  Sliders,
  RotateCcw,
} from 'lucide-react';

export const GradebookSection: React.FC = () => {
  // Live Simulator State
  const [tx1, setTx1] = useState<number>(8.5);
  const [tx2, setTx2] = useState<number>(9.0);
  const [tx3, setTx3] = useState<number>(8.0);
  const [tx4, setTx4] = useState<number>(8.5);
  const [gk, setGk] = useState<number>(8.5);
  const [ck, setCk] = useState<number>(9.0);

  // Compute according to Circular 22/2021/TT-BGDĐT
  // DTBmhk = (tx1 + tx2 + tx3 + tx4 + 2*gk + 3*ck) / (4 + 2 + 3) = Sum / 9
  const sumTx = tx1 + tx2 + tx3 + tx4;
  const weightedSum = sumTx + 2 * gk + 3 * ck;
  const totalCoeff = 4 + 2 + 3; // 4 tx + 2 gk + 3 ck = 9
  const avgScore = Math.round((weightedSum / totalCoeff) * 10) / 10;

  const getRank = (score: number) => {
    if (score >= 8.0) return { title: 'Mức Tốt', badge: 'Tốt (Giỏi)', color: 'var(--brand-primary)', bg: 'var(--brand-light)' };
    if (score >= 6.5) return { title: 'Mức Khá', badge: 'Khá', color: '#B45309', bg: '#FEF3C7' };
    if (score >= 5.0) return { title: 'Mức Đạt', badge: 'Đạt', color: '#2563EB', bg: '#EFF6FF' };
    return { title: 'Mức Chưa Đạt', badge: 'Cần hỗ trợ', color: '#DC2626', bg: '#FEE2E2' };
  };

  const currentRank = getRank(avgScore);

  const resetScores = () => {
    setTx1(8.5);
    setTx2(9.0);
    setTx3(8.0);
    setTx4(8.5);
    setGk(8.5);
    setCk(9.0);
  };

  return (
    <section
      id="so-diem-dien-tu"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="kiyo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Chuẩn hóa nghiệp vụ sư phạm</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Sổ điểm điện tử Thông tư 22:{' '}
            <span className="kiyo-display-serif">Chuẩn mực, minh bạch và tự động hóa.</span>
          </h2>
          <p className="kiyo-subtitle">
            KiyoEdu hiện thực hóa 100% quy chế đánh giá học sinh THCS và THPT theo Thông tư 22/2021/TT-BGDĐT. Từ cơ chế kiểm soát hệ số điểm thường xuyên, giữa kỳ, cuối kỳ đến tự động tính điểm trung bình và phân tích phổ điểm khoa học.
          </p>
        </div>

        {/* 3 Core Pillars of Gradebook */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              <Calculator size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Công thức ĐTBmhk tự động
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Áp dụng công thức chính xác: <code>(Tổng ĐĐGtx + 2×ĐĐGgk + 3×ĐĐGck) ÷ Tổng hệ số</code>. Hệ thống tự động làm tròn đến 01 chữ số thập phân, loại bỏ hoàn toàn rủi ro sai sót của bảng tính thủ công.
            </p>
          </div>

          <div
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              <Award size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Xếp loại 4 mức & Khen thưởng
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Phân loại kết quả học tập theo 4 mức: <strong>Tốt, Khá, Đạt, Chưa đạt</strong> kết hợp đánh giá rèn luyện để xét danh hiệu <strong>Học sinh Xuất sắc</strong> và <strong>Học sinh Giỏi</strong> theo đúng tiêu chí Bộ GD&ĐT.
            </p>
          </div>

          <div
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              <BarChart2 size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Phổ điểm & Cảnh báo học lực
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Trực quan hóa phân phối điểm số của từng lớp theo dạng hình chuông (Gaussian curve). Tự động gắn cờ cảnh báo đối với học sinh có nguy cơ rớt xuống mức Chưa đạt để giáo viên kịp thời phụ đạo.
            </p>
          </div>
        </div>

        {/* Interactive Grade Simulator */}
        <div
          style={{
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '18px 28px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={20} color="var(--brand-primary)" />
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Bộ mô phỏng tính điểm trực tiếp theo Thông tư 22 (Môn Toán 10)
              </span>
            </div>
            <button
              onClick={resetScores}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-main)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Khôi phục mặc định</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            {/* Input Sliders */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                1. Điểm đánh giá thường xuyên (ĐĐGtx — Hệ số 1)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Miệng / Khởi động (TX1)', val: tx1, set: setTx1 },
                  { label: '15 phút Đợt 1 (TX2)', val: tx2, set: setTx2 },
                  { label: 'Thực hành / Nhóm (TX3)', val: tx3, set: setTx3 },
                  { label: '15 phút Đợt 2 (TX4)', val: tx4, set: setTx4 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--brand-primary)',
                        }}
                      >
                        {item.val.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={item.val}
                      onChange={(e) => item.set(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '18px',
                }}
              >
                2. Điểm đánh giá định kỳ (ĐĐGgk & ĐĐGck)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      Giữa kỳ (ĐĐGgk · Hệ số 2)
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--brand-primary)',
                      }}
                    >
                      {gk.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={gk}
                    onChange={(e) => setGk(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      Cuối kỳ (ĐĐGck · Hệ số 3)
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--brand-primary)',
                      }}
                    >
                      {ck.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={ck}
                    onChange={(e) => setCk(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Result Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Kết quả tính toán thời gian thực
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '56px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--brand-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {avgScore.toFixed(1)}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    / 10.0 (ĐTB môn HK)
                  </span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: currentRank.bg,
                    color: currentRank.color,
                    fontWeight: 700,
                    fontSize: '14px',
                    marginBottom: '24px',
                  }}
                >
                  <Award size={18} />
                  <span>Xếp loại: {currentRank.title}</span>
                </div>

                {/* Calculation Detail Breakdown */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Chi tiết công thức Thông tư 22:
                  </div>
                  <div>
                    Tổng điểm có trọng số: <strong>{weightedSum.toFixed(1)}</strong>
                  </div>
                  <div>
                    Tổng hệ số chia: <strong>{totalCoeff}</strong> (4 ĐĐGtx + 2 ĐĐGgk + 3 ĐĐGck)
                  </div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    ({sumTx.toFixed(1)} + 2×{gk.toFixed(1)} + 3×{ck.toFixed(1)}) ÷ 9 ={' '}
                    <strong>{avgScore.toFixed(1)}</strong>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '20px',
                }}
              >
                <CheckCircle2 size={16} color="var(--brand-primary)" />
                <span>
                  Đã đồng bộ công thức đối soát vào module <code>web-quan-ly-hoc-sinh</code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
