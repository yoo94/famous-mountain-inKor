import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient'; // Prisma Client 경로 조정 필요
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // 여기에서 비밀번호 사용
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
