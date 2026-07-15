import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

// Inter for UI + body (design §8). Min weight 400 — weights <= 300 are forbidden.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Newsreader (serif) for display headings + wordmark — the "citable, authoritative
// record" character. Proposed addition to §8 (see globals.css note). Body stays Inter.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarkari-Sahayak — Aadhaar update help, with citations",
  description:
    "An independent, open-source assistant for Aadhaar updates. Plain-language answers, every claim linked to an official UIDAI source. Not an official UIDAI service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="paper-field min-h-full flex flex-col">{children}</body>
    </html>
  );
}
