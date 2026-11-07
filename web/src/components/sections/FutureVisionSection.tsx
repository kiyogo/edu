import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  BookOpen,
  Send,
} from 'lucide-react';

export const FutureVisionSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const sampleConversations = [
    {
      topic: 'Toán 10 · Bất phương trình',
      chip: 'Giải bất phương trình bậc hai x² - 5x + 6 > 0',
      messages: [
        {
          sender: 'student',
          text: 'Kiyo ơi, làm thế nào để giải bất phương trình x² - 5x + 6 > 0 vậy ạ?',
        },
        {
          sender: 'ai',
          text: 'Chào em! Để giải bất phương trình này, trước tiên em hãy thử tìm nghiệm của tam thức bậc hai x² - 5x + 6 = 0 nhé. Em có thể phân tích thành nhân tử hoặc dùng công thức nghiệm không?',
        },
        {
          sender: 'student',
          text: 'Dạ phân tích được thành (x - 2)(x - 3) = 0 nên có hai nghiệm là x = 2 và x = 3 ạ.',
        },
        {
          sender: 'ai',
          text: 'Rất chính xác! Bây giờ em hãy nhớ lại quy tắc xét dấu tam thức bậc hai: "Trong trái, ngoài cùng" (hệ số a = 1 > 0). Vì đề bài yêu cầu tam thức mang dấu DƯƠNG (> 0), thì x sẽ nằm ở khoảng trong hay khoảng ngoài hai nghiệm?',
        },
        {
          sender: 'student',
          text: 'À em hiểu rồi! Ngoài cùng dấu tức là x < 2 hoặc x > 3 đúng không ạ?',
        },
        {
          sender: 'ai',
          text: 'Tuyệt vời em! Tập nghiệm là S = (-∞; 2) ∪ (3; +∞). Em đã tự mình giải quyết được bài toán rồi đấy! 🎉',
        },
      ],
    },
    {
      topic: 'Vật lý 10 · Động lực học',
      chip: 'Giải thích định luật II Newton và mối liên hệ F = ma',
      messages: [
        {
          sender: 'student',
          text: 'Kiyo ơi, định luật II Newton F = ma có ý nghĩa thực tế gì trong cuộc sống vậy?',
        },
        {
          sender: 'ai',
          text: 'Chào em! Công thức F = ma nói rằng: Gia tốc của một vật tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng của nó. Hãy tưởng tượng khi em đẩy một chiếc xe đẩy rỗng và một chiếc xe đẩy chất đầy hàng, trường hợp nào em cần tác dụng lực lớn hơn để xe đạt cùng vận tốc?',
        },
        {
          sender: 'student',
          text: 'Xe chất đầy hàng nặng hơn nên phải đẩy mạnh hơn nhiều ạ!',
        },
        {
          sender: 'ai',
          text: 'Chính xác! Khối lượng m lớn hơn đòi hỏi lực F lớn hơn để sinh ra cùng gia tốc a. Đó chính là lý do các xe tải chở hàng nặng luôn cần quãng đường phanh dài hơn so với xe máy thông thường để dừng lại an toàn.',
        },
      ],
    },
    {
      topic: 'Ngữ văn 10 · Phân tích thơ',
      chip: 'Gợi ý luận điểm phân tích vẻ đẹp tình đồng chí trong thơ Chính Hữu',
      messages: [
        {
          sender: 'student',
          text: 'Kiyo gợi ý giúp em dàn ý vẻ đẹp tình đồng chí trong bài thơ "Đồng chí" của Chính Hữu với ạ.',
        },
        {
          sender: 'ai',
          text: 'Chào em! Với bài thơ "Đồng chí", em nên triển khai theo 3 luận điểm lớn: 1. Cơ sở hình thành tình đồng chí (cùng hoàn cảnh xuất thân nghèo khó, cùng chung lý tưởng chiến đấu); 2. Những biểu hiện cảm động của tình đồng chí (chia sẻ gian lao, thấu hiểu nỗi niềm quê hương); 3. Bức tranh biểu tượng thiêng liêng ở cuối bài ("Đầu súng trăng treo"). Em muốn Kiyo cùng em đào sâu chi tiết vào câu thơ nào trước?',
        },
      ],
    },
  ];

  const current = sampleConversations[selectedTopic];

  return (
    <section
      id="kiyo-ai"
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
            <span>Tầm nhìn Công nghệ Tương lai · Nghiên cứu & Định hướng</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Kiyo AI & Thư viện số:{' '}
            <span className="kiyo-display-serif">Trợ lý sư phạm nhân văn và khai phóng.</span>
          </h2>
          <p className="kiyo-subtitle">
            Chúng tôi tin rằng trí tuệ nhân tạo không sinh ra để làm hộ bài tập hay thay thế thầy cô. Kiyo AI là người bạn đồng hành theo phương pháp gợi mở Socratic — kiên nhẫn khơi gợi tư duy logic độc lập và chắp cánh đam mê tự học.
          </p>
        </div>

        {/* 3 Pillars */}
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
              <Brain size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Phương pháp gợi mở Socratic
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Không đưa ra đáp án ăn sẵn. AI phân tích lỗ hổng nhận thức của học sinh, đặt câu hỏi bắc cầu để học sinh tự mình tìm ra mắt xích tư duy cốt lõi.
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
              <Sparkles size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Trợ lý soạn giáo án cho thầy cô
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Đề xuất hoạt động khởi động, câu hỏi thảo luận nhóm và bài tập phân hóa theo khung kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT.
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
              <BookOpen size={22} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
              Thư viện học liệu số mở
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Kho bài giảng tương tác, video mô phỏng thí nghiệm khoa học và đề thi thử chọn lọc từ các trường THPT chuyên trên toàn quốc.
            </p>
          </div>
        </div>

        {/* Interactive Socratic AI Conversation Simulator */}
        <div
          style={{
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {/* Workstation Header */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={18} color="var(--brand-primary)" />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Kiyo AI Study Companion · Socratic Mode
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 700,
                  }}
                >
                  Trực tuyến
                </span>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Chọn tình huống bên dưới để xem phương pháp đối thoại:
            </div>
          </div>

          {/* Quick Prompt Selector Chips */}
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
            }}
          >
            {sampleConversations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(idx)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: selectedTopic === idx ? 'var(--brand-primary)' : '#FFFFFF',
                  color: selectedTopic === idx ? '#FFFFFF' : 'var(--text-secondary)',
                  border: selectedTopic === idx ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.topic}
              </button>
            ))}
          </div>

          {/* Chat Messages Stream */}
          <div
            style={{
              padding: 'clamp(20px, 3.5vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minHeight: '360px',
            }}
          >
            {current.messages.map((msg, mIdx) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={mIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    alignSelf: isAi ? 'flex-start' : 'flex-end',
                    maxWidth: '82%',
                  }}
                >
                  {isAi && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--brand-primary)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={16} />
                    </div>
                  )}
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: isAi
                        ? '18px 18px 18px 4px'
                        : '18px 18px 4px 18px',
                      backgroundColor: isAi ? '#FFFFFF' : 'var(--brand-primary)',
                      color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      border: isAi ? '1px solid var(--border-subtle)' : 'none',
                      boxShadow: 'var(--shadow-subtle)',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Placeholder */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <input
              type="text"
              readOnly
              value={current.chip}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-main)',
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                outline: 'none',
              }}
            />
            <button
              disabled
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
