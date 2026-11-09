import { nav } from "@/data/site";

/**
 * Fixed, and drawn in difference blend so it reads over the reel, the dark
 * page and the flare band alike without changing state on scroll.
 */
export default function Header() {
  return (
    <header className={layout.root}>
      <a href="#top" className={type.logo} aria-label="888 Marketing, back to top">
        <span className={type.mark}>888</span>
        <span className={type.word}>Marketing</span>
      </a>
      <nav className={layout.nav} aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className={type.link}>{n.label}</a>
        ))}
      </nav>
      <a href="#start" className={type.cta}>Start a project</a>
    </header>
  );
}

const layout = {
  root: "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 text-bone mix-blend-difference md:px-10",
  nav: "hidden items-center gap-8 md:flex",
};

const type = {
  logo: "inline-flex min-h-11 items-center gap-2.5",
  mark: "font-display text-[22px] font-semibold tracking-[-0.04em]",
  word: "font-mono text-[11px] uppercase tracking-[0.12em]",
  link: "inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] opacity-70 transition-opacity hover:opacity-100",
  cta: "inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] underline decoration-1 underline-offset-[6px]",
};
