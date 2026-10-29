import { recentPosts } from "@/lib/instagram";
import { socials } from "@/data/content";

/** Live Instagram feed (server-fetched JSON, cached an hour). Under three posts renders nothing. */
export default async function Feed() {
  const posts = await recentPosts(6);
  if (posts.length < 3) return null;
  const ig = socials[0];
  return (
    <section className={layout.root}>
      <div className={layout.head}>
        <div>
          <p className={type.eyebrow}>Live from Instagram</p>
          <h2 className={type.h2}><a href={ig.href} target="_blank" rel="noreferrer">@88eightmarketing</a></h2>
          <p className={type.body}>This section fills itself. We post to Instagram, it appears here — and it can do the same on your site.</p>
        </div>
        <a href="#start" className={type.link}>Put my feed on my site</a>
      </div>
      <ul className={layout.grid}>
        {posts.map((p) => (
          <li key={p.id}>
            <a href={p.permalink} target="_blank" rel="noreferrer" className={layout.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.caption ?? "Instagram post"} className={media.img} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const layout = {
  root: "bg-paper-deep px-5 py-24 md:px-10",
  head: "flex flex-wrap items-end justify-between gap-6",
  grid: "mt-10 grid grid-cols-3 gap-2 md:grid-cols-6",
  tile: "block overflow-hidden",
};

const media = { img: "aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" };

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint",
  h2: "mt-3 font-display text-[clamp(40px,5vw,72px)] uppercase leading-none text-ink",
  body: "mt-3 max-w-[44ch] text-[15px] text-ink-soft",
  link: "rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white",
};
