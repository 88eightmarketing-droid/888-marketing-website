import { how } from "@/data/content";

/** Maroon band: the three steps, beside a full-bleed Painted Ladies photograph. */
export default function How() {
  return (
    <section id="how" className={layout.root}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/sf/ladies.webp" alt="The Painted Ladies on Steiner Street with the downtown skyline behind, San Francisco" className={media.photo} loading="lazy" />
      <div className={layout.copy}>
        <p className={type.eyebrow}>{how.eyebrow}</p>
        <h2 className={type.h2}>{how.title}</h2>
        <ol className={layout.list}>
          {how.steps.map((s) => (
            <li key={s.n} className={layout.step}>
              <p className={type.n}>{s.n}<span className={type.when}>{s.when}</span></p>
              <h3 className={type.title}>{s.title}</h3>
              <p className={type.body}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const layout = {
  root: "grid bg-ink text-white lg:grid-cols-[1fr_1.1fr]",
  copy: "flex flex-col px-5 py-24 md:px-10",
  list: "mt-12 border-t border-white/20",
  step: "grid gap-2 border-b border-white/20 py-8 sm:grid-cols-[120px_1fr] sm:gap-x-8",
};

const media = { photo: "h-[50svh] w-full object-cover lg:sticky lg:top-0 lg:h-svh" };

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-paper-deep",
  h2: "mt-4 font-display text-[clamp(48px,6vw,96px)] uppercase leading-[0.88]",
  n: "flex flex-col font-display text-[44px] leading-none text-paper-deep sm:row-span-2",
  when: "mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60",
  title: "font-display text-[30px] uppercase leading-none",
  body: "max-w-[520px] text-[15px] leading-relaxed text-white/80",
};
