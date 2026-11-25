/**
 * How working with 888 goes, in three lines (one-page home, 25 Nov 2026).
 * Every line is already promised elsewhere on the site (src/data/site.ts: form.small, hero.text).
 */
const steps = [
  { line: "One conversation.", sub: "Tell us about the business. We listen before we design anything." },
  { line: "One written price.", sub: "A plan and one price, in writing. Nothing is charged before you agree to it." },
  { line: "Live on your domain.", sub: "Designed, built and hosted by us. The site is yours." },
];

export default function How() {
  return (
    <section id="how" className="hw scroll-mt-16" aria-labelledby="how-title">
      <div className="hw-list">
        <h2 id="how-title" className="hw-n">How it works</h2>
        {steps.map((s, i) => (
          <div key={s.line} className="hw-item" data-fade style={{ ["--d" as string]: `${i * 80}ms` }}>
            <span className="hw-n">{String(i + 1).padStart(2, "0")}</span>
            <p className="hw-line">{s.line}</p>
            <p className="hw-sub">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
