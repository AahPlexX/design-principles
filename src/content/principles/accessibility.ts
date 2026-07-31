// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const accessibility: Principle = {
  slug: "accessibility",
  title: "Accessibility",
  category: "Inclusive by Default",
  blurb: "Designing so the site works for people using a keyboard, a screen reader, or low vision.",
  searchKeywords: "accessibility designing so the site works for people using a keyboard a screen reader or low vision",
  definition: html("Accessibility is designing a site so it still works for someone who can't use a mouse, can't see the screen, or can't see it well — using only a keyboard, a screen reader (software that reads the page aloud), or magnification."),
  whyItMatters: [
    html("This isn't a small edge case: it covers permanent disabilities, temporary ones (a broken arm, eye surgery recovery), and situational ones (holding a baby in one arm, bright sunlight washing out a screen). A site built only for a mouse and perfect eyesight excludes all of these, often by accident — a missing label, a color-only signal, a click handler that only fires on a mouse event."),
  ],
  coreRule: [
    html("Everything a mouse can do, a keyboard must also be able to do — and everything shown visually needs a text equivalent a screen reader can announce. If you can't tab to a control and activate it with Enter or Space, and you can't tell what it is with your eyes closed, it's not accessible yet."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<button aria-label=\"Close dialog\">\n  <svg aria-hidden=\"true\">...</svg>\n</button>",
      note: html("A real <code>&lt;button&gt;</code> is keyboard-focusable and clickable by default, and the label tells a screen reader what it does even though the visible content is just an icon."),
    },
    bad: {
      label: "Bad",
      code: "<div onclick=\"closeDialog()\">\n  <svg>...</svg>\n</div>",
      note: html("A <code>&lt;div&gt;</code> isn't focusable or keyboard-activatable by default, and with no label, a screen reader announces nothing useful — this control is invisible to anyone not using a mouse."),
    },
  },
  mistakes: [
    { name: "Building custom controls out of <div> or <span>", body: html("Native elements (<code>&lt;button&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;input&gt;</code>) come with keyboard behavior and screen-reader semantics built in. Recreating a button from a div means re-implementing all of that by hand, and it's usually incomplete.") },
    { name: "Images with no alt text, or bad alt text", body: html("A missing <code>alt</code> attribute makes a screen reader announce the filename; decorative images should have <code>alt=\"\"</code> so they're skipped entirely, not described.") },
    { name: "Form fields with no visible, connected label", body: html("Placeholder text is not a label — it disappears the moment someone starts typing, and some screen readers don't announce it at all. Use a real <code>&lt;label&gt;</code> tied to the input.") },
    { name: "Focus styles removed for looking \"messy.\"", body: html("<code>outline: none</code> with nothing to replace it removes the only visual signal a keyboard user has for where they are on the page.") },
    { name: "Content that only appears on hover", body: html("A tooltip or menu that only shows on mouse hover is unreachable by keyboard and untouchable on a phone — it needs a focus and/or tap equivalent.") },
  ],
  checklist: [
    html("Every interactive element is reachable and operable with Tab, Enter, and Space alone."),
    html("Focus is always visible — never removed without a replacement style."),
    html("Every image has appropriate <code>alt</code> text (or <code>alt=\"\"</code> if purely decorative)."),
    html("Every form field has a real, connected <code>&lt;label&gt;</code>."),
    html("Nothing important is conveyed by hover alone."),
    html("Headings are structured in order (one <code>&lt;h1&gt;</code>, then <code>&lt;h2&gt;</code>, etc.) so a screen reader user can navigate by heading."),
  ],
  practiceCourseId: "accessibility",
  goDeeper: [
    { lead: "WCAG's four principles (POUR)", body: html("content should be Perceivable (available to the senses, e.g. via alt text or captions), Operable (usable via keyboard and other input methods), Understandable (clear language and predictable behavior), and Robust (works with current and future assistive technology, largely via correct HTML semantics).") },
    { lead: "ARIA is a patch, not a first choice", body: html("ARIA attributes (<code>role</code>, <code>aria-*</code>) exist to describe custom components that HTML has no native element for. The first rule of ARIA is: if a native HTML element already does what you need, use that instead of adding ARIA to a div.") },
    { lead: "Testing without a mouse", body: html("unplug your mouse (or just don't touch it) and try to complete your site's core task using only Tab, Shift+Tab, Enter, and Space. This alone catches a large share of accessibility issues before any specialized tooling is involved.") },
  ],
  datePublished: "2026-07-23",
};
