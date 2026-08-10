import ContactForm from '@/components/ContactForm';

/**
 * The 888 Marketing homepage.
 *
 * ## What is deliberately absent
 *
 * No testimonials, no star ratings, no "trusted by 200+ businesses", no years
 * in business. We hold prospects' pages to that standard, and a page that
 * invents its own credibility while promising honesty elsewhere is worse than
 * one that simply does not claim anything.
 *
 * What is left is the offer, stated plainly. For an agency whose entire pitch
 * is "we build it first so you do not have to trust us", the absence of
 * manufactured proof is the argument.
 */

const TRADES = [
  'Restaurants',
  'Plumbers',
  'Electricians',
  'Barbers',
  'Landscapers',
  'Bakeries',
  'Roofers',
  'Cleaners',
  'Salons',
  'Mechanics',
  'Caterers',
  'Photographers',
  'Movers',
  'Painters',
  'Florists',
];

const STEPS = [
  {
    n: '01',
    title: 'We build it',
    body: 'You tell us the name of your business and what you do. We build a real, working page for it — live on the internet, on a link you can open on your phone. No mockup, no slide deck, no deposit.',
  },
  {
    n: '02',
    title: 'You look at it',
    body: 'Open the link. It is your business, your words, your work. If something is wrong, tell us and we change it. If you do not like it, you close the tab and you have lost nothing.',
  },
  {
    n: '03',
    title: 'Then you decide',
    body: 'Only if you want it does anything change hands. We move it to your own domain, set up your email, and it is yours.',
  },
];

const INCLUDED = [
  {
    title: 'Hosting, free for a year',
    body: 'Your site online, fast and secure, with nothing to pay for the first twelve months.',
  },
  {
    title: 'Email on your own domain',
    body: 'Not a Gmail address with your business name in it. Something like jose@carwash.com — yours, on your own domain.',
  },
  {
    title: 'Built to be found',
    body: 'Proper page titles, a sitemap, and the structured data Google reads to show you in local results.',
  },
  {
    title: 'Works on a phone',
    body: 'Most of your customers will never see your site on a desktop. It is built for the screen they actually use.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ---------- Header ---------- */}
      <header className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pt-8 sm:px-10">
        <a href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          888 <span className="italic text-accent">Marketing</span>
        </a>
        <a
          href="#start"
          className="text-sm font-medium underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
        >
          Get your page
        </a>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:px-10 sm:pt-32 sm:pb-32">
        <p className="eyebrow">Websites for local business</p>

        <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          We build your website first.
          <br />
          <span className="italic text-accent">You decide after.</span>
        </h1>

        <div className="mt-12 grid gap-10 sm:grid-cols-12">
          <p className="text-lg leading-relaxed text-ink-soft sm:col-span-6 sm:col-start-1 sm:text-xl">
            Most agencies want a deposit before you have seen anything. We do it the other
            way around — we build the page, send you the link, and you decide once it is
            real and in front of you.
          </p>
          <div className="sm:col-span-4 sm:col-start-9">
            <a
              href="#start"
              className="inline-block bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Get your page built
            </a>
            <p className="mt-3 text-sm text-ink-faint">
              No deposit. Nothing to cancel.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Trades marquee ---------- */}
      <section className="border-y border-rule bg-paper-deep py-6 overflow-hidden">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6 text-sm text-ink-faint">
          {TRADES.map((trade) => (
            <li key={trade}>{trade}</li>
          ))}
        </ul>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
          Three steps, and the money is at the end of them.
        </h2>

        <ol className="mt-16 border-t border-rule">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="grid gap-4 border-b border-rule py-10 sm:grid-cols-12 sm:gap-8"
            >
              <span className="numeral font-[family-name:var(--font-display)] text-3xl text-accent sm:col-span-1">
                {step.n}
              </span>
              <h3 className="text-xl font-medium sm:col-span-3">{step.title}</h3>
              <p className="max-w-xl leading-relaxed text-ink-soft sm:col-span-8">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- What's included ---------- */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <p className="eyebrow !text-paper/45">Included in every build</p>
          <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
            Hosting and business email, <span className="italic">included</span>.
          </h2>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <div key={item.title} className="border-t border-paper/15 pt-6">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-paper/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="start" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-14 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em]">
              Tell us about your business.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              Name of the business and what you do is enough to start. We will build the
              page and send you the link — usually the same day.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-faint">
              You are not signing up for anything. There is nothing to cancel, because
              there is nothing to start.
            </p>
          </div>

          <div className="sm:col-span-6 sm:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:px-10">
          <p className="font-[family-name:var(--font-display)] text-lg">
            888 <span className="italic text-accent">Marketing</span>
          </p>
          <p className="text-sm text-ink-faint">
            © {new Date().getFullYear()} 888 Marketing. Websites for local business.
          </p>
        </div>
      </footer>
    </div>
  );
}
