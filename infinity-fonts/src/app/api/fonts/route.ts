import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as needed for your project

export async function GET(request: NextRequest) {
  const fonts = await prisma.font.findMany();
  return NextResponse.json(fonts, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const font = await prisma.font.create({ data });
  return NextResponse.json(font, { status: 201 });
}