// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const visualHierarchy: Principle = {
  slug: "visual-hierarchy",
  title: "Visual Hierarchy",
  category: "Foundations",
  blurb: "How size, contrast, spacing, and position decide what a reader notices first.",
  searchKeywords: "visual hierarchy how size, contrast, spacing, and position decide what a reader notices first",
  definition: html("Visual hierarchy is the order in which a reader's eye moves through a page — controlled by size, contrast, spacing, and position — so the most important thing gets noticed first, and everything else falls into place behind it."),
  whyItMatters: [
    html("A homepage with three sections, each using the same giant bold headline, gives a reader no signal about which one to read first — so most people read none of them carefully. The same thing happens at the level of a single screen: if an error message and a promotional banner are styled with equal visual weight, the reader has no way to know the error is the one that actually needs their attention right now."),
  ],
  coreRule: [
    html("Every screen needs exactly one thing that's the most visually dominant. Before adding a second bold headline, a second brightly colored button, or a second large image, decide which one actually matters more for this specific screen — hierarchy breaks the moment two things compete for the same level of attention."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<h1>Start your free trial</h1>\n<p>No credit card required.</p>\n<button class=\"primary\">Get started</button>\n<a class=\"text-link\">See pricing</a>",
      note: html("One dominant heading, one visually loud primary action (a filled button), and a secondary option styled deliberately quieter (a plain text link) — the eye knows exactly where to land first."),
    },
    bad: {
      label: "Bad",
      code: "<h1>Start your free trial</h1>\n<button class=\"primary\">Get started</button>\n<button class=\"primary\">See pricing</button>",
      note: html("Two buttons with identical visual weight force the reader to stop and figure out which one is actually the main action — the page hasn't made that decision for them."),
    },
  },
  mistakes: [
    { name: "Making everything bold or loud", body: html("If every heading, button, and badge is styled to stand out, none of them do — hierarchy only works by contrast between an emphasized element and an unemphasized one.") },
    { name: "Two primary actions on one screen", body: html("A checkout page with a full-price \"Buy now\" button and an equally styled \"Add to wishlist\" button next to it makes the reader pause to decide which one the page actually wants them to click.") },
    { name: "Sizing decorative elements larger than the content that matters", body: html("A large hero illustration above a small, easy-to-miss headline inverts the hierarchy the page actually needs.") },
    { name: "Visual order that doesn't match reading or tab order", body: html("If a page is positioned with CSS so it looks correct visually but the underlying HTML order jumps around, a screen reader or keyboard user experiences a completely different, broken hierarchy than a sighted mouse user does.") },
    { name: "Treating hierarchy as a one-time decision", body: html("Adding a new banner, badge, or callout to an existing screen without re-checking what's now competing with the original focal point is how pages accumulate multiple \"most important\" elements over time.") },
  ],
  checklist: [
    html("Each screen has exactly one element that reads as most important."),
    html("Primary and secondary actions are visually distinct (e.g., filled button vs. text link), not the same weight."),
    html("The visual (CSS) order matches the underlying HTML/reading order."),
    html("Nothing decorative outweighs the actual content it's meant to support."),
    html("Adding a new element didn't quietly create a second competing focal point."),
  ],
  practiceCourseId: "visual-hierarchy",
  goDeeper: [
    { lead: "Gestalt principles", body: html("hierarchy leans on the same perceptual rules as spacing — proximity (grouped items are read as related), similarity (same-styled items are read as the same kind of thing), and figure/ground (a clear separation between a foreground element and its background makes the foreground read as more important).") },
    { lead: "Reading patterns", body: html("eye-tracking studies describe common scan patterns (an \"F\" shape for text-heavy pages, a \"Z\" shape for sparser layouts) — these describe default behavior when hierarchy is weak, not a template to design for. Strong hierarchy overrides the default scan pattern by directing attention explicitly.") },
    { lead: "Hierarchy and accessibility overlap", body: html("a mismatch between DOM order and visual order (using CSS <code>order</code> or absolute positioning) can make the visual hierarchy sighted users see completely disconnected from the order a screen reader announces content in — always verify both orders independently.") },
  ],
  datePublished: "2026-07-23",
};
