import Image from "next/image";
import { DownloadButton } from "@/components/download-button";
import { formatUsd, siteConfig } from "@/lib/site-config";
import { isStripeConfigured } from "@/lib/stripe";

export default function Home() {
  const stripeReady = isStripeConfigured();
  const priceLabel = `Pay ${formatUsd(siteConfig.priceUsd)} and download`;

  return (
    <main className="grid-lines min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
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

          <div className="flex flex-wrap gap-3 text-sm text-stone-200">
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/12 px-5 py-3 transition hover:border-amber-200/40 hover:text-amber-100"
            >
              Public Repo
            </a>
            <a
              href={siteConfig.releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/12 px-5 py-3 transition hover:border-amber-200/40 hover:text-amber-100"
            >
              GitHub Releases
            </a>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="space-y-6">
              <p className="max-w-3xl text-sm uppercase tracking-[0.32em] text-amber-200/70">
                Open local projects faster. Support the tool if it earns a place in your daily flow.
              </p>
              <h2 className="font-display max-w-4xl text-5xl leading-none tracking-tight text-[var(--color-paper)] sm:text-6xl lg:text-7xl">
                A desktop launcher for people with too many repos and not enough patience.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                {siteConfig.description}
              </p>
            </div>

            <div className="panel rounded-[2rem] p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
                    Why Project Dashboard works
                  </p>
                  <p className="font-display text-3xl leading-tight text-[var(--color-paper)] sm:text-4xl">
                    {siteConfig.heroNote}
                  </p>
                  <p className="max-w-xl text-base leading-7 text-[var(--color-muted)]">
                    {siteConfig.supportNote}
                  </p>
                </div>

                <div className="grid gap-4 rounded-[1.5rem] border border-amber-200/10 bg-black/20 p-5">
                  {siteConfig.facts.map((fact) => (
                    <div key={fact.label} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-xs uppercase tracking-[0.26em] text-amber-200/60">
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
                <article key={feature.title} className="panel rounded-[1.75rem] p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">
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

          <aside className="panel sticky top-8 rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
              Download options
            </p>
            <div className="mt-5 border-b border-white/10 pb-7">
              <p className="font-display text-4xl text-[var(--color-paper)] sm:text-5xl">
                {formatUsd(siteConfig.priceUsd)}
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                Support the project from the website, then jump straight to the newest public release on GitHub.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <DownloadButton label={priceLabel} disabled={!stripeReady} />
              <a
                href={siteConfig.releasesUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/12 px-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-paper)] transition hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-white/5"
              >
                Download free on GitHub
              </a>
            </div>

            <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                Paid checkout is handled by Stripe. The app stays open source and links to the public repo directly.
              </p>
              {!stripeReady ? (
                <p className="rounded-2xl border border-amber-200/10 bg-amber-200/5 px-4 py-3 text-amber-100">
                  Set `STRIPE_SECRET_KEY` to enable website payments.
                </p>
              ) : null}
            </div>
          </aside>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
              Latest release
            </p>
            <div className="mt-4 flex flex-col gap-4 border-b border-white/10 pb-8">
              <h2 className="font-display text-3xl text-[var(--color-paper)] sm:text-4xl">
                {siteConfig.projectName} {siteConfig.latestVersion}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                Current packaged downloads are published as Linux release assets. If you want to support the app first, use the checkout. If you just want the files, GitHub Releases stays public.
              </p>
              <a
                href={siteConfig.latestReleaseUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-paper)] transition hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-white/5"
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
                  className="rounded-[1.5rem] border border-white/8 bg-black/15 p-5 transition hover:border-amber-200/30 hover:bg-black/25"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-amber-200/60">
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
              <article key={screenshot.title} className="panel overflow-hidden rounded-[2rem]">
                <Image
                  src={screenshot.imageUrl}
                  alt={screenshot.title}
                  width={1600}
                  height={1000}
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
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
          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
              Open source first
            </p>
            <h2 className="mt-4 font-display text-3xl text-[var(--color-paper)] sm:text-4xl">
              The source stays public, the downloads stay public, and the support path stays optional.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              Project Dashboard is MIT licensed, published in the open, and built for developers who want less friction getting back into active workspaces. The website simply gives supporters a cleaner path to contribute.
            </p>
            <dl className="mt-8 grid gap-4 text-sm text-[var(--color-muted)]">
              <div className="rounded-[1.4rem] border border-white/8 bg-black/15 p-5">
                <dt className="text-xs uppercase tracking-[0.26em] text-amber-200/60">
                  Public repo
                </dt>
                <dd className="mt-2 break-all text-[var(--color-paper)]">
                  {siteConfig.repoUrl}
                </dd>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-black/15 p-5">
                <dt className="text-xs uppercase tracking-[0.26em] text-amber-200/60">
                  License
                </dt>
                <dd className="mt-2 text-[var(--color-paper)]">{siteConfig.licenseName}</dd>
              </div>
            </dl>
          </div>

          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">FAQ</p>
            <div className="mt-6 divide-y divide-white/8">
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
  );
}
