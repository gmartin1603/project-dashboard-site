import type { Metadata } from "next";
import {
  Archivo_Black,
  Bebas_Neue,
  Chivo,
  Cormorant_Garamond,
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  Manrope,
  Orbitron,
  Playfair_Display,
  Public_Sans,
  Sora,
  Space_Mono,
} from "next/font/google";
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

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
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
  const fontVariables = [
    displayFont.variable,
    bodyFont.variable,
    sora.variable,
    chivo.variable,
    cormorantGaramond.variable,
    manrope.variable,
    archivoBlack.variable,
    ibmPlexMono.variable,
    orbitron.variable,
    spaceMono.variable,
    playfairDisplay.variable,
    inter.variable,
    bebasNeue.variable,
    publicSans.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVariables} bg-[var(--color-ink)]`}>
      <body className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] antialiased">
        {children}
      </body>
    </html>
  );
}
