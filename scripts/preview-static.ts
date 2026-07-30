/**
 * Rewrites the build into a copy that can be opened directly from disk, for visual review.
 *
 * The real build hard-codes the `/design-principles/` prefix on every asset and link, which is correct
 * for GitHub Pages and useless over `file://` — the browser resolves it against the filesystem root and
 * every stylesheet 404s. This makes a throwaway copy with those references rewritten to the right number
 * of `../` hops for each page's depth.
 *
 * Review only. Never deployed, and `dist/` is git-ignored.
 *
 *   npx tsx scripts/preview-static.ts
 */
import { cpSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BASE_PATH } from "../src/lib/base.ts";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const SOURCE = path.join(repoRoot, "dist", "client");
const TARGET = path.join(repoRoot, "dist", "preview");

rmSync(TARGET, { recursive: true, force: true });
cpSync(SOURCE, TARGET, { recursive: true });

const pages = globSync(path.join(TARGET, "**", "*.html"));

/*
 * Inline the stylesheet and the entry script.
 *
 * Chromium refuses to load an external ES module from a `file://` page — the origin is `null`, so the
 * module fetch is a cross-origin request and is blocked. An *inline* module has no fetch to block, so
 * inlining the entry is what makes the interactive parts (theme toggle, quiz answering, progress,
 * filtering) actually testable in this preview rather than silently dead.
 *
 * The command palette still will not open here: it is a dynamic import, which is a fetch again.
 */
const cssFile = globSync(path.join(TARGET, "assets", "main-*.css"))[0];
const jsFile = globSync(path.join(TARGET, "assets", "main-*.js"))[0];
const css = cssFile === undefined ? "" : readFileSync(cssFile, "utf8");
const js = jsFile === undefined ? "" : readFileSync(jsFile, "utf8");

for (const page of pages) {
  const depth = path.relative(TARGET, page).split(path.sep).length - 1;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  let html = readFileSync(page, "utf8").replaceAll(BASE_PATH, prefix);
  html = html
    .replace(/<link rel="stylesheet" href="[^"]*main-[^"]*\.css"\s*\/?>/, `<style>${css}</style>`)
    .replace(
      /<script type="module" src="[^"]*main-[^"]*\.js"><\/script>/,
      `<script type="module">${js}</script>`,
    );

  writeFileSync(page, html, "utf8");
}

console.log(`Preview copy at dist/preview (${String(pages.length)} pages), openable over file://`);
