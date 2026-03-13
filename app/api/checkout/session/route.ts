import Stripe from "stripe";
import { NextResponse } from "next/server";

// В Stripe v20 apiVersion указывать не нужно
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.url.replace("/api/checkout/session", "")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.url.replace("/api/checkout/session", "")}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}