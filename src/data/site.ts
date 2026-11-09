/*
 * 888 Marketing homepage copy — November 2026, product-page style.
 *
 * Positioning: a design studio. No prices and no "built first, paid after";
 * every project is quoted in writing after a conversation. (The sales engine in
 * agency-previews still works as it does.)
 *
 * The page treats each service as a product: a name, one line, two actions,
 * and a picture drawn in code. Client work appears in one small strip, by the
 * owner's direction (2026-11-08): it supports the design, it does not take it
 * over.
 *
 * Earlier designs: the San Francisco fly-through (branch
 * `archive/sf-flythrough-2026-11`), the paper-and-serif draft (d24aa3f) and the
 * dark cinematic draft (6d66287), both on `revamp-2026-11`.
 *
 * Rules: no testimonials, client counts, ratings, awards, years in business or
 * uptime figures. The UI drawn inside the product pictures is illustration of
 * a generic business, never a real one. Business email is NOT included (since
 * 2026-10-30) — we connect Google Workspace and the client pays Google.
 */

export const nav = [
  { label: "Websites", href: "#websites" },
  { label: "Identity", href: "#identity" },
  { label: "Content", href: "#content" },
  { label: "Presence", href: "#presence" },
  { label: "Work", href: "#work" },
  { label: "Questions", href: "#questions" },
];

export const hero = {
  name: "888 Marketing",
  title: "Websites, made like products.",
  cta: "Start a project",
  secondary: "How it works",
};

export const tiles = {
  websites: { name: "Website", line: "Fast on a phone. Found on Google. Made to turn a visit into a call." },
  identity: { name: "Identity", line: "Look like you mean it." },
  content: { name: "Content", line: "Photos and film that sell the work." },
  presence: { name: "Presence", line: "Everywhere people look for you." },
  care: { name: "Care", line: "Hosted. Updated. Looked after." },
};

export const difference = {
  title: "Built like a product.\nNot like a template.",
  items: [
    { icon: "pencil", title: "Designed from scratch", body: "Every site is drawn for the one business it belongs to. No themes, no page builders." },
    { icon: "target", title: "One action per screen", body: "Call, book or order. Nothing on the page competes with the thing you want people to do." },
    { icon: "search", title: "Ready for search and AI", body: "Structured data for Google and the assistants people now ask first, on every page." },
    { icon: "key", title: "Yours, in your name", body: "The domain is registered to you, and everything another developer would need is handed over." },
  ],
};

export const process = {
  title: "How it works.",
  steps: [
    { n: "1", title: "Talk", body: "We learn the business, the customer and the goal." },
    { n: "2", title: "Proposal", body: "Scope, timeline and one price, in writing, before any work starts." },
    { n: "3", title: "Design and build", body: "Shown on your phone the way your customers will see it." },
    { n: "4", title: "Launch", body: "Live on your domain, listings connected, and looked after." },
  ],
};

export interface Piece {
  key: string;
  name: string;
  kind: string;
  url: string;
  domain: string;
}

export const work: { title: string; line: string; pieces: Piece[] } = {
  title: "Live now.",
  line: "A few of the businesses we have built for, running on their own domains today.",
  pieces: [
    { key: "jellyceeblends", name: "JellyCee Blends", kind: "Barber & colorist · San Francisco", url: "https://jellyceeblends.com", domain: "jellyceeblends.com" },
    { key: "cleanpuppy", name: "Clean Puppy Club", kind: "Dog grooming · San Jose", url: "https://thecleanpuppyclub.com", domain: "thecleanpuppyclub.com" },
    { key: "tree4less", name: "Trees 4 Less", kind: "Tree service · Monterey County", url: "https://www.tree4less.com", domain: "tree4less.com" },
    { key: "classeskin", name: "Classé Skin & Sculpt", kind: "Wellness studio · San Jose", url: "https://www.classeskin.com", domain: "classeskin.com" },
    { key: "getkickz", name: "GetKickz", kind: "Streetwear retail", url: "https://getkickz.com", domain: "getkickz.com" },
  ],
};

export const questions = {
  title: "Questions.",
  items: [
    { q: "What does a project cost?", a: "It depends on what the business needs. After a first conversation you get a written proposal with the scope, the timeline and one price, before any work starts." },
    { q: "How long does it take?", a: "The proposal gives you the timeline in writing. Most of the waiting on a project is for photographs and decisions, so we plan around both from the start." },
    { q: "Do I own it?", a: "Yes. The domain is registered in your name, the site is yours, and we hand over everything another developer would need to take it on." },
    { q: "Is business email included?", a: "No. If you want an address at your own domain, we connect Google Workspace for you. You pay Google directly for the mailbox, so it is yours and not tied to us." },
    { q: "What happens after launch?", a: "We host the site and look after it. The renewal price is in the proposal before you sign, never after." },
  ],
};

export const start = {
  title: "Let’s build yours.",
  text: "Tell us what you do and what you want the site to change. Every project starts with a conversation and a written proposal, and nothing is charged before you agree to it.",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/88eightmarketing/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592828743883" },
];
