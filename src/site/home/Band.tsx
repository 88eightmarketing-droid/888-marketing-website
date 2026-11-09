/** The one flare-coloured moment on the page: a moving line that is the call to action. */
export default function Band() {
  const phrase = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      Start a project <span aria-hidden className="inline-block translate-y-[-0.04em]">→</span>
    </span>
  ));
  return (
    <a href="#start" data-cursor="Start" className={layout.root} aria-label="Start a project">
      <span aria-hidden className={layout.track}>
        {phrase}
        {phrase}
      </span>
    </a>
  );
}

const layout = {
  root: "block overflow-hidden bg-flare py-6 text-night md:py-10",
  track: "marquee flex w-max font-display text-[clamp(3.5rem,11vw,12rem)] font-medium leading-none tracking-[-0.055em]",
};
