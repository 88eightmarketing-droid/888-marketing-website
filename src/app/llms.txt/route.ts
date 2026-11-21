import { hero, services } from "@/data/site";
import { profiles, SITE } from "@/brand/profiles";

/**
 * llms.txt: a plain summary for AI assistants, so "who builds websites for
 * local businesses in San Jose" can name us with the right facts.
 * Claims rule applies: nothing here we could not show.
 */
export const dynamic = "force-static";

export function GET() {
  const body = [
    "# 888 Marketing",
    "",
    `> ${hero.text}`,
    "",
    "888 Marketing is a design studio in the San Francisco Bay Area (San Jose). It works with local businesses: restaurants, trades, beauty, events, professional services and retail.",
    "",
    "## Services",
    ...services.items.map((s) => `- ${s.kicker}: ${s.body}`),
    "",
    "## How it works",
    "- Every project starts with a conversation and a written proposal with one price. Nothing is charged before the client agrees to it.",
    "- Hosting is included. Business email is not: we recommend Google Workspace, billed by Google, and set up its records.",
    "",
    "## Links",
    `- [Website](${SITE})`,
    `- [Get a free proposal](${SITE}/#proposal)`,
    ...profiles.map((p) => `- [${p.label}](${p.href})`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
