/*
 * 888 Marketing homepage copy — November 2026, the campaign landing page.
 *
 * Structure follows what converts on agency landing pages (studied: the
 * SmartSites digital-marketing LP): the proposal form above the fold, a
 * call to action in every section, services tied to outcomes, and a strong
 * close. Craft is ours: one art-directed campaign (Grok stills and film on
 * white seamless, scrubbed by scroll; masters noted in docs/design-research.md)
 * and a live preview of the visitor's own business name.
 *
 * Claims rules, which SmartSites-style pages break and we do not:
 * - No awards, ratings, review counts, client counts, testimonials, years in
 *   business or results figures. Proof is the live work and what we put in
 *   writing.
 * - "Free proposal" is true: the proposal costs nothing.
 * - Business email is NOT included (since 2026-10-30): Google Workspace,
 *   billed by Google.
 * - Client work: paying clients' sites, live on their own domains.
 *
 * Earlier designs: branch `archive/sf-flythrough-2026-11`; on
 * `revamp-2026-11`, d24aa3f (paper), 6d66287 (dark cinematic), beef4b0
 * (Apple-style tiles).
 */

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export const cta = "Get a free proposal";

export const hero = {
  eyebrow: "Websites · Google · Content · Brand",
  title: ["Make your", "phone ring."],
  text: "888 Marketing designs the website, the Google presence and the content that make a local business the first call in town. Premium work, one written price, and a site that is yours.",
};

export const form = {
  title: "Get your free proposal",
  text: "Tell us about the business. We reply with a plan and one price, in writing.",
  needs: ["A new website", "Google, Maps and listings", "Photos and video", "Logo and brand", "Not sure yet"],
  button: "Get my free proposal",
  small: "No obligation. Nothing is charged before you agree to a written proposal.",
};

export const clients = {
  label: "Live on their own domains",
  names: ["JellyCee Blends", "Clean Puppy Club", "Trees 4 Less", "Classé Skin & Sculpt", "GetKickz"],
};

export interface Service {
  id: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  alt: string;
}

export const services: { title: string; text: string; items: Service[] } = {
  title: "Everything that makes the phone ring.",
  text: "Four services, one team, one written price. Take one or all four.",
  items: [
    {
      id: "websites",
      kicker: "Websites",
      title: "A website that wins the call.",
      body: "Designed from scratch for your business, fast on a phone, with one clear action on every screen: call, book or order. Built in-house and hosted by us.",
      points: ["Custom design, never a template", "Fast on a phone, found on Google", "Booking, menus and ordering", "Hosting and care after launch"],
      image: "laptop",
      alt: "A laptop on a white studio floor",
    },
    {
      id: "google",
      kicker: "Google and local search",
      title: "Be the pin they tap.",
      body: "Your Google Business Profile, Maps, Yelp and the structured data that Google and AI assistants read, set up properly and handed to you. Google Ads when you want calls this week.",
      points: ["Google Business Profile and Maps", "Yelp, Facebook and Instagram listings", "Ready for AI search", "Google Ads, managed"],
      image: "pin",
      alt: "A red map pin on a white studio floor",
    },
    {
      id: "content",
      kicker: "Content",
      title: "Pictures that sell the work.",
      body: "A photographer at your place, short film for social, and campaign imagery like the pictures on this page, made for your brand.",
      points: ["On-site photography", "Short film for social", "Campaign imagery", "Copy written by someone who interviewed you"],
      image: "camera",
      alt: "A camera on a white studio floor",
    },
    {
      id: "brand",
      kicker: "Brand",
      title: "Look like the leader.",
      body: "A mark, colours and type that hold up on a sign, a van and a phone screen, with cards and print to match.",
      points: ["Logo and identity", "Colour and type", "Business cards and print", "A one-page brand guide"],
      image: "cards",
      alt: "A stack of blank cards with red edges on a white floor",
    },
  ],
};

/**
 * Systems beyond the website. The demo conversation and dashboard are
 * illustrations of a generic business, labelled "Demo" on the page — never a
 * real client's data, and never our own leads (privacy rule).
 */
export const systems = {
  eyebrow: "Systems",
  title: "Not just a website. The systems behind it.",
  text: "We build the tools that answer, book, take orders and follow up, so the phone rings and nothing slips through.",
  items: [
    { icon: "chat", title: "AI chat assistant", body: "Answers questions, quotes and books around the clock, in your words, trained on your business." },
    { icon: "calendar", title: "Online booking", body: "Your real calendar on your site. Clients pick a time without a phone call." },
    { icon: "bag", title: "Ordering and payments", body: "Menus, carts and pickup orders that land straight with you." },
    { icon: "chart", title: "Owner dashboard", body: "Change hours, prices and photos yourself, and see every enquiry in one place." },
    { icon: "bolt", title: "Automations", body: "Instant replies, reminders and review requests that run on their own." },
    { icon: "plug", title: "Integrations", body: "Google, Instagram, Booksy and the tools you already use, connected to your site." },
  ],
  chat: [
    { from: "them", text: "Hi! Are you open Sunday?" },
    { from: "bot", text: "We are, 9 am to 5 pm. Want me to book you a time?" },
    { from: "them", text: "Yes please, 11 am for two." },
    { from: "bot", text: "Done. You are booked for Sunday at 11:00. I will text you a reminder the day before." },
  ],
  demo: "Demo",
};

export const preview = {
  title: "See your business here.",
  text: "Type your business name. This is how the first screen of a site designed for you could open — and where every project starts.",
  placeholder: "Your business name",
  label: "Illustration",
};

export interface Piece {
  key: string;
  name: string;
  kind: string;
  url: string;
  domain: string;
}

export const work: { title: string; text: string; pieces: Piece[] } = {
  title: "Live work.",
  text: "Real businesses, running on their own domains today. Open any of them.",
  pieces: [
    { key: "jellyceeblends", name: "JellyCee Blends", kind: "Barber & colorist · San Francisco", url: "https://jellyceeblends.com", domain: "jellyceeblends.com" },
    { key: "cleanpuppy", name: "Clean Puppy Club", kind: "Dog grooming · San Jose", url: "https://thecleanpuppyclub.com", domain: "thecleanpuppyclub.com" },
    { key: "tree4less", name: "Trees 4 Less", kind: "Tree service · Monterey County", url: "https://www.tree4less.com", domain: "tree4less.com" },
    { key: "classeskin", name: "Classé Skin & Sculpt", kind: "Wellness studio · San Jose", url: "https://www.classeskin.com", domain: "classeskin.com" },
    { key: "getkickz", name: "GetKickz", kind: "Streetwear retail", url: "https://getkickz.com", domain: "getkickz.com" },
  ],
};

export const process = {
  title: "From first call to live, in four steps.",
  steps: [
    { n: "01", title: "Talk", body: "A short call about the business, the customer and what you want to change." },
    { n: "02", title: "Written proposal", body: "The plan, the timeline and one price. Free, and yours to keep either way." },
    { n: "03", title: "Design and build", body: "Shown on your phone as it takes shape, the way your customers will see it." },
    { n: "04", title: "Launch and care", body: "Live on your domain, listings connected, and looked after from then on." },
  ],
};

export const promises = {
  title: "What you get in writing.",
  items: [
    { title: "One price, before any work", body: "The proposal names the price. It does not move." },
    { title: "Your domain, in your name", body: "Registered to you, not to us." },
    { title: "The site is yours", body: "Everything another developer would need is handed over." },
    { title: "Renewal price up front", body: "Hosting after the first year is on the proposal, before you sign." },
  ],
};

export const faq = {
  title: "Questions.",
  items: [
    { q: "What does a project cost?", a: "It depends on what the business needs. After a first conversation you get a written proposal with the scope, the timeline and one price, before any work starts. The proposal is free." },
    { q: "How long does it take?", a: "The proposal gives you the timeline in writing. Most of the waiting on a project is for photographs and decisions, so we plan around both from the start." },
    { q: "Do I own it?", a: "Yes. The domain is registered in your name, the site is yours, and we hand over everything another developer would need to take it on." },
    { q: "Is business email included?", a: "No. If you want an address at your own domain, we connect Google Workspace for you. You pay Google directly for the mailbox, so it is yours and not tied to us." },
    { q: "Do you run Google Ads?", a: "Yes, when they make sense for the business. We set them up, run them and show you what the money did. We will tell you if ads are not worth it yet." },
    { q: "Who made the pictures on this page?", a: "We did — art-directed and generated for this campaign. We make the same kind of imagery for clients, alongside real photography of your work." },
  ],
};

export const closing = {
  title: ["Let’s make your", "phone ring."],
  text: "One conversation, one written proposal, no obligation.",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/88eightmarketing/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592828743883" },
];
