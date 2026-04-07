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
                Ship the release. Explain the value. Let users choose how to support it.
              </p>
              <h2 className="font-display max-w-4xl text-5xl leading-none tracking-tight text-[var(--color-paper)] sm:text-6xl lg:text-7xl">
                A storefront for software that stays honest about being open source.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                {siteConfig.description}
              </p>
            </div>

            <div className="panel rounded-[2rem] p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
                    Why this template works
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
                Charge for the smoothest checkout flow, keep the source public, and send supporters straight to the latest release.
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

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
              Open source first
            </p>
            <h2 className="mt-4 font-display text-3xl text-[var(--color-paper)] sm:text-4xl">
              Make the public repository part of the sales story.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              Explain how the project is built, link to issues and release notes, and show the license right next to the commercial support path. Transparency is the point.
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
