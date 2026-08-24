import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

/**
 * The share card.
 *
 * Jessica sends links by text and email, so for many prospects this image is
 * the first thing they see of us — before the site, before the copy. A link
 * with no card looks like spam, which is exactly the impression a cold call
 * cannot afford.
 *
 * The display face is embedded from a local file rather than left to a system
 * fallback. Satori has no access to the browser's fonts, so an unembedded card
 * silently renders in sans — a share card in a different typeface to the site
 * it links to, which is precisely the sort of seam that reads as unconsidered.
 */

async function font(file: string) {
  return readFile(path.join(process.cwd(), 'app/fonts', file));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '888 Marketing — See your website before you pay.';

export default async function OpengraphImage() {
  const [regular, italic] = await Promise.all([
    font('InstrumentSerif-Regular.ttf'),
    font('InstrumentSerif-Italic.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f6f3ee',
          padding: '72px 80px',
          fontFamily: 'Instrument Serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 6, background: '#c8442a' }} />
          <div style={{ fontSize: 30, color: '#14120f', letterSpacing: -0.5 }}>
            888 Marketing
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 82,
            lineHeight: 1.02,
            color: '#14120f',
            letterSpacing: -2.5,
          }}
        >
          <div>See your website</div>
          <div style={{ color: '#c8442a', fontStyle: 'italic' }}>before you pay.</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#8b8377',
          }}
        >
          <div>Websites for local business</div>
          <div>Hosting + email included</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Instrument Serif', data: regular, style: 'normal', weight: 400 },
        { name: 'Instrument Serif', data: italic, style: 'italic', weight: 400 },
      ],
    },
  );
}
