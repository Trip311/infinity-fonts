import { NextResponse } from 'next/server';
import { getIconsFromS3 } from '@/server/services/icons.service';
export async function GET(req: Request) {
  try {
    const icons = await getIconsFromS3();
    return NextResponse.json({ success: true, data: icons });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


