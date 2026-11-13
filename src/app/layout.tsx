import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TabBar } from "@/components/tab-bar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const storeTitle = "IBN Larosh Enterprises — Modest Wear, Fragrances & Islamic Essentials";
const storeDescription =
  "Shop Hausa caps, modest wear, attars, Islamic books and essentials. Based in Ilorin, with delivery across Nigeria. Order on WhatsApp.";

export const viewport: Viewport = {
  themeColor: "#0A3B22",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: storeTitle,
    template: "%s · IBN Larosh Enterprises",
  },
  description: storeDescription,
  applicationName: "IBN Larosh Enterprises",
  openGraph: {
    siteName: "IBN Larosh Enterprises",
    locale: "en_NG",
    type: "website",
    description: storeDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "IBN Larosh Enterprises storefront",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: storeTitle,
    description: storeDescription,
    images: ["/og.png"],
  },
};

// Explicit props instead of the build-generated LayoutProps type, so
// `pnpm typecheck` works on a fresh checkout before any `next build`.
type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          className="absolute top-[-64px] left-3 z-100 rounded-full bg-gold px-4.5 py-2.5 font-semibold text-g9 transition-[top] focus-visible:top-2"
          href="#main"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <TabBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
