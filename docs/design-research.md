# Homepage design research — November 2026

Why the studio homepage looks the way it does. Read this before restyling it.

## What happened first

The first revamp (commit `d24aa3f`) was warm paper, a book serif and almost no motion. The owner's
verdict: "looks like trash". It was built from three web searches about pricing, without looking
at a single studio site. It also ignored the bar already set on 2026-10-29: Lusion, Active Theory,
Noomo, Unseen, Obys, Resn, makemepulse, Merci-Michel.

## What was studied

Twelve studio sites, screenshotted at three scroll points in Chrome (2026-11-08):

| Site | What it does | Taken |
| --- | --- | --- |
| makemepulse | Huge type staggered across the screen with small notes beside it; a photo window below that grows as you scroll | Hero composition, expanding media |
| Basic/Dept | Opens on full-bleed product film; heavy grotesk; work as big image cards | Work-first, dark, grotesk |
| Studio Freight | The headline surrounded by a field of work tiles | The work is the hero |
| Locomotive | Editorial grid, enormous featured-project names | Scale of project names |
| Obys, Noomo | Kinetic type, scroll-scrubbed reveals | Word reveals, scrubbed statement |
| Lusion, Active Theory, Unseen, Merci-Michel, Resn | Real-time 3D | Not taken: in headless Chrome all sat on their loaders for 10+ s |

## What separated them from the first draft

1. **The work is the picture.** Every one opens on imagery or film. The draft opened on text.
2. **Dark and contrasty**, not beige.
3. **A grotesk set very large and very tight**, with mono labels, not a book serif.
4. **Motion with a point:** media that expands, type that reveals, one signature moment.
5. **A custom cursor and hover previews** on desktop.

## What was built

- Near-black ground, bone type, the 888 flare (`#ef5a36`) once per screen.
- Inter Tight 500 at up to 12rem, tracking −0.055em; Geist Mono 11px uppercase for labels.
- Hero: the line staggered, the reel of client sites in a window that opens to full screen on scroll.
- Statement lit word by word; a work index of real recordings; services with a floating clip;
  a flare marquee as the call to action.
- Everything renders without JavaScript; reduced motion gets the still composition.

## Rules carried over

Work shown is paying clients' live sites only (owner's answer, 2026-11-08). No prices, and no
claims we cannot back. Footage is recorded from the live sites by `scripts/record-work.mjs`.
