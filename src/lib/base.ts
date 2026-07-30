/**
 * The site is a GitHub Pages *project* site, so it is served from a subpath rather than a domain
 * root. That prefix is baked into every canonical URL, the sitemap, and thousands of existing inbound
 * links, so it is a fixed constant rather than a configurable option.
 */
export const BASE_PATH = "/design-principles/";

export const SITE_ORIGIN = "https://aahplexx.github.io";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const SITE_NAME = "Design Principles";

export const REPO_URL = "https://github.com/aahplexx/design-principles";

/** Turns a site-relative output path such as `principles/typography.html` into an absolute href. */
export function withBase(outputPath: string): string {
  return `${BASE_PATH}${outputPath.replace(/^\/+/, "")}`;
}

/** Turns a site-relative output path into a fully qualified URL, for canonical tags and JSON-LD. */
export function absoluteUrl(outputPath: string): string {
  return `${SITE_ORIGIN}${withBase(outputPath)}`;
}

/**
 * Directory-index paths are served without the filename, and the canonical form of those URLs has
 * always been the trailing-slash version. Keeping that exact means existing links and search results
 * do not suddenly point at a second URL for the same page.
 */
export function canonicalPath(outputPath: string): string {
  return outputPath.replace(/(^|\/)index\.html$/, "$1");
}
