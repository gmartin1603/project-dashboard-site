import Link from "next/link";
import { isDownloadEmailConfigured } from "@/lib/email";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { getStripeServerClient, isStripeConfigured } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let paymentVerified = false;
  let customerEmail: string | null = null;
  const emailDeliveryReady = isDownloadEmailConfigured();

  if (sessionId && isStripeConfigured()) {
    try {
      const stripe = getStripeServerClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      paymentVerified =
        session.payment_status === "paid" || session.status === "complete";
      customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
    } catch {
      paymentVerified = false;
    }
  }

  return (
    <main className="grid-lines min-h-screen px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <section className="panel w-full rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
            Checkout success
          </p>
          <h1 className="mt-4 font-display text-4xl text-[var(--color-paper)] sm:text-5xl">
            {paymentVerified ? "Payment received." : "Payment confirmation is still pending."}
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            {paymentVerified
              ? `Thanks for supporting ${siteConfig.projectName}. The same public release is available below, and ${emailDeliveryReady ? "the Stripe webhook can send the download link to the checkout email as well." : "Stripe will use the checkout email for the payment receipt."}`
              : "If Stripe has not redirected back with a valid session yet, you can still grab the latest release from GitHub while you verify the payment status in Stripe."}
          </p>

          <div className="mt-8 grid gap-4 rounded-[1.6rem] border border-white/8 bg-black/15 p-6 text-sm leading-7 text-[var(--color-muted)]">
            <p>
              Purchase amount: <span className="text-[var(--color-paper)]">{formatUsd(siteConfig.priceUsd)}</span>
            </p>
            <p>
              Download destination:{" "}
              <a
                href={siteConfig.releasesUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-100 underline decoration-amber-200/40 underline-offset-4"
              >
                {siteConfig.releasesUrl}
              </a>
            </p>
            <p>
              Receipt email:{" "}
              <span className="text-[var(--color-paper)]">{customerEmail ?? "Captured by Stripe when available"}</span>
            </p>
            <p>
              Follow-up email:{" "}
              <span className="text-[var(--color-paper)]">
                {emailDeliveryReady
                  ? "Enabled through the Stripe webhook"
                  : "Optional. Configure Resend to send a download email."}
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={siteConfig.releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-amber-300/70 bg-amber-200 px-6 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-100"
            >
              Open latest release
            </a>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 px-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-paper)] transition hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-white/5"
            >
              Back to website
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
