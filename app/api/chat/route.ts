import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // убедись, что ключ добавлен в Vercel
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) return new Response(JSON.stringify({ reply: "" }), { status: 400 });

    console.log("User message:", message);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message?.content ?? "";
    console.log("OpenAI reply:", reply);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}