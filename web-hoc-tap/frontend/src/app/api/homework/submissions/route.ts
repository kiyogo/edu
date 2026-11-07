import { NextRequest, NextResponse } from 'next/server';
import { homeworkDb } from '@/lib/storage/homeworkDb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin');
    const homeworkId = searchParams.get('homeworkId');

    const key = pin || homeworkId;
    if (!key) {
      return NextResponse.json(
        { success: false, message: 'Thiếu mã PIN hoặc ID bài tập' },
        { status: 400 }
      );
    }

    const participants = await homeworkDb.getSubmissionsByPinOrId(key);
    return NextResponse.json({
      success: true,
      participants,
      count: participants.length,
    });
  } catch (error: any) {
    console.error('[API /api/homework/submissions GET] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi lấy danh sách người tham gia' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Thiếu dữ liệu nộp bài' },
        { status: 400 }
      );
    }

    // 1. Ghi nhận khi học sinh vào phòng chờ hoặc bắt đầu thi
    if (body.action === 'join' || body.status === 'in_progress') {
      const record = await homeworkDb.recordParticipant(
        body.pin || body.homeworkId,
        body.studentName,
        body.studentId,
        body.homeworkId
      );
      return NextResponse.json({
        success: true,
        message: 'Đã ghi nhận người tham gia',
        record,
      });
    }

    // 2. Nộp bài chính thức
    const record = await homeworkDb.saveSubmission(body);
    return NextResponse.json({
      success: true,
      message: 'Nộp bài tập thành công',
      record,
    });
  } catch (error: any) {
    console.error('[API /api/homework/submissions POST] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi xử lý nộp bài' },
      { status: 500 }
    );
  }
}
