import "@/styles/globals.css";

import { BASE_PATH } from "@/lib/base";

import { enhancePrint } from "./enhancers/print";
import { enhanceProgress } from "./enhancers/progress";
import { enhanceSearch } from "./enhancers/search";
import { enhanceTheme } from "./enhancers/theme";

/**
 * Browser entry point.
 *
 * Everything here attaches behaviour to markup the build already rendered. Nothing renders page
 * content, which is why this bundle stays small on a site of 173 content pages.
 *
 * The command palette is the one React component, and it is loaded on demand — the reader has to ask
 * for it before its cost is paid.
 */
function openPalette(initialQuery = ""): void {
  void import("./islands/command-palette").then(({ openCommandPalette }) => {
    openCommandPalette(initialQuery);
  });
}

function enhanceCommandTrigger(): void {
  const trigger = document.querySelector<HTMLAnchorElement>('[data-enhance="command-trigger"]');

  // Until this runs, the trigger is a link to the home page's filter box, so search is reachable
  // without JavaScript. Once it runs, it becomes a palette button — including for assistive tech,
  // hence the role and aria-keyshortcuts rather than only the visual change.
  if (trigger) {
    trigger.setAttribute("role", "button");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-keyshortcuts", "Meta+K Control+K");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openPalette();
    });
  }

  document.addEventListener("keydown", (event) => {
    const isPaletteShortcut = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
    if (!isPaletteShortcut) return;
    event.preventDefault();
    openPalette();
  });
}

/**
 * Registers speculation rules so the browser can prefetch pages the reader is about to open.
 *
 * Navigation is a real document load on this site, and this is what makes it feel immediate.
 *
 * Added from script rather than as a `<script type="speculationrules">` block in the markup, because
 * the W3C Nu checker CI gates on does not yet recognise that script type and reports every page as
 * invalid. Injecting it here keeps the prerendered HTML strictly valid and costs nothing: prefetching
 * cannot usefully begin before the page has loaded anyway.
 *
 * `eagerness: moderate` leaves the spend/benefit decision to the browser rather than fetching every
 * link on sight.
 */
function registerSpeculationRules(): void {
  if (!HTMLScriptElement.supports("speculationrules")) return;

  const script = document.createElement("script");
  script.type = "speculationrules";
  script.textContent = JSON.stringify({
    prerender: [{ where: { href_matches: `${BASE_PATH}*` }, eagerness: "moderate" }],
  });
  document.head.append(script);
}

/**
 * Closes the mobile menu on outside click and on Escape.
 *
 * `<details>` gives open/close and keyboard operation for free but has no notion of dismissal, and a
 * menu that only closes via the button it came from is a trap on a phone.
 */
function enhanceMobileNav(): void {
  const nav = document.querySelector<HTMLDetailsElement>('[data-enhance="mobile-nav"]');
  if (!nav) return;

  document.addEventListener("click", (event) => {
    if (nav.open && event.target instanceof Node && !nav.contains(event.target)) nav.open = false;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.open) {
      nav.open = false;
      nav.querySelector("summary")?.focus();
    }
  });
}

function start(): void {
  enhanceTheme();
  enhanceProgress();
  enhanceSearch();
  enhancePrint();
  enhanceCommandTrigger();
  enhanceMobileNav();
  registerSpeculationRules();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
