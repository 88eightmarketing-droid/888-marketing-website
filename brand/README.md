# 888 Marketing — the brand

One page. When this and the code disagree, the code is right and this page is
out of date. Rebuild every file with `node scripts/brand.mjs`.

## The mark

**Three round-stroked eights: ink, ink, 888 red.** It's the same drawing the
site's opener animates, so the first thing anyone sees on 888marketing.net is
the logo being made. Geometry lives in `src/brand/mark.tsx` (EIGHT, GAP, STROKE)
and nowhere else.

| File | Use |
| --- | --- |
| `out/logo/888-stacked*.svg/png` | 888 over MARKETING. Covers, signage, print, anywhere the logo leads |
| `out/logo/888-horizontal*.svg/png` | 888 then Marketing. Site header, email signature, letterhead |
| `out/logo/888-mark*.svg/png` | The eights alone, once the name is already on screen |
| `out/logo/888-eight.svg` | One red eight. Favicons and anything under 32 px |
| `-reverse` | White eights, the third still red, on ink. Never the all-white version on a photo |

Rules:
- The third eight is always red. Never recolour it, never move it.
- Clear space: one eight's width on every side. Smallest: 24 px tall on screen, 8 mm in print.
- No outlines, shadows, gradients, or the eights stretched, italicised or touching.

## Email signature

`out/email-signature.html`: open it in Chrome, select all, copy, paste into Gmail or Zoho's signature box, then replace NAME and ROLE. Its logo loads from `888marketing.net/brand/888-logo-horizontal.png`, so keep that file in `public/brand/`.

## Colour

White page, ink type, **one red, and only on the thing to do** (and the third eight).

| Name | Hex | Use |
| --- | --- | --- |
| Ink | `#0b0b0c` | Type, the first two eights |
| 888 Red | `#d40a10` | The action, the third eight. Hover `#a8060b` |
| White | `#ffffff` | Every page and cover |
| Mist | `#f4f3f1` | Alternating bands |
| Steel | `#6b6b70` | Secondary text, addresses |
| Hair | `#e3e1dd` | Rules and borders |

## Type

**Inter**, one family. Bold (700–800) for headlines, set big and tight
(tracking −0.04em). Medium for labels. No serif, no second family.

## Voice

Short declaratives. The line is **"Make your phone ring."** Say what we do,
name the price in writing, stop. No exclamation marks, no emoji, no adjectives
doing the selling. Business email is **not** included: say Google Workspace,
billed by Google.

**Claims:** no awards, ratings, review counts, client counts, testimonials or
years in business. The proof is client sites, live on their own domains.

## Profiles

One handle everywhere: **@88eightmarketing**. Every profile uses the same
avatar, the same cover line, the same bio, and links to 888marketing.net.
The list the site links (and puts in its schema) is `src/brand/profiles.ts`;
add a profile there only once it opens logged out.

| Platform | Avatar | Cover |
| --- | --- | --- |
| Instagram, Threads, TikTok, Pinterest | `social/avatar.png` (1080) | — |
| Facebook | `social/avatar.png` | `social/facebook-cover.jpg` 1640×624 |
| YouTube | `social/avatar.png` | `social/youtube-banner.jpg` 2560×1440 |
| Google Business Profile | `social/avatar.png` | `social/google-cover.jpg` 1024×576 |
| LinkedIn page | `social/avatar.png` | `social/linkedin-cover.jpg` 1128×191 |
| X | `social/avatar.png` | `social/x-header.jpg` 1500×500 |

**Bio (150 characters, every platform):**
> Websites, Google, content and brand for local businesses. One written price. Bay Area. 888marketing.net

Inter is under the SIL Open Font License; the copies in `fonts/` are for the build only.
