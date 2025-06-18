import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// GET /api/icons/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const icon = await prisma.icon.findUnique({ where: { id } });
  if (!icon) {
    return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
  }
  return NextResponse.json(icon, { status: 200 });
}

// PUT /api/icons/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();
  const icon = await prisma.icon.update({
    where: { id },
    data,
  });
  return NextResponse.json(icon, { status: 200 });
}

// DELETE /api/icons/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.icon.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}