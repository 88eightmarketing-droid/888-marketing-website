import type { CSSProperties, ReactNode } from "react";

/**
 * The phone screens of the 888 System film, one per stage of the real workflow
 * (agency-previews: /site, /proposal, /sign, /questions, the domain, listings,
 * the Publisher, /t review cards, /c client page). Drawn in code so the
 * visitor's business name runs through all of them.
 *
 * Units: 1em = 1/30 of the screen width (set by System.tsx), so a screen is
 * 30em × 61em on every device. Pieces marked `sys-in` / `sys-draw` / `sys-grow`
 * / `sys-type` animate on the chapter's progress; `--at` is when (0–1).
 *
 * Claims: no prices, ratings, review counts or results figures anywhere. The
 * client page shows where calls come from as bars with no numbers.
 */

const at = (v: number) => ({ ["--at" as string]: v }) as CSSProperties;
const slug = (name: string) =>
  name.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").slice(0, 22) || "yourbusiness";

function Status({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex h-[3em] w-full shrink-0 items-end justify-between px-[2.2em] pb-[0.4em] text-[0.95em] font-semibold ${dark ? "text-white" : "text-ink"}`}>
      <span>9:41</span>
      <span className="flex items-center gap-[0.35em]">
        <span className="inline-block h-[0.7em] w-[1.1em] rounded-[0.15em] border-[0.12em] border-current" />
      </span>
    </div>
  );
}

function Browser({ url, children, typed = false }: { url: string; children: ReactNode; typed?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Status />
      <div className="mx-[1.2em] mt-[0.4em] flex h-[2.6em] items-center gap-[0.5em] rounded-[0.9em] bg-[#f1f1f2] px-[0.9em] text-[0.95em] text-[#3c3c43]">
        <svg viewBox="0 0 12 14" className="h-[0.9em] w-[0.8em] shrink-0" fill="currentColor"><path d="M3 6V4a3 3 0 1 1 6 0v2h1v8H2V6h1zm1.5 0h3V4a1.5 1.5 0 1 0-3 0v2z" /></svg>
        <span className={`truncate ${typed ? "sys-type" : ""}`} style={typed ? at(0.05) : undefined}>{url}</span>
      </div>
      <div className="relative mt-[0.8em] flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* 01 — the concept site, built before money is mentioned (/site/<slug>). */
export function Concept(name: string) {
  return (
    <Browser url={`888marketing.net/site/${slug(name)}`}>
      <div className="relative h-[24em] overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- Painted Ladies, Bernard Spragg, CC0 (public/img/sf/CREDITS.txt) */}
        <img src="/img/sf/ladies.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ transform: "scale(calc(1.18 - var(--t) * .12))" }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(0,0,0,.72))]" />
        <div className="absolute inset-x-[1.6em] bottom-[2em]">
          <p className="sys-in text-[0.85em] uppercase tracking-[0.2em] text-white/70" style={at(0.05)}>Open today</p>
          <p className="sys-in mt-[0.3em] text-[2.6em] font-extrabold leading-[0.95] tracking-[-0.04em]" style={at(0.1)}>{name}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[0.6em] px-[1.2em] py-[1.2em] text-center text-[0.9em] font-semibold">
        {["Call", "Directions", "Book"].map((l, i) => (
          <span key={l} className={`sys-in rounded-full py-[0.8em] ${i === 0 ? "bg-red text-white" : "bg-[#f1f1f2]"}`} style={at(0.2 + i * 0.05)}>{l}</span>
        ))}
      </div>
      <div className="space-y-[0.7em] px-[1.2em]">
        {[0.32, 0.38, 0.44].map((a, i) => <div key={i} className="sys-grow h-[0.8em] rounded bg-[#ececec]" style={{ ...at(a), width: `${92 - i * 18}%` }} />)}
      </div>
      <div className="sys-in absolute inset-x-[1.2em] bottom-[1.4em] rounded-[1em] bg-ink px-[1.2em] py-[1em] text-[0.9em] text-white" style={at(0.55)}>
        <span className="font-semibold">Built for {name}.</span> <span className="text-white/60">Nothing paid yet.</span>
      </div>
    </Browser>
  );
}

/* 02 — the quote (/proposal/<token>). Prices blurred: the public site names none. */
export function Quote(name: string) {
  const lines = [
    ["Website, designed and built", "pay"],
    ["Hosting, years included", "zero"],
    ["Renewal after that", "later"],
  ];
  return (
    <div className="flex h-full flex-col bg-[#f6f6f7]">
      <Status />
      <div className="px-[1.6em] pt-[1.2em]">
        <p className="text-[0.8em] font-semibold uppercase tracking-[0.16em] text-steel">888 Marketing · Quote</p>
        <p className="mt-[0.3em] text-[1.9em] font-extrabold leading-[1] tracking-[-0.03em]">{name}</p>
      </div>
      <div className="mx-[1.2em] mt-[1.4em] rounded-[1.2em] bg-white p-[1.3em] shadow-[0_0.2em_1em_rgba(0,0,0,.06)]">
        {lines.map(([l, k], i) => (
          <div key={l} className="sys-in flex items-center justify-between border-b border-hair py-[0.9em] text-[0.95em] last:border-0" style={at(0.08 + i * 0.08)}>
            <span>{l}</span>
            {k === "zero" ? <span className="font-semibold">$0</span> : <span className="h-[0.9em] w-[3.6em] rounded bg-[#e4e4e6] blur-[0.12em]" />}
          </div>
        ))}
        <div className="sys-in mt-[0.6em] flex items-end justify-between" style={at(0.36)}>
          <span className="text-[0.95em] font-semibold">One price</span>
          <span className="h-[1.6em] w-[6em] rounded bg-[#e4e4e6] blur-[0.15em]" />
        </div>
      </div>
      <p className="sys-in mx-[1.6em] mt-[1em] text-[0.85em] leading-[1.45] text-steel" style={at(0.45)}>This price is frozen once sent. A change means a new quote, never an edit.</p>
      <div className="mt-auto space-y-[0.6em] p-[1.2em] pb-[2em]">
        <div className="sys-in relative overflow-hidden rounded-full bg-red py-[1em] text-center text-[1em] font-bold text-white" style={at(0.55)}>
          Accept
          <span className="sys-grow absolute inset-0 bg-white/20" style={at(0.7)} />
        </div>
        <div className="sys-in rounded-full bg-white py-[1em] text-center text-[1em] font-semibold text-steel" style={at(0.58)}>Not now</div>
      </div>
    </div>
  );
}

/* 03 — signing on the phone (/sign/<token>). */
export function Sign(name: string) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Status />
      <div className="px-[1.6em] pt-[1.2em]">
        <p className="text-[0.8em] font-semibold uppercase tracking-[0.16em] text-steel">Agreement</p>
        <p className="mt-[0.3em] text-[1.7em] font-extrabold leading-[1.05] tracking-[-0.03em]">{name} and 888 Marketing</p>
      </div>
      <ul className="mt-[1.2em] space-y-[0.8em] px-[1.6em] text-[0.95em] leading-[1.4]">
        {["What we build, and when", "What you pay, and when", "Your domain is yours"].map((l, i) => (
          <li key={l} className="sys-in flex gap-[0.7em]" style={at(0.05 + i * 0.07)}>
            <span className="mt-[0.15em] grid h-[1.2em] w-[1.2em] shrink-0 place-items-center rounded-full bg-ink text-[0.7em] text-white">✓</span>{l}
          </li>
        ))}
      </ul>
      <p className="sys-in mx-[1.6em] mt-[1em] text-[0.85em] text-steel underline" style={at(0.25)}>Read the full agreement (PDF)</p>
      <div className="mx-[1.2em] mt-auto rounded-[1.2em] border border-hair bg-[#fafafa] p-[1em]">
        <p className="text-[0.75em] uppercase tracking-[0.16em] text-steel">Sign here</p>
        <svg viewBox="0 0 300 110" className="mt-[0.4em] h-[7em] w-full" fill="none" stroke="#0b0b0c" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path className="sys-draw" style={at(0.3)} pathLength={1} d="M18 78c14-34 26-58 34-56 9 3-12 62-6 64 7 2 18-40 28-40 9 0 0 34 9 34 10 0 16-30 26-30 8 0 2 26 11 26 13 0 22-46 36-46 10 0-6 50 6 50 14 0 26-28 38-28 9 0 6 18 16 18 14 0 26-14 40-20" />
          <path className="sys-draw" style={at(0.62)} pathLength={1} d="M40 96c60-6 150-8 230-4" />
        </svg>
        <div className="mt-[0.2em] h-px bg-hair" />
      </div>
      <div className="sys-in m-[1.2em] mb-[2em] rounded-full bg-ink py-[1em] text-center text-[1em] font-bold text-white" style={at(0.8)}>Signed ✓</div>
    </div>
  );
}

/* 04 — the making: questionnaire, then photo, film and logo. */
export function Made(name: string) {
  return (
    <div className="relative h-full overflow-hidden bg-black text-white">
      <div className="relative z-10"><Status dark /></div>
      {/* viewfinder */}
      {/* eslint-disable-next-line @next/next/no-img-element -- art-directed still, decorative */}
      <img src="/brand/w-camera.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" style={{ transform: "scale(calc(1.25 - var(--t) * .2))" }} />
      <div className="absolute inset-x-[1.4em] top-[4.2em] flex items-center justify-between text-[0.85em] font-semibold">
        <span className="flex items-center gap-[0.4em]"><span className="h-[0.6em] w-[0.6em] rounded-full bg-red" />REC</span>
        <span className="tabular-nums">4K · 24</span>
      </div>
      {["left-[1.4em] top-[6.4em] border-l border-t", "right-[1.4em] top-[6.4em] border-r border-t", "left-[1.4em] bottom-[17em] border-l border-b", "right-[1.4em] bottom-[17em] border-r border-b"].map((c) => (
        <span key={c} className={`absolute h-[2em] w-[2em] border-white/80 ${c}`} />
      ))}
      {/* the questionnaire card rises over it */}
      <div className="sys-in absolute inset-x-[1.2em] bottom-[1.6em] rounded-[1.2em] bg-white p-[1.2em] text-ink" style={at(0.25)}>
        <p className="text-[0.75em] font-semibold uppercase tracking-[0.16em] text-steel">About {name}</p>
        <p className="mt-[0.5em] text-[1em] font-semibold">What do people ask for most?</p>
        <p className="sys-type mt-[0.4em] whitespace-nowrap text-[0.95em] text-steel" style={at(0.4)}>The one they saw on Instagram.</p>
        <div className="mt-[0.9em] flex flex-wrap gap-[0.4em] text-[0.8em] font-semibold">
          {["Photos", "Film", "Logo", "Words"].map((t, i) => (
            <span key={t} className="sys-in rounded-full bg-[#f1f1f2] px-[0.8em] py-[0.35em]" style={at(0.55 + i * 0.06)}>{t}</span>
          ))}
          <span className="sys-in ml-auto text-steel" style={at(0.8)}>Saved</span>
        </div>
      </div>
    </div>
  );
}

/* 05 — live on the client's own domain. */
export function Live(name: string) {
  return (
    <Browser url={`${slug(name)}.com`} typed>
      <div className="sys-in absolute inset-0" style={at(0.35)}>
        <div className="h-full bg-white">
          <div className="flex items-center justify-between px-[1.4em] py-[1em]">
            <span className="text-[1.1em] font-extrabold tracking-[-0.03em]">{name}</span>
            <span className="rounded-full bg-red px-[0.9em] py-[0.4em] text-[0.8em] font-bold text-white">Call</span>
          </div>
          <div className="relative mx-[1.2em] h-[22em] overflow-hidden rounded-[1.2em]">
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed still, decorative */}
            <img src="/img/sf/marin.webp" alt="" className="h-full w-full object-cover" style={{ transform: "scale(calc(1.15 - var(--t) * .1))" }} />
          </div>
          <div className="mx-[1.2em] mt-[1.2em] space-y-[0.6em]">
            <div className="h-[1.4em] w-[80%] rounded bg-[#ececec]" />
            <div className="h-[0.8em] w-[95%] rounded bg-[#f2f2f2]" />
            <div className="h-[0.8em] w-[70%] rounded bg-[#f2f2f2]" />
          </div>
        </div>
      </div>
      <div className="sys-in absolute inset-x-[1.2em] bottom-[1.4em] flex items-center gap-[0.7em] rounded-[1em] bg-ink px-[1.2em] py-[0.9em] text-[0.85em] text-white" style={at(0.6)}>
        <svg viewBox="0 0 12 14" className="h-[1em] w-[0.9em]" fill="currentColor"><path d="M3 6V4a3 3 0 1 1 6 0v2h1v8H2V6h1zm1.5 0h3V4a1.5 1.5 0 1 0-3 0v2z" /></svg>
        <span>Registered to you. Hosting included.</span>
      </div>
    </Browser>
  );
}

/* 06 — found on Google and Maps. No stars, no review counts. */
export function Found(name: string) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Status />
      <div className="mx-[1.2em] mt-[0.6em] flex h-[2.8em] items-center gap-[0.6em] rounded-full border border-hair px-[1em] text-[0.95em] shadow-[0_0.1em_0.4em_rgba(0,0,0,.06)]">
        <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em] text-steel" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        <span className="sys-type whitespace-nowrap" style={at(0.02)}>{name.toLowerCase()} near me</span>
      </div>
      <div className="relative mx-[1.2em] mt-[1em] h-[18em] overflow-hidden rounded-[1.2em] bg-[#e8eef2]">
        <svg viewBox="0 0 300 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path d="M-10 120 C 60 100, 120 150, 310 90" stroke="#fff" strokeWidth="14" fill="none" />
          <path d="M80 -10 L 120 200" stroke="#fff" strokeWidth="10" />
          <path d="M200 -10 L 170 200" stroke="#fff" strokeWidth="8" />
          <rect x="20" y="20" width="44" height="30" rx="4" fill="#d6e4d0" />
          <rect x="220" y="120" width="60" height="40" rx="4" fill="#d6e4d0" />
        </svg>
        <div className="sys-in absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-full" style={at(0.2)}>
          <span className="sys-pulse absolute left-1/2 top-[80%] h-[2em] w-[2em] -translate-x-1/2 rounded-full bg-red/40" />
          <svg viewBox="0 0 24 32" className="relative h-[3.2em] w-[2.4em] drop-shadow"><path d="M12 0C5 0 0 5 0 12c0 9 12 20 12 20s12-11 12-20C24 5 19 0 12 0z" fill="#d40a10" /><circle cx="12" cy="12" r="4.5" fill="#fff" /></svg>
        </div>
      </div>
      <div className="sys-in mx-[1.2em] mt-[1em] rounded-[1.2em] border border-hair p-[1.2em]" style={at(0.35)}>
        <p className="text-[1.3em] font-bold tracking-[-0.02em]">{name}</p>
        <p className="mt-[0.2em] text-[0.85em] text-steel">Open now · Website · Directions</p>
        <div className="mt-[1em] grid grid-cols-3 gap-[0.5em] text-center text-[0.8em] font-semibold">
          {["Call", "Directions", "Website"].map((l, i) => <span key={l} className={`rounded-full py-[0.7em] ${i === 0 ? "bg-ink text-white" : "bg-[#f1f1f2]"}`}>{l}</span>)}
        </div>
      </div>
      <div className="mx-[1.2em] mt-[0.8em] flex flex-wrap gap-[0.4em] text-[0.75em] font-semibold text-steel">
        {["Google", "Maps", "Apple Maps", "Bing", "Facebook", "Instagram"].map((p, i) => (
          <span key={p} className="sys-in rounded-full border border-hair px-[0.8em] py-[0.35em]" style={at(0.5 + i * 0.05)}>{p} ✓</span>
        ))}
      </div>
    </div>
  );
}

/* 07 — the Publisher: one post, approved by the client, out to each channel. */
export function Posted(name: string) {
  const ch = [
    ["Instagram", "#e1306c"],
    ["Facebook", "#1877f2"],
    ["Threads", "#0b0b0c"],
    ["YouTube", "#ff0000"],
  ];
  return (
    <div className="flex h-full flex-col bg-[#f6f6f7]">
      <Status />
      <p className="px-[1.6em] pt-[0.8em] text-[0.8em] font-semibold uppercase tracking-[0.16em] text-steel">Next post · {name}</p>
      <div className="mx-[1.2em] mt-[0.8em] overflow-hidden rounded-[1.2em] bg-white shadow-[0_0.2em_1em_rgba(0,0,0,.06)]">
        <div className="relative h-[17em] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- art-directed still, decorative */}
          <img src="/brand/w-cards.jpg" alt="" className="h-full w-full object-cover" style={{ transform: "scale(calc(1.12 - var(--t) * .08))" }} />
        </div>
        <p className="p-[1em] text-[0.9em] leading-[1.45]">New this week at {name}. Come see it before the weekend.</p>
      </div>
      <div className="sys-in mx-[1.2em] mt-[0.9em] grid grid-cols-2 gap-[0.5em] text-center text-[0.95em] font-bold" style={at(0.15)}>
        <span className="relative overflow-hidden rounded-full bg-ink py-[0.85em] text-white">Approve<span className="sys-grow absolute inset-0 bg-white/20" style={at(0.3)} /></span>
        <span className="rounded-full bg-white py-[0.85em] text-steel">Change</span>
      </div>
      <div className="mx-[1.2em] mt-[1em] space-y-[0.45em]">
        {ch.map(([n, c], i) => (
          <div key={n} className="sys-in flex items-center justify-between rounded-[0.9em] bg-white px-[1em] py-[0.7em] text-[0.9em]" style={at(0.42 + i * 0.09)}>
            <span className="flex items-center gap-[0.6em] font-semibold"><span className="h-[0.8em] w-[0.8em] rounded-full" style={{ background: c }} />{n}</span>
            <span className="text-steel">Posted</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 08 — the review card (/t/<code>): tap, and the Google review box opens. No stars. */
export function Reviews(name: string) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      <Status />
      {/* the card arrives at the top of the phone */}
      <div className="pointer-events-none absolute left-1/2 top-[3.6em] z-10 w-[19em]" style={{ transform: `translate(-50%, calc((1 - min(1, var(--t) * 3)) * -14em)) rotate(calc((1 - min(1, var(--t) * 3)) * -12deg))` }}>
        <div className="rounded-[1em] bg-ink p-[1.2em] text-white shadow-[0_1em_2em_rgba(0,0,0,.3)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.75em] uppercase tracking-[0.2em] text-white/60">Tap to review</span>
            <svg viewBox="0 0 24 24" className="h-[1.4em] w-[1.4em]" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8a8 8 0 0 1 0 8M10 5a12 12 0 0 1 0 14M14 2a16 16 0 0 1 0 20" /></svg>
          </div>
          <p className="mt-[1.4em] text-[1.4em] font-extrabold tracking-[-0.03em]">{name}</p>
        </div>
        <span className="sys-pulse absolute left-1/2 top-full h-[3em] w-[3em] -translate-x-1/2 rounded-full bg-red/30" />
      </div>
      <div className="sys-in mt-[12em] px-[1.4em]" style={at(0.38)}>
        <p className="text-[0.8em] font-semibold uppercase tracking-[0.16em] text-steel">Google</p>
        <p className="mt-[0.3em] text-[1.4em] font-bold tracking-[-0.02em]">Review {name}</p>
        <div className="mt-[1em] h-[11em] rounded-[1em] border border-hair p-[1em] text-[0.95em] text-steel">
          <span className="sys-type inline-block whitespace-nowrap" style={at(0.55)}>Came in on a Saturday and…</span>
        </div>
        <div className="mt-[0.9em] rounded-full bg-[#1a73e8] py-[0.9em] text-center text-[0.95em] font-bold text-white">Post</div>
      </div>
      <p className="sys-in mx-[1.4em] mt-auto mb-[2em] text-[0.8em] leading-[1.45] text-steel" style={at(0.75)}>Everyone gets the same ask. No rating question, no reward, no filter.</p>
    </div>
  );
}

/* 09 — the client page (/c/<token>): where calls come from, ad spend, this week. No figures. */
export function Results(name: string) {
  const src: [string, number][] = [["Google", 0.92], ["Your website", 0.7], ["Instagram", 0.46], ["Facebook", 0.3]];
  return (
    <div className="flex h-full flex-col bg-[#f6f6f7]">
      <Status />
      <div className="px-[1.6em] pt-[0.8em]">
        <p className="text-[0.8em] font-semibold uppercase tracking-[0.16em] text-steel">Your page</p>
        <p className="mt-[0.2em] text-[1.7em] font-extrabold tracking-[-0.03em]">{name}</p>
      </div>
      <div className="mx-[1.2em] mt-[1em] rounded-[1.2em] bg-white p-[1.2em]">
        <p className="text-[0.95em] font-bold">Where your calls are coming from</p>
        <div className="mt-[0.9em] space-y-[0.7em]">
          {src.map(([s, w], i) => (
            <div key={s}>
              <p className="text-[0.8em] text-steel">{s}</p>
              <div className="mt-[0.25em] h-[0.8em] rounded-full bg-[#f1f1f2]">
                <div className="sys-grow h-full rounded-full bg-ink" style={{ ...at(0.08 + i * 0.07), width: `${w * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sys-in mx-[1.2em] mt-[0.8em] grid grid-cols-2 gap-[0.6em]" style={at(0.45)}>
        <div className="rounded-[1.1em] bg-white p-[1em]"><p className="text-[0.75em] text-steel">Ads this month</p><div className="mt-[0.6em] h-[0.6em] rounded-full bg-[#f1f1f2]"><div className="sys-grow h-full w-[64%] rounded-full bg-red" style={at(0.5)} /></div><p className="mt-[0.5em] text-[0.7em] text-steel">Spent of your limit</p></div>
        <div className="rounded-[1.1em] bg-white p-[1em]"><p className="text-[0.75em] text-steel">This week we</p><p className="mt-[0.4em] text-[0.85em] font-semibold leading-[1.3]">posted twice, added photos</p></div>
      </div>
      <div className="sys-in mx-[1.2em] mt-[0.8em] rounded-[1.1em] bg-white p-[1em] text-[0.85em]" style={at(0.62)}>
        <p className="font-bold">Waiting on you</p>
        <p className="mt-[0.3em] text-steel">Approve Friday&apos;s post</p>
      </div>
      <p className="mx-[1.6em] mt-auto mb-[1.6em] text-[0.7em] uppercase tracking-[0.16em] text-steel">Example screen</p>
    </div>
  );
}

/* 10 — the point: the phone rings. */
export function Ring(name: string) {
  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#2b2b2e,#0b0b0c)] text-white">
      <Status dark />
      <p className="mt-[5em] text-[0.95em] text-white/60">{name}</p>
      <p className="mt-[0.4em] text-[2.2em] font-semibold tracking-[-0.02em]">New customer</p>
      <p className="mt-[0.3em] text-[0.95em] text-white/60">Found you on Google</p>
      <div className="relative mt-[6em] grid h-[8em] w-[8em] place-items-center">
        <span className="sys-pulse absolute inset-0 rounded-full bg-[#34c759]/40" />
        <span className="sys-pulse absolute inset-0 rounded-full bg-[#34c759]/30 [animation-delay:.5s]" />
        <span className="sys-ring relative grid h-[5em] w-[5em] place-items-center rounded-full bg-[#34c759]">
          <svg viewBox="0 0 24 24" className="h-[2.4em] w-[2.4em]" fill="#fff"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
        </span>
      </div>
      <div className="mt-auto mb-[4em] flex w-full justify-around px-[3em] text-[0.85em] text-white/70">
        <span className="grid place-items-center gap-[0.5em]"><span className="grid h-[3.6em] w-[3.6em] place-items-center rounded-full bg-[#ff3b30] text-white">✕</span>Decline</span>
        <span className="grid place-items-center gap-[0.5em]"><span className="grid h-[3.6em] w-[3.6em] place-items-center rounded-full bg-[#34c759] text-white">✓</span>Accept</span>
      </div>
    </div>
  );
}
