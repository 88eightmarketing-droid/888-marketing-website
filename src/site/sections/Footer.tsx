import { credits, socials } from "@/data/content";

export default function Footer() {
  return (
    <footer className={layout.root}>
      <div className={layout.top}>
        <p className={type.tagline}>See the work as it goes live.</p>
        <ul className={layout.links}>{socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
        <a href="#top" className={type.top}>Back to top ↑</a>
      </div>
      <p className={type.brand}>888<span className={type.pink}> Marketing</span></p>
      <div className={layout.bottom}>
        <p className={type.small}>© {new Date().getFullYear()} 888 Marketing. Websites for local business.</p>
        <p className={type.credit}>{credits}</p>
      </div>
    </footer>
  );
}

const layout = {
  root: "bg-ink px-5 pb-8 pt-20 text-white md:px-10",
  top: "flex flex-wrap items-baseline justify-between gap-6",
  links: "flex gap-2 text-[14px] font-medium [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:px-2 [&_a:hover]:underline",
  bottom: "mt-6 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 md:flex-row",
};

const type = {
  tagline: "text-[clamp(18px,1.6vw,22px)]",
  small: "text-[12px] text-white/70",
  top: "inline-flex min-h-11 items-center text-[12px] text-white/70",
  brand: "mt-16 font-display text-[clamp(84px,17vw,300px)] uppercase leading-[0.84]",
  pink: "text-paper-deep",
  credit: "max-w-[720px] text-[11px] leading-relaxed text-white/65",
};
