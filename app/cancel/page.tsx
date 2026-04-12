import Link from "next/link";
import { defaultThemeId, resolveThemeId, themesWithGridLines } from "@/lib/themes";

type CancelPageProps = {
  searchParams: Promise<{
    theme?: string | string[];
  }>;
};

function joinClasses(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const { theme } = await searchParams;
  const selectedTheme = resolveThemeId(theme) ?? defaultThemeId;
  const themeClassName = `theme-${selectedTheme}`;
  const homeHref = theme ? `/?theme=${selectedTheme}` : "/";

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
            Checkout canceled
          </p>
          <h1 className="theme-status-title mt-4 font-display text-4xl sm:text-5xl">
            No payment was made.
          </h1>
          <p className="theme-status-copy mt-5 max-w-2xl text-base leading-8">
            Users can always return to the website checkout later or go directly to GitHub for the free public release. This page keeps that choice clear instead of treating cancellation like an error.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={homeHref}
              className="theme-button-primary inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
            >
              Return to website
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
