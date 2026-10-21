import Magnetic from "@/effects/magnetic/Magnetic";
import { work } from "@/data/content";

/** Real client sites: a capture that always paints, over a link that opens the live site. */
export default function Work() {
  return (
    <section id="work" className={layout.root}>
      <p className={type.eyebrow}>{work.eyebrow}</p>
      <h2 className={type.h2}>{work.title}</h2>
      <p className={type.body}>{work.text}</p>
      <ul className={layout.grid}>
        {work.pieces.map((w) => (
          <li key={w.domain}>
            <a href={w.url} target="_blank" rel="noreferrer" className={layout.card}>
              <span className={layout.bar}><span className={layout.dot} /><span className={layout.dot} /><span className={layout.dot} /><span className={type.domain}>{w.domain}</span></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.shot} alt={`${w.name} — a site we built, as it looks today`} className={media.shot} loading="lazy" />
            </a>
            <div className={layout.meta}>
              <p className={type.name}>{w.name}</p>
              <p className={type.kind}>{w.kind}</p>
              <p className={type.note}>{w.note}</p>
              <a href={w.url} target="_blank" rel="noreferrer" className={type.open}>Open {w.domain} ↗</a>
            </div>
          </li>
        ))}
      </ul>
      <div className={layout.ctaRow}>
        <Magnetic strength={0.25}><a href="#start" className={type.cta}>{work.cta}</a></Magnetic>
        <span className={type.ctaNote}>{work.note}</span>
      </div>
    </section>
  );
}

const layout = {
  root: "bg-cream px-5 py-28 md:px-10",
  grid: "mt-14 grid gap-10 md:grid-cols-2",
  card: "group block overflow-hidden border border-oxblood/20 bg-white transition-transform duration-500 hover:-translate-y-1",
  bar: "flex items-center gap-1.5 border-b border-oxblood/15 bg-sand/60 px-3 py-2.5",
  dot: "h-2.5 w-2.5 rounded-full bg-oxblood/25",
  meta: "mt-5 flex flex-col gap-1.5",
  ctaRow: "mt-14 flex flex-wrap items-center gap-5",
};

const media = { shot: "aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" };

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-oxblood",
  h2: "mt-4 max-w-[14ch] font-display text-[clamp(56px,8vw,128px)] uppercase leading-[0.88] text-oxblood",
  body: "mt-6 max-w-[560px] text-[15px] leading-relaxed text-muted",
  domain: "ml-2 truncate text-[11px] text-muted",
  name: "font-display text-[30px] uppercase leading-none text-oxblood",
  kind: "text-[12px] font-semibold uppercase tracking-[0.14em] text-muted",
  note: "max-w-[440px] text-[14px] leading-relaxed text-muted",
  open: "mt-1 inline-flex min-h-11 items-center text-[14px] font-semibold text-oxblood underline underline-offset-4",
  cta: "inline-block rounded-full bg-oxblood px-7 py-3.5 text-[14px] font-semibold text-white",
  ctaNote: "text-[13px] text-muted",
};
