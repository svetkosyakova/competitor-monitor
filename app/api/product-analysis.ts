import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as Blob;
    const priceMin = formData.get("priceMin");
    const priceMax = formData.get("priceMax");
    const maxSites = formData.get("maxSites");
    const deliveryTime = formData.get("deliveryTime");

    // TODO: подключить GPT/OpenAI для анализа
    const result = `Анализ изображения (${image?.size} байт) с фильтрами:
Цена: ${priceMin}-${priceMax} ₽
Макс. сайтов: ${maxSites}
Сроки доставки: ${deliveryTime}`;

    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}