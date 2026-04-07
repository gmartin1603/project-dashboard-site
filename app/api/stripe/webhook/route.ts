import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { isDownloadEmailConfigured, sendDownloadEmail } from "@/lib/email";
import { getStripeServerClient } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const stripe = getStripeServerClient();
  const body = await request.text();
  const requestHeaders = await headers();
  const signature = requestHeaders.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? null;
      const downloadUrl = session.metadata?.download_url;
      const projectName = session.metadata?.project_name;
      const repoUrl = session.metadata?.repo_url;
      const purchaseAmount = session.metadata?.purchase_amount;

      if (
        customerEmail &&
        downloadUrl &&
        projectName &&
        repoUrl &&
        purchaseAmount &&
        isDownloadEmailConfigured()
      ) {
        await sendDownloadEmail({
          customerEmail,
          downloadUrl,
          projectName,
          repoUrl,
          amountLabel: purchaseAmount,
        });
      }

      console.log("checkout.session.completed", {
        customerEmail,
        downloadUrl,
        projectName,
        emailedDownload: Boolean(customerEmail && isDownloadEmailConfigured()),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
