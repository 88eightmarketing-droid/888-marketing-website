import { questions } from "@/data/content";

export default function Faq() {
  return (
    <section id="questions" className={layout.root}>
      <div className={layout.head}>
        <p className={type.eyebrow}>{questions.eyebrow}</p>
        <h2 className={type.h2}>{questions.title}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/sf/cablecar2.webp" alt="A cable car climbing Hyde Street, with Alcatraz and the bay behind it" className={media.photo} loading="lazy" />
      </div>
      <div className={layout.list}>
        {questions.items.map((i) => (
          <details key={i.q} className={layout.item}>
            <summary className={type.q}>{i.q}<span className={type.plus} aria-hidden>+</span></summary>
            <p className={type.a}>{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const layout = {
  root: "grid gap-12 bg-paper px-5 py-28 md:grid-cols-[1fr_1.4fr] md:px-10",
  head: "flex flex-col gap-4",
  list: "self-start border-t border-rule/25",
  item: "group border-b border-rule/25 py-5",
};

const media = { photo: "mt-6 aspect-[4/3] w-full object-cover md:aspect-[4/5] md:max-w-[460px]" };

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint",
  h2: "font-display text-[clamp(56px,8vw,128px)] uppercase leading-[0.88] text-ink",
  q: "flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[clamp(17px,1.5vw,21px)] font-semibold [&::-webkit-details-marker]:hidden",
  plus: "text-[26px] text-ink transition-transform duration-300 group-open:rotate-45",
  a: "mt-3 max-w-[620px] text-[15px] leading-relaxed text-ink-soft",
};
