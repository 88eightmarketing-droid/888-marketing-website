import { nav } from "@/data/site";
import { Button } from "./ui";

/**
 * Two bars, as on a product page: a thin global bar that scrolls away, and a
 * local bar under it that sticks — the name on the left, the action on the
 * right.
 */
export function GlobalNav() {
  return (
    <div className="relative z-50 h-11 bg-white/80 backdrop-blur-xl backdrop-saturate-[1.8]">
      <nav aria-label="Main" className="mx-auto flex h-full max-w-[1024px] items-center justify-between px-5 text-[12px] tracking-[-0.01em] text-graphite/80">
        <a href="#top" className="inline-flex min-h-11 items-center text-[17px] font-semibold tracking-[-0.03em] text-graphite" aria-label="888 Marketing, top of page">888</a>
        <div className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center transition-colors hover:text-graphite">{n.label}</a>
          ))}
        </div>
        <a href="#start" className="inline-flex min-h-11 items-center transition-colors hover:text-graphite">Contact</a>
      </nav>
    </div>
  );
}

export function LocalNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-hair/70 bg-white/72 backdrop-blur-xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-[52px] max-w-[1024px] items-center justify-between px-5">
        <p className="text-[19px] font-semibold tracking-[-0.02em] text-graphite md:text-[21px]">888 Marketing</p>
        <div className="flex items-center gap-6">
          <a href="#how" className="hidden text-[12px] text-graphite/80 hover:text-graphite sm:inline">How it works</a>
          <a href="#questions" className="hidden text-[12px] text-graphite/80 hover:text-graphite sm:inline">Questions</a>
          <Button href="#start" size="sm">Start a project</Button>
        </div>
      </div>
    </div>
  );
}
