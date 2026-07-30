// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const typography: Principle = {
  slug: "typography",
  title: "Typography",
  category: "Foundations",
  blurb: "How type size, line length, and hierarchy decide whether text gets read or skipped.",
  searchKeywords: "typography how type size, spacing, and hierarchy decide whether text gets read or skipped",
  definition: html("Typography is the set of decisions that control how easy text is to read: how big it is, how long each line runs, how much space separates lines and paragraphs, and which words stand out as more important than others."),
  whyItMatters: [
    html("Text is what most of the web actually is. A page can have a striking layout and still fail if the paragraphs are painful to read — lines too long to track, text too small to see comfortably, or no visual difference between a heading and a caption. Readers don't consciously notice good typography; they notice bad typography, as fatigue, and they leave."),
  ],
  coreRule: [
    html("Keep line length between <strong>45 and 75 characters</strong> (about 60 is the sweet spot), keep line height around <strong>1.4–1.6× the font size</strong> for body text, and make sure every level of hierarchy (heading, subheading, body, caption) is distinguishable by more than one signal — size <em>and</em> weight, not size alone."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "body {\n  font-size: 1.125rem;\n  line-height: 1.6;\n  max-width: 65ch;\n}\nh1 { font-size: 2.5rem; font-weight: 700; }\nh2 { font-size: 1.75rem; font-weight: 700; }",
      note: html("Body text is capped at a readable line length, line height gives text room to breathe, and headings are distinguished by both size and weight."),
    },
    bad: {
      label: "Bad",
      code: "body {\n  font-size: 0.9rem;\n  line-height: 1.1;\n  /* no max-width — text spans\n     the full browser window */\n}\nh1 { font-size: 1.1rem; font-weight: 400; }",
      note: html("Lines run the full width of a wide monitor, text is cramped together, and the heading barely differs from body text — a reader has to work to find the structure."),
    },
  },
  mistakes: [
    { name: "Letting lines run edge-to-edge on wide screens", body: html("Past about 75 characters, the eye loses track of which line to return to when it wraps. Always cap the width of a text block, even on a full-width layout.") },
    { name: "Using font size as the only signal of hierarchy", body: html("A heading that's only slightly bigger than body text, in the same weight, reads as an accident rather than a heading. Pair size changes with weight or color changes.") },
    { name: "Tight line height on body text", body: html("Line height under 1.4 makes lines of text feel like they're touching, which slows reading, especially for longer paragraphs.") },
    { name: "Centering paragraphs of body text", body: html("Centered alignment works for a short headline; for multiple lines, the ragged left edge forces the eye to hunt for where each new line starts.") },
    { name: "Too many typefaces or weights on one page", body: html("More than two typeface families, or more than three weights of one family, usually means the hierarchy is being carried by novelty instead of a clear system.") },
  ],
  checklist: [
    html("Body text line length stays under ~75 characters at any viewport width."),
    html("Body line height is 1.4–1.6×."),
    html("Each heading level is distinguishable by more than one property (size + weight, or size + color)."),
    html("Body text is at least 16px (1rem) on mobile — smaller forces zooming."),
    html("No more than two typeface families are in use."),
  ],
  practiceCourseId: "typography",
  goDeeper: [
    { lead: "Modular scales", body: html("instead of picking heading sizes by eye, multiply a base size by a fixed ratio (1.25 for a moderate scale, 1.333 or higher for something more dramatic) to get each next size up. This keeps the relationships between sizes consistent as you add more heading levels.") },
    { lead: "Optical sizing", body: html("some variable fonts adjust stroke thickness and spacing automatically as size changes (the <code>font-optical-sizing</code> CSS property), so a heading and a caption of the same family both look correct rather than the caption looking like a shrunk heading.") },
    { lead: "Fluid type", body: html("<code>clamp()</code> lets a font size scale smoothly between a minimum and maximum based on viewport width, e.g. <code>font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)</code>, instead of jumping abruptly at breakpoints.") },
  ],
  datePublished: "2026-07-23",
};
