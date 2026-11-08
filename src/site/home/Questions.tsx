import { questions } from "@/data/site";

/** Native <details>: works without JavaScript, keyboard and screen readers included. */
export default function Questions() {
  return (
    <section id="questions" className={layout.root}>
      <div className={layout.head}>
        <p className={type.eyebrow}>{questions.eyebrow}</p>
        <h2 className={type.h2}>{questions.title}</h2>
      </div>
      <div className={layout.list}>
        {questions.items.map((item) => (
          <details key={item.q} className={`q ${layout.item}`}>
            <summary className={layout.summary}>
              <span className={type.q}>{item.q}</span>
              <span aria-hidden className={`plus ${type.plus}`}>+</span>
            </summary>
            <p className={type.a}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const layout = {
  root: "grid gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36",
  head: "md:col-span-4 md:self-start md:sticky md:top-28",
  list: "border-b border-rule md:col-span-8",
  item: "border-t border-rule",
  summary: "flex min-h-11 items-baseline justify-between gap-6 py-6",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint",
  h2: "mt-6 font-display text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.98] tracking-[-0.025em]",
  q: "font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15]",
  plus: "shrink-0 text-[24px] font-light leading-none text-ink-faint",
  a: "max-w-[38rem] pb-7 text-[16px] leading-[1.65] text-ink-soft",
};
