import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token и пароль обязательны" },
        { status: 400 }
      );
    }

    // Здесь позже можно будет проверить token в базе
    // Сейчас просто имитируем обновление пароля

    console.log("Token:", token);
    console.log("Новый пароль:", password);

    return NextResponse.json({
      message: "Пароль успешно обновлён",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Ошибка при обновлении пароля" },
      { status: 500 }
    );
  }
}