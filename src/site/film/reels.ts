/**
 * The pieces in the work film. Real 888 work only, paying clients live on
 * their own domains (owner's rule, 8 Nov 2026). One exception the owner asked
 * for on 25 Nov: the Carnitas El Rincón concept, labelled Concept and not linked. Clips are cut from
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
    id: "herns",
    kind: "Website",
    title: "A law office,\nclear at a glance.",
    body: "Personal injury and business litigation in La Quinta: what to do after an accident, then a call or a three-step form.",
    client: "Law Offices of Daniel G. Herns",
    domain: "danielhernslaw.com",
    url: "https://danielhernslaw.com",
    layout: "full",
    wide: c("herns-wide"),
    tall: c("herns-tall"),
    ground: "#1c2a3d",
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
    id: "rincon",
    kind: "Ordering · Concept",
    title: "By the pound,\nfrom the store.",
    body: "A concept for a family taquería chain: pick the nearest store, build the order by the pound, pay, pick up. No delivery app in between.",
    client: "Carnitas El Rincón",
    domain: "",
    url: "",
    layout: "full",
    wide: c("rincon-wide"),
    tall: c("rincon-tall"),
    ground: "#c8102e",
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
