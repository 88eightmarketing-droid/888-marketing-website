import ContactForm from '@/components/ContactForm';
import HeroProof from '@/components/HeroProof';
import Reveal from '@/components/Reveal';
import WorkShowcase from '@/components/WorkShowcase';

/**
 * The 888 Marketing homepage.
 *
 * ## Who this is for
 *
 * Not a design buyer. A plumber, a roofer, a restaurant owner — often in their
 * fifties, phone-first, and sceptical because someone has sold them a website
 * before and it went nowhere. They want three things answered before they will
 * engage: what it costs, how long it takes, and who they are actually talking
 * to. An earlier version of this page answered none of them and read as a
 * design portfolio.
 *
 * ## What is deliberately absent
 *
 * No testimonials, no client counts, no years in business. We hold prospects'
 * pages to that standard and cannot exempt our own. The examples below are
 * labelled as examples rather than as client work, because they are concepts
 * built to demonstrate the system — presenting them as delivered projects
 * would be the exact fabrication we refuse to do for anyone else.
 */

const PRICES = [
  { name: 'Landing page', price: '$499', line: 'One page. Phone, services, and how to find you.' },
  { name: 'Full website', price: '$999', line: 'Everything above, plus your story, photos and reviews.' },
  { name: 'Multi-page', price: '$1,999', line: 'Four pages, with room for each service.' },
  { name: 'Larger build', price: 'Quoted', line: 'Booking, menus, portfolios, anything bespoke.' },
];

const STEPS = [
  {
    n: '01',
    when: 'Same day',
    title: 'We build it first',
    body: 'You tell us the name of your business and what you do — two minutes on the phone. We build a real, working page and text you the link. No mockup, no slide deck, no deposit.',
  },
  {
    n: '02',
    when: 'Your own time',
    title: 'You look at it',
    body: 'Open it on your phone. It is your business, your words, your work. Wrong? Tell us and we change it. Do not want it? Close the tab. You have paid nothing and owe nothing.',
  },
  {
    n: '03',
    when: 'About a week',
    title: 'Then you decide',
    body: 'Only if you want it does money change hands. We move it to your own domain, set up your email, and hand you everything.',
  },
];

const OBJECTIONS = [
  {
    q: 'What is the catch?',
    a: 'There is not one, but there is a reason. Building the page first is cheaper for us than arguing about whether we can. Most people say yes once they can see it, and the ones who say no cost us an hour. That maths works for us — you just get the good end of it.',
  },
  {
    q: 'Do I own it?',
    a: 'Yes. The domain is registered in your name, the site is yours, and we hand over everything a different developer would need to take it on. We would rather you stayed because it works than because leaving is difficult.',
  },
  {
    q: 'What happens after the first year of hosting?',
    a: 'You either renew with us or take the site elsewhere. We will tell you the renewal price before you buy, in writing, on the quote. Nobody here is going to describe anything as free forever.',
  },
  {
    q: 'I already have a website.',
    a: 'Then send us the link and we will tell you honestly whether it needs replacing. Sometimes it does not. If it does, we will build the replacement before you pay for it, same as anyone else.',
  },
  {
    q: 'How long does it take?',
    a: 'You will usually see the first version the same day you call. From a yes to live is about a week, most of which is waiting on you for photos and a domain decision.',
  },
  {
    q: 'What do you need from me?',
    a: 'To start, almost nothing — the name of the business and what you do. To finish, your logo if you have one, some photos of your work, and ten minutes to check the wording.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Reveal />

      {/* ---------- Header ---------- */}
      <header className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pt-8 sm:px-10">
        <a href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          888 <span className="italic text-accent">Marketing</span>
        </a>
        <a
          href="#start"
          className="bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Get your page
        </a>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:px-10 sm:pt-20 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow reveal">Websites for local business</p>

            <h1 className="reveal mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[0.95] tracking-[-0.02em]" data-delay="1">
              We build your website first.
              <br />
              <span className="italic text-accent">You decide after.</span>
            </h1>

            <p className="reveal mt-7 max-w-[48ch] text-lg leading-relaxed text-ink-soft sm:text-xl" data-delay="2">
              Tell us the name of your business. We build a real page for it today and
              send you the link. If you like it, it&rsquo;s <strong className="text-ink">from $499</strong>,
              live in about a week, with hosting and email included. If you don&rsquo;t,
              you close the tab — you&rsquo;ve paid nothing.
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-5" data-delay="3">
              <a
                href="#start"
                className="inline-block bg-ink px-8 py-4 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent"
              >
                Get my page built
              </a>
              <span className="text-sm text-ink-faint">
                No deposit · No contract · Takes two minutes
              </span>
            </div>
          </div>

          <div className="reveal lg:col-span-5" data-delay="2">
            <div className="aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]">
              <HeroProof />
            </div>
            <p className="mt-4 text-center text-sm text-ink-faint">
              A real page, on a phone. Tap it — it opens.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Price, early and plainly ---------- */}
      <section id="price" className="border-y border-rule bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
          <p className="eyebrow reveal">What it costs</p>
          <h2 className="reveal mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em]" data-delay="1">
            One price, paid once. Hosting and email included.
          </h2>

          <div className="reveal mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4" data-delay="2">
            {PRICES.map((tier) => (
              <div key={tier.name} className="bg-paper p-6">
                <p className="font-[family-name:var(--font-display)] text-3xl">{tier.price}</p>
                <p className="mt-2 font-medium">{tier.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tier.line}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-6 max-w-[60ch] text-sm leading-relaxed text-ink-faint" data-delay="2">
            Every build includes twelve months of hosting and a business email on your own
            domain. We tell you the renewal price in writing on the quote, before you buy.
          </p>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="eyebrow reveal">How it works</p>
        <h2 className="reveal mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em]" data-delay="1">
          Three steps, and the money is at the end of them.
        </h2>

        <ol className="reveal mt-14 border-t border-rule" data-delay="1">
          {STEPS.map((step) => (
            <li key={step.n} className="grid gap-4 border-b border-rule py-9 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-2">
                <span className="numeral font-[family-name:var(--font-display)] text-3xl text-accent">
                  {step.n}
                </span>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">{step.when}</p>
              </div>
              <h3 className="text-xl font-medium sm:col-span-3">{step.title}</h3>
              <p className="max-w-xl leading-relaxed text-ink-soft sm:col-span-7">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Examples, labelled honestly ---------- */}
      <section id="work" className="border-y border-rule bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
          <p className="eyebrow reveal">What you would get</p>
          <h2 className="reveal mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em]" data-delay="1">
            Two examples. Open them.
          </h2>
          <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-ink-soft" data-delay="1">
            These are demonstration pages, not client sites — built by the same system that
            would build yours, for two invented businesses in different trades. They look
            nothing like each other on purpose. Yours would look like neither.
          </p>

          <div className="reveal mt-12" data-delay="2">
            <WorkShowcase />
          </div>
        </div>
      </section>

      {/* ---------- Objections ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="eyebrow reveal">The questions everyone asks</p>
        <h2 className="reveal mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em]" data-delay="1">
          Straight answers.
        </h2>

        <dl className="reveal mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2" data-delay="1">
          {OBJECTIONS.map((item) => (
            <div key={item.q} className="border-t border-rule pt-5">
              <dt className="text-lg font-medium">{item.q}</dt>
              <dd className="mt-2 max-w-[46ch] leading-relaxed text-ink-soft">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Start ---------- */}
      <section id="start" className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-14 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <p className="eyebrow !text-paper/45">Start here</p>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.015em]">
                Tell us the name of your business.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-paper/70">
                That and what you do is enough. We&rsquo;ll build the page and send you the
                link — usually the same day.
              </p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/50">
                You&rsquo;re not signing up for anything. There&rsquo;s nothing to cancel,
                because there&rsquo;s nothing to start.
              </p>
            </div>

            <div className="sm:col-span-6 sm:col-start-7">
              <div className="bg-paper p-6 text-ink sm:p-8">
                <ContactForm />
              </div>
            </div>
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
