import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  detectPlatform,
  getDownloadRouteUrl,
  getDownloadUrl,
  getPlatformLabel,
  isPaidDownloadSupported,
} from "@/lib/download";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { getStripeServerClient, isStripeConfigured } from "@/lib/stripe";
import { resolveThemeId } from "@/lib/themes";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY first." },
      { status: 500 },
    );
  }

  try {
    const payload = (await request.json().catch(() => ({}))) as { theme?: string | null };
    const selectedTheme = resolveThemeId(payload.theme);
    const requestHeaders = await headers();
    const platform = detectPlatform(requestHeaders.get("user-agent"));
    const successUrl = new URL(`${siteConfig.siteUrl}/success`);
    const cancelUrl = new URL(`${siteConfig.siteUrl}/cancel`);

    successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");

    if (selectedTheme) {
      successUrl.searchParams.set("theme", selectedTheme);
      cancelUrl.searchParams.set("theme", selectedTheme);
    }

    if (!isPaidDownloadSupported(platform)) {
      return NextResponse.json(
        {
          error: `Direct paid download is not available for ${getPlatformLabel(platform)} yet. Use the free GitHub release instead.`,
        },
        { status: 400 },
      );
    }

    const downloadUrl = getDownloadUrl(platform);
    const stripe = getStripeServerClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      customer_creation: "always",
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
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
        download_url: getDownloadRouteUrl(),
        resolved_download_url: downloadUrl,
        release_url: siteConfig.releasesUrl,
        repo_url: siteConfig.repoUrl,
        project_name: siteConfig.projectName,
        purchase_amount: formatUsd(siteConfig.priceUsd),
        platform,
        theme_id: selectedTheme ?? "classic",
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
