import { principles } from "@/data/site";

/** The one dark band on the page: the standard every site is held to. */
export default function Principles() {
  return (
    <section className={layout.root} aria-labelledby="principles-title">
      <p className={type.eyebrow} data-reveal>{principles.eyebrow}</p>
      <h2 id="principles-title" className={type.h2} data-reveal>{principles.title}</h2>
      <ol className={layout.list}>
        {principles.items.map((p, n) => (
          <li key={p.n} className={layout.item} data-reveal style={{ "--d": `${n * 90}ms` } as React.CSSProperties}>
            <p className={type.n}>{p.n}</p>
            <h3 className={type.title}>{p.title}</h3>
            <p className={type.body}>{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const layout = {
  root: "bg-ink px-5 py-24 text-paper md:px-10 md:py-40",
  list: "mt-16 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-10",
  item: "border-t border-paper/15 pt-6",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-paper/50",
  h2: "mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.98] tracking-[-0.025em]",
  n: "text-eyebrow tracking-[0.16em] text-paper/45 tabular-nums",
  title: "mt-4 font-display text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05]",
  body: "mt-3 max-w-[26rem] text-[15px] leading-[1.6] text-paper/65 md:text-[16px]",
};
