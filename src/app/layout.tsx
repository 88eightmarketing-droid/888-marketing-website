import type { Metadata } from "next";
import { Anton, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Opener from "@/site/Opener";

// Anton is kept only for the archived sections still in the tree; it is not preloaded.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", preload: false });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const SITE = "https://888marketing.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "888 Marketing — Design studio for websites and brands", template: "%s · 888 Marketing" },
  description: "888 Marketing is a design studio. We design and build websites, brand identities and the photography behind them for businesses that intend to lead their market.",
  keywords: ["web design studio", "brand identity", "website design and development", "Bay Area web design", "small business branding"],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "888 Marketing",
    title: "888 Marketing — Design studio for websites and brands",
    description: "888 Marketing is a design studio. We design and build websites, brand identities and the photography behind them for businesses that intend to lead their market.",
  },
  twitter: { card: "summary_large_image", title: "888 Marketing — Design studio for websites and brands", description: "888 Marketing is a design studio. We design and build websites, brand identities and the photography behind them for businesses that intend to lead their market." },
  // This site exists to be found (the inverse of agency-previews).
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[anton.variable, serif.variable, inter.variable, "antialiased"].join(" ")} suppressHydrationWarning>
      <body className="font-sans">
        <Opener />
        {children}
      </body>
    </html>
  );
}
