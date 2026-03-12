import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase"; // путь к твоему firebase.ts

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Введите email" },
        { status: 400 }
      );
    }

    // Отправляем письмо через Firebase
    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({
      message: "Письмо для сброса пароля отправлено на вашу почту",
    });

  } catch (error: any) {
    console.error("Reset password error:", error);

    let message = "Ошибка при отправке письма";

    if (error.code === "auth/user-not-found") {
      message = "Пользователь с таким email не найден";
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}