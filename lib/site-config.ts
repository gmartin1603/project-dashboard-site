const defaultPriceUsd = Number(process.env.NEXT_PUBLIC_DOWNLOAD_PRICE_USD ?? "3");

export const siteConfig = {
  projectName: "Project Name",
  tagline: "A release website template for open-source apps that still gives people an easy way to pay.",
  description:
    "Launch pages for software releases should explain the product, show credibility, point to the public repository, and make downloading simple whether someone pays on your site or grabs it free from GitHub.",
  repoUrl: "https://github.com/your-org/your-project",
  releasesUrl: "https://github.com/your-org/your-project/releases/latest",
  licenseName: "MIT",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "usd",
  priceUsd:
    Number.isFinite(defaultPriceUsd) && defaultPriceUsd > 0 ? defaultPriceUsd : 3,
  heroNote:
    "Charge for convenience on your own website while keeping the public source and GitHub releases available for free.",
  supportNote:
    "Visitors can pay on your site to support the project or go straight to GitHub for the same public release.",
  checkoutDescription:
    "Support the project directly and get sent right back to the latest public release download.",
  features: [
    {
      title: "Release-focused messaging",
      description:
        "Give every shipped version a proper home with feature highlights, trust signals, and a clear install story.",
    },
    {
      title: "Paid download without lock-in",
      description:
        "Accept support payments through Stripe while still linking to the public GitHub release for open-source transparency.",
    },
    {
      title: "Template-driven content",
      description:
        "Update one config file to reuse the same site structure for your next project, release, or product line.",
    },
  ],
  facts: [
    { label: "Default price", value: "$3 USD" },
    { label: "License", value: "MIT" },
    { label: "Distribution", value: "Website checkout and GitHub Releases" },
  ],
  faq: [
    {
      question: "Why would someone pay if the release is free on GitHub?",
      answer:
        "Because some users want the simplest checkout-and-download flow and want to support ongoing open-source maintenance directly.",
    },
    {
      question: "What happens after payment?",
      answer:
        "Stripe Checkout completes on your domain, the user lands on a success page, and the site sends them to the public release download. Stripe also captures their email for receipts.",
    },
    {
      question: "Can I change the project details later?",
      answer:
        "Yes. Update lib/site-config.ts and the environment variables to rename the project, adjust the price, and point to a different public repository or release URL.",
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
