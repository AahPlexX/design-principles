import { SITE_ORIGIN, canonicalPath, withBase } from "./base";
import type { Route } from "./routes";

export interface SitemapEntry {
  readonly loc: string;
  readonly lastmod: string;
  readonly changefreq: string;
  readonly priority: string;
}

/**
 * How much of the site each page type represents.
 *
 * The home page and the principle pages are the destinations worth crawling first; individual lessons
 * are numerous and shallow, so they sit lowest. These are hints, not instructions — the point is the
 * relative ordering, not the absolute numbers.
 */
function weightFor(route: Route): { changefreq: string; priority: string } {
  switch (route.kind) {
    case "home":
      return { changefreq: "weekly", priority: "1.0" };
    case "principle":
      return { changefreq: "monthly", priority: "0.9" };
    case "craft-index":
      return { changefreq: "weekly", priority: "0.8" };
    case "course":
      return { changefreq: "monthly", priority: "0.7" };
    case "lesson":
      return { changefreq: "yearly", priority: "0.5" };
    case "about":
      return { changefreq: "yearly", priority: "0.4" };
    case "not-found":
      return { changefreq: "yearly", priority: "0.0" };
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Builds the sitemap.
 *
 * `404.html` is excluded: it is an error page, not content, and listing it invites a crawler to index
 * a page whose entire job is to say the thing you asked for is not here.
 *
 * `lastmod` is supplied by the caller because the honest answer lives in git history, which is not
 * available to a browser bundle.
 */
export function buildSitemap(
  routes: readonly Route[],
  lastmodFor: (route: Route) => string,
): string {
  const entries: SitemapEntry[] = routes
    .filter((route) => route.kind !== "not-found")
    .map((route) => ({
      loc: `${SITE_ORIGIN}${withBase(canonicalPath(route.outputPath))}`,
      lastmod: lastmodFor(route),
      ...weightFor(route),
    }))
    .sort((a, b) => Number(b.priority) - Number(a.priority) || a.loc.localeCompare(b.loc));

  const body = entries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${escapeXml(entry.loc)}</loc>\n` +
        `    <lastmod>${entry.lastmod}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
