/**
 * The 888 mark: three round-stroked eights, ink, ink, 888 red.
 * One source for the header, footer and opener. The same geometry builds
 * every file in the kit (scripts/brand.mjs); rules in brand/README.md.
 */
export const EIGHT = "M50 92A36 36 0 0 1 50 20A36 36 0 0 1 50 92A42 42 0 0 0 50 176A42 42 0 0 0 50 92";
/** Distance between eights. At 100 the bottom loops touched and read as a chain at small sizes. */
export const GAP = 112;
export const STROKE = 15;
/** viewBox of the three eights, stroke included. */
export const VIEWBOX = `0 12 ${2 * GAP + 100} 172`;

/** The mark alone. Colour comes from `currentColor`; the third eight is always 888 red. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox={VIEWBOX} className={className} fill="none" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={EIGHT} stroke="currentColor" />
      <path d={EIGHT} stroke="currentColor" transform={`translate(${GAP})`} />
      <path d={EIGHT} stroke="var(--color-red)" transform={`translate(${2 * GAP})`} />
    </svg>
  );
}
