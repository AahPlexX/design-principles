// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const spacingLayout: Principle = {
  slug: "spacing-layout",
  title: "Spacing & Layout",
  category: "Foundations",
  blurb: "Whitespace and alignment as the tools that show a reader what belongs together.",
  searchKeywords: "spacing layout whitespace and alignment as the tools that show a reader what belongs together",
  definition: html("Spacing is the empty room you leave around and between things. Layout is how you arrange them. Together they're the main tool for showing a reader which things are related without needing a label or a border to say so."),
  whyItMatters: [
    html("The human eye groups things that are close together and separates things that are far apart — this is automatic, not a preference (it's one of the Gestalt principles of perception, \"proximity\"). If a form's label sits closer to the field above it than the field it actually belongs to, people will misread which label goes with which field, no matter how clear the wording is."),
  ],
  coreRule: [
    html("Space between related items should always be smaller than the space between unrelated groups of items. And pick spacing values from a fixed scale (like multiples of 4px or 8px) instead of ad hoc numbers — it keeps every gap on the page visually related to every other gap, instead of looking randomly inconsistent."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: ".field { margin-bottom: 24px; }  /* between fields */\n.field label { margin-bottom: 8px; } /* label to input */",
      note: html("The gap between a label and its own input (8px) is clearly smaller than the gap between one field group and the next (24px) — proximity tells the reader what belongs together before they even read the labels."),
    },
    bad: {
      label: "Bad",
      code: ".field { margin-bottom: 16px; }\n.field label { margin-bottom: 16px; }",
      note: html("Equal spacing everywhere means there's no visual signal for which label belongs to which input — the reader has to figure it out from position and guesswork alone."),
    },
  },
  mistakes: [
    { name: "Equal spacing everywhere", body: html("If every gap on the page is the same size, nothing reads as \"grouped\" — the layout looks like a uniform grid of unrelated pieces.") },
    { name: "Centering everything", body: html("Center alignment has no consistent edge for the eye to follow down a page; left-aligned (in LTR languages) text and controls give the reader one vertical line to scan.") },
    { name: "Picking spacing values by eye, per component", body: html("Without a shared scale, a page ends up with dozens of near-identical gaps (13px here, 15px there) that read as sloppy even though no single one looks wrong in isolation.") },
    { name: "Cramming content edge-to-edge on mobile to \"fit more in.\"", body: html("Removing margin on small screens doesn't create more usable space — it removes the breathing room that makes content feel readable rather than crowded.") },
    { name: "Using borders or background colors to separate sections instead of space", body: html("A visible line is a heavier signal than most page structure needs; often a gap alone (or a gap plus a heading) does the job with less visual noise.") },
  ],
  checklist: [
    html("Related items sit closer together than unrelated items."),
    html("Spacing values come from one scale (e.g. 4, 8, 12, 16, 24, 32, 48px), not arbitrary numbers."),
    html("Page content has consistent margin on mobile — nothing touches the screen edge."),
    html("Alignment is consistent: one clear left (or right, for RTL) edge per column of content."),
    html("A section break is legible from spacing alone, before adding a border or background."),
  ],
  practiceCourseId: "spacing-layout",
  goDeeper: [
    { lead: "The 8-point grid", body: html("a common convention is to make every spacing and sizing value a multiple of 8px (or 4px for finer adjustments). This isn't a hard technical requirement — it's a discipline that makes a design system's spacing choices predictable and easy to reuse across a whole product.") },
    { lead: "Gestalt principles beyond proximity", body: html("similarity (things that look alike are read as related), common region (a shared background or border groups items), and alignment (items sharing an edge are read as connected) all combine with spacing to communicate structure without words.") },
    { lead: "CSS tools that encode this directly", body: html("flexbox's <code>gap</code> and grid's <code>gap</code> apply consistent spacing between children without needing margin on individual items (which can double up unpredictably at the edges of a row).") },
  ],
  datePublished: "2026-07-23",
};
