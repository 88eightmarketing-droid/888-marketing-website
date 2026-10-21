import type { MetadataRoute } from 'next';

/**
 * The inverse of the previews project.
 *
 * agency-previews disallows everything, because prospect concepts must never
 * surface in search. This site exists to be found — Jessica points cold-call
 * prospects here and they will google the name before calling back.
 *
 * Keep the two straight. Putting this site on the previews host would silently
 * inherit that Disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://888marketing.net/sitemap.xml',
  };
}
