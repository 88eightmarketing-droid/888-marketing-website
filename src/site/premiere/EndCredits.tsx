import { reels } from "@/site/film/reels";

/**
 * End credits (premiere home, 25 Nov 2026): every live client and what 888
 * made, set like the roll at the end of a film. The featured reels plus the
 * live client sites that have no film yet. Paying clients' live sites only;
 * Trail Pushers by the owner's choice (25 Nov).
 */
const more = [
  { client: "The Clean Puppy Club", credits: ["Website", "Google Ads", "Google posts"], domain: "thecleanpuppyclub.com", url: "https://thecleanpuppyclub.com" },
  { client: "Trees 4 Less", credits: ["Website", "Listings"], domain: "tree4less.com", url: "https://www.tree4less.com" },
  { client: "Plumbing Art", credits: ["Brand", "Print", "Website"], domain: "plumbingartbayarea.com", url: "https://plumbingartbayarea.com" },
];

export default function EndCredits() {
  const seen = new Set<string>();
  const rows = [...reels, ...more]
    .map((r) => ({ client: r.client, credits: r.credits, domain: r.domain, url: r.url }))
    .reduce<{ client: string; credits: string[]; domain: string; url: string }[]>((acc, r) => {
      const prev = acc.find((a) => a.client === r.client);
      if (prev) { for (const c of r.credits) if (!prev.credits.includes(c)) prev.credits.push(c); return acc; }
      if (!seen.has(r.client)) { seen.add(r.client); acc.push({ ...r, credits: [...r.credits] }); }
      return acc;
    }, [])
    .map((r) => (r.domain.startsWith("@") ? { ...r, domain: "", url: "" } : r));

  return (
    <section className="ec" aria-labelledby="ec-title" data-dark>
      <div className="ec-in">
        <h2 id="ec-title" className="ec-head" data-fade>Starring</h2>
        <dl className="ec-list">
          {rows.map((r) => (
            <div key={r.client} className="ec-row" data-fade>
              <dt className="ec-role">{r.credits.join(" · ")}</dt>
              <dd className="ec-name">
                {r.url ? <a href={r.url} target="_blank" rel="noopener">{r.client}</a> : r.client}
              </dd>
            </div>
          ))}
        </dl>
        <p className="ec-close" data-fade>Made in the Bay Area by 888 Marketing.</p>
        <a className="ec-next" href="#proposal" data-fade>The next one could be yours <span aria-hidden>↓</span></a>
      </div>
    </section>
  );
}
