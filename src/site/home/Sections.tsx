import { difference, process, questions, socials, work, nav } from "@/data/site";
import { Icon } from "./Art";

/* ---------------------------------------------------------- difference ---- */

/** The spec-sheet moment of a product page: one big line, four facts with icons. */
export function Difference() {
  return (
    <section className="bg-white px-6 py-24 md:py-36">
      <h2 className="mx-auto max-w-[980px] whitespace-pre-line text-center text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-graphite md:text-[64px] md:leading-[1.05]" data-fade>
        {difference.title}
      </h2>
      <div className="mx-auto mt-16 grid max-w-[1024px] gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {difference.items.map((d, i) => (
          <div key={d.title} className="flex flex-col items-center text-center" data-fade style={{ ["--d" as string]: `${i * 80}ms` }}>
            <Icon name={d.icon} />
            <h3 className="mt-5 text-[21px] font-semibold leading-[1.2] tracking-[0.01em] text-graphite">{d.title}</h3>
            <p className="mt-2 max-w-[17rem] text-[17px] leading-[1.47] tracking-[-0.022em] text-steel">{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- process ---- */

export function Process() {
  return (
    <section id="how" className="scroll-mt-14 bg-mist px-3 py-24 md:py-32">
      <h2 className="text-center text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] text-graphite md:text-[56px]" data-fade>{process.title}</h2>
      <ol className="mx-auto mt-12 grid max-w-[1200px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((s, i) => (
          <li key={s.n} className="flex min-h-[260px] flex-col rounded-[28px] bg-white p-8" data-fade style={{ ["--d" as string]: `${i * 80}ms` }}>
            <span className="text-[56px] font-semibold leading-none tracking-[-0.03em] text-red">{s.n}</span>
            <h3 className="mt-auto text-[24px] font-semibold leading-[1.15] tracking-[0.005em] text-graphite">{s.title}</h3>
            <p className="mt-2 text-[17px] leading-[1.47] tracking-[-0.022em] text-steel">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- work ---- */

/** Client work as a quiet row of cards — supporting evidence, not the design. */
export function WorkStrip() {
  return (
    <section id="work" className="scroll-mt-14 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] text-graphite md:text-[56px]" data-fade>{work.title}</h2>
        <p className="mt-2 max-w-[34rem] text-[19px] leading-[1.35] text-steel md:text-[21px]" data-fade>{work.line}</p>
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scroll-padding-inline:24px] xl:px-[max(24px,calc((100vw-1200px)/2+24px))]">
        {work.pieces.map((p) => (
          <li key={p.key} className="w-[78vw] max-w-[400px] shrink-0 snap-start">
            <a href={p.url} target="_blank" rel="noreferrer" className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-[18px] bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element -- a poster frame from the site recording; fixed size, lazy */}
                <img src={`/work/${p.key}.jpg`} alt={`${p.name}, the site we built`} width={1280} height={800} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-graphite">{p.name}</p>
              <p className="text-[14px] text-steel">{p.kind}</p>
              <p className="mt-1 text-[14px] text-red group-hover:underline">{p.domain} ↗</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ----------------------------------------------------------- questions ---- */

export function Questions() {
  return (
    <section id="questions" className="scroll-mt-14 bg-white px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-[820px]">
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] text-graphite md:text-[56px]">{questions.title}</h2>
        <div className="mt-8 border-b border-hair">
          {questions.items.map((item) => (
            <details key={item.q} className="q border-t border-hair">
              <summary className="flex min-h-11 items-center justify-between gap-6 py-5">
                <span className="text-[19px] font-semibold tracking-[-0.01em] text-graphite md:text-[21px]">{item.q}</span>
                <svg aria-hidden viewBox="0 0 24 24" className="chev size-5 shrink-0 text-steel" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="max-w-[40rem] pb-6 text-[17px] leading-[1.47] tracking-[-0.022em] text-steel">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- footer ---- */

export function Footer() {
  const cols = [
    { h: "Services", links: nav.slice(0, 4) },
    { h: "Studio", links: [{ label: "Work", href: "#work" }, { label: "How it works", href: "#how" }, { label: "Questions", href: "#questions" }, { label: "Start a project", href: "#start" }] },
    { h: "Follow", links: socials.map((s) => ({ label: s.label, href: s.href })) },
  ];
  return (
    <footer className="bg-mist px-6 pb-6 pt-8 text-[12px] leading-[1.33] tracking-[-0.01em] text-steel">
      <div className="mx-auto max-w-[1024px]">
        <p className="border-b border-hair pb-4">Every project is quoted in writing before work starts. Business email at your own domain runs through Google Workspace, billed by Google. The sites shown under Live now belong to their owners and are shown with their own domains.</p>
        <div className="grid grid-cols-2 gap-8 py-6 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.h}>
              <p className="font-semibold text-graphite">{c.h}</p>
              <ul className="mt-2 space-y-1.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="hover:text-graphite hover:underline">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-hair pt-4 sm:flex-row">
          <p>Copyright © {new Date().getFullYear()} 888 Marketing. All rights reserved.</p>
          <a href="#top" className="hover:text-graphite">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
