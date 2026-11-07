import React, { useState } from 'react';
import {
  Sparkles,
  Gamepad2,
  Bot,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface CinematicStoryOverlayProps {
  progress: number;
  onReset: () => void;
  onScrubTo: (targetProgress: number) => void;
}

export const CinematicStoryOverlay: React.FC<CinematicStoryOverlayProps> = ({
  progress,
  onReset,
  onScrubTo,
}) => {
  // --- Interactive State for Beat 07 (Student Dossier) ---
  const sampleStudents = [
    {
      id: 'HS001',
      code: 'HS-2026-10A1-01',
      name: 'Nguyễn Hoàng Long',
      status: 'Xuất sắc',
      att: '100%',
      conduct: 'Tốt',
      dob: '14/08/2008',
      gpa: '9.2',
      notes: 'Giải Nhì HSG Toán cấp Tỉnh',
    },
    {
      id: 'HS002',
      code: 'HS-2026-10A1-02',
      name: 'Trần Thị Mai Anh',
      status: 'Giỏi',
      att: '98.5%',
      conduct: 'Tốt',
      dob: '22/03/2008',
      gpa: '8.9',
      notes: 'Bí thư Chi đoàn năng nổ',
    },
    {
      id: 'HS003',
      code: 'HS-2026-10A1-03',
      name: 'Lê Quốc Bảo',
      status: 'Khá',
      att: '92.0%',
      conduct: 'Khá',
      dob: '05/11/2008',
      gpa: '8.2',
      notes: 'Cần tăng cường tiết 1 Sinh',
    },
  ];
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(0);

  // --- Interactive State for Beat 10 (Grade Simulator) ---
  const [tx1, setTx1] = useState(8.5);
  const [tx2, setTx2] = useState(9.0);
  const [gk, setGk] = useState(8.5);
  const [ck, setCk] = useState(9.0);
  const calculatedAvg = Math.round(((tx1 + tx2 + 2 * gk + 3 * ck) / 7) * 10) / 10;

  // --- Interactive State for Beat 18 (Realtime Quiz Arena) ---
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(850);
  const quizOptions = [
    { text: 'a = 1, b = -2, c = 3', isCorrect: true },
    { text: 'a = -1, b = 2, c = 3', isCorrect: false },
    { text: 'a = 2, b = -4, c = 3', isCorrect: false },
    { text: 'a = 1, b = 2, c = -3', isCorrect: false },
  ];

  const handleQuizAnswer = (idx: number) => {
    if (quizSubmitted) return;
    setQuizSelected(idx);
    setQuizSubmitted(true);
    if (quizOptions[idx].isCorrect) {
      setQuizScore((prev) => prev + 580);
    }
  };

  // --- Interactive State for Beat 19 (Socratic AI Chat) ---
  const [socraticTopicIdx, setSocraticTopicIdx] = useState(0);
  const socraticScenarios = [
    {
      title: 'Toán 10 · Bất phương trình',
      user: 'Kiyo ơi, làm thế nào để giải bất phương trình x² - 5x + 6 > 0?',
      ai: 'Chào em! Hãy tìm nghiệm tam thức x² - 5x + 6 = 0 trước. Em có thể phân tích thành (x - 2)(x - 3) không?',
      hint: 'Áp dụng quy tắc "Trong trái, ngoài cùng" để lấy khoảng dấu dương.',
    },
    {
      title: 'Vật lý 10 · Định luật Newton',
      user: 'Kiyo ơi, ý nghĩa thực tế của định luật II Newton F = ma là gì?',
      ai: 'Chào em! Khi cùng cần đạt một gia tốc, vật thể có khối lượng càng lớn sẽ đòi hỏi lực tác dụng càng mạnh.',
      hint: 'Đó là lý do xe tải nặng luôn cần quãng đường phanh dài hơn xe con!',
    },
    {
      title: 'Ngữ văn 10 · Cảm thụ thơ',
      user: 'Kiyo gợi ý giúp em hình ảnh "Đầu súng trăng treo" trong Đồng chí.',
      ai: 'Chào em! Đó là biểu tượng tuyệt đẹp kết hợp giữa hiện thực khốc liệt (súng) và tâm hồn lãng mạn hòa bình (trăng).',
      hint: 'Biểu tượng gắn kết người lính với thiên nhiên và lý tưởng cao đẹp.',
    },
  ];

  // Helper function to calculate smooth opacity & translateY
  const getBeatMetrics = (start: number, end: number) => {
    if (progress < start - 0.015 || progress > end + 0.015) {
      return { isVisible: false, opacity: 0, translateY: 24 };
    }
    const span = end - start;
    const localP = (progress - start) / span;
    let opacity = 1;
    if (localP < 0.22) {
      opacity = Math.max(0, localP / 0.22);
    } else if (localP > 0.78) {
      opacity = Math.max(0, (1 - localP) / 0.22);
    }
    const translateY = (1 - opacity) * 20;
    return { isVisible: true, opacity, translateY };
  };

  return (
    <div
      className="cinematic-story-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(20px, 6vw, 90px)',
        zIndex: 20,
      }}
    >
      {/* =========================================================================
          HỒI I: KHỞI NGUỒN TRI THỨC (0.00 -> 0.25)
          ========================================================================= */}

      {/* BEAT 01: THE FIRST LIGHT (0.00 - 0.045) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.0, 0.045);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '680px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '18px' }}>
              <span className="cyber-badge-dot" />
              <span>HỒI I · KHỞI NGUỒN TRI THỨC</span>
            </div>
            <h1
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              HÀNH TRÌNH GIÁO DỤC SỐ.
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                lineHeight: 1.5,
                color: '#2e4a3b',
                fontWeight: 600,
                marginBottom: '22px',
                maxWidth: '540px',
              }}
            >
              Khởi đầu kỷ nguyên giáo dục tương tác bằng công nghệ WebGL 3D thời gian thực.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <span className="cyber-badge">GDPT 2018</span>
              <span className="cyber-badge">THÔNG TƯ 22</span>
              <span className="cyber-badge">100% REALTIME 3D</span>
            </div>
            <div>
              <button
                onClick={() => onScrubTo(0.25)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(5, 150, 105, 0.3)',
                }}
              >
                <span>Khám phá Trung tâm Điều hành</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        );
      })()}

      {/* BEAT 02: THE LIVING BOOK & GDPT 2018 (0.045 - 0.09) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.045, 0.09);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>02 / CHUẨN MỰC BỘ GD&ĐT</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              5 PHẨM CHẤT · 10 NĂNG LỰC
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '18px' }}>
              Chuyển hóa toàn diện tiêu chuẩn GDPT 2018 thành bản đồ số hóa trực quan.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">YÊU NƯỚC</span>
              <span className="cyber-badge">NHÂN ÁI</span>
              <span className="cyber-badge">TRUNG THỰC</span>
              <span className="cyber-badge">TRÁCH NHIỆM</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 03: KNOWLEDGE EXPANDS (0.09 - 0.14) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.09, 0.14);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '580px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>03 / NỀN TẢNG KHOA HỌC</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              GIẢI THUẬT & TOÁN HỌC SỐ
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Chuẩn hóa phân phối dữ liệu điểm số, biểu đồ ma trận tri thức thời gian thực.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">∑ MA TRẬN ĐỀ</span>
              <span className="cyber-badge">∫ TÍCH PHÂN SỐ</span>
              <span className="cyber-badge">σ ĐỘ LỆCH CHUẨN</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 04: MODERN CAMPUS & TRIANGLE (0.14 - 0.19) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.14, 0.19);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>04 / MẠNG LƯỚI KẾT NỐI</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.6vw, 3.2rem)',
                fontWeight: 900,
                color: '#172b23',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              TAM GIÁC GIÁO DỤC 360°
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Nhà trường — Gia đình — Học sinh kết nối tức thời trên cùng một nền tảng.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">NHÀ TRƯỜNG</span>
              <span className="cyber-badge">GIA ĐÌNH</span>
              <span className="cyber-badge">HỌC SINH</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 05: BREAKTHROUGH & PAPERLESS (0.19 - 0.25) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.19, 0.25);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '580px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>05 / ĐỘT PHÁ SỐ HÓA</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              TRIỆT TIÊU 100% SỔ SÁCH GIẤY
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Giải phóng giáo viên khỏi giấy tờ hành chính để tập trung truyền cảm hứng bài giảng.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="cyber-badge">TỰ ĐỘNG HÓA 100%</span>
              <span className="cyber-badge">KHÔNG SAI SÓT</span>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          HỒI II: TRUNG TÂM ĐIỀU HÀNH 3D & QUẢN LÝ (0.25 -> 0.60)
          ========================================================================= */}

      {/* BEAT 06: WORKSTATION 3D & RBAC (0.25 - 0.30) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.25, 0.30);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>HỒI II · TRUNG TÂM ĐIỀU HÀNH</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              WORKSTATION 3D & RBAC
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Phân quyền chặt chẽ 4 cấp độ: Ban Giám Hiệu · Giáo Viên · Phụ Huynh · Học Sinh.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">ROLE: ADMIN</span>
              <span className="cyber-badge">TEACHER</span>
              <span className="cyber-badge">PARENT</span>
              <span className="cyber-badge">STUDENT</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 07: STUDENT DOSSIER 360° INTERACTIVE (0.30 - 0.35) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.30, 0.35);
        if (!isVisible) return null;
        const s = sampleStudents[selectedStudentIdx];
        return (
          <div
            style={{
              position: 'absolute',
              top: '18%',
              right: 'clamp(24px, 6vw, 100px)',
              width: 'min(460px, 92vw)',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="cyber-badge">
                  <span className="cyber-badge-dot" />
                  HỒ SƠ HỌC SINH 360°
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>LIVE DATA</span>
              </div>

              {/* Student switcher buttons */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {sampleStudents.map((st, idx) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStudentIdx(idx)}
                    style={{
                      flex: 1,
                      padding: '7px 8px',
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: selectedStudentIdx === idx ? '1px solid #10b981' : '1px solid rgba(23,43,35,0.1)',
                      backgroundColor: selectedStudentIdx === idx ? '#10b981' : 'rgba(255,255,255,0.7)',
                      color: selectedStudentIdx === idx ? '#ffffff' : '#172b23',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {st.name.split(' ').slice(-1)[0]}
                  </button>
                ))}
              </div>

              {/* Active Student Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#172b23' }}>{s.name}</h3>
                  <div style={{ fontSize: '12px', color: '#52665b' }}>{s.code} · Lớp 10A1</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#059669' }}>{s.gpa}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#059669' }}>ĐIỂM TRUNG BÌNH</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#688073' }}>Chuyên cần:</span> <strong>{s.att}</strong>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#688073' }}>Hạnh kiểm:</span> <strong>{s.conduct}</strong>
                </div>
              </div>
              <div style={{ fontSize: '11.5px', color: '#3d5246', fontStyle: 'italic', background: 'rgba(52,211,153,0.1)', padding: '8px 12px', borderRadius: '8px' }}>
                {s.notes}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 08: ATTENDANCE TRACKING (0.35 - 0.40) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.35, 0.40);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>08 / ĐIỂM DANH THỜI GIAN THỰC</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              ĐIỂM DANH TỪNG TIẾT HỌC
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Tự động phát hiện vắng không phép. Bắn thông báo đẩy tức thời tới app phụ huynh.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">CÓ MẶT 99.2%</span>
              <span className="cyber-badge">CẢNH BÁO TỨC THỜI</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 09: THONG TU 22 GRADEBOOK (0.40 - 0.45) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.40, 0.45);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>09 / SỔ ĐIỂM ĐIỆN TỬ</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              THÔNG TƯ 22/2021/TT-BGDĐT
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Chuẩn hóa công thức: ĐĐGtx (hệ số 1) · ĐĐGgk (hệ số 2) · ĐĐGck (hệ số 3).
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">TỰ ĐỘNG LÀM TRÒN</span>
              <span className="cyber-badge">KHÔNG LỖI CÔNG THỨC</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 10: LIVE GRADE SIMULATOR INTERACTIVE (0.45 - 0.50) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.45, 0.50);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: 'clamp(24px, 6vw, 100px)',
              width: 'min(480px, 92vw)',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="cyber-badge">
                  <span className="cyber-badge-dot" />
                  BỘ MÔ PHỎNG TÍNH ĐIỂM LIVE
                </span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#059669' }}>
                  {calculatedAvg.toFixed(1)} <span style={{ fontSize: '12px' }}>ĐTBmhk</span>
                </span>
              </div>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                {[
                  { label: 'Thường xuyên 1 (HS 1)', val: tx1, set: setTx1 },
                  { label: 'Thường xuyên 2 (HS 1)', val: tx2, set: setTx2 },
                  { label: 'Giữa kỳ (HS 2)', val: gk, set: setGk },
                  { label: 'Cuối kỳ (HS 3)', val: ck, set: setCk },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 700, marginBottom: '2px' }}>
                      <span style={{ color: '#3d5246' }}>{item.label}</span>
                      <span style={{ color: '#059669' }}>{item.val.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={item.val}
                      onChange={(e) => item.set(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#10b981', height: '5px', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: calculatedAvg >= 8.0 ? '#059669' : '#d97706' }}>
                Xếp loại: {calculatedAvg >= 9.0 ? 'Xuất sắc' : calculatedAvg >= 8.0 ? 'Giỏi' : 'Khá'} · Kéo trượt để xem tính toán thời gian thực
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 11: SMART TIMETABLE (0.50 - 0.55) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.50, 0.55);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>11 / THỜI KHÓA BIỂU THÔNG MINH</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              TỰ ĐỘNG XẾP LỊCH HỌC
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Thuật toán ma trận loại bỏ 100% xung đột phòng học và lịch dạy giáo viên.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">XẾP LỊCH 1-CHẠM</span>
              <span className="cyber-badge">TIẾT KIỆM 95% THỜI GIAN</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 12: BGH DASHBOARD & EMIS (0.55 - 0.60) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.55, 0.60);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>12 / BÁO CÁO CƠ SỞ DỮ LIỆU</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              ĐỒNG BỘ CSDL BỘ GD&ĐT
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Xuất dữ liệu chuẩn EMIS Bộ Giáo dục & Đào tạo không cần định dạng thủ công.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">CHUẨN EMIS</span>
              <span className="cyber-badge">SỞ GD&ĐT COMPLIANT</span>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          HỒI III: HỆ SINH THÁI ĐA NỀN TẢNG (0.60 -> 0.80)
          ========================================================================= */}

      {/* BEAT 13: TEACHER WORKSTATION (0.60 - 0.65) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.60, 0.65);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>HỒI III · TRỢ THỦ GIÁO VIÊN</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              NHẬP ĐIỂM PHÍM TẮT SIÊU TỐC
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Giao diện bàn phím thông minh: Enter / Mũi tên giúp nhập trọn vẹn điểm lớp 45 học sinh trong 3 phút.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">TỐI ƯU THAO TÁC</span>
              <span className="cyber-badge">LƯU TỰ ĐỘNG</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 14: STUDENT PORTAL (0.65 - 0.70) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.65, 0.70);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>14 / CỔNG HỌC SINH</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.6vw, 3.2rem)',
                fontWeight: 900,
                color: '#172b23',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              LỘ TRÌNH RÈN LUYỆN SỐ
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Tra cứu bảng điểm, xem nhận xét của giáo viên bộ môn và bài tập về nhà tức thì.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">BẢNG ĐIỂM MINH BẠCH</span>
              <span className="cyber-badge">BÀI TẬP VỀ NHÀ</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 15: NATIVE ANDROID MOBILE APP (0.70 - 0.75) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.70, 0.75);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '24%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>15 / SỔ LIÊN LẠC ANDROID</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              KOTLIN JETPACK COMPOSE
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Hiển thị thông báo lúc 07:12: "Con đã tới lớp an toàn". Kết nối trọn vẹn tình thân gia đình.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">NATIVE KOTLIN</span>
              <span className="cyber-badge">PUSH NOTIFICATION</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 16: PARENT ENGAGEMENT & MEALS (0.75 - 0.80) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.75, 0.80);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>16 / GẮN KẾT GIA ĐÌNH</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              XIN NGHỈ PHÉP 1-CHẠM
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Theo dõi dinh dưỡng thực đơn bán trú và gửi đơn xin nghỉ phép không cần viết giấy.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">THỰC ĐƠN BÁN TRÚ</span>
              <span className="cyber-badge">DUYỆT PHÉP 1-CHẠM</span>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          HỒI IV: HỌC TẬP TƯƠNG TÁC, AI & TƯƠNG LAI (0.80 -> 1.00)
          ========================================================================= */}

      {/* BEAT 17: WEB HOC TAP & QUESTION MATRIX (0.80 - 0.85) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.80, 0.85);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>HỒI IV · NGÂN HÀNG ĐỀ THI</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              MA TRẬN ĐỀ THI 4 CẤP ĐỘ
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Nhận biết · Thông hiểu · Vận dụng · Vận dụng cao chuẩn cấu trúc Bộ GD&ĐT.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">ĐANG PHÁT TRIỂN</span>
              <span className="cyber-badge">TRỘN ĐỀ TỰ ĐỘNG</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 18: REALTIME QUIZ ARENA INTERACTIVE (0.85 - 0.89) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.85, 0.89);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: 'clamp(24px, 6vw, 100px)',
              width: 'min(480px, 92vw)',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="cyber-badge">
                  <Gamepad2 size={13} color="#10b981" />
                  ĐẤU TRƯỜNG REALTIME QUIZ
                </span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#059669' }}>
                  ĐIỂM: {quizScore}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#172b23', marginBottom: '12px' }}>
                Câu hỏi: Tìm các hệ số a, b, c của parabol y = ax² + bx + c đi qua điểm A(0; 3) và có đỉnh I(1; 2)?
              </div>

              {/* Options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {quizOptions.map((opt, idx) => {
                  let btnBg = 'rgba(255,255,255,0.7)';
                  let btnColor = '#172b23';
                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      btnBg = '#10b981';
                      btnColor = '#ffffff';
                    } else if (quizSelected === idx) {
                      btnBg = '#ef4444';
                      btnColor = '#ffffff';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: '1px solid rgba(23,43,35,0.1)',
                        backgroundColor: btnBg,
                        color: btnColor,
                        cursor: quizSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: quizSubmitted ? '#059669' : '#52665b' }}>
                {quizSubmitted ? '✓ Chính xác! Hệ số a=1, b=-2, c=3' : 'Bấm vào đáp án để tham gia đấu trường'}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 19: SOCRATIC AI COMPANION INTERACTIVE (0.89 - 0.93) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.89, 0.93);
        if (!isVisible) return null;
        const topic = socraticScenarios[socraticTopicIdx];
        return (
          <div
            style={{
              position: 'absolute',
              top: '18%',
              right: 'clamp(24px, 6vw, 100px)',
              width: 'min(480px, 92vw)',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="cyber-badge">
                  <Bot size={13} color="#10b981" />
                  KIYO AI SOCRATIC COMPANION
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#38bdf8' }}>SOCRATIC METHOD</span>
              </div>

              {/* Topic pills */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                {socraticScenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSocraticTopicIdx(idx)}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: socraticTopicIdx === idx ? '1px solid #10b981' : '1px solid rgba(23,43,35,0.1)',
                      backgroundColor: socraticTopicIdx === idx ? '#10b981' : 'rgba(255,255,255,0.7)',
                      color: socraticTopicIdx === idx ? '#ffffff' : '#172b23',
                      cursor: 'pointer',
                    }}
                  >
                    {sc.title.split(' · ')[0]}
                  </button>
                ))}
              </div>

              {/* Chat snippet */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: '8px 8px 8px 2px', color: '#172b23' }}>
                  <strong>Học sinh:</strong> {topic.user}
                </div>
                <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', padding: '8px 12px', borderRadius: '8px 8px 2px 8px', color: '#064e3b' }}>
                  <strong>Kiyo AI:</strong> {topic.ai}
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#3d5246', fontStyle: 'italic', background: 'rgba(255,255,255,0.5)', padding: '6px 10px', borderRadius: '6px' }}>
                💡 Gợi ý: {topic.hint}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BEAT 20: 5 REPOS TRANSPARENCY & DECREE 13 (0.93 - 0.96) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.93, 0.96);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>20 / HẠ TẦNG & BẢO MẬT</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              BẢO MẬT NGHỊ ĐỊNH 13/2023
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Mã hóa AES-256 toàn trình. Bảo vệ dữ liệu cá nhân học sinh tuyệt đối.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="cyber-badge">AES-256</span>
              <span className="cyber-badge">NGHỊ ĐỊNH 13/2023/NĐ-CP</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 21: GRAND HORIZON VISION (0.96 - 0.985) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.96, 0.985);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '25%',
              right: 'clamp(24px, 8vw, 120px)',
              maxWidth: '560px',
              textAlign: 'right',
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '16px' }}>
              <span className="cyber-badge-dot" />
              <span>21 / TẦM NHÌN TƯƠNG LAI</span>
            </div>
            <h2
              className="shimmer-text-emerald"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              HỆ SINH THÁI KHÔNG GIỚI HẠN
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '16px' }}>
              Đồng hành cùng hàng triệu học sinh, giáo viên và phụ huynh trên khắp cả nước.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span className="cyber-badge">CÔNG NGHỆ VÌ GIÁO DỤC</span>
              <span className="cyber-badge">VIỆT NAM SỐ</span>
            </div>
          </div>
        );
      })()}

      {/* BEAT 22: GOLDEN EMBLEM & CTA FINALE (0.985 - 1.00) */}
      {(() => {
        const { isVisible, opacity, translateY } = getBeatMetrics(0.985, 1.0);
        if (!isVisible) return null;
        return (
          <div
            style={{
              position: 'absolute',
              top: '22%',
              left: '50%',
              transform: `translate3d(-50%, ${translateY}px, 0)`,
              width: 'min(580px, 92vw)',
              textAlign: 'center',
              opacity,
              pointerEvents: 'auto',
            }}
          >
            <div className="cyber-badge" style={{ marginBottom: '18px' }}>
              <Sparkles size={13} color="#dfba6b" />
              <span>KIYOEDU CINEMATIC FINALE</span>
            </div>
            <h2
              className="shimmer-text-gold"
              style={{
                fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              SẴN SÀNG CHO TƯƠNG LAI?
            </h2>
            <p style={{ fontSize: '16px', color: '#2e4a3b', fontWeight: 600, lineHeight: 1.5, marginBottom: '24px' }}>
              Trải nghiệm dùng thử 60 ngày miễn phí trọn vẹn toàn bộ hệ sinh thái KiyoEdu.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button
                onClick={() => alert('Cảm ơn bạn đã quan tâm! Đội ngũ KiyoEdu sẽ liên hệ kích hoạt thử nghiệm trong 24 giờ.')}
                style={{
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>ĐĂNG KÝ TRẢI NGHIỆM 60 NGÀY</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onReset}
                style={{
                  padding: '14px 24px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(14px)',
                  color: '#172b23',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  border: '1px solid rgba(23, 43, 35, 0.15)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <RotateCcw size={15} />
                <span>Xem lại từ đầu</span>
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#688073', fontWeight: 600 }}>
              © 2026 KiyoEdu Ecosystem · Bản quyền thuộc về Đội ngũ KiyoEdu
            </div>
          </div>
        );
      })()}
    </div>
  );
};
