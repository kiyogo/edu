import React, { useState } from 'react';
import {
  Gamepad2,
  Database,
  Flame,
  Award,
  Timer,
  Zap,
  RotateCcw,
} from 'lucide-react';

export const WebHocTapSection: React.FC = () => {
  // Live Quiz Interactive State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(12);
  const [quizScore, setQuizScore] = useState<number>(850);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Simulated leaderboard
  const initialLeaderboard = [
    { rank: 1, name: 'Nguyễn Hoàng Long', score: 1420, isUser: false },
    { rank: 2, name: 'Trần Thị Mai Anh', score: 1310, isUser: false },
    { rank: 3, name: 'Bạn (Học viên)', score: 850, isUser: true },
    { rank: 4, name: 'Lê Quốc Bảo', score: 790, isUser: false },
    { rank: 5, name: 'Vũ Thảo Nguyên', score: 720, isUser: false },
  ];

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  const quizQuestion = {
    subject: 'Toán học 10 · Đại số & Thống kê',
    questionText: 'Cho parabol (P): y = ax² + bx + c có đỉnh I(1; 2) và đi qua điểm A(0; 3). Giá trị của a, b, c lần lượt là:',
    options: [
      { id: 0, text: 'a = 1, b = -2, c = 3', isCorrect: true },
      { id: 1, text: 'a = -1, b = 2, c = 3', isCorrect: false },
      { id: 2, text: 'a = 2, b = -4, c = 3', isCorrect: false },
      { id: 3, text: 'a = 1, b = 2, c = -3', isCorrect: false },
    ],
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedAnswer(idx);
    setHasSubmitted(true);
    if (quizQuestion.options[idx].isCorrect) {
      const added = 500 + timeLeft * 10;
      const newScore = quizScore + added;
      setQuizScore(newScore);
      setLeaderboard((prev) =>
        prev
          .map((item) => (item.isUser ? { ...item, score: newScore } : item))
          .sort((a, b) => b.score - a.score)
          .map((item, index) => ({ ...item, rank: index + 1 }))
      );
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setTimeLeft(12);
    setQuizScore(850);
    setLeaderboard(initialLeaderboard);
  };

  return (
    <section
      id="web-hoc-tap"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="kiyo-container">
        {/* Header */}
        <div style={{ maxWidth: '840px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Nền tảng Học tập Trực tuyến · Dự án Đang Phát triển</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Đấu trường tri thức & Ngân hàng đề thi:{' '}
            <span className="kiyo-display-serif">Học tập tương tác đa chiều.</span>
          </h2>
          <p className="kiyo-subtitle">
            Dự án <code>web-hoc-tap</code> được xây dựng trên nền tảng Next.js, NestJS, Prisma và Socket.io. Biến những buổi ôn tập căng thẳng thành đấu trường tri thức hào hứng và cung cấp ngân hàng câu hỏi phân cấp ma trận chuẩn GDPT 2018.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {[
            {
              icon: <Gamepad2 size={22} color="var(--brand-primary)" />,
              tag: 'REALTIME SOCKET.IO',
              title: 'Đấu trường Realtime Quiz',
              desc: 'Học sinh tham gia phòng thi tức thì qua mã PIN 6 số. Bảng xếp hạng điểm số và chuỗi thắng (Streak) nhảy liên tục theo thời gian thực.',
            },
            {
              icon: <Database size={22} color="var(--brand-primary)" />,
              tag: 'MA TRẬN GDPT 2018',
              title: 'Ngân hàng đề 4 cấp độ',
              desc: 'Phân loại câu hỏi chuẩn xác: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao. Hỗ trợ công thức LaTeX Toán - Lý - Hóa sắc nét.',
            },
            {
              icon: <Zap size={22} color="var(--brand-primary)" />,
              tag: 'TỰ ĐỘNG HÓA',
              title: 'Chấm điểm & Phản hồi tức thì',
              desc: 'Tự động chấm bài trắc nghiệm ngay khi nộp. Trả lời giải chi tiết, phân tích các phương án bẫy để học sinh rút kinh nghiệm sâu sắc.',
            },
            {
              icon: <Flame size={22} color="var(--brand-primary)" />,
              tag: 'LEARNING ANALYTICS',
              title: 'Bản đồ nhiệt năng lực cá nhân',
              desc: 'Trực quan hóa các mảng kiến thức đã làm chủ và các chuyên đề còn yếu để hệ thống gợi ý lộ trình ôn luyện bổ trợ phù hợp.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Interactive Quiz Workstation */}
        <div
          style={{
            backgroundColor: '#142820',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(20, 40, 32, 0.25)',
          }}
        >
          {/* Top Gaming Bar */}
          <div
            style={{
              padding: '16px 28px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(59, 128, 96, 0.4)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(59, 128, 96, 0.6)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#4ADE80',
                    display: 'inline-block',
                  }}
                />
                PHÒNG THI REALTIME #928174
              </span>
              <span style={{ fontSize: '13px', color: '#A7C4B5' }}>
                Môn: {quizQuestion.subject}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FDE047',
                }}
              >
                <Timer size={16} />
                <span>Thời gian: {timeLeft}s</span>
              </div>
              <button
                onClick={handleResetQuiz}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>

          {/* Main Quiz Area & Live Leaderboard */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(280px, 1fr)',
              gap: '24px',
              padding: 'clamp(24px, 4vw, 36px)',
            }}
          >
            {/* Left: Question & Answer Buttons */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#70BA93',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}
              >
                Câu hỏi 05 / 10 · Mức độ Vận dụng
              </div>
              <h3
                style={{
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 600,
                  lineHeight: 1.45,
                  marginBottom: '28px',
                  color: '#FFFFFF',
                }}
              >
                {quizQuestion.questionText}
              </h3>

              {/* 4 Choices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {quizQuestion.options.map((opt) => {
                  let bgColor = 'rgba(255, 255, 255, 0.08)';
                  let borderColor = 'rgba(255, 255, 255, 0.15)';
                  let textColor = '#FFFFFF';

                  if (hasSubmitted) {
                    if (opt.isCorrect) {
                      bgColor = '#166534';
                      borderColor = '#22C55E';
                    } else if (selectedAnswer === opt.id) {
                      bgColor = '#991B1B';
                      borderColor = '#EF4444';
                    }
                  } else if (selectedAnswer === opt.id) {
                    bgColor = 'rgba(59, 128, 96, 0.5)';
                    borderColor = '#3B8060';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={hasSubmitted}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: bgColor,
                        border: `1px solid ${borderColor}`,
                        color: textColor,
                        textAlign: 'left',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: hasSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span style={{ marginRight: '10px', opacity: 0.6 }}>
                        {String.fromCharCode(65 + opt.id)}.
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {hasSubmitted && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor:
                      quizQuestion.options[selectedAnswer!].isCorrect
                        ? 'rgba(34, 197, 94, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)',
                    border:
                      quizQuestion.options[selectedAnswer!].isCorrect
                        ? '1px solid rgba(34, 197, 94, 0.4)'
                        : '1px solid rgba(239, 68, 68, 0.4)',
                    fontSize: '13.5px',
                  }}
                >
                  {quizQuestion.options[selectedAnswer!].isCorrect ? (
                    <span style={{ color: '#4ADE80', fontWeight: 600 }}>
                      ✓ Chính xác tuyệt đối! Bạn được cộng thêm điểm thời gian phản xạ nhanh.
                    </span>
                  ) : (
                    <span style={{ color: '#F87171', fontWeight: 600 }}>
                      ✕ Chưa chính xác! Đáp án đúng là A. Lời giải: Đỉnh I(1;2) suy ra -b/(2a)=1 và y(1)=2. Đi qua A(0;3) suy ra c=3.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right: Realtime Leaderboard */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="#FDE047" />
                  <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Bảng xếp hạng Trực tiếp
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#88A395' }}>
                  38 người tham gia
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.map((item) => (
                  <div
                    key={item.rank}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: item.isUser
                        ? 'rgba(59, 128, 96, 0.4)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: item.isUser
                        ? '1px solid #3B8060'
                        : '1px solid transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor:
                            item.rank === 1
                              ? '#EAB308'
                              : item.rank === 2
                              ? '#94A3B8'
                              : item.rank === 3
                              ? '#B45309'
                              : 'rgba(255, 255, 255, 0.1)',
                          color: '#000000',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.rank}
                      </span>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: item.isUser ? 700 : 500,
                          color: item.isUser ? '#4ADE80' : '#FFFFFF',
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#FDE047',
                      }}
                    >
                      {item.score} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
