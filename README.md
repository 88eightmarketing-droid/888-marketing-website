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

## The design (October 2026)

Rebuilt in the "café" style: a hero that opens above the clouds and, as you scroll, sinks through
them into San Francisco (Golden Gate in fog → skyline → sunset → dusk → Nob Hill at night), with
the three steps as captions; then flat maroon / pink / sky blocks in Anton capitals and Inter.
Copy is word for word from the previous site. Code: `src/site/` (sections), copy in
`src/data/content.ts`, effects in `src/effects/`.

**It has images now, on purpose.** The old site was 55 KB with none. The fly-through is a
scroll-scrubbed frame sequence: 192 frames at 1280px (~13 MB) on desktop, 96 at 720px (~2.4 MB)
on phones, loaded coarse-to-fine so scrubbing works before it finishes. The first frame is a CSS
backdrop, so the hero paints instantly and still works with JavaScript off; reduced-motion visitors
get the still frame.

**Photos** are from Wikimedia Commons under CC0 / CC BY / CC BY-SA and are credited in the footer;
the list is `public/img/sf/CREDITS.txt`. Keep the footer credit if you keep the photos.

**Regenerating the sequence** (if photos change): `scripts/sf-shots.json` lists the stills,
`scripts/kenburns-sequence.mjs` makes the photo push, and `scripts/compose-sequence.mjs` joins the
cloud frames to it through a white-out. The cloud frames were rendered from
`scripts/scenes/CloudDescent.tsx` with three.js via `scripts/render-sequence.mjs`; the full working
setup for that lives in `~/site-clones/888-sf` (it needs three / R3F, which this site does not ship).
A real drone or AI clip can replace everything: `scripts/video-to-sequence.sh clip.mp4 public/sequences/sf 192`.

**No third-party scripts.** Still true: nothing loads from another origin at render time.

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
