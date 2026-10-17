import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IBN Larosh Enterprises — Quality Hausa Caps",
  description:
    "Quality and fancy Hausa caps in every size, colour and design. Tajia, kaftan caps, custom weaving. Order directly on WhatsApp. Ilorin, Kwara State.",
};

// Explicit props instead of the build-generated LayoutProps type, so
// `pnpm typecheck` works on a fresh checkout before any `next build`.
type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
