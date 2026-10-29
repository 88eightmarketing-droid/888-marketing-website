"use client";

import KineticType from "@/effects/kinetic-type/KineticType";

/**
 * The offer as a poster.
 *
 * This band used to repeat "SEE IT FIRST" nine times across the full width,
 * which made the loudest element on the page the one sentence the site had
 * already said seven other times. It now carries the two facts a person
 * actually weighs — what it costs and how long it takes — so the biggest type
 * on the page is information rather than insistence.
 *
 * Shorter, too: two screens rather than nearly three. A poster you scroll past
 * for that long stops being a poster and becomes a wait.
 */
export default function Visible() {
  return (
    <section className={layout.root} aria-label="From $499, live in a week">
      <KineticType
        word="FROM $499 · LIVE IN A WEEK · "
        rows={7}
        className={layout.stage}
        rowClassName={type.row}
        travel={30}
      />
    </section>
  );
}

const layout = {
  root: "relative h-[120vh] overflow-hidden bg-paper-deep",
  stage: "sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:900px]",
};

const type = {
  row: "whitespace-nowrap font-display text-[clamp(72px,12vw,190px)] uppercase leading-[0.9] text-ink",
};
