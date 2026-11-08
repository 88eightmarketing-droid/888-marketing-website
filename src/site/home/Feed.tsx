import { recentPosts } from "@/lib/instagram";
import { socials } from "@/data/site";

/**
 * Live Instagram feed (server-fetched Behold JSON, cached an hour). Under three
 * posts renders nothing — half a row reads as broken, not as a gallery.
 */
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
        </div>
        <p className={type.body}>This row fills itself: we post, it appears here. Your site can do the same with your feed.</p>
      </div>
      <ul className={layout.grid}>
        {posts.map((p) => (
          <li key={p.id}>
            <a href={p.permalink} target="_blank" rel="noreferrer" className={layout.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element -- Instagram CDN URLs expire; not worth routing through the optimiser */}
              <img src={p.image} alt={p.caption ?? "Instagram post"} className={layout.img} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const layout = {
  root: "border-t border-rule px-5 py-24 md:px-10 md:py-32",
  head: "flex flex-wrap items-end justify-between gap-6",
  grid: "mt-10 grid grid-cols-3 gap-1.5 md:grid-cols-6",
  tile: "block overflow-hidden",
  img: "aspect-square w-full object-cover transition-transform duration-700 ease-out-quint hover:scale-[1.04]",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint",
  h2: "mt-4 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-none tracking-[-0.02em]",
  body: "max-w-[24rem] text-[15px] leading-[1.6] text-ink-soft",
};
