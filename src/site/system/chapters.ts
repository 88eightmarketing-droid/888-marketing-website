import type { Chapter } from "./System";
import { Concept, Found, Live, Made, Posted, Quote, Results, Reviews, Ring, Sign } from "./screens";

/**
 * The 888 workflow, in the order a client lives it (from the Studio:
 * agency-previews). Copy rules: no prices, ratings, counts or results;
 * business email is Google Workspace, billed by Google; the Publisher posts
 * Facebook, Instagram, Threads and YouTube (others by hand); review asks are
 * the same for everyone.
 */
export const chapters: Chapter[] = [
  { id: "built", label: "Built first", word: "First", kicker: "Before you pay", title: "We build it\nfirst.", body: "Your business gets a real, working site with your name on it before anyone talks about money. You open it on your phone and decide.", screen: Concept },
  { id: "price", label: "One price", word: "Price", kicker: "The quote", title: "One price,\nin writing.", body: "Everything on one page, hosting included for years and the renewal shown up front. Once it is sent, the price is frozen.", screen: Quote },
  { id: "signed", label: "Signed", word: "Yes", kicker: "The agreement", title: "Signed on\nyour phone.", body: "A three-line summary, the full agreement, and your finger. No printer, no scanner, no office visit.", screen: Sign },
  { id: "made", label: "Made", word: "Made", kicker: "The making", title: "Photos, film,\nlogo, words.", body: "A few questions you can answer at the kitchen table. Then a shoot at your place, a short film, a logo with its own guide, and words written by someone who listened.", screen: Made },
  { id: "live", label: "Live", word: "Live", kicker: "Launch", title: "Live on your\nown domain.", body: "Your address, registered in your name, hosting included. Business email runs on Google Workspace, billed by Google, and we set it up.", screen: Live },
  { id: "found", label: "Found", word: "Found", kicker: "Google and Maps", title: "Found where\npeople look.", body: "Your Google profile, Maps, Apple Maps, Bing, Facebook and Instagram set up to match, so the search ends with you.", screen: Found },
  { id: "posted", label: "Posted", word: "Posted", kicker: "Social", title: "One post.\nEvery channel.", body: "We write it and you approve it from your phone. It goes to Facebook, Instagram, Threads and YouTube with a caption made for each.", screen: Posted },
  { id: "reviews", label: "Reviews", word: "Tap", kicker: "Reviews", title: "Reviews,\nasked properly.", body: "A card with a chip on your counter. One tap opens your Google review box. Everyone gets the same ask.", screen: Reviews },
  { id: "results", label: "Your page", word: "Clear", kicker: "Your page", title: "See what it\nbrings in.", body: "One link shows where your calls and messages come from, what your ads spent against your limit, and what we did this week.", screen: Results },
  { id: "ring", label: "Ring", word: "Ring", kicker: "The point", title: "Your phone\nrings.", body: "That is the whole job. Everything above exists to make it happen more often.", screen: Ring },
];
