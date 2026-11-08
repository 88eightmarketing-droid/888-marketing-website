/*
 * 888 Marketing homepage copy — the November 2026 revamp.
 *
 * Positioning: a design studio. The public site no longer advertises
 * "we build it first and charge after", and it shows no prices — every project
 * is quoted in writing after a first conversation. (The sales engine in
 * agency-previews still works the way it does; this is only how we present.)
 *
 * The previous design (San Francisco fly-through) and its copy in content.ts are
 * kept on the branch `archive/sf-flythrough-2026-11` and tag
 * `site-sf-flythrough-2026-11`.
 *
 * Rules this file keeps:
 * - Claims: no testimonials, client counts, star ratings, awards or years in
 *   business. Everything here is something we do on every project.
 * - Business email is NOT included (since 2026-10-30). We connect Google
 *   Workspace; the client pays Google. Never write "email included".
 */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Questions", href: "#questions" },
];

export const hero = {
  eyebrow: ["888 Marketing", "Design studio"],
  title: ["Built to be", "the first call."],
  text: "We design and build websites, brand identities and the photography behind them — for businesses that intend to be the first name their customers think of.",
  cta: "Start a project",
  secondary: "See the work",
  disciplines: ["Strategy", "Identity", "Websites", "Content"],
};

export const work = {
  eyebrow: "Selected work",
  title: "Live sites. Open them.",
  text: "Each of these belongs to a real business and is running today at its owner’s own address. Scroll the page inside the frame, then go and look at the real thing.",
  pieces: [
    {
      url: "https://classeskin.com",
      domain: "classeskin.com",
      name: "Classé Skin & Sculpt",
      kind: "Wellness studio · San Jose",
      note: "A treatment menu people actually read, and a booking path nobody has to hunt for.",
      shot: "/work/classeskin-desktop.webp",
      shotW: 1440,
      shotH: 6400,
    },
    {
      url: "https://getkickz.com",
      domain: "getkickz.com",
      name: "GetKickz",
      kind: "Retail · Streetwear",
      note: "Built around the drop. The thing that matters is above the fold and everything else gets out of its way.",
      shot: "/work/getkickz-desktop.webp",
      shotW: 1440,
      shotH: 4809,
    },
  ],
};

/** The dark band: what every site we make is held to. Each is a thing we actually do. */
export const principles = {
  eyebrow: "How we design",
  title: "No two alike. Every site is drawn for the one business it belongs to.",
  items: [
    { n: "01", title: "One thing to do", body: "Every screen has a single action — call, book, order — and nothing competes with it." },
    { n: "02", title: "Found, not just seen", body: "Structured data for Google and the AI assistants people now ask first, written into every page." },
    { n: "03", title: "Fast on a phone", body: "Built for somebody standing up with one bar of signal, because that is who your customer is." },
  ],
};

export const services = {
  eyebrow: "Services",
  title: "Everything a business needs to look the part.",
  items: [
    { name: "Strategy", line: "Who you are for, what you want them to do, and what your competitors already own. Agreed before anything is drawn.", parts: ["Positioning", "Competitor review", "Site structure"] },
    { name: "Identity", line: "A mark, colours and type that hold up on a sign, a van and a phone screen.", parts: ["Logo", "Colour and type", "Print: cards and flyers"] },
    { name: "Websites", line: "Designed and built in-house, on your own domain, and hosted by us.", parts: ["Design and build", "Booking and ordering", "Hosting and care"] },
    { name: "Content", line: "The words and pictures that make a site worth reading.", parts: ["Photography", "Short film for social", "Copywriting"] },
    { name: "Presence", line: "Google, Yelp, Facebook and Instagram set up properly, and handed to you with the logins.", parts: ["Google Business Profile", "Listings", "Instagram on your site"] },
  ],
};

export const process = {
  eyebrow: "Process",
  title: "Four stages. Nothing hidden between them.",
  steps: [
    { n: "01", title: "Conversation", body: "We learn the business, the customer and the goal. You get a written proposal: scope, timeline and price." },
    { n: "02", title: "Design", body: "Direction first, then the pages, shown on your phone the way your customers will see them." },
    { n: "03", title: "Build", body: "Built in-house and checked on real devices. Your content, your photographs, your words." },
    { n: "04", title: "Launch and care", body: "Live on your own domain, listings connected, and hosting looked after so you do not have to think about it." },
  ],
};

export const questions = {
  eyebrow: "Questions",
  title: "Straight answers.",
  items: [
    { q: "What does a project cost?", a: "It depends on what the business needs. After a first conversation you get a written proposal with the scope, the timeline and one price, before any work starts." },
    { q: "How long does it take?", a: "The proposal gives you the timeline in writing. Most of the waiting on a project is for photographs and decisions, so we plan around both from the start." },
    { q: "Do I own it?", a: "Yes. The domain is registered in your name, the site is yours, and we hand over everything another developer would need to take it on." },
    { q: "Is business email included?", a: "No. If you want an address at your own domain, we connect Google Workspace for you. You pay Google directly for the mailbox, so it is yours and not tied to us." },
    { q: "What happens after launch?", a: "We host the site and look after it. The renewal price is in the proposal before you sign, never after." },
    { q: "I already have a website.", a: "Send us the link. We will tell you honestly whether it needs replacing or just needs work." },
  ],
};

export const start = {
  eyebrow: "Start a project",
  title: "Tell us about the business.",
  text: "What you do, who you do it for, and what you want the site to change.",
  small: "Every project starts with a conversation and a written proposal. Nothing is charged before you agree to it.",
};

export const footer = {
  line: "A design studio for businesses that intend to lead.",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/88eightmarketing/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592828743883" },
];
