import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.projectName} | Local-first desktop launcher`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.projectName} | Local-first desktop launcher`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.projectName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.projectName} | Local-first desktop launcher`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} bg-[var(--color-ink)]`}
    >
      <body className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] antialiased">
        {children}
      </body>
    </html>
  );
}
