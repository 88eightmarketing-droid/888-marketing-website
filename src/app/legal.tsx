import Link from "next/link";
import { Mark } from "@/brand/mark";

/** Shared frame for /privacy and /terms: plain reading page, the mark home, nothing else. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[680px] px-5 pb-24 pt-10 text-[17px] leading-[1.6] text-ink md:pt-16">
      <Link href="/" aria-label="888 Marketing home" className="inline-flex min-h-11 items-center gap-2">
        <Mark className="h-[22px] w-auto" />
        <span className="text-[13px] font-semibold text-steel">Marketing</span>
      </Link>
      <h1 className="mt-12 text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">{title}</h1>
      <p className="mt-3 text-[14px] text-steel">Updated {updated}</p>
      <div className="mt-10 space-y-5 [&_h2]:mt-10 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_a]:underline">{children}</div>
    </main>
  );
}
