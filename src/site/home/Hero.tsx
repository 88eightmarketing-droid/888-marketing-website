import type { CSSProperties } from "react";
import { hero } from "@/data/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * The one thing the page says, set as large as the column allows.
 *
 * No image. Most agencies open on a stock photo of a laptop; here the type is
 * the picture, and the work is one scroll away.
 */
export default function Hero() {
  return (
    <section className={layout.root}>
      <p className={type.eyebrow}>
        {hero.eyebrow.map((e, n) => (
          <span key={e} className="hero-fade" style={i(n)}>{e}</span>
        ))}
      </p>

      <h1 className={type.h1}>
        {hero.title.map((line, n) => (
          <span key={line} className="hero-line" style={i(n)}>
            <span className={n === 1 ? type.italic : undefined}>{line}</span>
          </span>
        ))}
      </h1>

      <div className={layout.lower}>
        <p className={`${type.body} hero-fade`} style={i(1)}>{hero.text}</p>
        <div className={`${layout.actions} hero-fade`} style={i(2)}>
          <a href="#start" className={type.cta}>
            {hero.cta}
            <span aria-hidden className={type.arrow}>→</span>
          </a>
          <a href="#work" className={type.secondary}>{hero.secondary} ↓</a>
        </div>
      </div>

      <ol className={layout.facts} aria-label="What we do">
        {hero.disciplines.map((d, n) => (
          <li key={d} className={`${layout.fact} hero-fade`} style={i(3 + n)}>
            <span className={type.k}>{String(n + 1).padStart(2, "0")}</span>
            <span className={type.v}>{d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const layout = {
  root: "flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10",
  lower: "mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end",
  actions: "flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-6 md:col-start-7 md:justify-end",
  facts: "mt-14 grid grid-cols-2 border-t border-rule md:mt-20 md:grid-cols-4",
  fact: "flex items-baseline gap-3 border-rule py-4 odd:pr-4 even:border-l even:pl-4 [&:nth-child(n+3)]:border-t md:py-5 md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6",
};

const type = {
  eyebrow: "flex flex-wrap gap-x-6 text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint",
  h1: "mt-8 font-display text-[clamp(3.4rem,19vw,6.5rem)] md:text-[clamp(5rem,11.2vw,12.5rem)] leading-[0.9] tracking-[-0.03em] md:mt-10",
  italic: "italic text-ink-soft",
  body: "max-w-[34rem] text-[17px] leading-[1.55] text-ink-soft md:col-span-6 md:text-[19px]",
  cta: "group inline-flex min-h-13 items-center gap-3 rounded-full bg-accent px-7 text-[15px] font-medium text-paper transition-colors duration-300 hover:bg-accent-deep",
  arrow: "transition-transform duration-300 ease-out-quint group-hover:translate-x-1",
  secondary: "inline-flex min-h-11 items-center text-[15px] text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-ink",
  k: "text-eyebrow tracking-[0.16em] text-ink-faint tabular-nums",
  v: "font-display text-[clamp(1.6rem,3vw,2.75rem)] leading-none tracking-[-0.01em]",
};
