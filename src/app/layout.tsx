import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Opener from "@/site/Opener";
import { profiles } from "@/brand/profiles";

// Anton is kept only for the archived sections still in the tree; it is not preloaded.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", preload: false });
// Variable Inter with its optical-size axis: at headline sizes it draws its tighter display cut.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });

const SITE = "https://888marketing.net";

/**
 * Organization + WebSite schema. `sameAs` is what joins the profiles to this site
 * in Google's and the AI assistants' picture of 888. No address, phone or rating:
 * we only state what we can show.
 */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "888 Marketing",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      description: "Design studio for local businesses: websites, Google presence, content and brand.",
      areaServed: { "@type": "Place", name: "San Francisco Bay Area" },
      sameAs: profiles.map((p) => p.href),
    },
    { "@type": "WebSite", "@id": `${SITE}/#site`, url: SITE, name: "888 Marketing", publisher: { "@id": `${SITE}/#org` } },
  ],
};

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
  // iPhones turn digits into tel: links and break hydration (React 418).
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[anton.variable, inter.variable, "antialiased"].join(" ")} suppressHydrationWarning>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Opener />
        {children}
      </body>
    </html>
  );
}
