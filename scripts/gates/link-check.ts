/**
 * Gate: every internal link resolves to a file that exists.
 *
 * The pre-migration site had thousands of hand-typed `/design-principles/...` hrefs and a Python
 * script that resolved them against disk. Links are generated now, but a wrong helper or a stale slug
 * still produces a 404 that nothing else notices, so the check stays.
 *
 * External URLs are not requested here — that would make the gate slow and dependent on other
 * people's uptime. CI runs lychee for those separately.
 *
 *   npm run gate:links
 */
import { existsSync } from "node:fs";
import path from "node:path";

import { BASE_PATH } from "../../src/lib/base.ts";

import { DIST, Gate, distPages, readDistPage, requireDist } from "./lib";

const gate = new Gate("Internal links");
requireDist(gate);

const HREF_PATTERN = /(?:href|src)="([^"]+)"/g;

/** Resolves an href the way a static host would, and reports the file it should map to. */
function resolveTarget(href: string, fromPage: string): string | null {
  const [withoutHash] = href.split("#");
  const [pathPart] = (withoutHash ?? "").split("?");
  if (pathPart === undefined || pathPart === "") return null;

  let target: string;
  if (pathPart.startsWith(BASE_PATH)) {
    target = pathPart.slice(BASE_PATH.length);
  } else if (pathPart.startsWith("/")) {
    // An absolute path that skips the base prefix would 404 on a project Pages site.
    return `!absolute-without-base:${pathPart}`;
  } else {
    target = path.posix.normalize(path.posix.join(path.posix.dirname(fromPage), pathPart));
  }

  if (target === "" || target.endsWith("/")) target += "index.html";
  return target;
}

const pages = distPages();
const pageSet = new Set(pages);
let internalLinks = 0;
let externalLinks = 0;

for (const page of pages) {
  const html = readDistPage(page);

  for (const match of html.matchAll(HREF_PATTERN)) {
    const href = match[1];
    if (href === undefined) continue;

    if (/^(?:https?:|mailto:|tel:|data:)/.test(href)) {
      externalLinks += 1;
      continue;
    }
    if (href.startsWith("#")) continue;

    const target = resolveTarget(href, page);
    if (target === null) continue;

    if (target.startsWith("!absolute-without-base:")) {
      gate.fail(
        `${page}: link "${href}" is an absolute path without the ${BASE_PATH} prefix, so it resolves off-site`,
      );
      continue;
    }

    internalLinks += 1;

    const exists = target.endsWith(".html")
      ? pageSet.has(target)
      : existsSync(path.join(DIST, target));

    gate.check(exists, `${page}: link "${href}" resolves to ${target}, which does not exist`);
  }
}

/*
 * Orphan check.
 *
 * A page that exists but nothing links to is a page readers cannot find. 404.html is excluded — it is
 * reached by failing to find something, and linking to it would be odd.
 */
const linkedTargets = new Set<string>();
for (const page of pages) {
  for (const match of readDistPage(page).matchAll(HREF_PATTERN)) {
    const href = match[1];
    if (href === undefined || /^(?:https?:|mailto:|tel:|data:|#)/.test(href)) continue;
    const target = resolveTarget(href, page);
    if (target !== null && !target.startsWith("!")) linkedTargets.add(target);
  }
}

for (const page of pages) {
  if (page === "404.html" || page === "index.html") continue;
  gate.check(linkedTargets.has(page), `${page} exists but no page links to it`);
}

gate.note(
  `${String(internalLinks)} internal links resolved across ${String(pages.length)} pages; ` +
    `${String(externalLinks)} external links deferred to lychee`,
);
gate.report();
