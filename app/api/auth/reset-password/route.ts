import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
  }

  const token = Math.random().toString(36).substring(2);
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  console.log('Ссылка для сброса пароля:', resetLink);

  return NextResponse.json({ message: 'Ссылка создана', link: resetLink });
}