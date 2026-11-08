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

**888 Marketing presents as a design studio.** The public site no longer advertises "we build
it first and charge after" and shows no prices: every project starts with a conversation and a
written proposal. Warm paper, Instrument Serif set very large, Inter for reading, one accent
(the button). No stock imagery — the type is the picture, and the work is one scroll away.

| Section | What it does |
| --- | --- |
| Hero | "Built to be the first call." One paragraph, the button, and the four disciplines. |
| Work | Each live client site scrolls inside a browser frame as you scroll (desktop); a plain card on phones. |
| Principles | The one dark band: the standard every site is held to. Only things we do on every site. |
| Services | Strategy, Identity, Websites, Content, Presence — a ruled list, no prices. |
| Process, Questions, Instagram, Start | Four stages; native `<details>`; the Behold feed; the project form. |

Copy lives in `src/data/site.ts`, sections in `src/site/home/`. **Business email is not
included** (since 2026-10-30) — the page says we connect Google Workspace and the client pays Google.
The share card (`src/app/opengraph-image.tsx`) embeds Instrument Serif from `src/app/fonts`.

**Work captures** are full-length screenshots of the live client sites:
`node scripts/capture-work.mjs` re-takes them. Re-run it when a client changes their site.

**The previous design** (the San Francisco fly-through, `src/site/Site.tsx` and
`src/data/content.ts`) is saved on branch `archive/sf-flythrough-2026-11` and tag
`site-sf-flythrough-2026-11`. Its files are still in the tree, unused, until someone decides to
remove them; the sequence frames in `public/sequences` and photos in `public/img/sf` are only
used by it.

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
