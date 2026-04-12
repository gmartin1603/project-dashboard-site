const defaultPriceUsd = Number(process.env.NEXT_PUBLIC_DOWNLOAD_PRICE_USD ?? "3");

export const siteConfig = {
  projectName: "Project Dashboard",
  latestVersion: "v0.5.0",
  tagline:
    "A local-first desktop launcher for development folders, VS Code workspaces, and quick git context.",
  description:
    "Project Dashboard scans a configurable code root, finds development projects and workspace files, and gives you one place to reopen folders, inspect local git history, and keep your launcher close from the system tray.",
  repoUrl: "https://github.com/gmartin1603/project-dashboard",
  releasesUrl: "https://github.com/gmartin1603/project-dashboard/releases/latest",
  latestReleaseUrl:
    "https://github.com/gmartin1603/project-dashboard/releases/tag/v0.5.0",
  licenseName: "MIT",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "usd",
  priceUsd:
    Number.isFinite(defaultPriceUsd) && defaultPriceUsd > 0 ? defaultPriceUsd : 3,
  heroNote:
    "Pay on the website to support development, or grab the exact same open-source build from GitHub Releases for free.",
  supportNote:
    "Project Dashboard is MIT licensed and fully public. The paid path is for convenience and support, not for hiding the software.",
  checkoutDescription:
    "Support Project Dashboard directly and get sent right back to the latest public release download.",
  features: [
    {
      title: "Local project launcher",
      description:
        "Scan a local code root, detect project folders and VS Code workspace files, and jump back into work quickly.",
    },
    {
      title: "Git context without leaving the app",
      description:
        "Browse local branches, inspect recent commits, and review commit details before opening the repo elsewhere.",
    },
    {
      title: "Tray-friendly desktop workflow",
      description:
        "Keep the launcher available from the system tray, refresh quickly, and reopen projects without rebuilding your mental state.",
    },
  ],
  facts: [
    { label: "Current release", value: "v0.5.0" },
    { label: "Support price", value: "$3 USD" },
    { label: "License", value: "MIT" },
    { label: "Distribution", value: "Website checkout, .deb, .rpm, and AppImage" },
  ],
  releaseAssets: [
    {
      name: "Debian package",
      fileName: "Project.Dashboard_0.5.0_amd64.deb",
      url: "https://github.com/gmartin1603/project-dashboard/releases/download/v0.5.0/Project.Dashboard_0.5.0_amd64.deb",
    },
    {
      name: "RPM package",
      fileName: "Project.Dashboard-0.5.0-1.x86_64.rpm",
      url: "https://github.com/gmartin1603/project-dashboard/releases/download/v0.5.0/Project.Dashboard-0.5.0-1.x86_64.rpm",
    },
    {
      name: "AppImage",
      fileName: "Project.Dashboard_0.5.0_amd64.AppImage",
      url: "https://github.com/gmartin1603/project-dashboard/releases/download/v0.5.0/Project.Dashboard_0.5.0_amd64.AppImage",
    },
  ],
  screenshots: [
    {
      title: "Project grid",
      description:
        "See your local folders, workspace files, timestamps, and stack hints in one launcher view.",
      imageUrl: "/screenshots/dashboard.png",
    },
    {
      title: "Settings",
      description:
        "Change the scanned root, appearance, and launcher behavior without leaving the app.",
      imageUrl: "/screenshots/settings.png",
    },
  ],
  faq: [
    {
      question: "Why pay if the release is public on GitHub?",
      answer:
        "Because some users want a direct support path for the project and prefer downloading from the website while still knowing the code and releases remain public.",
    },
    {
      question: "What platforms are currently packaged?",
      answer:
        "The latest release currently ships Linux artifacts as .deb, .rpm, and AppImage packages through GitHub Releases.",
    },
    {
      question: "What happens after payment?",
      answer:
        "Stripe Checkout completes on this site, then the success page sends you to the latest public Project Dashboard release. If email fulfillment is configured, the release link can be emailed too.",
    },
  ],
};

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
