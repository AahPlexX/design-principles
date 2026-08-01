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
    html("Picture someone comparing subscription plans on their phone. The table has six columns — plan name, price, seats, storage, support tier, contract length — squeezed to fit, so every column is a sliver and the price column is left-aligned like ordinary sentence text: $9.50, $124.00, $1,299.99. To see which plan is actually cheapest, they have to line the digits up in their head, one comparison at a time, because the numbers themselves don't line up on the screen. Then they want to sort by price to find the lowest tier — there's no way to. The table just sits there, a wall of forty rows in whatever order the database happened to return them, and the only tool available is scrolling and squinting."),
    html("None of that is a rendering bug. Every piece of it is a design decision someone made, or more often didn't make: nobody chose an alignment for the price column, nobody decided what should happen on a narrow screen, nobody added a sort control because the table \"only\" had forty rows. A table is the one layout on a page whose entire job is comparison — which is bigger, which is cheaper, which changed since last month — and every one of those small omissions taxes the exact task the table exists to make easy."),
    html("It gets worse for a reader using a screen reader, where the failure is invisible to anyone who didn't build the table that way on purpose. A table built from styled <code>div</code>s — a common shortcut for getting a custom look without wrestling with table CSS — looks identical to a real table visually, but a screen reader has no row or column to announce. It reads \"Starter,\" then \"$9.50,\" as two unrelated fragments of text, with nothing tying the price to the plan it belongs to. The visual grid and the structure a reader actually experiences are two completely different things, and the gap between them only shows up for the people it fails."),
  ],
  coreRule: [
    html("Give every table real header markup — <code>&lt;th&gt;</code> elements, not styled <code>&lt;div&gt;</code>s or plain <code>&lt;td&gt;</code>s standing in for headers — so the relationship between a cell and its column or row survives scrolling, resizing, and screen readers. Align numeric columns so magnitude reads at a glance instead of requiring mental math, and decide on purpose what happens when the table doesn't fit a narrow screen, rather than letting every column shrink until none of them are readable."),
  ],
  examples: [
    {
      context: "A pricing table with no real header markup",
      good: {
        label: "Good — header cells with scope, tied to a caption",
        code: "<table>\n  <caption>Monthly plan pricing</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Plan</th>\n      <th scope=\"col\">Price</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">Starter</th>\n      <td>$9.50</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Team</th>\n      <td>$24.00</td>\n    </tr>\n  </tbody>\n</table>",
        note: html("The <code>&lt;caption&gt;</code> names the table before a reader commits to scanning it, and <code>scope=\"col\"</code> / <code>scope=\"row\"</code> tell a screen reader exactly which header goes with which cell — it announces \"Price, Starter, $9.50,\" not three disconnected words."),
      },
      bad: {
        label: "Bad — div soup with no row or column relationship",
        code: "<div class=\"table\">\n  <div class=\"row\">\n    <div class=\"cell\">Starter</div>\n    <div class=\"cell\">$9.50</div>\n  </div>\n  <div class=\"row\">\n    <div class=\"cell\">Team</div>\n    <div class=\"cell\">$24.00</div>\n  </div>\n</div>",
        note: html("CSS can make this look pixel-identical to the good version. But there is no <code>&lt;th&gt;</code> anywhere, so a screen reader has nothing to announce beyond \"Starter,\" then \"$9.50\" — no indication that the second value is a price, or that it belongs to the row named Starter."),
      },
    },
    {
      context: "A price column left-aligned like prose",
      good: {
        label: "Good — right-aligned, matched decimals",
        code: "<table>\n  <caption>Monthly plan pricing</caption>\n  <thead>\n    <tr><th scope=\"col\">Plan</th><th scope=\"col\">Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope=\"row\">Starter</th><td style=\"text-align: right\">$9.50</td></tr>\n    <tr><th scope=\"row\">Growth</th><td style=\"text-align: right\">$124.00</td></tr>\n    <tr><th scope=\"row\">Enterprise</th><td style=\"text-align: right\">$1,299.99</td></tr>\n  </tbody>\n</table>",
        note: html("Right-aligned with matching decimal places, the ones, tens, and hundreds digits all stack in the same vertical position. A reader can see Enterprise costs roughly ten times Growth without doing arithmetic — the shape of the column alone tells them."),
      },
      bad: {
        label: "Bad — left-aligned, digits never line up",
        code: "<table>\n  <caption>Monthly plan pricing</caption>\n  <thead>\n    <tr><th scope=\"col\">Plan</th><th scope=\"col\">Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope=\"row\">Starter</th><td>$9.50</td></tr>\n    <tr><th scope=\"row\">Growth</th><td>$124.00</td></tr>\n    <tr><th scope=\"row\">Enterprise</th><td>$1,299.99</td></tr>\n  </tbody>\n</table>",
        note: html("Left-aligned, every value starts at the same edge but ends in a different place depending on how many digits it has. Finding the largest number in the column means reading every digit of every row instead of glancing at where they end."),
      },
    },
    {
      context: "A wide comparison table on a phone screen",
      good: {
        label: "Good — scroll contained to the table, not the page",
        code: "<div class=\"table-scroll\">\n  <table>\n    <caption>Plan feature comparison</caption>\n    <!-- eight columns -->\n  </table>\n</div>\n\n<style>\n  .table-scroll {\n    overflow-x: auto;\n    box-shadow: inset -8px 0 6px -6px rgb(0 0 0 / 0.15);\n  }\n</style>",
        note: html("Wrapping only the table in its own <code>overflow-x: auto</code> container keeps the sideways scroll local to the table — the page's nav and headings above and below it still behave normally. The inset shadow signals that more columns exist off-screen before a reader gives up and assumes that's everything."),
      },
      bad: {
        label: "Bad — an oversized table drags the whole page sideways",
        code: "<table style=\"width: 1400px\">\n  <caption>Plan feature comparison</caption>\n  <!-- eight columns, no wrapper -->\n</table>",
        note: html("With no wrapper, a table wider than the viewport forces the entire page to scroll horizontally — including the navigation bar and any text above or below the table that has nothing to do with it."),
      },
    },
    {
      context: "A sortable numeric column with no way to tell it's sortable",
      good: {
        label: "Good — a real button, with the active sort announced",
        code: "<th scope=\"col\" aria-sort=\"ascending\">\n  <button type=\"button\">\n    Price <span aria-hidden=\"true\">▲</span>\n  </button>\n</th>",
        note: html("A <code>&lt;button&gt;</code> inside the header cell is reachable by keyboard and looks clickable without relying on hover. <code>aria-sort=\"ascending\"</code> on the <code>&lt;th&gt;</code> tells assistive technology which column is currently driving the order — it moves to whichever header becomes active when the sort changes."),
      },
      bad: {
        label: "Bad — sorting only works for someone holding a mouse",
        code: "<th scope=\"col\" onclick=\"sortByPrice()\">Price</th>",
        note: html("A plain header cell with a click handler has no button role and isn't in the keyboard tab order, so a keyboard or screen reader user can't trigger it at all — and even a sighted mouse user gets no indication the column is sortable, or which direction it's currently sorted in, until they click it and find out."),
      },
    },
  ],
  mistakes: [
    { name: "No real header markup", body: html("A table styled with plain <code>&lt;div&gt;</code>s, or one using <code>&lt;td&gt;</code> for what are actually headers, loses the row/column relationship for anyone using a screen reader — use <code>&lt;th scope=\"col\"&gt;</code> and <code>&lt;th scope=\"row\"&gt;</code> for real headers.") },
    { name: "Shrinking every column to fit a narrow screen", body: html("Squeezing twelve columns onto a phone screen makes all of them equally unreadable. Decide which columns matter most on narrow viewports and either scroll, collapse the rest behind a toggle — hiding the less-critical columns inside an expandable row or disclosure that opens to reveal them — or switch to a stacked card layout, where each row becomes its own card and each column header turns into an inline label sitting next to that row's value. Uniform shrinking isn't a strategy, it's the absence of one.") },
    { name: "Letting an oversized table drag the whole page sideways", body: html("A table wider than its container that isn't wrapped in its own scroll region forces the entire page — nav bar included — to scroll horizontally. Wrap the table alone in an <code>overflow-x: auto</code> container so the scroll stays contained to where it's actually needed.") },
    { name: "Left-aligning numeric columns", body: html("Numbers aligned like prose text make magnitude comparison harder to do at a glance. Align them consistently — typically to the end, with matching decimal places — so a reader can compare values by their shape, not by reading every digit.") },
    { name: "Adding sort controls that only work with a mouse", body: html("A header cell with an <code>onclick</code> handler and no button role is invisible to keyboard and screen reader users. Make the sortable header an actual <code>&lt;button&gt;</code>, and set <code>aria-sort</code> on the <code>&lt;th&gt;</code> so assistive technology knows which column and direction is active.") },
    { name: "Missing a caption or accessible description", body: html("Without a <code>&lt;caption&gt;</code> or equivalent, a reader arriving mid-page — or a screen reader user relying on table-navigation shortcuts to jump straight to it — has no context for what the table actually shows until they've already started reading cells.") },
  ],
  checklist: [
    html("Every table uses real <code>&lt;th&gt;</code> elements with the correct <code>scope</code>, not styled <code>&lt;div&gt;</code>s or plain <code>&lt;td&gt;</code>s."),
    html("A <code>&lt;caption&gt;</code> explains what the table contains, as its first child element."),
    html("Numeric columns are aligned consistently (typically right-aligned, matching decimal places), not left-aligned like prose."),
    html("There's a deliberate strategy for narrow viewports — a scoped <code>overflow-x: auto</code> wrapper, column priority, or a stacked layout — rather than uniform shrinking or a page that scrolls sideways."),
    html("Sorting (reordering every row by a column's value) or filtering (narrowing the visible rows down to only the ones matching a condition, without reordering the rest) exists once a table has enough rows that scanning alone isn't practical, and any sort control is a real, keyboard-reachable button with <code>aria-sort</code> reflecting the active column."),
    html("Once a table supports acting on more than one row at a time, it offers a checkbox column, a \"select all\" control, and a bulk-action toolbar that appears once rows are selected — not a table where every action has to be repeated one row at a time."),
    html("A dense/comfortable row-spacing option is offered when the audience mixes power users scanning many rows with infrequent or touch-input users, rather than the table locking in one spacing for everyone."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "headers/id for complex tables", body: html("A table with multi-level or irregular headers (spanning multiple columns or rows) can outgrow what <code>scope</code> alone can express — pairing an <code>id</code> on each header with a matching <code>headers</code> attribute on each cell handles arbitrarily complex header relationships that <code>scope</code> can't.") },
    { lead: "Tabular figures", body: html("The CSS property <code>font-variant-numeric: tabular-nums</code> makes digits a fixed width within a typeface that would otherwise use proportional widths, so a column of numbers lines up vertically even without a monospace font.") },
    { lead: "The horizontal-scroll pattern, done well", body: html("When a table genuinely can't fit narrow viewports, wrapping it in its own <code>overflow-x: auto</code> container — rather than letting it force the whole page to scroll sideways — keeps the scroll contained, and pairing it with a visible affordance (a shadow or fade at the clipped edge) signals that more columns exist off-screen.") },
    { lead: "Why WCAG allows this scroll instead of banning it", body: html("WCAG — the Web Content Accessibility Guidelines, the standard most accessibility laws and audits are measured against — has a reflow criterion that generally requires content to avoid scrolling in two directions at once, but it explicitly exempts content — data tables among them — whose meaning genuinely depends on a two-dimensional grid. A table scoped to scroll within its own container, leaving the rest of the page reflowing normally, is the compliant pattern the exception was written for; a table that drags the entire page sideways is not.") },
    { lead: "Handling more rows than a screen can reasonably show", body: html("Pagination — splitting rows into numbered pages instead of rendering all of them at once — is the simplest, most accessible default for a dataset too large to scan in one go: every row on the current page still sits in the page's normal DOM order, works with a screen reader's ordinary navigation, and needs no JavaScript to keep functioning. Infinite scroll and virtual scrolling (rendering only the rows currently near the viewport and swapping their content as the reader scrolls, so the browser never has to hold thousands of off-screen rows at once) solve a real rendering-performance problem on very large datasets, but carry real accessibility trade-offs: a screen reader's own navigation and \"find on page\" commands often can't reach rows that have been removed from the DOM because they've scrolled out of view, keyboard focus can get lost as rows are recycled during a scroll, and jumping straight to \"the end\" of the data — trivial on a paginated table — may not be possible at all. Reach for virtual scrolling once pagination's page-load cost is a proven problem, not as the default.") },
  ],
  datePublished: "2026-07-31",
};
