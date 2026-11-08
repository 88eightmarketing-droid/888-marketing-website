import { footer, nav, socials } from "@/data/site";

export default function Footer() {
  return (
    <footer className={layout.root}>
      <div className={layout.top}>
        <p className={type.line}>{footer.line}</p>
        <nav className={layout.links} aria-label="Footer">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}
        </nav>
      </div>
      <p className={type.brand} aria-hidden>888</p>
      <div className={layout.bottom}>
        <p>© {new Date().getFullYear()} 888 Marketing</p>
        <a href="#top" className="inline-flex min-h-11 items-center">Back to top ↑</a>
      </div>
    </footer>
  );
}

const layout = {
  root: "overflow-hidden bg-ink px-5 pt-20 text-paper md:px-10",
  top: "flex flex-col justify-between gap-8 md:flex-row md:items-start",
  links: "flex flex-wrap gap-x-6 text-[14px] text-paper/70 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a:hover]:text-paper",
  bottom: "flex items-center justify-between border-t border-paper/15 py-4 text-[12px] text-paper/50",
};

const type = {
  line: "max-w-[22rem] font-display text-[28px] leading-[1.1]",
  brand: "mt-10 select-none font-display -ml-[0.04em] text-[clamp(10rem,64vw,62rem)] leading-[0.74] tracking-[-0.03em] text-paper",
};
