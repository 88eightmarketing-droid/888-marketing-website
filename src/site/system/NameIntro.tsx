"use client";

/**
 * The door into the film: type the business name, then scroll, and every
 * screen of the 888 workflow carries it. Shared with the hero form's name.
 */
export default function NameIntro({ name, setName }: { name: string; setName: (v: string) => void }) {
  return (
    <section id="how" className="bg-white px-5 pb-10 pt-28 text-ink md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-steel" data-fade>How 888 works</p>
        <h2 className="mt-4 max-w-[14ch] text-[clamp(2.8rem,8vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em]" data-fade>
          Watch it happen to your business.
        </h2>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center" data-fade style={{ ["--d" as string]: "120ms" }}>
          <label className="block w-full max-w-[30rem]">
            <span className="sr-only">Your business name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={32}
              placeholder="Your business name"
              autoComplete="organization"
              className="w-full rounded-full border border-hair bg-mist px-6 py-5 text-[19px] font-semibold text-ink outline-none placeholder:text-steel/70 focus:border-ink focus:bg-white"
            />
          </label>
          <p className="text-[15px] text-steel">Then scroll. Ten steps, from the first look to the first call.</p>
        </div>
      </div>
    </section>
  );
}
