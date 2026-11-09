/*
 * 888 Marketing homepage copy — the studio site, November 2026.
 *
 * Positioning: a design studio. No prices and no "built first, paid after" on
 * the public site; every project is quoted in writing after a conversation.
 * (The sales engine in agency-previews still works as it does.)
 *
 * Previous designs are kept for reuse: the San Francisco fly-through on branch
 * `archive/sf-flythrough-2026-11`, and the paper-and-serif first draft of this
 * revamp in the history of branch `revamp-2026-11` (commit d24aa3f).
 *
 * Rules this file keeps:
 * - Work: only paying clients' sites, live on their own domains. Footage is
 *   recorded from the live site by scripts/record-work.mjs (keys match).
 * - Claims: no testimonials, client counts, star ratings, awards or years in
 *   business. Everything here is something we actually do.
 * - Business email is NOT included (since 2026-10-30). We connect Google
 *   Workspace; the client pays Google. Never write "email included".
 */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Questions", href: "#questions" },
];

export const hero = {
  lines: ["Built to be", "the first", "call."],
  notes: ["Design studio", "Websites · Identity · Content"],
  reelLabel: "Selected work — 2026",
};

export const statement =
  "We design and build websites, identities and the content behind them, for businesses that intend to be the first name their town thinks of.";

export interface Piece {
  key: string;
  name: string;
  kind: string;
  place: string;
  url: string;
  domain: string;
  /** What we did, in a line. */
  line: string;
}

export const work: { eyebrow: string; title: string; pieces: Piece[] } = {
  eyebrow: "Selected work",
  title: "Live, on their own domains.",
  pieces: [
    { key: "jellyceeblends", name: "JellyCee Blends", kind: "Barber & colorist", place: "San Francisco", url: "https://jellyceeblends.com", domain: "jellyceeblends.com", line: "A scroll through her own work, colour by colour, with her real booking calendar built in." },
    { key: "cleanpuppy", name: "Clean Puppy Club", kind: "Dog grooming", place: "San Jose", url: "https://thecleanpuppyclub.com", domain: "thecleanpuppyclub.com", line: "Every price on the page, before-and-afters, and booking in English or Spanish." },
    { key: "tree4less", name: "Trees 4 Less", kind: "Tree service", place: "Monterey County", url: "https://www.tree4less.com", domain: "tree4less.com", line: "Built for a phone call: the number is never more than a thumb away." },
    { key: "classeskin", name: "Classé Skin & Sculpt", kind: "Wellness studio", place: "San Jose", url: "https://www.classeskin.com", domain: "classeskin.com", line: "A treatment menu people actually read, and a booking path nobody has to hunt for." },
    { key: "getkickz", name: "GetKickz", kind: "Streetwear retail", place: "Online", url: "https://getkickz.com", domain: "getkickz.com", line: "Built around the drop: what matters is above the fold, and everything else gets out of its way." },
  ],
};

export const services = {
  eyebrow: "Services",
  items: [
    { name: "Strategy", line: "Who you are for, what you want them to do, and what your competitors already own.", clip: "tree4less" },
    { name: "Identity", line: "A mark, colours and type that hold up on a sign, a van and a phone screen.", clip: "jellyceeblends" },
    { name: "Websites", line: "Designed and built in-house, on your own domain, and hosted by us.", clip: "classeskin" },
    { name: "Content", line: "Photography, short film for social, and the words that make a site worth reading.", clip: "cleanpuppy" },
    { name: "Presence", line: "Google, Yelp, Facebook and Instagram set up properly and handed to you.", clip: "getkickz" },
  ],
};

export const questions = {
  eyebrow: "Questions",
  items: [
    { q: "What does a project cost?", a: "It depends on what the business needs. After a first conversation you get a written proposal with the scope, the timeline and one price, before any work starts." },
    { q: "How long does it take?", a: "The proposal gives you the timeline in writing. Most of the waiting on a project is for photographs and decisions, so we plan around both from the start." },
    { q: "Do I own it?", a: "Yes. The domain is registered in your name, the site is yours, and we hand over everything another developer would need to take it on." },
    { q: "Is business email included?", a: "No. If you want an address at your own domain, we connect Google Workspace for you. You pay Google directly for the mailbox, so it is yours and not tied to us." },
    { q: "What happens after launch?", a: "We host the site and look after it. The renewal price is in the proposal before you sign, never after." },
  ],
};

export const start = {
  eyebrow: "Start a project",
  title: "Tell us about the business.",
  text: "What you do, who you do it for, and what you want the site to change.",
  small: "Every project starts with a conversation and a written proposal. Nothing is charged before you agree to it.",
};

export const footer = { line: "A design studio for businesses that intend to lead." };

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/88eightmarketing/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592828743883" },
];
