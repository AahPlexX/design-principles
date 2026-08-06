// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { previewDocument } from "@/content/previewDoc";
import { html } from "@/lib/html";

export const typography: Principle = {
  slug: "typography",
  title: "Typography",
  category: "Foundations",
  blurb: "How type size, line length, and hierarchy decide whether text gets read or skipped.",
  searchKeywords:
    "typography how type size, line length, and hierarchy decide whether text gets read or skipped line height leading measure heading hierarchy uppercase all caps letter spacing data table modular scale",
  definition: html("Typography is the set of decisions that control how easy text is to read: how big it is, how long each line runs, how much space separates lines and paragraphs, and which words stand out as more important than others."),
  whyItMatters: [
    html("Picture a reader who found your long-form explainer article from a search result and opened it on a laptop with the browser window maximized across a wide monitor. Nothing about the page is broken — the colors work, the layout is clean — but the paragraph text stretches from the left edge of the screen to the right, one line running past 150 characters before it wraps. By the third paragraph, the reader's eye keeps losing the thread: it reaches the end of a long line, sweeps back to the left margin, and has to hunt for which line it just finished. They don't diagnose \"the measure\" — the typesetting term for line length — \"is too wide\": the article just feels exhausting to get through, and they close the tab before reaching the point they came for."),
    html("This isn't a rare failure mode, either. Typography carries almost every word on the page — headlines, error messages, form labels — so it touches more of a site than nearly any other design decision does. And the readers who pay the highest price for it aren't an edge case: someone with presbyopia (the age-related loss of near-focus most people develop after about forty) needs text that's genuinely larger, not just technically legible, and a reader with dyslexia recognizes a word by its overall shape — the mix of tall, short, and descending letters — more than most readers do. Set that word in all-caps, which flattens every word into the same rectangle, and the shape cue they depend on disappears."),
    html("The failure rarely announces itself as a typography problem, either. A visitor who can't tell a heading from a body paragraph doesn't think \"the hierarchy is unclear\" — they don't find the section they came for, and they leave. A shopper squinting at tiny product details on a phone doesn't blame the font size — they assume the store is sketchy and check a competitor instead. Bad typography reads as a content problem or a trust problem, even when the words underneath it were written perfectly well."),
  ],
  coreRule: [
    html("Keep line length — how many characters fit on one line before it wraps — between <strong>45 and 75 characters</strong> (about 60 is the sweet spot). Keep line height — the vertical space between lines, expressed as a multiple of the font size — around <strong>1.4–1.6×</strong> for body text. And give every level of hierarchy (heading, subheading, body text, caption) more than one visual signal that sets it apart — size and weight together, never size alone."),
  ],
  examples: [
    {
      context: "Line length in a wide article column",
      good: {
        label: "Good — capped at about 60–65 characters",
        code: "article {\n  max-width: 65ch;\n  margin-inline: auto;\n  font-size: 1.125rem;\n  line-height: 1.6;\n}",
        preview: previewDocument(
          "body{font-family:Georgia,serif;color:#1a1a1a;background:#fff;padding:1rem}article{max-width:65ch;margin-inline:auto;font-size:1.0625rem;line-height:1.6}",
          "<article><p>A reader's eye travels to the end of a line, then has to find the start of the next one. Keep that trip short and the eye barely notices making it.</p></article>",
        ),
        note: html("The <code>ch</code> unit equals the width of the font's \"0\" character, so <code>65ch</code> is a reliable proxy for roughly 65 characters per line no matter how wide the browser window gets."),
      },
      bad: {
        label: "Bad — no cap, lines run 150+ characters wide",
        code: "article {\n  /* no max-width — the column is\n     however wide the browser window is */\n  font-size: 1.125rem;\n  line-height: 1.6;\n}",
        preview: previewDocument(
          "body{font-family:Georgia,serif;color:#1a1a1a;background:#fff;padding:1rem;width:1400px}article{font-size:1.0625rem;line-height:1.6}",
          "<article><p>A reader's eye travels to the end of a line, then has to find the start of the next one — and with no width limit at all, that line just keeps running, and running, past the point a reader can comfortably track where it started. Scroll right to see exactly how far this one goes before it finally wraps.</p></article>",
        ),
        previewSize: "sm",
        note: html("On a wide monitor with the window maximized, a line can run past 150 characters before it wraps — the eye has to travel that whole distance and then relocate the start of the next line, which is exhausting over a full article. (Scroll the preview above sideways — that scroll is the failure.)"),
      },
    },
    {
      context: "Line height in a dense data table",
      good: {
        label: "Good — 1.4 line-height, real padding",
        code: "td {\n  padding: 0.75rem 1rem;\n  line-height: 1.4;\n}",
        preview: previewDocument(
          "body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;background:#fff;padding:1rem;font-size:0.875rem}table{border-collapse:collapse;width:100%}td{padding:0.75rem 1rem;line-height:1.4;border-bottom:1px solid #e2e2e2;vertical-align:top}",
          "<table><tr><td>Espresso Machine — Pro Series</td><td>In stock, ships in 2 days</td></tr><tr><td>Kettle</td><td>Backordered until next month</td></tr></table>",
        ),
        previewSize: "sm",
        note: html("A line-height of 1.4 plus genuine padding keeps a two-line cell readable and keeps each row visually distinct from the one below it, even in a compact table."),
      },
      bad: {
        label: "Bad — 1.0 line-height, minimal padding",
        code: "td {\n  padding: 0.25rem 0.5rem;\n  line-height: 1;\n}",
        preview: previewDocument(
          "body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;background:#fff;padding:1rem;font-size:0.875rem}table{border-collapse:collapse;width:100%}td{padding:0.25rem 0.5rem;line-height:1;border-bottom:1px solid #e2e2e2;vertical-align:top}",
          "<table><tr><td>Espresso Machine — Pro Series</td><td>In stock, ships in 2 days</td></tr><tr><td>Kettle</td><td>Backordered until next month</td></tr></table>",
        ),
        previewSize: "sm",
        note: html("This looks efficient while every cell holds one line. The moment a cell wraps — a long product name, a status message — its two lines nearly touch, and the tight padding leaves no gap to separate one row from the next."),
      },
    },
    {
      context: "A heading hierarchy that only changes size",
      good: {
        label: "Good — size, weight, and color all shift together",
        code: "h1 { font-size: 2.5rem; font-weight: 700; }\nh2 { font-size: 1.75rem; font-weight: 700; color: #1a1a2e; }\nh3 { font-size: 1.25rem; font-weight: 600; color: #4b4b57; }",
        preview: previewDocument(
          "body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;background:#fff;padding:1rem}h1{font-size:1.75rem;font-weight:700;margin:0 0 0.4rem}h2{font-size:1.25rem;font-weight:700;color:#1a1a2e;margin:0.6rem 0 0.2rem}h3{font-size:1rem;font-weight:600;color:#4b4b57;margin:0.4rem 0 0.2rem}p{margin:0.2rem 0;font-size:0.8125rem;color:#4b4b57}",
          "<h1>Account settings</h1><h2>Notifications</h2><p>Choose how you hear from us.</p><h3>Email frequency</h3>",
        ),
        note: html("Each level down is smaller, lighter in weight or color than the one above it, so a reader can tell which heading outranks which without reading the words."),
      },
      bad: {
        label: "Bad — same weight throughout, sizes barely differ",
        code: "h1 { font-size: 1.4rem; font-weight: 400; }\nh2 { font-size: 1.2rem; font-weight: 400; }\nh3 { font-size: 1.05rem; font-weight: 400; }",
        preview: previewDocument(
          "body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;background:#fff;padding:1rem}h1{font-size:1.4rem;font-weight:400;margin:0 0 0.4rem}h2{font-size:1.2rem;font-weight:400;margin:0.6rem 0 0.2rem}h3{font-size:1.05rem;font-weight:400;margin:0.4rem 0 0.2rem}p{margin:0.2rem 0;font-size:1rem}",
          "<h1>Account settings</h1><h2>Notifications</h2><p>Choose how you hear from us.</p><h3>Email frequency</h3>",
        ),
        note: html("At a glance, h2 and h3 read as slightly-bigger body text rather than headings — the size gap is too small and nothing else about them changes, so a reader scanning for a section has no visual jump to look for."),
      },
    },
    {
      context: "Emphasis carried by literal all-caps text",
      good: {
        label: "Good — sentence case in the markup, CSS handles the look",
        code: "<p class=\"eyebrow\">New feature</p>\n\n.eyebrow {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.75rem;\n}",
        note: html("The actual text is still \"New feature,\" so assistive technology reads it normally; <code>text-transform</code> renders it in capitals, and the added letter-spacing keeps the tightly-packed capital letters from feeling cramped. Letter-spacing (also called tracking) is a lever in both directions: loosening it, as here, helps small or all-caps text stay legible, while tightening it at large display sizes removes gaps that otherwise open up between oversized letters."),
      },
      bad: {
        label: "Bad — a full sentence typed in literal capitals",
        code: "<h2>WE'VE SHIPPED THREE NEW FEATURES FOR YOUR TEAM</h2>",
        note: html("Capital letters erase the ascenders and descenders that let a fluent reader recognize a whole word by its shape, so long stretches of all-caps text read measurably slower for every reader — and some screen readers (software that reads the page aloud or sends it to a braille display) will spell a short word inside it out letter by letter, mistaking it for an acronym."),
      },
    },
  ],
  mistakes: [
    { name: "Letting lines run edge-to-edge on wide screens", body: html("Past about 75 characters, the eye loses track of which line to return to after a wrap. Cap the width of any text block with something like <code>max-width: 65ch</code>, even inside an otherwise full-width layout.") },
    { name: "Using font size as the only signal of hierarchy", body: html("A heading that's only slightly bigger than body text, in the same weight and color, reads as an accident rather than a heading. Pair a size change with a weight or color change, the way the heading example above does.") },
    { name: "Tight line height on body text", body: html("Line height under about 1.4 makes adjacent lines feel like they're touching, which slows reading — and the same failure shows up in a dense table the moment a cell wraps to a second line, not only in long-form paragraphs.") },
    { name: "Centering paragraphs of body text", body: html("Centered alignment works for a short headline, where every line runs a similar length. Across multiple lines of body text, the ragged left edge shifts from line to line, and the eye has to hunt for where each new line starts instead of returning to a fixed spot.") },
    { name: "Too many typefaces or weights on one page", body: html("More than two typeface families, or more than three weights of one family, usually means the hierarchy is being carried by novelty instead of a deliberate, repeatable system. When you do combine two families, pick ones that contrast in a way that signals a deliberate role difference — a serif or slab typeface for headlines against a neutral sans-serif for body text, for example — rather than two similar sans-serifs that end up competing for the same job instead of dividing it.") },
    { name: "Typing text in literal capitals instead of styling it", body: html("Writing a heading or button label in all caps directly in the copy — rather than in sentence case with CSS <code>text-transform</code> applied on top — does two things wrong at once: it reads measurably slower, because capital letters erase the word-shape cues fluent readers rely on, and some screen readers will spell a short all-caps word out letter by letter, mistaking it for an acronym.") },
  ],
  checklist: [
    html("Body text line length stays under ~75 characters at any viewport width."),
    html("Body line height is 1.4–1.6×, and dense UI text (tables, cards) still gets enough line-height to survive a wrapped line."),
    html("Each heading level is distinguishable by more than one property (size + weight, or size + color)."),
    html("Body text is at least 16px (1rem) on mobile, and form inputs stay at 16px or larger so iOS Safari doesn't zoom in when someone taps into one."),
    html("No more than two typeface families are in use."),
    html("Any all-caps text is short (a label or button, not a sentence) and set with CSS, not typed in literal capitals."),
  ],
  practiceCourseId: "typography",
  goDeeper: [
    { lead: "Modular type scales", body: html("Instead of picking each heading size by eye, multiply a base size by a fixed ratio — 1.25 for a moderate scale, 1.333 or higher for something more dramatic — to generate every size above it. The relationship between sizes stays consistent as more heading levels get added, rather than drifting further apart or closer together each time a size gets picked separately.") },
    { lead: "Optical sizing", body: html("A variable font is a single font file that can interpolate between weights, widths, and styles — regular, bold, condensed, and everything between — instead of needing a separate file loaded for each one. Some variable fonts go further and adjust stroke thickness and spacing automatically as size changes, through the <code>font-optical-sizing</code> CSS property. Without it, a font scaled to an extreme size can look subtly wrong — a caption that looks like a shrunk heading, or a heading that looks inflated — because strokes and spacing that read cleanly at one size don't always read cleanly at another.") },
    { lead: "Fluid type with clamp()", body: html("<code>clamp()</code> lets a font size scale smoothly between a minimum and a maximum based on viewport width — for example <code>font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)</code> — instead of jumping abruptly at each breakpoint.") },
    { lead: "Vertical rhythm and the baseline grid", body: html("Vertical rhythm is the practice of aligning stacked text blocks — headings, paragraphs, list items — to a consistent vertical spacing derived from the body text's line-height, so their baselines (the invisible line each line of text visually sits on) land on a shared, evenly spaced grid instead of drifting out of step as font sizes change. A heading with margins that aren't multiples of the body copy's line-height can nudge everything below it half a line out of step with content in an adjacent column — subtle in one spot, visible once it repeats down a long page.") },
    { lead: "WCAG's text-spacing override (1.4.12)", body: html("WCAG (the Web Content Accessibility Guidelines — the standard most accessibility laws and audits are measured against) is organized into numbered success criteria, each one a specific, testable rule; 1.4.12, Text Spacing, is the one that applies here. It doesn't set the line height a site has to ship by default — it requires the page to keep working if a reader's own stylesheet pushes line height to at least 1.5× the font size, paragraph spacing to at least 2× the font size, letter spacing to at least 0.12× the font size, and word spacing to at least 0.16× the font size. A layout that clips text or hides content once those overrides are applied fails the criterion, even if the page's own default spacing looks fine.") },
  ],
  datePublished: "2026-07-23",
};
