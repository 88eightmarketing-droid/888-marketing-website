"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { systems } from "@/data/site";

/**
 * Beyond the website: the systems we build, with a live demo of the one
 * people ask about most — an AI chat assistant taking a booking. The demo
 * plays its scripted conversation when it scrolls into view and loops. It is
 * labelled "Demo": a generic business, no real data.
 */
export default function Systems() {
  return (
    <section id="systems" className="scroll-mt-20 overflow-hidden bg-mist py-24 text-ink md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-red" data-fade>{systems.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold leading-[0.95] tracking-[-0.055em]" data-fade>{systems.title}</h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.55] text-steel" data-fade>{systems.text}</p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-hair sm:grid-cols-2">
            {systems.items.map((it, n) => (
              <li key={it.title} className="group bg-white p-6 transition-colors duration-300 hover:bg-[#fbfbfb]" data-fade style={{ "--d": `${n * 60}ms` } as CSSProperties}>
                <Icon name={it.icon} />
                <p className="mt-4 text-[18px] font-bold tracking-[-0.02em]">{it.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-steel">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 md:pl-6">
          <div className="md:sticky md:top-28">
            <ChatDemo />
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- chat demo ---- */

function ChatDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.4 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion: show the whole conversation at once.
      const t = setTimeout(() => setShown(systems.chat.length), 0);
      return () => clearTimeout(t);
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms));
    const play = (step: number) => {
      if (step >= systems.chat.length) { later(4200, () => { setShown(0); play(0); }); return; }
      const bot = systems.chat[step].from === "bot";
      if (bot) {
        setTyping(true);
        later(1300, () => { setTyping(false); setShown(step + 1); later(900, () => play(step + 1)); });
      } else {
        later(700, () => { setShown(step + 1); later(600, () => play(step + 1)); });
      }
    };
    play(shown >= systems.chat.length ? 0 : shown);
    return () => { cancelled = true; timers.forEach(clearTimeout); };
    // Restart only when it comes into or out of view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const done = shown >= systems.chat.length;

  return (
    <div ref={root} className="overflow-hidden rounded-[26px] border border-hair bg-white shadow-[0_50px_100px_-50px_rgba(11,11,12,.35)]" aria-label="Demo of an AI chat assistant booking a table">
      <div className="flex items-center justify-between border-b border-hair px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-9 items-center justify-center rounded-full bg-red text-[13px] font-extrabold text-white">YB</span>
          <div>
            <p className="text-[15px] font-bold leading-tight">Your Business</p>
            <p className="flex items-center gap-1.5 text-[12px] text-steel"><span className="size-1.5 rounded-full bg-[#30d158]" />Assistant · replies instantly</p>
          </div>
        </div>
        <span className="rounded-full border border-hair px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">{systems.demo}</span>
      </div>
      <div className="flex min-h-[340px] flex-col justify-end gap-3 p-5">
        {systems.chat.slice(0, shown).map((m, n) => (
          <div key={n} className={`bubble max-w-[82%] rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.4] ${m.from === "bot" ? "self-start rounded-bl-[6px] bg-mist text-ink" : "self-end rounded-br-[6px] bg-red text-white"}`}>
            {m.text}
          </div>
        ))}
        {done && (
          <div className="bubble flex items-center gap-3 self-start rounded-[14px] border border-hair bg-white px-4 py-3 text-[13px]">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#30d158] text-white">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
            </span>
            <span><span className="font-bold">Booked</span> · Sunday 11:00 · 2 people</span>
          </div>
        )}
        {typing && (
          <div className="flex gap-1 self-start rounded-[18px] rounded-bl-[6px] bg-mist px-4 py-3.5" aria-hidden>
            {[0, 1, 2].map((d) => <span key={d} className="dot size-1.5 rounded-full bg-steel" style={{ animationDelay: `${d * 150}ms` }} />)}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 border-t border-hair px-5 py-3.5 text-[14px] text-steel/70">
        Ask a question…
        <span className="ml-auto flex size-8 items-center justify-center rounded-full bg-red text-white">↑</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- dashboard ---- */

function Dashboard() {
  const rows = [
    { what: "Booking", detail: "Sunday 11:00 · 2 people", via: "AI assistant" },
    { what: "Quote request", detail: "Website form", via: "Emailed to you" },
    { what: "Call tap", detail: "From Google Maps", via: "Tracked" },
  ];
  return (
    <div className="mt-4 rounded-[22px] border border-hair bg-white p-5" aria-label="Demo of an owner dashboard">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold">Today</p>
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">{systems.demo}</span>
      </div>
      <ul className="mt-3 divide-y divide-hair">
        {rows.map((r) => (
          <li key={r.what} className="flex items-center justify-between gap-4 py-3 text-[14px]">
            <span className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-red" />
              <span className="font-semibold">{r.what}</span>
              <span className="hidden text-steel sm:inline">{r.detail}</span>
            </span>
            <span className="text-[12.5px] text-steel">{r.via}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------- icons ---- */

function Icon({ name }: { name: string }) {
  const p: Record<string, React.ReactNode> = {
    chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
    bag: <><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    plug: <><path d="M9 7V2M15 7V2M6 7h12v4a6 6 0 0 1-12 0z" /><path d="M12 17v5" /></>,
  };
  return (
    <span className="flex size-11 items-center justify-center rounded-[12px] bg-red/10 text-red transition-colors duration-300 group-hover:bg-red group-hover:text-white">
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
    </span>
  );
}
