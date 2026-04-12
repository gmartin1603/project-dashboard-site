import Link from "next/link";
import { headers } from "next/headers";
import { AutoDownload } from "@/components/auto-download";
import {
  detectPlatform,
  getDownloadRouteUrl,
  getDownloadUrl,
  getPlatformLabel,
  hasDirectDownloadUrl,
} from "@/lib/download";
import { isDownloadEmailConfigured } from "@/lib/email";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { getStripeServerClient, isStripeConfigured } from "@/lib/stripe";
import { defaultThemeId, resolveThemeId, themesWithGridLines } from "@/lib/themes";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
    theme?: string | string[];
  }>;
};

function joinClasses(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId, theme } = await searchParams;
  const requestHeaders = await headers();
  const platform = detectPlatform(requestHeaders.get("user-agent"));
  const selectedTheme = resolveThemeId(theme) ?? defaultThemeId;
  const themeClassName = `theme-${selectedTheme}`;
  const homeHref = theme ? `/?theme=${selectedTheme}` : "/";
  const platformLabel = getPlatformLabel(platform);
  const downloadRouteUrl = getDownloadRouteUrl();
  const resolvedDownloadUrl = getDownloadUrl(platform);

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

  const hasDirectAsset = hasDirectDownloadUrl(platform);
  const canAutoDownload = paymentVerified && hasDirectDownloadUrl(platform);
  const primaryDownloadUrl = canAutoDownload
    ? downloadRouteUrl
    : hasDirectAsset
      ? resolvedDownloadUrl
      : siteConfig.releasesUrl;
  const primaryDownloadMetaLabel = canAutoDownload
    ? "Download route"
    : hasDirectAsset
      ? "Direct download"
      : "Release page";
  const primaryDownloadLabel = hasDirectAsset
    ? `Download for ${platformLabel}`
    : "Open latest release";
  const secondaryDownloadUrl = canAutoDownload
    ? resolvedDownloadUrl
    : siteConfig.latestReleaseUrl;
  const secondaryDownloadMetaLabel = canAutoDownload ? "Resolved asset" : "Release notes";
  const secondaryDownloadLabel = canAutoDownload
    ? `${platformLabel} direct asset`
    : `${siteConfig.projectName} ${siteConfig.latestVersion}`;

  return (
    <main
      className={joinClasses(
        "theme-shell theme-status-shell min-h-screen px-6 py-10 sm:px-10 lg:px-14",
        themeClassName,
        themesWithGridLines.includes(selectedTheme) && "grid-lines",
      )}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <section className="theme-status-panel panel w-full p-8 sm:p-10">
          <p className="theme-status-eyebrow text-xs uppercase tracking-[0.32em]">
            Checkout success
          </p>
          <AutoDownload
            downloadUrl={downloadRouteUrl}
            enabled={canAutoDownload}
            className="theme-status-copy mt-4 text-sm leading-7"
          />
          <h1 className="theme-status-title mt-4 font-display text-4xl sm:text-5xl">
            {paymentVerified ? "Payment received." : "Payment confirmation is still pending."}
          </h1>
          <p className="theme-status-copy mt-5 text-base leading-8">
            {paymentVerified
              ? canAutoDownload
                ? `Thanks for supporting ${siteConfig.projectName}. We detected ${platformLabel} and will start that asset download automatically. ${emailDeliveryReady ? "The Stripe webhook can send the same download link to the checkout email as well." : "Stripe will use the checkout email for the payment receipt."}`
                : `Thanks for supporting ${siteConfig.projectName}. Direct website downloads are not configured for ${platformLabel}, so this page falls back to the public GitHub release.`
              : "If Stripe has not redirected back with a valid session yet, you can still grab the latest release from GitHub while you verify the payment status in Stripe."}
          </p>

          <div className="theme-status-meta mt-8 grid gap-4 rounded-[1.6rem] p-6 text-sm leading-7">
            <p>
              Purchase amount: <span className="theme-status-strong">{formatUsd(siteConfig.priceUsd)}</span>
            </p>
            <p>
              {primaryDownloadMetaLabel}:{" "}
              <a
                href={primaryDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-status-link"
              >
                {primaryDownloadLabel}
              </a>
            </p>
            <p>
              {secondaryDownloadMetaLabel}:{" "}
              <a
                href={secondaryDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-status-link"
              >
                {secondaryDownloadLabel}
              </a>
            </p>
            <p>
              Detected platform: <span className="theme-status-strong">{platformLabel}</span>
            </p>
            <p>
              Receipt email:{" "}
              <span className="theme-status-strong">{customerEmail ?? "Captured by Stripe when available"}</span>
            </p>
            <p>
              Follow-up email:{" "}
              <span className="theme-status-strong">
                {emailDeliveryReady
                  ? "Enabled through the Stripe webhook"
                  : "Optional. Configure Resend to send a download email."}
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={primaryDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-button-primary inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
            >
              {primaryDownloadLabel}
            </a>
            <Link
              href={homeHref}
              className="theme-button-secondary inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
            >
              Back to website
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
