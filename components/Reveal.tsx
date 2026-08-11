'use client';

import { useEffect } from 'react';

/**
 * Enables scroll reveals.
 *
 * Adds `.js` to the root so the hiding rules only ever apply when script is
 * running — otherwise a script failure would leave the page invisible, which is
 * the classic way an animated site becomes a blank one.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const targets = document.querySelectorAll<HTMLElement>('.reveal');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
