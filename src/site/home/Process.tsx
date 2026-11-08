import { process } from "@/data/site";

export default function Process() {
  return (
    <section id="process" className={layout.root}>
      <div className={layout.head}>
        <p className={type.eyebrow} data-reveal>{process.eyebrow}</p>
        <h2 className={type.h2} data-reveal>{process.title}</h2>
      </div>
      <ol className={layout.steps}>
        {process.steps.map((s, n) => (
          <li key={s.n} className={layout.step} data-reveal style={{ "--d": `${n * 100}ms` } as React.CSSProperties}>
            <p className={type.n}>{s.n}</p>
            <h3 className={type.title}>{s.title}</h3>
            <p className={type.body}>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const layout = {
  root: "bg-paper-deep px-5 py-24 md:px-10 md:py-36",
  head: "grid gap-6 md:grid-cols-12",
  steps: "mt-14 grid gap-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-4 lg:gap-8",
  step: "flex flex-col border-t border-ink/20 pt-6",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint md:col-span-12",
  h2: "font-display text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.98] tracking-[-0.025em] md:col-span-9",
  n: "font-display text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.03em]",
  title: "mt-8 font-display text-[28px] leading-[1.05]",
  body: "mt-3 max-w-[26rem] text-[15px] leading-[1.6] text-ink-soft md:text-[16px]",
};
