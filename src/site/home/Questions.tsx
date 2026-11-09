import { questions } from "@/data/site";

/** Native <details>: works without JavaScript, keyboard and screen readers included. */
export default function Questions() {
  return (
    <section id="questions" className={layout.root}>
      <p className={type.eyebrow}>{questions.eyebrow}</p>
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
  root: "grid gap-10 bg-night px-5 py-24 md:grid-cols-12 md:px-10 md:py-40",
  list: "border-b border-line md:col-span-8 md:col-start-5",
  item: "border-t border-line",
  summary: "flex min-h-11 items-center justify-between gap-6 py-6",
};

const type = {
  eyebrow: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim md:col-span-3",
  q: "font-display text-[clamp(1.4rem,2.4vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.035em] text-bone",
  plus: "shrink-0 font-display text-[28px] font-light leading-none text-dim",
  a: "max-w-[40rem] pb-8 text-[16px] leading-[1.65] text-bone/65",
};
