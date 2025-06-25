import { NextResponse } from 'next/server';
import { getAllFonts } from '@/server/services/font.service';
export async function GET(req: Request) {
  try {
    const fonts = await getAllFonts();
    return NextResponse.json({ success: true, data: fonts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


