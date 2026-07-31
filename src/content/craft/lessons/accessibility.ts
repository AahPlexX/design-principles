// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Lesson } from "@/content/types";
import { html } from "@/lib/html";

export const accessibilityLessons: readonly Lesson[] = [
  {
    courseId: "accessibility",
    lessonId: "lesson-1",
    levelId: null,
    levelNumber: null,
    lessonNumber: 1,
    title: "Keyboard reachability",
    framing: [html("Everything a mouse can click, a keyboard must be able to reach and activate too. Native elements like <code>&lt;button&gt;</code> and <code>&lt;a&gt;</code> do this automatically; a generic element with a click handler does not.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A \"Submit\" control is built as <code>&lt;div onclick=\"submitForm()\"&gt;Submit&lt;/div&gt;</code>. What's the accessibility problem?") },
      ],
      options: [
        { text: html("The div needs a larger click area to be usable."), correct: false },
        { text: html("A div isn't keyboard-focusable or activatable by default — a keyboard user can't reach or trigger this at all."), correct: true },
        { text: html("<code>onclick</code> is a deprecated HTML attribute."), correct: false },
        { text: html("It should use inline styles instead of a class."), correct: false },
      ],
      feedback: html("A <code>&lt;div&gt;</code> has no built-in keyboard behavior — Tab skips right past it, and there's no way to \"click\" it with Enter or Space. Swapping it for a real <code>&lt;button&gt;</code> fixes this for free, with no extra ARIA or JavaScript needed."),
    },
    principleSlug: "accessibility",
  },
  {
    courseId: "accessibility",
    lessonId: "lesson-2",
    levelId: null,
    levelNumber: null,
    lessonNumber: 2,
    title: "Labels vs. placeholders",
    framing: [html("Placeholder text looks like a label sitting inside the field, but it isn't one. It disappears the moment someone starts typing, and some screen readers don't announce it at all. A form field needs a real, persistently-visible label connected to it.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A signup form has <code>&lt;input type=\"email\" placeholder=\"Email address\"&gt;</code> with no <code>&lt;label&gt;</code> anywhere near it. What's missing?") },
      ],
      options: [
        { text: html("A <code>required</code> attribute."), correct: false },
        { text: html("A real, connected <code>&lt;label&gt;</code> — the placeholder vanishes once typing starts and isn't reliably announced by screen readers."), correct: true },
        { text: html("A <code>pattern</code> attribute for validation."), correct: false },
        { text: html("An <code>autocomplete</code> attribute."), correct: false },
      ],
      feedback: html("A <code>&lt;label for=\"email\"&gt;Email address&lt;/label&gt;</code> tied to the input's <code>id</code> stays visible the whole time someone's filling out the field, and is what a screen reader actually announces as the field's name — a placeholder is a hint, not a substitute for it."),
    },
    principleSlug: "accessibility",
  },
  {
    courseId: "accessibility",
    lessonId: "lesson-3",
    levelId: null,
    levelNumber: null,
    lessonNumber: 3,
    title: "Focus visibility",
    framing: [html("When you tab through a page, the browser draws an outline around whatever's currently focused. It's the only way a keyboard user can see where they are — removing it without putting anything else in its place leaves them navigating blind.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A stylesheet has <code>button:focus { outline: none; }</code> with no other focus style defined. Why is this a problem?") },
      ],
      options: [
        { text: html("It makes the button render more slowly."), correct: false },
        { text: html("It removes the only visual signal a keyboard user has for where they currently are on the page."), correct: true },
        { text: html("It breaks the button's click event entirely."), correct: false },
        { text: html("Screen readers require a visible outline to announce the element."), correct: false },
      ],
      feedback: html("Without a focus outline, a sighted keyboard user tabbing through the page has no way to tell which element is currently active — they're navigating with no visual feedback at all. If the default outline doesn't match the design, replace it with a custom focus style; never remove it and leave nothing behind."),
    },
    principleSlug: "accessibility",
  },
];
