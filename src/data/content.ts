/*
 * 888 Marketing homepage copy, carried over word for word from the live site (~/888-marketing-website,
 * app/page.tsx) except the fly-through captions, which restate the same three steps.
 * Claims rule: no testimonials, client counts or years in business.
 */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Price", href: "#price" },
  { label: "How it works", href: "#how" },
  { label: "Questions", href: "#questions" },
];

/*
 * The page used to say "see your website before you pay" in eight places — the
 * title tag, the headline, both flight captions, the price note, two of the
 * three steps and a full-bleed marquee that repeated it twenty times. It had
 * stopped being a message on the site and become the site.
 *
 * It is still how we work, so it still appears: once in How it works, where it
 * is a description of the process, and once in the questions, where somebody
 * has asked. Said in its place it is an offer. Said on every surface it reads
 * as a thing we are trying to convince ourselves of.
 *
 * What the page is about instead is the work, which we can show and nobody
 * else can.
 */
export const hero = {
  eyebrow: "Websites for local business",
  /*
   * Two lines, not three. "Real businesses." is sixteen characters and at
   * 375px the display face broke it after "REAL", which left a widow and
   * turned a three-beat headline into four. Shrinking the type would have
   * fixed the wrap and cost the thing that makes a headline read as designed;
   * the line that would not fit was the one to cut, and what it said is
   * already said below in a sentence.
   */
  title: ["Real sites.", "Open them."],
  text: "Every site below belongs to a real business and is live right now, at its owner’s own address, exactly as they have it today. From $499, live in about a week, with hosting and a business email on your own domain.",
  cta: "Get my page built",
  note: "No deposit · No contract · Takes two minutes",
};

/**
 * Captions over the San Francisco flight, keyed to scroll progress.
 *
 * Two, not four. The flight was six screens carrying a slogan; it is now a
 * little over two and its whole job is to hand the page to the work. The
 * second caption says so literally, so the scroll that follows is the thing
 * it just promised rather than another section.
 */
export interface Caption {
  from: number;
  to: number;
  kicker: string;
  lines: string[];
  align: "left" | "right" | "center";
}

export const captions: Caption[] = [
  { from: 0.22, to: 0.55, kicker: "Websites for local business", lines: ["We build the", "real thing."], align: "left" },
  { from: 0.62, to: 1.01, kicker: "888 Marketing", lines: ["Now look at", "the work."], align: "left" },
];

export const work = {
  eyebrow: "Our work",
  title: "Work we have done. Open it.",
  text: "Scroll each one and you are looking at the real page, not a thumbnail of it. Click and you land on the live site, today, exactly as its owner has it. They look nothing like each other on purpose, because they are not the same business.",
  cta: "Build one for my business",
  note: "Same day, and you owe nothing to look at it.",
  pieces: [
    { url: "https://classeskin.com", domain: "classeskin.com", name: "Classé Skin & Sculpt", kind: "Wellness · San Jose", note: "A treatment menu people actually read, and a booking path that does not make anyone hunt for it.", shot: "/work/classeskin.webp" },
    { url: "https://getkickz.com", domain: "getkickz.com", name: "GetKickz", kind: "Retail · Streetwear", note: "Built around the drop. The thing that matters is above the fold and everything else gets out of its way.", shot: "/work/getkickz.webp" },
  ],
};

export const price = {
  eyebrow: "What it costs",
  title: "One price, paid once. Hosting and email included.",
  tiers: [
    { name: "Landing page", price: "$499", pages: "One page", line: "Phone, services, and how to find you. Built for people who just need to be findable and callable." },
    { name: "Full website", price: "$999", pages: "One page, complete", line: "Everything above, plus your story, your photos and your reviews." },
    { name: "Multi-page", price: "$1,999", pages: "Four pages", line: "Room to explain each service properly, rather than squeezing them into a list." },
    { name: "Larger build", price: "Quoted", pages: "Five or more", line: "Booking, menus, portfolios, anything bespoke. We will tell you what it costs before we start." },
  ],
  included: ["Twelve months of hosting", "A business email on your own domain", "The domain is yours, in your name", "No deposit, and nothing to cancel"],
  cta: "Get my page built",
  note: "One price, quoted in writing, with nothing to pay up front.",
  renewal: "We tell you the renewal price in writing on the quote, before you buy — never after.",
};

export const how = {
  eyebrow: "How it works",
  title: "Three steps, and the money is at the end of them.",
  steps: [
    { n: "01", when: "Same day", title: "We build it first", body: "You tell us the name of your business and what you do — two minutes on the phone. We build a real, working page and text you the link. No mockup, no slide deck, no deposit." },
    { n: "02", when: "Your own time", title: "You look at it", body: "Open it on your phone. It is your business, your words, your work. Wrong? Tell us and we change it. Do not want it? Close the tab. You have paid nothing and owe nothing." },
    { n: "03", when: "About a week", title: "Then you decide", body: "Only if you want it does money change hands. We move it to your own domain, set up your email, and hand you everything." },
  ],
};

export const questions = {
  eyebrow: "The questions everyone asks",
  title: "Straight answers.",
  items: [
    { q: "What is the catch?", a: "There is not one, but there is a reason. Building the page first is cheaper for us than arguing about whether we can. Most people say yes once they can see it, and the ones who say no cost us an hour. That maths works for us — you just get the good end of it." },
    { q: "Do I own it?", a: "Yes. The domain is registered in your name, the site is yours, and we hand over everything a different developer would need to take it on. We would rather you stayed because it works than because leaving is difficult." },
    { q: "What happens after the first year of hosting?", a: "You either renew with us or take the site elsewhere. We will tell you the renewal price before you buy, in writing, on the quote. Nobody here is going to describe anything as free forever." },
    { q: "I already have a website.", a: "Then send us the link and we will tell you honestly whether it needs replacing. Sometimes it does not. If it does, we will build the replacement before you pay for it, same as anyone else." },
    { q: "How long does it take?", a: "You will usually see the first version the same day you call. From a yes to live is about a week, most of which is waiting on you for photos and a domain decision." },
    { q: "What do you need from me?", a: "To start, almost nothing — the name of the business and what you do. To finish, your logo if you have one, some photos of your work, and ten minutes to check the wording." },
  ],
};

export const start = {
  eyebrow: "Start here",
  title: "Tell us the name of your business.",
  text: "That and what you do is enough. We’ll build the page and send you the link — usually the same day.",
  small: "You’re not signing up for anything. There’s nothing to cancel, because there’s nothing to start.",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/88eightmarketing/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592828743883" },
];

export const credits =
  "Photography via Wikimedia Commons: San Francisco skyline from Marin Headlands, Ryan Schwark (CC0); San Francisco Sunset from the top of Salesforce Tower, Steve Jurvetson (CC BY 2.0); San Francisco Skyline, Luke Price (CC BY 2.0); California Street at Nob Hill, Thomas Hawk (CC BY 2.0); Painted ladies, Bernard Spragg (CC0); Lombard Street, Nan Palmero (CC BY 2.0); Bay Bridge at night, Mikl Barton (CC BY 3.0); Golden Gate Bridge (Karl the Fog), Faisalmujib (CC BY-SA 4.0); Cable car 19 on Hyde Street, Pi.1415926535 (CC BY-SA 4.0). Cloud sequence rendered by 888 Marketing.";
