import Home from "@/site/home/Home";
import Feed from "@/site/home/Feed";

/*
 * The previous homepage (San Francisco fly-through, src/site/Site.tsx) is
 * archived on branch `archive/sf-flythrough-2026-11`.
 */
export default function Page() {
  return <Home feed={<Feed />} />;
}
