/**
 * The pieces in the work film. Real 888 work only, paying clients live on
 * their own domains (owner's rule, 8 Nov 2026); no pitches. Clips are cut from
 * the films we made (agency-previews/docs/leads) and the site recordings
 * (public/showcase) into public/film. Copy names the company, never the owner.
 */

export interface Clip { mp4: string; jpg: string }
export interface Reel {
  id: string;
  kind: string;
  title: string;
  body: string;
  client: string;
  domain: string;
  url: string;
  layout: "full" | "kit" | "pair";
  wide: Clip;
  tall: Clip;
  tall2?: Clip;
  ground: string;
  focus?: string;
  kit?: { src: string; x: string; y: string; r: number }[];
}

const c = (name: string): Clip => ({ mp4: `/film/${name}.mp4`, jpg: `/film/${name}.jpg` });

export const reels: Reel[] = [
  {
    id: "jelly",
    kind: "Website",
    title: "Built to be\nthe first call.",
    body: "A San Francisco barber's site, designed from her own work: her cuts, her colours, booking in one tap.",
    client: "JellyCee Blends",
    domain: "jellyceeblends.com",
    url: "https://jellyceeblends.com",
    layout: "full",
    wide: c("jelly-wide"),
    tall: c("jelly-tall"),
    ground: "#ff2fa0",
  },
  {
    id: "pa",
    kind: "Brand",
    title: "A brand you\ncan hand out.",
    body: "A new mark for a licensed plumber, and everything it goes on: cards, flyers, the seal, the site.",
    client: "Plumbing Art",
    domain: "plumbingartbayarea.com",
    url: "https://plumbingartbayarea.com",
    layout: "kit",
    wide: c("pa-square"),
    tall: c("pa-square"),
    ground: "#101a2c",
    kit: [
      { src: "/made/pa-card-front.webp", x: "8%", y: "16%", r: -8 },
      { src: "/made/pa-flyer.webp", x: "74%", y: "10%", r: 6 },
      { src: "/made/pa-card-back.webp", x: "10%", y: "58%", r: 5 },
      { src: "/made/pa-insta.webp", x: "76%", y: "56%", r: -5 },
    ],
  },
  {
    id: "fren",
    kind: "System",
    title: "Invites that\nplay like a game.",
    body: "For a game truck: the parent builds the invite, guests RSVP in three taps and play while they wait, the host sees who is coming.",
    client: "Frenemies Game Truck",
    domain: "frenemiesinabox.com",
    url: "https://frenemiesinabox.com",
    layout: "full",
    wide: c("fren-wide"),
    tall: c("fren-tall"),
    ground: "#120a1c",
  },
  {
    id: "classe-book",
    kind: "Booking",
    title: "Booked in\nthree taps.",
    body: "A private cryo studio in San Jose: choose a ritual, pick a time, done. Gift cards for the season, on the same site.",
    client: "Classé Skin & Sculpt",
    domain: "classeskin.com",
    url: "https://www.classeskin.com",
    layout: "full",
    wide: c("classe-book-wide"),
    tall: { mp4: "/showcase/classeskin-phone.mp4", jpg: "/showcase/classeskin-phone.jpg" },
    ground: "#0b0b0c",
  },
  {
    id: "classe-reels",
    kind: "Content",
    title: "Posted every week,\nin the brand.",
    body: "Reels and posts made in the studio's own look, approved by the owner, posted to Facebook, Instagram and YouTube from one place.",
    client: "Classé Skin & Sculpt",
    domain: "@classeskin",
    url: "https://www.instagram.com/classeskin/",
    layout: "pair",
    wide: c("classe-day"),
    tall: c("classe-day"),
    tall2: c("classe-launch"),
    ground: "#0b0b0c",
  },
];
