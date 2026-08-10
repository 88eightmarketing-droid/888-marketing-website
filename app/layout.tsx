import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';

import './globals.css';

/**
 * Two families, used for different jobs: a serif that carries the display type
 * with some personality, and a neutral sans that gets out of the way in body
 * copy. A single family doing both is the most common tell of a template.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const SITE = 'https://888marketing.net';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '888 Marketing — We build your website first. You decide after.',
    template: '%s · 888 Marketing',
  },
  description:
    'Websites for local businesses. We build yours before asking for a penny — a real, working page for your business, not a mockup. Hosting and business email included.',
  keywords: [
    'web design for local business',
    'small business website',
    'restaurant website design',
    'contractor website',
    'website with hosting and email',
  ],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: '888 Marketing',
    title: '888 Marketing — We build your website first. You decide after.',
    description:
      'Websites for local businesses. We build yours before asking for a penny. Hosting and business email included.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '888 Marketing — We build your website first.',
    description:
      'Websites for local businesses. We build yours before asking for a penny.',
  },
  // This site is the opposite of the previews project: it exists to be found.
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-[family-name:var(--font-sans)] antialiased">{children}</body>
    </html>
  );
}
