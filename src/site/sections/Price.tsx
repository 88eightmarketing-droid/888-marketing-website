import Magnetic from "@/effects/magnetic/Magnetic";
import { price } from "@/data/content";

export default function Price() {
  return (
    <section id="price" className={layout.root}>
      <p className={type.eyebrow}>{price.eyebrow}</p>
      <h2 className={type.h2}>{price.title}</h2>
      <ul className={layout.grid}>
        {price.tiers.map((t) => (
          <li key={t.name} className={layout.card}>
            <p className={type.price}>{t.price}</p>
            <p className={type.name}>{t.name}</p>
            <p className={type.pages}>{t.pages}</p>
            <p className={type.line}>{t.line}</p>
          </li>
        ))}
      </ul>
      <ul className={layout.included}>{price.included.map((i) => <li key={i} className={type.inc}><span className={type.check} aria-hidden>✓</span>{i}</li>)}</ul>
      <div className={layout.ctaRow}>
        <Magnetic strength={0.25}><a href="#start" className={type.cta}>{price.cta}</a></Magnetic>
        <span className={type.note}>{price.note}</span>
      </div>
      <p className={type.renewal}>{price.renewal}</p>
    </section>
  );
}

const layout = {
  root: "bg-sand px-5 py-28 md:px-10",
  grid: "mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
  card: "flex flex-col bg-cream p-7 transition-transform duration-500 hover:-translate-y-1",
  included: "mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2",
  ctaRow: "mt-12 flex flex-wrap items-center gap-5",
};

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-oxblood",
  h2: "mt-4 max-w-[16ch] font-display text-[clamp(52px,7.5vw,120px)] uppercase leading-[0.88] text-oxblood",
  price: "font-display text-[64px] leading-none text-oxblood",
  name: "mt-4 text-[17px] font-semibold",
  pages: "mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
  line: "mt-3 text-[14px] leading-relaxed text-muted",
  inc: "flex items-baseline gap-3 text-[15px]",
  check: "text-oxblood",
  cta: "inline-block rounded-full bg-oxblood px-7 py-3.5 text-[14px] font-semibold text-white",
  note: "text-[13px] text-muted",
  renewal: "mt-8 max-w-[60ch] text-[13px] leading-relaxed text-muted",
};
