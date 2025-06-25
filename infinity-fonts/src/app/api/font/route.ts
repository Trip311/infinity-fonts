import { NextResponse } from 'next/server';
import { getAllFontsName } from '@/server/services/font.service';
export async function GET(req: Request) {
  try {
    const fontNames = await getAllFontsName();
    return NextResponse.json({ success: true, data: fontNames });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


