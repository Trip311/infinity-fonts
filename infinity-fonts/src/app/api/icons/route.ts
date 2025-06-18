import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path as needed

export async function GET() {
  const icons = await prisma.icon.findMany();
  return NextResponse.json(icons, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const icon = await prisma.icon.create({ data });
  return NextResponse.json(icon, { status: 201 });
}