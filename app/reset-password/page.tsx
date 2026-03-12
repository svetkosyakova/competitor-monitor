import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email обязателен" },
        { status: 400 }
      );
    }

    const token = Math.random().toString(36).substring(2);

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    console.log("Ссылка для сброса пароля:", resetLink);

    return NextResponse.json({
      message: "Ссылка для сброса создана (проверь консоль сервера)",
      link: resetLink
    });

  } catch (error) {

    console.error("Reset password error:", error);

    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );

  }
}