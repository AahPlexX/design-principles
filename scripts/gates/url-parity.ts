/**
 * Gate: the build emits exactly the URLs the pre-migration site served.
 *
 * The URL list is a public contract. Those paths are in `sitemap.xml`, in every page's canonical tag,
 * and in inbound links this project does not control, and GitHub Pages has no redirect mechanism — so
 * a renamed page is a permanently broken page.
 *
 * `expected-urls.txt` is a snapshot taken from the hand-written site before it was removed. It is
 * checked in deliberately: it keeps working as a reference after `docs/` is gone, and changing it is a
 * visible, reviewable diff rather than a silent side effect of a refactor.
 *
 *   npm run gate:urls
 *   npx tsx scripts/gates/url-parity.ts --write   (re-snapshot; only with a deliberate URL change)
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { DIST, Gate, distPages, repoRoot, requireDist } from "./lib";

const EXPECTED_FILE = path.join(repoRoot, "scripts", "gates", "expected-urls.txt");

/**
 * Written back by `--write` every time, so the file's own warning against casual edits can never be
 * silently dropped by the tool whose job is to keep the file honest.
 */
const HEADER = `# The site's URL contract: every page the hand-written site served, snapshotted before it was removed.
#
# These paths appear in sitemap.xml, in every page's canonical tag, and in inbound links this project
# does not control. GitHub Pages has no redirect configuration, so removing or renaming an entry here
# breaks those links permanently. Change this file only alongside a deliberate decision to change a
# public URL, and never to make a failing build pass.
`;

const gate = new Gate("URL parity");
requireDist(gate);

const actual = distPages();

if (process.argv.includes("--write")) {
  writeFileSync(EXPECTED_FILE, `${HEADER}${actual.join("\n")}\n`, "utf8");
  console.log(`Wrote ${String(actual.length)} paths to ${path.relative(repoRoot, EXPECTED_FILE)}`);
  process.exit(0);
}

const expected = readFileSync(EXPECTED_FILE, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line !== "" && !line.startsWith("#"));

const actualSet = new Set(actual);
const expectedSet = new Set(expected);

for (const url of expected) {
  gate.check(actualSet.has(url), `missing from the build: ${url}`);
}

for (const url of actual) {
  gate.check(
    expectedSet.has(url),
    `built but not in the expected set: ${url} — if this page is intentional, add it with --write`,
  );
}

// The directory-index pages are the ones a subtle routing change breaks first: a build that emits
// `craft.html` instead of `craft/index.html` still "has a craft page" but serves a 404 at `/craft/`.
for (const dirIndex of ["index.html", "craft/index.html"]) {
  gate.check(actualSet.has(dirIndex), `directory index missing: ${dirIndex}`);
}

// 404.html has to exist as a real file: it is the only error-page hook GitHub Pages offers.
gate.check(
  actualSet.has("404.html"),
  "404.html is missing — Pages has no other error-page mechanism",
);

// Assets that are part of the contract but are not pages.
for (const asset of [".nojekyll", "robots.txt", "sitemap.xml", "search-index.json"]) {
  try {
    readFileSync(path.join(DIST, asset));
    gate.check(true, "");
  } catch {
    gate.fail(`expected asset missing from the build: ${asset}`);
  }
}

gate.note(`${String(actual.length)} pages emitted`);
gate.report();
