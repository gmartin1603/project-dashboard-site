import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="grid-lines min-h-screen px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <section className="panel w-full rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">
            Checkout canceled
          </p>
          <h1 className="mt-4 font-display text-4xl text-[var(--color-paper)] sm:text-5xl">
            No payment was made.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
            Users can always return to the website checkout later or go directly to GitHub for the free public release. This page keeps that choice clear instead of treating cancellation like an error.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-amber-300/70 bg-amber-200 px-6 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-100"
            >
              Return to website
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
