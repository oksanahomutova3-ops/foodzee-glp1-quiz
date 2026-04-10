import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY is not set' }, { status: 500 });
  }

  const stripe = new Stripe(key);

  let body: { locale?: string } = {};
  try {
    body = await req.json();
  } catch {}
  const locale = (body.locale || 'en').replace(/[^a-z]/gi, '').slice(0, 5) || 'en';

  const origin =
    req.headers.get('origin') ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const amount = Number(process.env.STRIPE_PRICE_AMOUNT || 3000); // cents
  const currency = (process.env.STRIPE_PRICE_CURRENCY || 'usd').toLowerCase();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'FoodZee GLP-1 Personalized Plan',
              description: 'Personalized nutrition plan for GLP-1 users',
            },
            unit_amount: amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&lang=${locale}`,
      cancel_url: `${origin}/${locale}?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err?.message || err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
