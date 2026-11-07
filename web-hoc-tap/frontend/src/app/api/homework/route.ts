import { NextRequest, NextResponse } from 'next/server';
import { homeworkDb } from '@/lib/storage/homeworkDb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin');
    const id = searchParams.get('id');
    const documentId = searchParams.get('documentId');

    if (pin) {
      const hw = await homeworkDb.getHomeworkByPin(pin);
      if (!hw) {
        return NextResponse.json(
          { success: false, message: 'Không tìm thấy bài tập với mã PIN này' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, homework: hw });
    }

    if (id) {
      const hw = await homeworkDb.getHomeworkById(id);
      if (!hw) {
        return NextResponse.json(
          { success: false, message: 'Không tìm thấy bài tập với mã ID này' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, homework: hw });
    }

    if (documentId) {
      const hw = await homeworkDb.getLatestByDocumentId(documentId);
      if (!hw) {
        return NextResponse.json(
          { success: false, message: 'Chưa có bài tập cho tài liệu này' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, homework: hw });
    }

    const all = await homeworkDb.getAllHomeworks();
    return NextResponse.json({ success: true, homeworks: all });
  } catch (error: any) {
    console.error('[API /api/homework GET] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi lấy thông tin bài tập' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.pin) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin bài tập hoặc mã PIN' },
        { status: 400 }
      );
    }

    const saved = await homeworkDb.saveHomework(body);
    return NextResponse.json({
      success: true,
      message: 'Lưu bài tập thành công',
      homework: saved,
    });
  } catch (error: any) {
    console.error('[API /api/homework POST] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi lưu bài tập' },
      { status: 500 }
    );
  }
}
