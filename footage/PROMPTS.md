# Main Street, after dark: shot list (20 Nov 2026)

The first screen of 888marketing.net. A Bay Area main street at night; storefronts light up one
by one, each a real 888 client, and their windows and screens play the real sites we built. Ends
on a phone ringing on a counter. Scroll plays it (frame sequence).

**Made in Grok** (grok.com/imagine, the user's Chrome): still first (16:9), then Make Video,
camera move only, 10 s, 720p. Cut each to its best 3–4 s (pushes degrade after ~4 s).
**Rules:** no faces (backs, hands, out of focus only); no text or logos in the generations (we put
the real ones in); every screen and window that will carry client work is a **blank, evenly
bright, flat white-blue glow** so `scripts/composite-screen.py` can find and track it.
**Credits line on the page:** "Scenes generated · the work on every screen is real."

## The look (prefix every still prompt)

> Cinematic night photograph, small-town California main street after rain, wet asphalt
> reflecting neon and sodium streetlights, deep teal shadows and warm amber practical lights,
> anamorphic 35 mm lens, shallow depth of field, Kodak Vision3 500T film grain, moody, quiet,
> no people facing camera, no readable text, no logos, no signage lettering,

## Shots

| # | Name | Still prompt (after the look) | Video prompt (camera only) | Real work composited |
| --- | --- | --- | --- | --- |
| 1 | dark | a row of five small independent storefronts at dusk, every window dark, one streetlight, empty street, wide shot from the middle of the road at eye level | slow steady push forward down the street, nothing else moves | none: "Most good businesses are invisible." |
| 2 | classe | a boutique spa storefront, tall front window, inside the window a large blank glowing flat display screen facing the street, warm candle light around it, three-quarter angle from the sidewalk | slow dolly to the right, parallax on the window frame, screen stays flat and evenly lit | classeskin desktop recording on the window screen |
| 3 | puppy | a pet grooming shop doorway at night, glass door half open, warm light spilling onto wet sidewalk, on the reception counter inside a smartphone standing upright on a stand with a blank glowing screen | slow push in toward the phone through the door | cleanpuppy phone recording on the phone |
| 4 | van | a plain white work van parked at the curb under a streetlight, its long side panel completely blank and clean, wet street reflections, side-on view | slow tracking move along the van from back to front | Plumbing Art livery (logo + seal) on the side panel |
| 5 | truck | a black mobile game trailer parked curbside, purple and pink LED strips along its edges, three blank glowing flat screens mounted on its side, light haze | slow orbit left around the trailer | Frenemies invite recording on the middle screen |
| 6 | chair | seen through a barbershop window at night, an empty vintage barber chair facing a wall mirror, inside the mirror frame a blank glowing flat screen, pink neon tube in the window | slow push in through the glass toward the mirror | jellyceeblends desktop recording on the mirror screen |
| 7 | counter | close-up of a shop counter at night, a smartphone lying face up, screen dark, warm bokeh lights of the street behind through the window | very slow push in on the phone, the phone screen lights up white | incoming call screen: "New customer · Found you on Google" |

## Type over the film (scroll beats)

1. dark: *Most good businesses are invisible.*
2. classe: **Website.**
3. puppy: **Booking.**
4. van: **Brand.**
5. truck: **Systems.**
6. chair: **Film & social.**
7. counter: *Make your phone ring.* + Get a free proposal

## Status

- [ ] stills generated and picked
- [ ] clips generated (one at a time; Grok drops batches)
- [ ] masters moved to `footage/masters/` (git-ignored, Vercel-ignored)
- [ ] composited, graded, sequenced
