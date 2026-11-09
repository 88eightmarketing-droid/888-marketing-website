import type { CSSProperties } from "react";
import { form, hero } from "@/data/site";
import LeadForm from "./LeadForm";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Above the fold, the whole pitch: the campaign film (a phone taking a call
 * on crimson seamless, Grok-generated, looped forward and back), the line,
 * and the proposal form.
 *
 * Desktop: the film fills the screen with the phone in the middle third, the
 * line on the left and the form on the right. Phones: a square crop of the
 * film, then the line, then the form on crimson.
 */
export default function Hero({ onBusiness }: { onBusiness: (name: string) => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-crimson text-white">
      {/* Film */}
      <div className="absolute inset-0 hidden md:block" aria-hidden>
        <video className="h-full w-full object-cover" src="/brand/hero.mp4" poster="/brand/hero.jpg" autoPlay muted loop playsInline preload="auto" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(80,2,4,.55)_0%,rgba(80,2,4,0)_38%,rgba(80,2,4,0)_62%,rgba(80,2,4,.45)_100%)]" />
      </div>
      <div className="relative aspect-square w-full md:hidden" aria-hidden>
        <video className="h-full w-full object-cover" src="/brand/hero-square.mp4" poster="/brand/hero.jpg" autoPlay muted loop playsInline preload="auto" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-crimson to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 md:min-h-[100svh] md:grid-cols-[1.2fr_minmax(0,0.7fr)_390px] md:items-center md:gap-6 md:px-8 md:pb-16 md:pt-28">
        {/* Line */}
        <div className="-mt-16 md:mt-0">
          <p className="appear text-[13px] font-semibold tracking-[0.04em] text-white/75" style={i(0)}>{hero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(3.2rem,13vw,4.6rem)] font-extrabold leading-[0.92] tracking-[-0.055em] md:text-[clamp(3.4rem,5.6vw,6rem)]">
            {hero.title.map((t, n) => (
              <span key={t} className="rise"><span style={i(n)}>{t}</span></span>
            ))}
          </h1>
          <p className="appear mt-6 max-w-[30rem] text-[17px] leading-[1.55] text-white/85 md:text-[18px]" style={i(1)}>{hero.text}</p>
        </div>

        {/* The phone in the film sits here on desktop. */}
        <div className="hidden md:block" aria-hidden />

        {/* Form */}
        <div id="proposal" className="appear scroll-mt-24 rounded-[20px] bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(40,0,2,.6)] md:p-7" style={i(2)}>
          <h2 className="text-[24px] font-extrabold leading-[1.1] tracking-[-0.035em]">{form.title}</h2>
          <p className="mb-5 mt-1.5 text-[14.5px] leading-[1.45] text-steel">{form.text}</p>
          <LeadForm id="proposal-form" onBusiness={onBusiness} />
        </div>
      </div>
    </section>
  );
}
