'use client';

import { useEffect, useState } from 'react';

/**
 * A persistent way to act, on phones.
 *
 * The page is five and a half thousand pixels long and had two calls to action
 * in it. Somebody convinced by the pricing had to scroll three thousand pixels
 * to do anything about it, which on a phone is most of a minute of thumbing
 * past things they have already decided about.
 *
 * It is the same pattern we build into a tradesman's site — a bar that stays
 * put once the hero is behind you — and using it on our own page is the honest
 * version of arguing that it works.
 *
 * Desktop is left alone: the header CTA is always in reach there, and a fixed
 * bar on a wide screen is just clutter.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Appears once the hero is scrolled past, disappears at the form so it
    // never covers the thing it is pointing at.
    const onScroll = () => {
      const form = document.getElementById('start');
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 600 && formTop > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#start"
        tabIndex={show ? 0 : -1}
        className="block bg-ink px-6 py-4 text-center text-[0.95rem] font-medium text-paper"
      >
        Get my page built — free to look
      </a>
    </div>
  );
}
