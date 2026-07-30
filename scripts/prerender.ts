/**
 * Writes every route to a static HTML file.
 *
 * Runs after the client and SSR builds. Reads the client build's manifest so each document links the
 * real hashed asset filenames, then walks the route table and writes one file per route at the exact
 * path the pre-migration site served.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { AssetManifest } from "../src/components/layout/Document";
import { BASE_PATH } from "../src/lib/base";
import { buildSitemap } from "../src/lib/sitemap";
import type { Route } from "../src/lib/routes";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const CLIENT_DIR = path.join(repoRoot, "dist", "client");
const SERVER_ENTRY = path.join(repoRoot, "dist", "server", "entry-server.js");

interface ManifestChunk {
  file: string;
  css?: string[];
  isEntry?: boolean;
  imports?: string[];
}

/**
 * Resolves the built asset URLs from the Vite manifest.
 *
 * Reading the manifest rather than hard-coding filenames is what lets the assets stay content-hashed:
 * hashed filenames are why the CSS and JS can be cached indefinitely without a stale-asset problem
 * after a deploy.
 */
function readAssets(): AssetManifest {
  const manifestPath = path.join(CLIENT_DIR, ".vite", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<string, ManifestChunk>;

  const entry = Object.values(manifest).find((chunk) => chunk.isEntry);
  if (!entry) throw new Error(`No entry chunk in ${manifestPath}`);

  const toUrl = (file: string) => `${BASE_PATH}${file}`;

  return {
    scripts: [toUrl(entry.file)],
    stylesheets: (entry.css ?? []).map(toUrl),
    modulePreloads: (entry.imports ?? [])
      .map((key) => manifest[key]?.file)
      .filter((file): file is string => Boolean(file))
      .map(toUrl),
  };
}

/**
 * The content file behind a route, so `lastmod` can reflect when that page's content actually changed
 * rather than when the site was last built.
 */
function contentSourceFor(route: Route): string {
  switch (route.kind) {
    case "principle":
      return `src/content/principles/${route.principle.slug}.ts`;
    case "course":
      return "src/content/craft/courses.ts";
    case "lesson":
      return `src/content/craft/lessons/${route.lesson.courseId}.ts`;
    default:
      return "src/content/site.ts";
  }
}

function gitDate(file: string): string | null {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    // No git, or a shallow clone with no commit touching this path.
    return null;
  }
}

function lastmodResolver(): (route: Route) => string {
  const cache = new Map<string, string>();
  const fallback = gitDate(".") ?? new Date().toISOString().slice(0, 10);

  return (route) => {
    const source = contentSourceFor(route);
    const cached = cache.get(source);
    if (cached) return cached;
    const resolved = gitDate(source) ?? fallback;
    cache.set(source, resolved);
    return resolved;
  };
}

async function main(): Promise<void> {
  const { render, routes, buildSearchIndex } = (await import(
    SERVER_ENTRY
  )) as typeof import("../src/entry-server");
  const assets = readAssets();

  let written = 0;
  for (const route of routes) {
    const target = path.join(CLIENT_DIR, route.outputPath);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, render(route, assets), "utf8");
    written += 1;
  }

  // The command palette fetches this on first open rather than having it inlined into every page.
  writeFileSync(
    path.join(CLIENT_DIR, "search-index.json"),
    JSON.stringify(buildSearchIndex()),
    "utf8",
  );

  // Generated here rather than by a separate script so it cannot describe a different set of pages
  // than the one just written.
  writeFileSync(
    path.join(CLIENT_DIR, "sitemap.xml"),
    buildSitemap(routes, lastmodResolver()),
    "utf8",
  );

  console.log(
    `Prerendered ${String(written)} pages, plus sitemap.xml and search-index.json, into dist/client`,
  );
}

await main();
