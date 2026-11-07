import React, { useState } from 'react';
import {
  UserCheck,
  Clock,
  Phone,
  HeartPulse,
  Award,
  CheckCircle2,
  AlertCircle,
  School,
  ChevronRight,
} from 'lucide-react';

interface StudentProfile {
  id: string;
  code: string;
  name: string;
  dob: string;
  gender: string;
  className: string;
  avatarColor: string;
  status: 'Đang theo học' | 'Nghỉ có phép' | 'Cảnh báo chuyên cần';
  attendanceRate: string;
  conduct: 'Tốt' | 'Khá';
  parents: {
    father: string;
    mother: string;
    phone: string;
    address: string;
  };
  health: string;
  notes: string;
  recentRecords: {
    date: string;
    type: 'attendance' | 'conduct' | 'reward';
    title: string;
    status: 'good' | 'neutral' | 'warn';
  }[];
}

export const StudentManagementSection: React.FC = () => {
  const students: StudentProfile[] = [
    {
      id: '1',
      code: 'HS-2026-10A1-01',
      name: 'Nguyễn Hoàng Long',
      dob: '14/08/2008',
      gender: 'Nam',
      className: '10A1 Chuyên Toán',
      avatarColor: '#245B45',
      status: 'Đang theo học',
      attendanceRate: '100%',
      conduct: 'Tốt',
      parents: {
        father: 'Nguyễn Văn Hùng (Kỹ sư phần mềm)',
        mother: 'Lê Thị Thu Trang (Giáo viên)',
        phone: '0912.345.678',
        address: 'Số 45, Phố Huế, Q. Hoàn Kiếm, Hà Nội',
      },
      health: 'Bình thường · Không có bệnh mãn tính · Thị lực 10/10',
      notes: 'Lớp phó học tập · Đoạt giải Nhì Học sinh giỏi môn Toán cấp Thành phố',
      recentRecords: [
        { date: '12/10/2026', type: 'attendance', title: 'Điểm danh có mặt đúng giờ (07:12)', status: 'good' },
        { date: '08/10/2026', type: 'reward', title: 'Tuyên dương giải bài toán tuần trên bản tin', status: 'good' },
        { date: '05/10/2026', type: 'conduct', title: 'Thực hiện nghiêm túc nội quy đồng phục', status: 'neutral' },
      ],
    },
    {
      id: '2',
      code: 'HS-2026-10A1-02',
      name: 'Trần Thị Mai Anh',
      dob: '22/03/2008',
      gender: 'Nữ',
      className: '10A1 Chuyên Toán',
      avatarColor: '#34684B',
      status: 'Đang theo học',
      attendanceRate: '98.5%',
      conduct: 'Tốt',
      parents: {
        father: 'Trần Quốc Đạt (Kiến trúc sư)',
        mother: 'Phạm Hồng Nhung (Bác sĩ)',
        phone: '0988.112.233',
        address: 'Tòa Landmark 2, Vinhome, Bình Thạnh, TP.HCM',
      },
      health: 'Cận thị 2.5 độ (Cần xếp chỗ ngồi 3 bàn đầu)',
      notes: 'Bí thư Chi đoàn 10A1 · Tích cực tham gia hoạt động thiện nguyện',
      recentRecords: [
        { date: '12/10/2026', type: 'attendance', title: 'Điểm danh có mặt đúng giờ (07:15)', status: 'good' },
        { date: '02/10/2026', type: 'attendance', title: 'Xin nghỉ có phép (Tham gia kỳ thi Olympic)', status: 'neutral' },
        { date: '28/09/2026', type: 'reward', title: 'Khen thưởng Bí thư xuất sắc Tháng 9', status: 'good' },
      ],
    },
    {
      id: '3',
      code: 'HS-2026-10A1-03',
      name: 'Lê Quốc Bảo',
      dob: '05/11/2008',
      gender: 'Nam',
      className: '10A1 Chuyên Toán',
      avatarColor: '#4A7C59',
      status: 'Cảnh báo chuyên cần',
      attendanceRate: '92.0%',
      conduct: 'Khá',
      parents: {
        father: 'Lê Hoàng Nam (Kinh doanh)',
        mother: 'Nguyễn Thị Hương (Kế toán)',
        phone: '0903.998.776',
        address: 'Số 12, Đường số 4, P. An Phú, TP. Thủ Đức',
      },
      health: 'Bình thường · Tiền sử viêm phế quản theo mùa',
      notes: 'Học lực Khá môn Tự nhiên · Cần nhắc nhở nề nếp đi học đúng giờ tiết 1',
      recentRecords: [
        { date: '11/10/2026', type: 'attendance', title: 'Đi học muộn 12 phút (Tiết 1 Sinh học)', status: 'warn' },
        { date: '06/10/2026', type: 'conduct', title: 'Quên mang phù hiệu trường', status: 'warn' },
        { date: '01/10/2026', type: 'attendance', title: 'Nghỉ học có giấy phép phụ huynh gửi qua App', status: 'neutral' },
      ],
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState<StudentProfile>(students[0]);

  return (
    <section
      id="quan-ly-hoc-sinh"
      style={{
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="kiyo-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <div className="kiyo-kicker" style={{ marginBottom: '16px' }}>
            <span className="kiyo-kicker-dot" />
            <span>Nghiệp vụ thực tế · Module Core</span>
          </div>
          <h2 className="kiyo-section-title" style={{ marginBottom: '20px' }}>
            Hồ sơ học sinh 360 độ:{' '}
            <span className="kiyo-display-serif">Chính xác, toàn diện và nhân bản.</span>
          </h2>
          <p className="kiyo-subtitle">
            Học sinh không phải là một mã định danh khô khan. KiyoEdu theo dõi trọn vẹn hành trình trưởng thành của mỗi em: từ hồ sơ lý lịch, thông tin y tế học đường, đến nề nếp chuyên cần từng buổi học và ghi nhận kỷ luật tích cực.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {[
            {
              icon: <UserCheck size={20} color="var(--brand-primary)" />,
              title: 'Hồ sơ lý lịch chuẩn CSDL ngành',
              desc: 'Tích hợp đầy đủ trường dữ liệu theo quy chuẩn EMIS của Bộ GD&ĐT: số định danh VNeID, diện chính sách, dân tộc, đoàn/đội.',
            },
            {
              icon: <Clock size={20} color="var(--brand-primary)" />,
              title: 'Điểm danh chuyên cần tức thời',
              desc: 'Ghi nhận chuyên cần theo tiết hoặc theo buổi. Tự động gửi thông báo đến máy phụ huynh ngay khi học sinh vắng hoặc đi muộn.',
            },
            {
              icon: <Award size={20} color="var(--brand-primary)" />,
              title: 'Khen thưởng & Kỷ luật tích cực',
              desc: 'Khuyến khích hành vi tốt với hệ thống cộng điểm rèn luyện số. Đánh giá hạnh kiểm minh bạch dựa trên dữ liệu thật.',
            },
            {
              icon: <HeartPulse size={20} color="var(--brand-primary)" />,
              title: 'Y tế học đường & Dị ứng',
              desc: 'Lưu trữ chỉ số thể lực BMI, tiền sử bệnh tật, thị lực và cảnh báo dị ứng thực phẩm bán trú để chăm sóc an toàn nhất.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '24px 20px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--brand-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Student Dossier Workstation */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {/* Workstation Top Bar */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <School size={18} color="var(--brand-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Workstation Tra cứu & Quản lý Hồ sơ Học sinh
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--brand-light)',
                  color: 'var(--brand-primary)',
                  fontWeight: 600,
                }}
              >
                Lớp 10A1 · Năm học 2026-2027
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Chọn học sinh bên dưới để mở hồ sơ chi tiết 360°
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 320px) 1fr',
              minHeight: '480px',
            }}
          >
            {/* Student List Sidebar */}
            <div
              style={{
                borderRight: '1px solid var(--border-subtle)',
                backgroundColor: '#FAFBF9',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                  paddingLeft: '8px',
                }}
              >
                Danh sách học sinh trong lớp (Sĩ số: 38)
              </div>
              {students.map((st) => {
                const isSelected = selectedStudent.id === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStudent(st)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      border: isSelected
                        ? '1px solid var(--border-hover)'
                        : '1px solid transparent',
                      boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: st.avatarColor,
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {st.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 700,
                            color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)',
                          }}
                        >
                          {st.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                          {st.code}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      color={isSelected ? 'var(--brand-primary)' : '#A3B4AA'}
                    />
                  </button>
                );
              })}
            </div>

            {/* Student Dossier Main View */}
            <div style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
              {/* Profile Header */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '20px',
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--border-subtle)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: selectedStudent.avatarColor,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                    }}
                  >
                    {selectedStudent.name.split(' ').slice(-1)[0][0]}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {selectedStudent.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor:
                            selectedStudent.status === 'Đang theo học'
                              ? 'var(--status-success-bg)'
                              : 'var(--status-dev-bg)',
                          color:
                            selectedStudent.status === 'Đang theo học'
                              ? 'var(--status-success-text)'
                              : 'var(--status-dev-text)',
                        }}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '12.5px',
                        color: 'var(--text-secondary)',
                        marginTop: '4px',
                        display: 'flex',
                        gap: '12px',
                      }}
                    >
                      <span>Mã: <strong>{selectedStudent.code}</strong></span>
                      <span>·</span>
                      <span>Ngày sinh: {selectedStudent.dob}</span>
                      <span>·</span>
                      <span>Giới tính: {selectedStudent.gender}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div
                    style={{
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Chuyên cần
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        color: 'var(--brand-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {selectedStudent.attendanceRate}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Hạnh kiểm
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        color: 'var(--brand-primary)',
                      }}
                    >
                      {selectedStudent.conduct}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dossier Grid Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px',
                  marginBottom: '24px',
                }}
              >
                {/* Family Info */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: '#FAFCFA',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--brand-primary)',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    <Phone size={14} />
                    <span>Thông tin gia đình & Liên lạc</span>
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    <div><strong>Cha:</strong> {selectedStudent.parents.father}</div>
                    <div><strong>Mẹ:</strong> {selectedStudent.parents.mother}</div>
                    <div><strong>Điện thoại:</strong> {selectedStudent.parents.phone}</div>
                    <div><strong>Địa chỉ:</strong> {selectedStudent.parents.address}</div>
                  </div>
                </div>

                {/* Health & Special Notes */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: '#FAFCFA',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--brand-primary)',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    <HeartPulse size={14} />
                    <span>Sức khỏe & Nhận xét sư phạm</span>
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Y tế:</strong> {selectedStudent.health}
                    </div>
                    <div>
                      <strong>Ghi chú:</strong> {selectedStudent.notes}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Log */}
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    letterSpacing: '0.06em',
                  }}
                >
                  Nhật ký nề nếp & Chuyên cần gần nhất
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedStudent.recentRecords.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor:
                          rec.status === 'warn'
                            ? '#FEF2F2'
                            : rec.status === 'good'
                            ? '#F0FDF4'
                            : '#F9FAFB',
                        border:
                          rec.status === 'warn'
                            ? '1px solid #FECACA'
                            : rec.status === 'good'
                            ? '1px solid #DCFCE7'
                            : '1px solid #E5E7EB',
                        fontSize: '13px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {rec.status === 'warn' ? (
                          <AlertCircle size={15} color="#DC2626" />
                        ) : (
                          <CheckCircle2 size={15} color="#16A34A" />
                        )}
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {rec.title}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {rec.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
