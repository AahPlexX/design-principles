/**
 * Gate: the bytes a reader downloads stay within budget.
 *
 * The site has a Performance page telling readers to hold a budget, so it holds one. The numbers below
 * are ceilings with headroom, not targets — they exist to catch the accidental import that pulls a
 * component library into the critical path, which is the usual way a static site's payload doubles.
 *
 * What matters most is the split: the per-page critical path (HTML + CSS + the entry script) is
 * budgeted separately from the on-demand command palette chunk, because the palette is only paid for
 * by readers who open it.
 *
 *   npm run gate:budget
 */
import { gzipSync } from "node:zlib";
import { readFileSync, statSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";

import { DIST, Gate, distPages, requireDist } from "./lib";

const gate = new Gate("Performance budget");
requireDist(gate);

const KB = 1024;

function gzipped(file: string): number {
  return gzipSync(readFileSync(file)).length;
}

function findOne(pattern: string, label: string): string | null {
  const matches = globSync(path.join(DIST, pattern));
  if (matches.length === 0) {
    gate.fail(`no ${label} found matching ${pattern}`);
    return null;
  }
  return matches.sort((a, b) => statSync(b).size - statSync(a).size)[0] ?? null;
}

/* ------------------------------------------------------------- critical path */

const css = findOne("assets/main-*.css", "stylesheet");
const entry = findOne("assets/main-*.js", "entry script");

const cssBytes = css ? gzipped(css) : 0;
const entryBytes = entry ? gzipped(entry) : 0;

const CSS_BUDGET = 14 * KB;
const ENTRY_BUDGET = 8 * KB;

gate.check(
  cssBytes <= CSS_BUDGET,
  `stylesheet is ${(cssBytes / KB).toFixed(1)} kB gzipped, over the ${String(CSS_BUDGET / KB)} kB budget`,
);
gate.check(
  entryBytes <= ENTRY_BUDGET,
  `entry script is ${(entryBytes / KB).toFixed(1)} kB gzipped, over the ${String(ENTRY_BUDGET / KB)} kB budget`,
);

/*
 * The entry script must not pull React in.
 *
 * This is the load-bearing check in this gate. The architecture puts React at build time and keeps the
 * browser's critical path to small behaviour scripts; a stray import from an enhancer into a React
 * component would silently undo that and add well over a hundred kilobytes to all 173 pages. The size
 * budget above would eventually catch it, but this says *why* it broke.
 */
if (entry) {
  const source = readFileSync(entry, "utf8");
  for (const marker of ["react-dom", "createRoot", "jsxRuntime", "cmdk"]) {
    gate.check(
      !source.includes(marker),
      `the entry script contains "${marker}" — React must stay out of the critical path; ` +
        `import it from an island loaded on demand instead`,
    );
  }
}

/* --------------------------------------------------------------- lazy chunks */

const palette = globSync(path.join(DIST, "assets/command-palette-*.js"))[0];
if (palette) {
  const paletteBytes = gzipped(palette);
  const PALETTE_BUDGET = 130 * KB;
  gate.check(
    paletteBytes <= PALETTE_BUDGET,
    `the command palette chunk is ${(paletteBytes / KB).toFixed(1)} kB gzipped, over the ${String(PALETTE_BUDGET / KB)} kB budget`,
  );
  gate.note(`command palette (on demand): ${(paletteBytes / KB).toFixed(1)} kB gzipped`);
} else {
  gate.fail("the command palette chunk is missing — it should be a separate, lazily loaded file");
}

/* ------------------------------------------------------------------ documents */

const pages = distPages();
const pageSizes = pages.map((page) => ({
  page,
  bytes: gzipped(path.join(DIST, page)),
}));
const worst = [...pageSizes].sort((a, b) => b.bytes - a.bytes)[0];
const DOC_BUDGET = 30 * KB;

if (worst) {
  gate.check(
    worst.bytes <= DOC_BUDGET,
    `${worst.page} is ${(worst.bytes / KB).toFixed(1)} kB gzipped, over the ${String(DOC_BUDGET / KB)} kB per-document budget`,
  );
}

const searchIndex = path.join(DIST, "search-index.json");
const indexBytes = gzipped(searchIndex);
const INDEX_BUDGET = 10 * KB;
gate.check(
  indexBytes <= INDEX_BUDGET,
  `search-index.json is ${(indexBytes / KB).toFixed(1)} kB gzipped, over the ${String(INDEX_BUDGET / KB)} kB budget`,
);

const median = [...pageSizes].sort((a, b) => a.bytes - b.bytes)[Math.floor(pageSizes.length / 2)];

gate.note(
  `stylesheet ${(cssBytes / KB).toFixed(1)} kB, entry script ${(entryBytes / KB).toFixed(1)} kB (gzipped)`,
);
if (median && worst) {
  gate.note(
    `documents: median ${(median.bytes / KB).toFixed(1)} kB, largest ${(worst.bytes / KB).toFixed(1)} kB — ${worst.page}`,
  );
  gate.note(
    `first view of a typical page: ~${((median.bytes + cssBytes + entryBytes) / KB).toFixed(1)} kB gzipped`,
  );
}
gate.note(`search index (on demand): ${(indexBytes / KB).toFixed(1)} kB gzipped`);
gate.report();
