import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ToastProvider } from "@/components/ui/toast";
import { CookieConsentProvider } from "@/components/layout/cookie-consent";
import { getSiteUrl } from "@/lib/env";

import "./globals.css";

/**
 * Typography (DESIGN.md 4.1, 17.2).
 *
 * DM Serif Display is reserved for editorial headings, Inter for interface
 * and body text. Both families are self-hosted from `public/fonts` so a build
 * never depends on an external font service, and each family loads a single
 * subset with a system fallback.
 */
const inter = localFont({
  src: [{ path: "../../public/fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const interTight = localFont({
  src: [
    { path: "../../public/fonts/inter-tight-latin.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/inter-tight-latin-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-serif-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

const dmSerifDisplay = localFont({
  src: [
    { path: "../../public/fonts/dm-serif-display-latin.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-dm-serif-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

/**
 * Fredoka & Nunito (Item 20).
 * Configured efficiently via Next.js font system with font-display: swap,
 * minimum required weights, and size fallback.
 */
import { Fredoka, Nunito } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-fredoka",
  fallback: ["system-ui", "sans-serif"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-nunito",
  fallback: ["system-ui", "sans-serif"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HAVEN Estates Addis | Architectural Sanctuaries",
    template: "%s | HAVEN Estates Addis",
  },
  description:
    "Curated residential sales, bespoke leasing, and architectural compounds across Addis Ababa's prime diplomatic and residential districts.",
  applicationName: "HAVEN Estates Addis",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#252723",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "HAVEN Estates Addis",
    locale: "en_ET",
    url: siteUrl,
    title: "HAVEN Estates Addis | Architectural Sanctuaries",
    description:
      "Curated residential sales, bespoke leasing, and architectural compounds across Addis Ababa's prime diplomatic and residential districts.",
    images: [
      {
        url: `${siteUrl}/api/og?title=HAVEN%20Estates%20Addis&type=Architectural%20Sanctuaries`,
        width: 1200,
        height: 630,
        alt: "HAVEN Estates Addis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAVEN Estates Addis | Architectural Sanctuaries",
    description:
      "Curated residential sales, bespoke leasing, and architectural compounds across Addis Ababa's prime diplomatic and residential districts.",
    images: [`${siteUrl}/api/og?title=HAVEN%20Estates%20Addis&type=Architectural%20Sanctuaries`],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${dmSerifDisplay.variable} ${fredoka.variable} ${nunito.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-text-primary antialiased">
        <ToastProvider>
          <CookieConsentProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-text-inverse"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </CookieConsentProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
