// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const responsiveDesign: Principle = {
  slug: "responsive-design",
  title: "Responsive Design",
  category: "Inclusive by Default",
  blurb: "Making one layout hold up on a phone, a tablet, and a 32-inch monitor.",
  searchKeywords: "responsive design making one layout hold up on a phone a tablet and a 32-inch monitor",
  definition: html("Responsive design means one layout adapts to fit whatever screen it's shown on — a phone, a tablet, a laptop, a 32-inch monitor — rather than a separate design being built for each."),
  whyItMatters: [
    html("There is no single screen size to design for anymore, and there hasn't been for a long time. Over half of most sites' traffic is mobile. A layout that only works at one width either breaks (overlapping text, buttons cut off) or forces the reader to pinch-zoom and scroll sideways — both of which are enough friction that people leave."),
  ],
  coreRule: [
    html("Design the layout to respond to the <em>content</em> running out of room, not to a fixed list of device widths. Use flexible units (percentages, <code>fr</code>, <code>ch</code>, <code>rem</code>) and let CSS Grid or Flexbox reflow content, adding a breakpoint only at the point where the current layout actually starts to look bad — not at \"iPhone size\" or \"iPad size\" as guesses."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: ".cards {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit, minmax(15rem, 1fr));\n  gap: 1rem;\n}",
      note: html("The grid fits as many 15rem-minimum columns as the available width allows — 3 columns on a wide screen, 1 on a phone — with no breakpoint needed at all."),
    },
    bad: {
      label: "Bad",
      code: ".cards { width: 1200px; }\n.card { width: 380px; float: left; }",
      note: html("Fixed pixel widths mean the layout is correct at exactly one browser width and broken (overflowing, cut off, or forcing horizontal scroll) everywhere else."),
    },
  },
  mistakes: [
    { name: "Designing only for one width, then \"making it responsive\" afterward", body: html("Retrofitting flexibility onto a fixed-width design usually means patching over symptoms; starting fluid avoids most of the problem.") },
    { name: "Breakpoints chosen by device name instead of by content", body: html("\"iPhone, iPad, desktop\" isn't a real category system — screen widths are continuous, and new device sizes appear constantly. Add a breakpoint where your specific layout breaks, not at a guessed device width.") },
    { name: "Text that doesn't reflow, only shrinks", body: html("Squeezing a fixed-width column onto a phone by shrinking font size instead of letting the column narrow and text wrap makes everything hard to read instead of just re-laid-out.") },
    { name: "Touch targets sized for a mouse pointer", body: html("A link or button under 44×44px is hard to tap accurately with a finger, even if it's perfectly clickable with a precise mouse cursor. WCAG 2.2's actual minimum is smaller (24×24px, with exceptions) — 44×44px is the safer size to design for, not the bare legal floor.") },
    { name: "Hiding content on mobile instead of re-prioritizing it", body: html("\"Just hide it on small screens\" often removes something a mobile user specifically needed (like a phone number or address), rather than re-arranging it to fit.") },
  ],
  checklist: [
    html("No horizontal scrolling at any viewport width from ~320px up."),
    html("Layout uses flexible units and wrapping (Grid/Flexbox), not fixed pixel widths for containers."),
    html("Breakpoints are placed where the specific layout breaks, not at guessed device sizes."),
    html("Tap targets are at least 44×44px on touch devices (comfortably above WCAG 2.2's 24×24px minimum)."),
    html("The page has a <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code> tag."),
  ],
  practiceCourseId: "responsive-design",
  goDeeper: [
    { lead: "Container queries", body: html("media queries respond to the browser viewport's size; container queries (<code>@container</code>) let a component respond to the size of its own containing element instead, which matters once the same component (a card, a sidebar) can appear in differently-sized contexts on the same page.") },
    { lead: "Mobile-first CSS", body: html("writing base styles for the smallest screen and adding complexity with <code>min-width</code> media queries as space increases tends to produce simpler, more resilient CSS than starting from a desktop layout and subtracting for mobile with <code>max-width</code> queries.") },
    { lead: "clamp() for fluid values", body: html("<code>clamp(min, preferred, max)</code> lets sizes (font size, padding, width) scale smoothly with viewport width between a floor and a ceiling, often removing the need for a breakpoint entirely for that property.") },
    { lead: "The exact WCAG numbers", body: html("WCAG 2.2's Success Criterion 2.5.8 (Target Size Minimum, Level AA) actually requires only 24×24 CSS pixels, with exceptions for inline text links, small targets with enough spacing around them, and a few other cases. The widely-cited 44×44px figure is a different, higher criterion — SC 2.5.5 (Target Size Enhanced), a Level AAA bar carried over from WCAG 2.1. Designing to 44×44px clears both comfortably; treating it as the only acceptable size overstates what's strictly required.") },
  ],
  datePublished: "2026-07-23",
};
