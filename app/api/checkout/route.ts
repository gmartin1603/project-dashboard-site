import { NextResponse } from "next/server";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { getStripeServerClient, isStripeConfigured } from "@/lib/stripe";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY first." },
      { status: 500 },
    );
  }

  try {
    const stripe = getStripeServerClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      customer_creation: "always",
      success_url: `${siteConfig.siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.siteUrl}/cancel`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: siteConfig.currency,
            unit_amount: Math.round(siteConfig.priceUsd * 100),
            product_data: {
              name: `${siteConfig.projectName} download support`,
              description: siteConfig.checkoutDescription,
            },
          },
        },
      ],
      metadata: {
        download_url: siteConfig.releasesUrl,
        repo_url: siteConfig.repoUrl,
        project_name: siteConfig.projectName,
        purchase_amount: formatUsd(siteConfig.priceUsd),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
