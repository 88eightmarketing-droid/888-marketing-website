import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const SITE = "https://888marketing.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "888 Marketing — Websites for local business, from $499.", template: "%s · 888 Marketing" },
  description: "Websites for local businesses. We build yours before asking for a penny — a real, working page for your business, not a mockup. From $499, hosting and business email included.",
  keywords: ["web design for local business", "small business website", "restaurant website design", "contractor website", "website with hosting and email"],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "888 Marketing",
    title: "888 Marketing — Websites for local business, from $499.",
    description: "Websites for local businesses. We build yours before asking for a penny. Hosting and business email included.",
  },
  twitter: { card: "summary_large_image", title: "888 Marketing — Websites for local business, from $499.", description: "Websites for local businesses. We build yours before asking for a penny." },
  // This site exists to be found (the inverse of agency-previews).
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[anton.variable, inter.variable, "antialiased"].join(" ")}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
