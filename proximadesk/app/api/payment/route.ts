import { Stripe } from "stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string);
export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ status: 403, data: null });
  }

  const priceID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID as string;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_HOST_LINK}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_LINK}/payment?cancel=true`,
  });

  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
      session_id: session.customer,
    });
  }

  return NextResponse.json({ status: 400, data: null });
}
