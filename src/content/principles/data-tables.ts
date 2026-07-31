// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const dataTables: Principle = {
  slug: "data-tables",
  title: "Data & Tables",
  category: "Task-Specific",
  blurb: "Presenting rows and columns of information so a reader can scan, compare, and find what they need, instead of parsing a dense grid one cell at a time.",
  searchKeywords: "data tables presenting rows and columns of information so a reader can scan compare and find what they need",
  definition: html("A data table is rows and columns of related values — prices, dates, stats, records — laid out so a reader can scan down a column, compare across a row, and find one specific value without reading every cell in between."),
  whyItMatters: [
    html("A pricing comparison with twelve columns crammed onto a phone screen forces horizontal scrolling, and by the time someone scrolls right to see a distant column's value, they've lost track of which row they were even reading. A column of dollar amounts left-aligned like ordinary text — $9.50, $124.00, $1,299.99 — makes it genuinely harder to tell which number is bigger at a glance, because the digits don't line up the way they do when numbers are aligned to compare by magnitude."),
  ],
  coreRule: [
    html("Give every table real header markup so the relationship between a cell and its column (or row) survives scrolling and screen readers, align numeric data so magnitudes are comparable at a glance, and decide deliberately what happens to the table on a narrow screen — don't just let every column shrink until nothing is readable."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<table>\n  <caption>Monthly plan pricing</caption>\n  <thead><tr>\n    <th scope=\"col\">Plan</th>\n    <th scope=\"col\">Price</th>\n  </tr></thead>\n  <tbody><tr>\n    <th scope=\"row\">Starter</th>\n    <td>$9.50</td>\n  </tr></tbody>\n</table>",
      note: html("A caption states what the table is, <code>scope</code> ties each cell to its header for anyone using a screen reader, and the price column is a single consistent value type that can be aligned for easy comparison."),
    },
    bad: {
      label: "Bad",
      code: "<div class=\"table\">\n  <div class=\"row\">\n    <div>Starter</div>\n    <div>$9.50</div>\n  </div>\n</div>",
      note: html("Built from generic <code>div</code>s with CSS made to look like a table, this has no real header/cell relationship at all — a screen reader announces it as an undifferentiated pile of text with no way to know which value belongs to which column."),
    },
  },
  mistakes: [
    { name: "No real header markup", body: html("A table styled with plain <code>div</code>s, or one using <code>&lt;td&gt;</code> for what are actually headers, loses the row/column relationship for anyone using a screen reader — use <code>&lt;th scope=\"col\"&gt;</code> and <code>&lt;th scope=\"row\"&gt;</code> for real headers.") },
    { name: "Cramming every column into a narrow viewport", body: html("Shrinking twelve columns to fit a phone screen makes all of them equally unreadable — decide which columns matter most on narrow screens and either scroll, collapse secondary columns, or switch to a stacked card layout instead.") },
    { name: "Left-aligning numeric columns", body: html("Numbers aligned like prose text make magnitude comparison harder; aligning them consistently (typically to the end, with matching decimal places) lets a reader compare values at a glance.") },
    { name: "No way to sort or filter a genuinely large table", body: html("A table with hundreds of rows and no sort or filter forces a reader to scan the entire thing manually to find what they need.") },
    { name: "Missing a caption or accessible description", body: html("Without a <code>&lt;caption&gt;</code> or equivalent, a reader arriving mid-page (or via a screen reader's table-navigation shortcut) has no context for what the table actually shows.") },
  ],
  checklist: [
    html("Every table uses real <code>&lt;th&gt;</code> elements with the correct <code>scope</code>, not styled <code>div</code>s or plain <code>&lt;td&gt;</code>."),
    html("Numeric columns are aligned consistently, not left-aligned like prose."),
    html("There's a deliberate strategy for narrow viewports (scroll container, column priority, or a stacked layout) rather than uniform shrinking."),
    html("A <code>&lt;caption&gt;</code> or equivalent text explains what the table contains."),
    html("Sorting or filtering exists once a table has enough rows that scanning alone isn't practical."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "headers/id for complex tables", body: html("A table with multi-level or irregular headers (spanning multiple columns or rows) can outgrow what <code>scope</code> alone can express — pairing an <code>id</code> on each header with a matching <code>headers</code> attribute on each cell handles arbitrarily complex header relationships.") },
    { lead: "Tabular figures", body: html("The CSS property <code>font-variant-numeric: tabular-nums</code> makes digits a fixed width within a typeface that would otherwise use proportional widths, so a column of numbers lines up vertically even without a monospace font.") },
    { lead: "The horizontal-scroll pattern, done well", body: html("When a table genuinely can't fit narrow viewports, wrapping it in its own <code>overflow-x: auto</code> container (rather than letting it force the whole page to scroll sideways) keeps the scroll contained — pairing it with a visible affordance (a shadow or fade at the clipped edge) signals that more columns exist off-screen.") },
  ],
  datePublished: "2026-07-27",
};
