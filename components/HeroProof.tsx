'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The proof, in the first screen.
 *
 * This slot used to hold an abstract animation of a layout composing itself —
 * grey and black rectangles sliding into a grid. It was pleasant to build and
 * it told a plumber nothing. The strongest evidence this business has is that
 * it produces real, working websites, and that evidence was four screens down
 * the page while the most valuable space on the site ran a screensaver.
 *
 * So it shows a real page instead. On a phone, because that is how the prospect
 * actually receives it — Jessica sends a link, they open it standing in a
 * workshop — and because step two of our own copy says "open it on your phone".
 *
 * The frame is drawn rather than imaged so it stays sharp, and the page inside
 * is live: anyone can tap through to the real thing and check it exists.
 */

const SRC = 'https://agency-previews-888-marketing.vercel.app/site/demo-valley-tree';

/** Phone-shaped viewport, rendered at real device width and scaled to fit. */
const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 780;

export default function HeroProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);

  // Eager by intent — this is above the fold — but still gated on being in view
  // so a phone that lands mid-page does not pay for it twice.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The page inside renders at true phone width and is scaled down to whatever
  // room the column has. Scaling rather than resizing keeps it an honest mobile
  // rendering instead of a squeezed desktop one.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width && height) {
        setScale(Math.min(width / DEVICE_WIDTH, height / DEVICE_HEIGHT));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden rounded-[2.25rem] border-[10px] border-ink bg-white shadow-[0_30px_60px_-25px_rgba(20,18,15,0.45)]"
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {visible ? (
          <iframe
            src={SRC}
            title="A real page we built, shown on a phone"
            loading="eager"
            // A live page from another origin: give it nothing.
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            className="h-full w-full border-0"
            scrolling="no"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-paper-deep" />
        )}
      </div>

      {/* Keeps the embed from stealing scroll and taps. */}
      <a
        href={SRC}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-10"
        aria-label="Open this example page"
      />
    </div>
  );
}
