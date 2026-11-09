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
  root: "overflow-hidden border-t border-line bg-night px-5 pt-16 text-bone md:px-10",
  top: "flex flex-col justify-between gap-8 md:flex-row md:items-start",
  links: "flex flex-wrap gap-x-7 font-mono text-[11px] uppercase tracking-[0.12em] text-dim [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a:hover]:text-bone",
  bottom: "flex items-center justify-between border-t border-line py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
};

const type = {
  line: "max-w-[20ch] font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.035em]",
  brand: "-mb-[0.08em] -ml-[0.04em] mt-12 select-none font-display text-[clamp(10rem,46vw,52rem)] font-semibold leading-[0.8] tracking-[-0.075em]",
};
