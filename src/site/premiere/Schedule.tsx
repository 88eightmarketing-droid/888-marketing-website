/**
 * How working with 888 goes, as a production schedule (premiere home, 25 Nov 2026).
 * The promises are the same three lines as before (src/data/site.ts: form.small, hero.text).
 */
const steps = [
  { stage: "Development", line: "One conversation.", sub: "Tell us about the business. We listen before we design anything." },
  { stage: "Production", line: "One written price.", sub: "A plan and one price, in writing. Nothing is charged before you agree to it." },
  { stage: "Premiere", line: "Live on your domain.", sub: "Designed, built and hosted by us. The site is yours." },
];

export default function Schedule() {
  return (
    <section id="how" className="sc scroll-mt-16" aria-labelledby="sc-title">
      <div className="sc-in">
        <h2 id="sc-title" className="sc-head" data-fade>From first call<br />to opening night.</h2>
        <ol className="sc-list">
          {steps.map((s, i) => (
            <li key={s.stage} className="sc-item" data-fade style={{ ["--d" as string]: `${i * 90}ms` }}>
              <span className="sc-stage"><span className="sc-n">{String(i + 1).padStart(2, "0")}</span>{s.stage}</span>
              <p className="sc-line">{s.line}</p>
              <p className="sc-sub">{s.sub}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
