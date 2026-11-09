import type { CSSProperties } from "react";
import { clients, cta, faq, nav, process, promises, services, socials, work } from "@/data/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ----------------------------------------------------------- client strip ---- */

/** Names of businesses whose sites are live today — a marquee, not logos we do not hold. */
export function Clients() {
  const row = clients.names.map((n) => (
    <span key={n} className="flex shrink-0 items-center gap-10 pr-10">
      <span className="text-[19px] font-bold tracking-[-0.03em] text-ink/80 md:text-[22px]">{n}</span>
      <span aria-hidden className="size-1.5 rounded-full bg-red" />
    </span>
  ));
  return (
    <section aria-label={clients.label} className="border-b border-hair bg-white py-7">
      <div className="mx-auto flex max-w-[1320px] items-center gap-8 px-5 md:px-8">
        <p className="hidden shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-steel md:block">{clients.label}</p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee flex w-max">{row}{row}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- work ---- */

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em]" data-fade>{work.title}</h2>
        <p className="mt-4 max-w-[30rem] text-[18px] leading-[1.5] text-steel" data-fade style={d(100)}>{work.text}</p>
      </div>
      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-8 xl:px-[max(32px,calc((100vw-1320px)/2+32px))]">
        {work.pieces.map((p) => (
          <li key={p.key} className="w-[82vw] max-w-[440px] shrink-0 snap-start">
            <a href={p.url} target="_blank" rel="noreferrer" className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-[18px] bg-white shadow-[0_20px_40px_-24px_rgba(0,0,0,.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- poster frame from the live-site recording */}
                <img src={`/work/${p.key}.jpg`} alt={`${p.name}, the site we built`} width={1280} height={800} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[18px] font-bold tracking-[-0.02em]">{p.name}</p>
                  <p className="text-[14px] text-steel">{p.kind}</p>
                </div>
                <span className="shrink-0 text-[14px] font-semibold text-red group-hover:underline">{p.domain} ↗</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- process ---- */

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-ink py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <h2 className="max-w-[16ch] text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em]" data-fade>{process.title}</h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[24px] bg-white/10 md:mt-20 md:grid-cols-4">
          {process.steps.map((s, n) => (
            <li key={s.n} className="flex min-h-[240px] flex-col bg-ink p-7 md:p-8" data-fade style={d(n * 90)}>
              <span className="text-[14px] font-bold tracking-[0.08em] text-red">{s.n}</span>
              <h3 className="mt-auto text-[26px] font-extrabold tracking-[-0.035em]">{s.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.55] text-white/60">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <h2 className="text-[clamp(2.2rem,4.4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.05em] md:col-span-4" data-fade>{promises.title}</h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {promises.items.map((p, n) => (
              <li key={p.title} className="border-t border-white/15 pt-5" data-fade style={d(n * 80)}>
                <p className="text-[19px] font-bold tracking-[-0.02em]">{p.title}</p>
                <p className="mt-1.5 text-[15.5px] leading-[1.55] text-white/60">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- faq ---- */

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 md:grid-cols-12 md:px-8">
        <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] md:col-span-4">{faq.title}</h2>
        <div className="border-b border-hair md:col-span-8">
          {faq.items.map((item) => (
            <details key={item.q} className="q border-t border-hair">
              <summary className="flex min-h-11 items-center justify-between gap-6 py-6">
                <span className="text-[19px] font-bold tracking-[-0.02em] md:text-[22px]">{item.q}</span>
                <span aria-hidden className="chev flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-[20px] font-medium leading-none text-ink">+</span>
              </summary>
              <p className="max-w-[44rem] pb-7 text-[16.5px] leading-[1.6] text-steel">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer ---- */

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-28 pt-16 text-white md:px-8 md:pb-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="text-[56px] font-extrabold leading-none tracking-[-0.06em]">888</p>
            <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.55] text-white/60">Websites, Google presence, content and brand for local businesses that want to be the first call.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[14px] sm:grid-cols-3">
            <FooterCol title="Services" links={services.items.map((s) => ({ label: s.kicker, href: `#${s.id}` }))} />
            <FooterCol title="Studio" links={[...nav, { label: cta, href: "#proposal" }]} />
            <FooterCol title="Follow" links={socials} />
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[12.5px] text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} 888 Marketing. Imagery on this page was art-directed and generated by 888 Marketing.</p>
          <p>Business email at your own domain runs through Google Workspace, billed by Google.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      <ul className="mt-3 space-y-2 text-white/60">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="hover:text-white">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
