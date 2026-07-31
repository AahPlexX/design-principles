/**
 * Gate: every page carries the metadata search engines and link previews need.
 *
 * The pre-migration site had these tags hand-written into 173 files, which is exactly the situation
 * where one page quietly ends up with another page's canonical URL. They are generated now, so this
 * gate is checking the generator.
 *
 *   npm run gate:seo
 */
import { parseHTML } from "linkedom";

import { SITE_ORIGIN } from "../../src/lib/base.ts";

import { Gate, distPages, readDistPage, requireDist } from "./lib";

const gate = new Gate("SEO and metadata");
requireDist(gate);

const pages = distPages();
const canonicals = new Map<string, string>();

for (const page of pages) {
  const { document } = parseHTML(readDistPage(page));

  const title = document.querySelector("title")?.textContent.trim() ?? "";
  gate.check(title !== "", `${page}: no <title>`);
  gate.check(
    title.length <= 70,
    `${page}: <title> is ${String(title.length)} characters, which search results truncate — "${title}"`,
  );

  const description =
    document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  gate.check(description !== "", `${page}: no meta description`);
  gate.check(
    description.length <= 170,
    `${page}: meta description is ${String(description.length)} characters and will be truncated`,
  );

  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
  gate.check(canonical !== "", `${page}: no canonical URL`);
  gate.check(
    canonical.startsWith(SITE_ORIGIN),
    `${page}: canonical URL is not absolute against ${SITE_ORIGIN} — "${canonical}"`,
  );
  gate.check(
    !canonical.endsWith("/index.html"),
    `${page}: canonical URL points at index.html rather than the directory`,
  );

  // Two pages claiming the same canonical URL tells a crawler to drop one of them.
  const claimedBy = canonicals.get(canonical);
  gate.check(
    claimedBy === undefined,
    `${page}: shares its canonical URL with ${String(claimedBy)} — "${canonical}"`,
  );
  canonicals.set(canonical, page);

  // Exactly one <h1>. More than one leaves assistive tech and crawlers without a single page subject.
  const h1s = document.querySelectorAll("h1");
  gate.check(h1s.length === 1, `${page}: expected exactly one <h1>, found ${String(h1s.length)}`);

  for (const property of ["og:title", "og:description", "og:url", "og:type", "og:site_name"]) {
    const found = document.querySelector(`meta[property="${property}"]`)?.getAttribute("content");
    gate.check(Boolean(found), `${page}: missing ${property}`);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content");
  gate.check(ogUrl === canonical, `${page}: og:url and canonical disagree`);

  gate.check(
    document.documentElement.getAttribute("lang") === "en",
    `${page}: <html> has no lang="en"`,
  );

  // JSON-LD has to parse. A malformed block is worse than none: it can invalidate the whole page's
  // structured data rather than being skipped.
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const parsed: unknown = JSON.parse(script.textContent);
      const hasType =
        typeof parsed === "object" && parsed !== null && "@type" in parsed && "@context" in parsed;
      gate.check(hasType, `${page}: JSON-LD block is missing @context or @type`);
    } catch {
      gate.fail(`${page}: JSON-LD does not parse as JSON`);
    }
  }

  // The theme bootstrap has to stay ahead of the stylesheet, or dark-mode readers get a white flash.
  const [head = ""] = readDistPage(page).split("</head>");
  const bootstrapAt = head.indexOf('localStorage.getItem("theme")');
  const stylesheetAt = head.indexOf('rel="stylesheet"');
  gate.check(bootstrapAt !== -1, `${page}: the inline theme bootstrap is missing`);
  gate.check(
    bootstrapAt !== -1 && stylesheetAt !== -1 && bootstrapAt < stylesheetAt,
    `${page}: the theme bootstrap must come before the stylesheet to prevent a flash of the wrong theme`,
  );
}

gate.note(
  `${String(pages.length)} pages checked, ${String(canonicals.size)} distinct canonical URLs`,
);
gate.report();
