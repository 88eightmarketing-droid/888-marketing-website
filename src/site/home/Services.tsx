import { services } from "@/data/site";

/** A ruled list, like a studio's capabilities page — no prices, no cards. */
export default function Services() {
  return (
    <section id="services" className={layout.root}>
      <div className={layout.head}>
        <p className={type.eyebrow} data-reveal>{services.eyebrow}</p>
        <h2 className={type.h2} data-reveal>{services.title}</h2>
      </div>

      <ol className={layout.list}>
        {services.items.map((s, n) => (
          <li key={s.name} className={layout.row} data-reveal style={{ "--d": `${n * 50}ms` } as React.CSSProperties}>
            <p className={type.n}>{String(n + 1).padStart(2, "0")}</p>
            <h3 className={type.name}>{s.name}</h3>
            <p className={type.line}>{s.line}</p>
            <ul className={layout.parts}>
              {s.parts.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

const layout = {
  root: "px-5 py-24 md:px-10 md:py-36",
  head: "grid gap-6 md:grid-cols-12",
  list: "mt-14 border-b border-rule md:mt-20",
  row: "grid gap-x-6 gap-y-3 border-t border-rule py-8 md:grid-cols-12 md:items-baseline md:py-10",
  parts: "flex flex-col gap-1 text-[14px] text-ink-faint md:col-span-3 md:col-start-10",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint md:col-span-12",
  h2: "font-display text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.98] tracking-[-0.025em] md:col-span-9",
  n: "text-eyebrow tracking-[0.16em] text-ink-faint tabular-nums md:col-span-1",
  name: "font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-[1] tracking-[-0.015em] md:col-span-3",
  line: "max-w-[30rem] text-[15px] leading-[1.6] text-ink-soft md:col-span-5 md:text-[16px]",
};
