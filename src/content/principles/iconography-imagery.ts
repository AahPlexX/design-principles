// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const iconographyImagery: Principle = {
  slug: "iconography-imagery",
  title: "Iconography & Imagery",
  category: "Foundations",
  blurb: "Choosing icons and images so their meaning is clear, not just decorative filler.",
  searchKeywords: "iconography imagery icons choosing icons and images so their meaning is clear not just decorative filler",
  definition: html("Icons and images are pictures a page uses instead of, or alongside, words. Like words, they need to be clear and purposeful — a picture only helps if the reader gets its meaning as fast as they'd get a label, not slower."),
  whyItMatters: [
    html("A shopping cart icon that looks like a trash can, or a hamburger menu with no label, forces the reader to guess. An icon with no accompanying text is a bet that the reader shares your exact visual vocabulary — and that vocabulary varies by age, culture, and how much time someone has spent on similar products. When the bet is wrong, the reader either clicks the wrong thing or gives up finding it at all."),
  ],
  coreRule: [
    html("Never let an icon carry meaning alone unless it's from the small set that's genuinely universal (a magnifying glass for search, an X to close). Everything else needs a visible text label, at least on first use, or a reliable way to reveal one (a tooltip, an accessible name)."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<nav>\n  <a href=\"/settings\">\n    <svg aria-hidden=\"true\">...</svg>\n    <span>Settings</span>\n  </a>\n</nav>",
      note: html("The gear icon reinforces the word instead of replacing it — a reader unfamiliar with the icon still knows exactly where they're going from the label alone."),
    },
    bad: {
      label: "Bad",
      code: "<nav>\n  <a href=\"/settings\">\n    <svg>...</svg>\n  </a>\n</nav>",
      note: html("An icon-only link with no label and no widely-agreed meaning — a gear could mean settings, tools, mechanics, or \"in progress,\" and the reader has to click to find out."),
    },
  },
  mistakes: [
    { name: "Inventing a custom icon for a common action", body: html("A novel \"save\" icon that doesn't resemble the floppy disk or checkmark convention people already recognize makes them re-learn something they already knew how to do.") },
    { name: "Ambiguous icon pairs with no label", body: html("A pencil (edit) and a document (view or create?) sitting side by side, icon-only, forces a guess between two plausible readings.") },
    { name: "Decorative stock photography with no connection to the content", body: html("A generic photo of people smiling at a laptop, next to text about a specific feature, adds load time and visual noise without adding any information.") },
    { name: "Mixing icon styles within one interface", body: html("Combining outlined and filled icons, or icons from different sets with different stroke widths and corner radii, reads as unpolished and makes it harder to tell which icons belong to the same system.") },
    { name: "Testing icon meaning only on the people who designed it", body: html("A team that's stared at an icon for weeks will always find it obvious — the only real test is someone seeing it for the first time.") },
  ],
  checklist: [
    html("Every icon whose meaning isn't universally obvious has a visible text label or accessible name."),
    html("Icons come from one consistent visual system (stroke width, corner radius, fill style)."),
    html("Every image serves a real communicative purpose, not decoration for its own sake."),
    html("Icon meaning has been checked against someone unfamiliar with the product, not just the team that built it."),
    html("Images have appropriate <code>alt</code> text (see the Accessibility page for the full rule)."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "SVG over icon fonts", body: html("Icon fonts map icons to Unicode code points, which can confuse screen readers into announcing a stray letter instead of the icon's meaning, and break entirely if the font fails to load. Inline SVG (or an <code>&lt;img&gt;</code> referencing one) renders reliably and can carry its own <code>aria-hidden</code> or accessible name directly.") },
    { lead: "The handful of genuinely universal icons", body: html("A magnifying glass (search), an X (close), a hamburger (menu, though its own meaning is learned rather than intuitive), and a few others have become safe to use without a label purely through decades of repetition — but this list is much shorter than most teams assume, and it doesn't grow just because your specific audience uses the product daily.") },
    { lead: "Cultural variation in imagery", body: html("Hand gestures, color associations (white for mourning vs. celebration), and even the reading direction implied by an arrow or a progression of images can carry different meaning across cultures — worth a deliberate check for anything shipping to a global audience.") },
  ],
  datePublished: "2026-07-27",
};
