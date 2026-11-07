import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
  MessageSquareOff,
  Clock,
  BarChart3,
  Zap,
} from 'lucide-react';

export const ChallengesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const comparisons = [
    {
      title: 'Quản lý điểm số & Học bạ',
      icon: <FileSpreadsheet size={22} />,
      traditional: {
        headline: 'Sổ giấy & File Excel phân tán',
        points: [
          'Giáo viên mất hàng tuần gõ điểm thủ công vào bảng tính Excel.',
          'Dễ sai lệch công thức làm tròn điểm kiểm tra định kỳ và đánh giá thường xuyên.',
          'Nguy cơ mất mát dữ liệu cao, khó theo dõi lịch sử chỉnh sửa điểm số.',
          'Tổng kết học kỳ và in học bạ cuối năm là áp lực căng thẳng cực đại.',
        ],
      },
      kiyoedu: {
        headline: 'Sổ điểm điện tử Thông tư 22 tự động hóa',
        points: [
          'Hệ thống tự động áp dụng công thức tính điểm TB môn theo chuẩn Thông tư 22/2021/TT-BGDĐT.',
          'Kiểm soát toàn vẹn dữ liệu: Lưu vết chỉnh sửa điểm (Audit log), khóa sổ điểm khi duyệt.',
          'Tự động phân loại xếp hạng Xuất sắc / Giỏi / Khá / Đạt kèm nhận xét phẩm chất.',
          'Xuất báo cáo tổng kết và học bạ số hóa chuẩn mẫu Bộ GD&ĐT chỉ với 1 cú click chuột.',
        ],
      },
    },
    {
      title: 'Kết nối Nhà trường & Phụ huynh',
      icon: <MessageSquareOff size={22} />,
      traditional: {
        headline: 'Nhóm chat Zalo trôi tin & thiếu bảo mật',
        points: [
          'Thông báo quan trọng bị trôi giữa hàng trăm tin nhắn thảo luận và hình ảnh.',
          'Số điện thoại và thông tin cá nhân của phụ huynh, học sinh bị công khai dễ rò rỉ.',
          'Phụ huynh không nắm được con có đến lớp an toàn hay không cho tới cuối buổi.',
          'Khiếu nại và trao đổi cá nhân thiếu lưu trữ biên bản chính thống.',
        ],
      },
      kiyoedu: {
        headline: 'Ứng dụng di động Sổ liên lạc số riêng tư',
        points: [
          'Thông báo chuyên cần đẩy (Push notification) ngay khi giáo viên điểm danh tại lớp.',
          'Bảng điểm chi tiết từng bài kiểm tra gửi riêng tới từng phụ huynh, đảm bảo tuyệt đối quyền riêng tư.',
          'Kênh trao đổi riêng 1-1 giữa phụ huynh và giáo viên chủ nhiệm có xác thực tài khoản.',
          'Đồng bộ tức thời lịch thi, thời khóa biểu, thực đơn bán trú và thông báo của trường.',
        ],
      },
    },
    {
      title: 'Kiểm tra, Thi cử & Ôn luyện',
      icon: <Clock size={22} />,
      traditional: {
        headline: 'In ấn đề giấy & chấm thi thủ công quá tải',
        points: [
          'Mất nhiều ngày chuẩn bị ma trận đề, trộn đề và in ấn hàng ngàn trang giấy kiểm tra.',
          'Chấm bài trắc nghiệm thủ công dễ sót lỗi, tốn nhiều giờ làm thêm của thầy cô.',
          'Học sinh không được sửa bài ngay, giảm hiệu quả ghi nhớ kiến thức vừa học.',
          'Khó tổ chức các buổi ôn tập tương tác, tạo hứng thú thi đua trong lớp học.',
        ],
      },
      kiyoedu: {
        headline: 'Ngân hàng đề thông minh & Đấu trường Quiz Realtime',
        points: [
          'Ngân hàng câu hỏi phân loại 4 mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.',
          'Sinh đề trắc nghiệm ngẫu nhiên theo ma trận chuẩn với tính năng đảo câu hỏi và đáp án.',
          'Chấm điểm tự động và trả kết quả tức thời cùng lời giải chi tiết cho học sinh.',
          'Chế độ Đấu trường tri thức Realtime (Socket.io) tạo không khí hào hứng như trò chơi truyền hình.',
        ],
      },
    },
    {
      title: 'Báo cáo & Giám sát Quản trị',
      icon: <BarChart3 size={22} />,
      traditional: {
        headline: 'Số liệu chậm trễ, Ban Giám Hiệu thiếu tầm nhìn',
        points: [
          'Báo cáo sĩ số, nề nếp và học lực phải chờ các khối lớp tổng hợp mất 3 - 5 ngày.',
          'Không phát hiện sớm những học sinh có nguy cơ trượt hoặc tụt giảm học lực đột ngột.',
          'Thiếu biểu đồ trực quan để so sánh chất lượng giảng dạy giữa các lớp và các bộ môn.',
          'Khó khăn khi phục vụ các đợt thanh tra chuyên môn hoặc kiểm định chất lượng giáo dục.',
        ],
      },
      kiyoedu: {
        headline: 'Dashboard Điều hành 360 độ thời gian thực',
        points: [
          'Biểu đồ phổ điểm trực quan toàn trường, phân tích độ lệch chuẩn và phân phối điểm số.',
          'Hệ thống AI tự động phát hiện và cảnh báo học sinh vắng học nhiều hoặc điểm số giảm sút.',
          'Xem dữ liệu chuyên cần và nề nếp toàn trường ngay tại thời điểm thực tế.',
          'Đầy đủ biểu mẫu thống kê theo đúng quy định của Sở và Phòng Giáo dục & Đào tạo.',
        ],
      },
    },
  ];

  return (
    <section
      id="thach-thuc"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="kiyo-container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Thực trạng & Bước chuyển đổi</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Giải quyết triệt để những nút thắt{' '}
            <span className="kiyo-display-serif">của trường học truyền thống.</span>
          </h2>
          <p className="kiyo-subtitle">
            Mỗi tính năng trong KiyoEdu đều được thai nghén từ việc lắng nghe những trăn trở có thật của hàng trăm thầy cô giáo và nhà quản lý giáo dục trên khắp cả nước.
          </p>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {comparisons.map((item, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '14px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--bg-main)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isActive
                    ? '1px solid var(--brand-primary)'
                    : '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Side-by-side Comparison Card */}
        {(() => {
          const current = comparisons[activeCategory];
          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Traditional Approach */}
              <div
                style={{
                  backgroundColor: '#FFF7F7',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(28px, 4vw, 36px)',
                  border: '1px solid #F5D3D3',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                    color: '#B91C1C',
                  }}
                >
                  <AlertTriangle size={20} />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Thực trạng trường học cũ
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#7F1D1D',
                    marginBottom: '20px',
                    lineHeight: 1.3,
                  }}
                >
                  {current.traditional.headline}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {current.traditional.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '14.5px',
                        color: '#4B2828',
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#DC2626',
                          marginTop: '8px',
                          flexShrink: 0,
                        }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* KiyoEdu Solution */}
              <div
                style={{
                  backgroundColor: '#F3F9F5',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(28px, 4vw, 36px)',
                  border: '1px solid #C2DEC9',
                  boxShadow: 'var(--shadow-card)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '6px',
                    height: '100%',
                    backgroundColor: 'var(--brand-primary)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                    color: 'var(--brand-primary)',
                  }}
                >
                  <Zap size={20} />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Giải pháp KiyoEdu chuyển đổi số
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#133D2D',
                    marginBottom: '20px',
                    lineHeight: 1.3,
                  }}
                >
                  {current.kiyoedu.headline}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {current.kiyoedu.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '14.5px',
                        color: 'var(--text-primary)',
                        lineHeight: 1.55,
                      }}
                    >
                      <CheckCircle
                        size={17}
                        color="var(--brand-primary)"
                        style={{ marginTop: '3px', flexShrink: 0 }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
