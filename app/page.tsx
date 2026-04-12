import Image from "next/image";
import { DownloadButton } from "@/components/download-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { isStripeConfigured } from "@/lib/stripe";
import {
  defaultThemeId,
  isThemeSwitcherEnabled,
  resolveThemeId,
  themesWithGridLines,
} from "@/lib/themes";

type HomePageProps = {
  searchParams: Promise<{
    theme?: string | string[];
  }>;
};

function joinClasses(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default async function Home({ searchParams }: HomePageProps) {
  const { theme } = await searchParams;
  const stripeReady = isStripeConfigured();
  const themeSwitcherEnabled = isThemeSwitcherEnabled();
  const selectedTheme = resolveThemeId(theme) ?? defaultThemeId;
  const themeClassName = `theme-${selectedTheme}`;
  const priceLabel = stripeReady
    ? `Pay ${formatUsd(siteConfig.priceUsd)} and download`
    : "Payment setup coming soon";
  const usesGridLines = themesWithGridLines.includes(selectedTheme);
  const isNeon = selectedTheme === "neon-editorial";
  const isPaper = selectedTheme === "paper-atelier";
  const isIndustrial = selectedTheme === "industrial-terminal";

  return (
    <>
      {themeSwitcherEnabled ? <ThemeSwitcher activeTheme={selectedTheme} /> : null}
      <main className={joinClasses("theme-shell min-h-screen", themeClassName, usesGridLines && "grid-lines")}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
          <header className="flex flex-col gap-6 border-b border-[var(--color-divider)] pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className={joinClasses("text-xs uppercase tracking-[0.32em] theme-eyebrow", isPaper && "eyebrow-rule", isIndustrial && "status-line") }>
              Open-source release website template
            </p>
            <div>
              <h1 className="font-display text-4xl tracking-tight text-[var(--color-paper)] sm:text-5xl lg:text-6xl">
                {siteConfig.projectName}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                {siteConfig.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-button-secondary rounded-full px-5 py-3 transition"
            >
              Public Repo
            </a>
            <a
              href={siteConfig.releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-button-secondary rounded-full px-5 py-3 transition"
            >
              GitHub Releases
            </a>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="space-y-6">
              <p className={joinClasses("max-w-3xl text-sm uppercase tracking-[0.32em] theme-eyebrow", isPaper && "eyebrow-rule", isIndustrial && "status-line")}>
                Open local projects faster. Support the tool if it earns a place in your daily flow.
              </p>
              <h2 className="font-display max-w-4xl text-5xl leading-none tracking-tight text-[var(--color-paper)] sm:text-6xl lg:text-7xl">
                A desktop launcher for people with too many repos and not enough patience.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                {siteConfig.description}
              </p>
            </div>

            <div className={joinClasses("panel rounded-[2rem] p-8 sm:p-10", isNeon && "glow-outline aurora-card", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <p className={joinClasses("text-xs uppercase tracking-[0.3em] theme-eyebrow", isPaper && "eyebrow-rule")}>
                    Why Project Dashboard works
                  </p>
                  <p className="font-display text-3xl leading-tight text-[var(--color-paper)] sm:text-4xl">
                    {siteConfig.heroNote}
                  </p>
                  <p className="max-w-xl text-base leading-7 text-[var(--color-muted)]">
                    {siteConfig.supportNote}
                  </p>
                </div>

                <div className="theme-soft-card grid gap-4 rounded-[1.5rem] p-5">
                  {siteConfig.facts.map((fact) => (
                    <div key={fact.label} className="border-b border-[var(--color-soft-border)] pb-4 last:border-b-0 last:pb-0">
                      <p className="theme-eyebrow text-xs uppercase tracking-[0.26em]">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-lg font-medium text-[var(--color-paper)]">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {siteConfig.features.map((feature) => (
                <article key={feature.title} className={joinClasses("panel rounded-[1.75rem] p-6", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
                  <p className="theme-eyebrow text-xs uppercase tracking-[0.28em]">
                    Feature
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-[var(--color-paper)]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className={joinClasses("panel sticky top-8 rounded-[2rem] p-8 sm:p-10", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
            <p className="theme-eyebrow text-xs uppercase tracking-[0.32em]">
              Download options
            </p>
            <div className="mt-5 border-b border-[var(--color-divider)] pb-7">
              <p className="font-display text-4xl text-[var(--color-paper)] sm:text-5xl">
                {formatUsd(siteConfig.priceUsd)}
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                Support the project from the website, then jump straight into a direct Linux asset download. The full public release page stays available on GitHub.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <DownloadButton
                label={priceLabel}
                disabled={!stripeReady}
                theme={selectedTheme}
                buttonClassName="theme-button-primary inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5 disabled:cursor-not-allowed"
                errorClassName="text-sm text-[var(--color-error)]"
              />
              <a
                href={siteConfig.releasesUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-button-secondary inline-flex min-h-14 w-full items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
              >
                Download free on GitHub
              </a>
            </div>

            <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                Paid checkout is handled by Stripe. Linux buyers can be redirected straight to the download asset, and the app stays open source with the public repo linked directly.
              </p>
              <p>
                Direct website delivery currently targets the Linux AppImage. Other package formats remain available from the public GitHub release.
              </p>
              {!stripeReady ? (
                <p className="theme-soft-card rounded-2xl px-4 py-3 theme-eyebrow">
                  Website payments are not live yet. Use the free GitHub download for now.
                </p>
              ) : null}
            </div>
          </aside>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className={joinClasses("panel rounded-[2rem] p-8 sm:p-10", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
            <p className="theme-eyebrow text-xs uppercase tracking-[0.32em]">
              Latest release
            </p>
            <div className="mt-4 flex flex-col gap-4 border-b border-[var(--color-divider)] pb-8">
              <h2 className="font-display text-3xl text-[var(--color-paper)] sm:text-4xl">
                {siteConfig.projectName} {siteConfig.latestVersion}
              </h2>
              {isIndustrial ? <p className="status-line w-fit">release synced: {siteConfig.latestVersion}</p> : null}
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                Current packaged downloads are published as Linux release assets. If you want to support the app first, use the checkout. If you just want the files, GitHub Releases stays public.
              </p>
              <a
                href={siteConfig.latestReleaseUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-button-secondary inline-flex w-fit items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition hover:-translate-y-0.5"
              >
                View release notes
              </a>
            </div>

            <div className="mt-8 grid gap-4">
              {siteConfig.releaseAssets.map((asset) => (
                <a
                  key={asset.fileName}
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-soft-card rounded-[1.5rem] p-5 transition hover:border-[var(--color-accent-strong)]"
                >
                  <p className="theme-eyebrow text-xs uppercase tracking-[0.26em]">
                    {asset.name}
                  </p>
                  <p className="mt-3 break-all text-sm leading-7 text-[var(--color-paper)]">
                    {asset.fileName}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {siteConfig.screenshots.map((screenshot) => (
              <article key={screenshot.title} className={joinClasses("panel overflow-hidden rounded-[2rem]", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
                <Image
                  src={screenshot.imageUrl}
                  alt={screenshot.title}
                  width={1600}
                  height={1000}
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
                <div className="p-6 sm:p-8">
                  <p className="theme-eyebrow text-xs uppercase tracking-[0.3em]">
                    Screenshot
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-[var(--color-paper)]">
                    {screenshot.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {screenshot.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={joinClasses("panel rounded-[2rem] p-8 sm:p-10", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
            <p className="theme-eyebrow text-xs uppercase tracking-[0.32em]">
              Open source first
            </p>
            <h2 className="mt-4 font-display text-3xl text-[var(--color-paper)] sm:text-4xl">
              The source stays public, the downloads stay public, and the support path stays optional.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              Project Dashboard is MIT licensed, published in the open, and built for developers who want less friction getting back into active workspaces. The website simply gives supporters a cleaner path to contribute.
            </p>
            <dl className="mt-8 grid gap-4 text-sm text-[var(--color-muted)]">
              <div className="theme-soft-card rounded-[1.4rem] p-5">
                <dt className="theme-eyebrow text-xs uppercase tracking-[0.26em]">
                  Public repo
                </dt>
                <dd className="mt-2 break-all text-[var(--color-paper)]">
                  {siteConfig.repoUrl}
                </dd>
              </div>
              <div className="theme-soft-card rounded-[1.4rem] p-5">
                <dt className="theme-eyebrow text-xs uppercase tracking-[0.26em]">
                  License
                </dt>
                <dd className="mt-2 text-[var(--color-paper)]">{siteConfig.licenseName}</dd>
              </div>
            </dl>
          </div>

          <div className={joinClasses("panel rounded-[2rem] p-8 sm:p-10", isNeon && "glow-outline", isPaper && "paper-frame", isIndustrial && "terminal-frame")}>
            <p className="theme-eyebrow text-xs uppercase tracking-[0.32em]">FAQ</p>
            <div className="mt-6 divide-y divide-[var(--color-soft-border)]">
              {siteConfig.faq.map((item) => (
                <article key={item.question} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-display text-2xl text-[var(--color-paper)]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        </div>
      </main>
    </>
  );
}
