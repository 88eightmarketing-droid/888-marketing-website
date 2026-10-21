"use client";

import KineticType from "@/effects/kinetic-type/KineticType";

/** The promise as a poster: rows of "SEE IT FIRST" on a tilting plane. */
export default function Visible() {
  return (
    <section className={layout.root} aria-label="See it first">
      <KineticType word="SEE IT FIRST ✦" rows={9} className={layout.stage} rowClassName={type.row} travel={34} />
    </section>
  );
}

const layout = {
  root: "relative h-[160vh] overflow-hidden bg-sky",
  stage: "sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:900px]",
};

const type = { row: "whitespace-nowrap font-display text-[clamp(90px,15vw,230px)] uppercase leading-[0.88] text-oxblood" };
