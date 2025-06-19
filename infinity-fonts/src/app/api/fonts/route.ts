import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as needed for your project




// GET /api/fonts?query=Arial
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } }, // For array fields like tags
        ],
      }
    : {};
  const fonts = await prisma.icon.findMany({ where });
  return NextResponse.json(fonts, { status: 200 });
}


export async function POST(request: NextRequest) {
  const data = await request.json();
  const font = await prisma.icon.create({ data });
  return NextResponse.json(font, { status: 201 });
}