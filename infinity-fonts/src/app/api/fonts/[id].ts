import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';





// PUT /api/fonts/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();
  const font = await prisma.font.update({
    where: { id },
    data,
  });
  return NextResponse.json(font, { status: 200 });
}

// DELETE /api/fonts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.font.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
