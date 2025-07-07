import { NextResponse } from 'next/server';
import { getFontPreview } from '@/server/services/font.service';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fontName = searchParams.get('fontName');
    console.log(fontName)
    if (!fontName) {
      return NextResponse.json({ success: false, message: 'Missing fontName' }, { status: 400 });
    }
      const fonts = await getFontPreview(fontName);
      return NextResponse.json({ success: true, data: fonts });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message || 'Internal server error' },
        { status: 500 }
      );
    }

}