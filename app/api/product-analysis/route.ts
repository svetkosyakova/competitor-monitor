import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { product } = await req.json();
    if (!product) {
      return NextResponse.json({ result: "Нет названия товара" });
    }

    // Используем модель, которая точно доступна для всех ключей
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // надёжная рабочая модель
        messages: [
          {
            role: "system",
            content: "Ты помощник стоматолога. Анализируй товары."
          },
          {
            role: "user",
            content: `Проанализируй товар: ${product}. 
Сделай список 5 компаний с ценой, доставкой и рейтингом.`
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    const data = await response.json();

    // Полный лог в консоль
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ result: "GPT не вернул текст. Проверь консоль сервера" });
    }

    return NextResponse.json({ result: reply });

  } catch (error) {
    console.error("OpenAI error full:", error);
    return NextResponse.json({ result: "Ошибка обращения к OpenAI. Проверь консоль сервера" });
  }
}