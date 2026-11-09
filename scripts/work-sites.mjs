/**
 * The client sites the recording scripts visit. Only paying clients' sites,
 * live on their own domains. The homepage copy for each lives in
 * src/data/site.ts under the same key.
 */
export const WORK_SITES = [
  { key: "jellyceeblends", url: "https://jellyceeblends.com", speed: 70 },
  { key: "cleanpuppy", url: "https://thecleanpuppyclub.com" },
  { key: "tree4less", url: "https://www.tree4less.com" },
  { key: "classeskin", url: "https://www.classeskin.com", settle: 6000 },
  { key: "getkickz", url: "https://getkickz.com" },
];

/**
 * The homepage showcase (laptop and phone in the opening scene), in the order
 * the owner chose on 2026-11-08: Plumbing Art, GetKickz, Classé, Clean Puppy
 * Club, Trees 4 Less. `intro` is how long the site's first-visit opener runs
 * before scrolling starts (ms); `speed` scales the scroll.
 */
export const SHOWCASE_SITES = [
  { key: "plumbingart", url: "https://plumbingartbayarea.com", intro: 3600 },
  { key: "getkickz", url: "https://getkickz.com", intro: 3200, speed: 22 },
  { key: "classeskin", url: "https://www.classeskin.com", intro: 4200 },
  { key: "cleanpuppy", url: "https://thecleanpuppyclub.com", intro: 3200 },
  { key: "tree4less", url: "https://www.tree4less.com", intro: 3200, speed: 30 },
];
