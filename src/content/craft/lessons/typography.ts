// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Lesson } from "@/content/types";
import { html } from "@/lib/html";

export const typographyLessons: readonly Lesson[] = [
  {
    courseId: "typography",
    lessonId: "lesson-1",
    levelId: null,
    levelNumber: null,
    lessonNumber: 1,
    title: "Capping line length",
    framing: [html("A monitor doesn't stop getting wider just because a paragraph needs to stop somewhere. If a text block has no cap on its width, the browser will happily stretch every line to fill the window — and the reader is the one who pays for it.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A blog's body text has no <code>max-width</code> set. On a wide desktop monitor, each line runs about 120 characters before wrapping. Should this ship as-is?") },
      ],
      options: [
        { text: html("Yes — line length only matters on small screens, not desktop monitors."), correct: false },
        { text: html("Yes, as long as the font is a serif typeface."), correct: false },
        { text: html("No — cap the text block's width so lines stay under about 75 characters, even in a full-width layout."), correct: true },
        { text: html("No — the fix is to shrink the font size until more characters fit."), correct: false },
      ],
      feedback: html("Past about 75 characters, the eye loses track of which line to return to when it wraps. The rule holds regardless of screen size: keep line length between 45 and 75 characters, with about 60 as the sweet spot, and cap the width of the text block yourself rather than letting it run edge-to-edge."),
    },
    principleSlug: "typography",
  },
  {
    courseId: "typography",
    lessonId: "lesson-2",
    levelId: null,
    levelNumber: null,
    lessonNumber: 2,
    title: "Giving lines room to breathe",
    framing: [html("Line length controls how far the eye travels sideways. Line height controls how far it travels down to find the next line — and it's just as easy to get wrong in the opposite direction, by squeezing lines together instead of spacing them too far apart.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A paragraph of several long sentences is set with <code>line-height: 1.1</code>. What happens to the reading experience?") },
      ],
      options: [
        { text: html("The lines feel like they're touching, which slows reading — body text needs a line height of 1.4–1.6× the font size."), correct: true },
        { text: html("Nothing changes — line-height only affects headings, not paragraphs."), correct: false },
        { text: html("Reading gets faster because the eye travels a shorter vertical distance."), correct: false },
        { text: html("It's fine, as long as the line length is also capped."), correct: false },
      ],
      feedback: html("Line height under 1.4 makes lines of text feel like they're touching, which slows reading, especially for longer paragraphs. Body text needs a line height of roughly 1.4–1.6× its font size to give the eye room to land on the correct line."),
    },
    principleSlug: "typography",
  },
  {
    courseId: "typography",
    lessonId: "lesson-3",
    levelId: null,
    levelNumber: null,
    lessonNumber: 3,
    title: "Hierarchy needs more than one signal",
    framing: [html("A reader scanning a page decides what's a heading and what's a caption in a fraction of a second, before they've read a single word. If the only clue is a few extra pixels of size, that decision gets a lot harder to make at a glance.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("An <code>h1</code> is set at 18px, regular weight. The body text below it is 16px, regular weight. Both use the same typeface and color. Does this create a clear heading?") },
      ],
      options: [
        { text: html("Yes — any size difference at all is enough to establish hierarchy."), correct: false },
        { text: html("Yes, because 18px is technically larger than 16px, and that's what matters."), correct: false },
        { text: html("No — a heading only slightly bigger than body text, in the same weight, reads as an accident. Pair the size change with a weight or color change."), correct: true },
        { text: html("No — a real heading requires a completely different typeface from the body text."), correct: false },
      ],
      feedback: html("Using font size as the only signal of hierarchy is a common mistake: a heading that's only slightly bigger than body text, in the same weight, reads as an accident rather than a heading. Every level of hierarchy needs to be distinguishable by more than one property — size and weight, or size and color, not size alone."),
    },
    principleSlug: "typography",
  },
];
