import Link from "next/link";
import { themeDefinitions, type ThemeId } from "@/lib/themes";

type ThemeSwitcherProps = {
  activeTheme: ThemeId;
};

export function ThemeSwitcher({ activeTheme }: ThemeSwitcherProps) {
  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-[1.5rem] border border-white/12 bg-stone-950/88 p-4 text-stone-100 shadow-2xl backdrop-blur-md">
      <p className="text-[11px] uppercase tracking-[0.28em] text-stone-400">Theme selector</p>
      <div className="mt-3 grid gap-2">
        {themeDefinitions.map((theme) => {
          const isActive = theme.id === activeTheme;

          return (
            <Link
              key={theme.id}
              href={`/?theme=${theme.id}`}
              className={`rounded-2xl border px-3 py-2 transition ${
                isActive
                  ? "border-amber-300/60 bg-amber-200/12 text-white"
                  : "border-white/10 bg-white/4 text-stone-300 hover:border-white/20 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className="block text-sm font-semibold">{theme.label}</span>
              <span className="mt-1 block text-xs leading-5 text-stone-400">
                {theme.description}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
