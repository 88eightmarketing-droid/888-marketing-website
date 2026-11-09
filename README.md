# 888 Marketing — our own website

Live at **[888marketing.net](https://888marketing.net)**. Next.js 16 on Vercel,
deployed automatically from `main`.

This is the agency's shop window. It shares no code with `agency-previews`,
which is the sales engine that builds concept pages for prospects — the two are
separate apps and a change in one does not touch the other.

## Running it

```bash
npm install
npm run dev        # http://localhost:3100
```

`npm run lint` and `npm run build` should both be clean before pushing.

## The design (November 2026)

**White, clean, and our work up front.** The structure is borrowed from agency landing pages that
convert (studied: SmartSites' digital-marketing LP): the proposal form straight after the opening,
a call to action in every section, services tied to outcomes, a strong close. The finish is ours:
white, ink type, red only for actions, Grok stills and film shot on white seamless, and real client
sites playing on the devices.

| Section | What it does |
| --- | --- |
| Top bar + mobile bar | "Get a free proposal" always one tap away; pinned to the bottom on phones. |
| Opening scene (`Hero.tsx`) | A laptop opens and a phone rises as the page arrives; scrolling centres them and steps through five client sites, each playing from its own intro through its scroll effects. |
| Proposal | What we do, lit word by word on scroll, and the proposal form. |
| Client strip | Names of clients whose sites are live — names, not logos we do not hold. |
| Services | Websites (the phone playing the sites), Google (Grok pin), Content (real posts we made for Plumbing Art), Brand (a film animated from its real logo files). |
| See your business here | The name typed in the proposal form, on a sample first screen. Labelled Illustration. |
| Live work, Process, In writing, Questions, Closing | Client sites; four steps; promises we keep; FAQ; the form again. |

**What we do not copy from SmartSites:** awards, ratings, testimonial walls and results figures.
We have none we can stand behind, and inventing them breaks the claims rule.

**The showcase.** The order is the owner's (2026-11-08): Plumbing Art, GetKickz, Classé, JellyCee
Blends, Trees 4 Less, Clean Puppy Club — `SHOWCASE_SITES` in `scripts/work-sites.mjs`, and the first six
`work.pieces` in `src/data/site.ts` (keep the two in the same order). Each site is recorded twice by
`node scripts/record-showcase.mjs [key]`: desktop 1280×800 for the laptop, phone 390×844 for the
phone, starting the moment the page is requested in a fresh profile, so the site's first-visit
intro is in the clip, then a steady scroll. Output in `public/showcase/`. Re-record a site after it
changes; if one scrolls too fast and sits on its footer, lower its `speed`.

**Imagery.** `public/brand/w-*` are the Grok stills on white (AVIF + JPEG, 1600w);
`public/brand/phone-cut.webp` is the phone cut out of its still; `public/seq/lid/` is the laptop
opening, cut from a Grok clip of the lid closing, reversed, drawn on a canvas (`Frames.tsx`).
Screen positions are measured in percent of the photos (constants at the top of `Hero.tsx`); if a
photo changes, re-measure. `public/made/` is real work from Plumbing Art's brand package (posts,
flyer) and `plumbingart-brand.mp4`, its brand film: `scripts/brand-film/plumbingart/film.html`
animates the real SVG logos (never generated, so no letter warps), recorded by
`node scripts/record-brand-film.mjs plumbingart`. Business cards are deliberately not shown.

**Systems section.** AI chat assistant, booking, ordering, owner dashboard, automations and
integrations, with a scripted chat demo and a dashboard, both labelled Demo: a generic business,
never real client data or our own leads.

The form posts to `/api/contact` with the service choice in the message. Copy is in
`src/data/site.ts`, sections in `src/site/home/`. **Business email is not included** (since
2026-10-30). The share card is still the dark-draft one and needs redrawing for this design.

**Earlier designs**, all kept: the San Francisco fly-through (branch `archive/sf-flythrough-2026-11`),
and on `revamp-2026-11` the paper draft (`d24aa3f`), the dark cinematic draft (`6d66287`) and the
Apple-style tiles (`beef4b0`).

**No third-party scripts.** Fonts are self-hosted by `next/font`; nothing loads from another
origin at render time except the Instagram images.

## Environment variables

| Variable | What it does | Without it |
| --- | --- | --- |
| `BEHOLD_FEED_ID` | The Instagram feed. See below. | Feed section does not render |
| `RESEND_API_KEY` | Sends the contact form | Form fails |
| `LEAD_TO_EMAIL` | Where enquiries arrive | Form fails |
| `LEAD_FROM_EMAIL` | Verified sender on `send.888marketing.net` | Form fails |
| `INSTAGRAM_TOKEN` | Unused fallback. See below. | Nothing — Behold is the live route |
| `INSTAGRAM_USER_ID` | Unused fallback. Selects the Facebook-login variant. | Nothing |

Set them in the Vercel dashboard under **Settings → Environment Variables**.
They only take effect on a **new deploy** — adding one and waiting achieves
nothing.

## The Instagram feed

`@88eightmarketing` appears at the bottom of the homepage, above the call to
action. It is a live feed: we post to Instagram and it turns up here on its own.

It is also a sales feature. Half our prospects say *"I just use Facebook and
Instagram"*, and this is the answer — their feed can live on their own site,
so we are not competing with where they already post. The section says out loud
that it fills itself, and links to the contact form directly underneath, for
exactly that reason.

### It uses Behold, through JSON

[behold.so](https://behold.so) holds the Instagram connection and publishes a
JSON feed at `feeds.behold.so/<id>`. `src/lib/instagram.ts` fetches that on the
server, caches it for an hour, and `src/site/sections/Feed.tsx` renders plain
markup. No client-side JavaScript is involved.

**Use the JSON feed, never their embed script.** Behold's Copy button gives you
a `<script>` block — that is a client-side widget and it would be the heaviest
thing on this page. The value we want is the id inside `feed-id="…"`. Pasting
the script, or the widget's `src` URL, produced three failed deploys before this
was written down.

**Cached for an hour.** A new post takes up to an hour or two to appear. That is
deliberate: Instagram's image links expire after about a day, so a longer cache
would eventually serve pictures that have gone.

**Under three posts renders nothing.** Half a row is a gap in the page rather
than a gallery. On a new account this looks identical to a broken integration,
so check the post count before debugging anything.

### Why not talk to Meta directly

`src/lib/instagram.ts` still supports it and nothing uses it.

Reading an Instagram account requires the owner's authorisation. For an account
we do not own that means Meta **App Review** plus **Advanced Access** — business
verification, a privacy policy, a data-deletion callback, a screen recording,
and weeks of waiting. Then it is ours forever: tokens expire every 60 days and
an expired one silently removes the feed from a paying client's site.

We also hit a wall unrelated to any of that: **Meta will not issue a token to
somebody who does not fully administer the Page and the Instagram account.**
Partial access in Business Suite is not enough and the error says only *"Form
can't be saved"*. If the native route is ever needed, fix that first — Business
settings → Accounts → Pages / Instagram accounts → Assign people → Full control.

Behold costs a few dollars a month and none of the above is ours to maintain.

### Doing this for a client

Same service, same JSON route, one feed per site. The full procedure — including
the account-type check that blocks everything if missed — is in Drive under
*Putting a Client's Instagram Feed on Their Site*.

## Related

| Where | What |
| --- | --- |
| `agency-previews` | The sales engine. Concept pages, the Studio, quotes. Private. |
| Drive → 888 Marketing Handbook | How the business runs, for the team. |
| `docs/888marketing-dns.md` (in `agency-previews`) | DNS, including the one-SPF-record rule. |
