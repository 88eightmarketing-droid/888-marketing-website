import Site from "@/site/Site";
import Feed from "@/site/sections/Feed";

export default function Home() {
  return <Site feed={<Feed />} />;
}
