export const themeDefinitions = [
  {
    id: "classic",
    label: "Classic",
    description: "Original warm release template",
  },
  {
    id: "neon-editorial",
    label: "Neon Editorial",
    description: "Aurora gradients and sharper editorial framing",
  },
  {
    id: "paper-atelier",
    label: "Paper Atelier",
    description: "Quiet print-inspired magazine layout",
  },
  {
    id: "industrial-terminal",
    label: "Industrial Terminal",
    description: "Dense mono utility interface",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    description: "Neon hacker storefront with rigid panels",
  },
  {
    id: "minimal-zen",
    label: "Minimal Zen",
    description: "Restrained light composition with extra whitespace",
  },
  {
    id: "comic-book",
    label: "Comic Book",
    description: "Pop-art panels with oversized attitude",
  },
] as const;

export type ThemeId = (typeof themeDefinitions)[number]["id"];

export const themesWithGridLines: ThemeId[] = [
  "classic",
  "neon-editorial",
  "paper-atelier",
  "industrial-terminal",
];

export const defaultThemeId: ThemeId = resolveThemeId(process.env.SITE_THEME) ?? "classic";

export function isThemeSwitcherEnabled() {
  return resolveBooleanEnv(process.env.SHOW_THEME_SWITCHER, true);
}

export function resolveThemeId(value: string | string[] | null | undefined): ThemeId | null {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate) {
    return null;
  }

  return themeDefinitions.find((theme) => theme.id === candidate)?.id ?? null;
}

function resolveBooleanEnv(
  value: string | null | undefined,
  defaultValue: boolean,
): boolean {
  if (!value) {
    return defaultValue;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (["0", "false", "no", "off"].includes(normalizedValue)) {
    return false;
  }

  if (["1", "true", "yes", "on"].includes(normalizedValue)) {
    return true;
  }

  return defaultValue;
}
