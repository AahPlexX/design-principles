// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Lesson } from "@/content/types";
import { html } from "@/lib/html";

export const formsInputsLessons: readonly Lesson[] = [
  {
    courseId: "forms-inputs",
    lessonId: "lesson-1",
    levelId: null,
    levelNumber: null,
    lessonNumber: 1,
    title: "A label that survives typing",
    framing: [html("Watch someone fill out a long form on their phone: they get a call, switch apps, come back three minutes later. If the only thing telling them what a field is for was inside the field itself, that context is already gone.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A signup form has no <code>&lt;label&gt;</code> elements — each input just shows placeholder text like \"Email\" or \"Full name\" until the reader starts typing. What happens once someone has typed a few characters into a field, then scrolls back up to check it?") },
      ],
      options: [
        { text: html("The placeholder is gone, so the field's purpose is no longer visible anywhere."), correct: true },
        { text: html("The browser automatically restores the placeholder text above the field."), correct: false },
        { text: html("Nothing changes — placeholders stay visible even while typing."), correct: false },
        { text: html("This only affects users on mobile, not desktop."), correct: false },
      ],
      feedback: html("Placeholder text vanishes the moment typing starts. If the reader gets interrupted or scrolls back to double-check an answer, there's nothing left telling them what that field was asking for — a persistent, visible <code>&lt;label&gt;</code> is what survives that gap, not the placeholder."),
    },
    principleSlug: "forms-inputs",
  },
  {
    courseId: "forms-inputs",
    lessonId: "lesson-2",
    levelId: null,
    levelNumber: null,
    lessonNumber: 2,
    title: "An error message that names the fix",
    framing: [html("An error message is the form talking back to someone who just tried to do what it asked and got stopped. Whatever it says next is either going to help them finish, or send them away to guess.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A reader submits a new password and the field turns red with the message \"Invalid input.\" What's the actual problem with this error, and what should it say instead?") },
      ],
      options: [
        { text: html("Nothing is wrong with it — red text is enough of a signal on its own."), correct: false },
        { text: html("It doesn't say what's wrong; it should name the specific problem, like \"Password needs at least 8 characters.\""), correct: true },
        { text: html("The message should be moved to a summary at the top of the page instead of the field."), correct: false },
        { text: html("The message is fine as long as the field also shakes or animates."), correct: false },
      ],
      feedback: html("\"Invalid input\" forces the reader to guess what actually failed. The fix is to say what's wrong specifically — \"Password needs at least 8 characters\" — and, ideally, how to fix it, instead of leaving the reader to guess."),
    },
    principleSlug: "forms-inputs",
  },
  {
    courseId: "forms-inputs",
    lessonId: "lesson-3",
    levelId: null,
    levelNumber: null,
    lessonNumber: 3,
    title: "Catching mistakes before the final click",
    framing: [html("Think about the last long form you filled out where nothing told you a field was wrong until you hit submit. Now imagine that mistake was near the top, and everything below it is gone from view.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A ten-field signup form shows no errors while the reader is filling it out. Only after they click the final \"Submit\" button does it reveal that field 3 — near the top — was filled in wrong. What's the real cost of waiting until submit to check, and what should the form do instead?") },
      ],
      options: [
        { text: html("There's no real cost — checking only on submit is the standard, friction-free way to validate a form."), correct: false },
        { text: html("The reader has to scroll back and re-find a mistake several fields behind; a field should be checked once the reader is done with it, not only at the end."), correct: true },
        { text: html("The cost is only that the submit button stays disabled forever."), correct: false },
        { text: html("The fix is to remove field 3 from the form entirely."), correct: false },
      ],
      feedback: html("Waiting until the whole form is submitted to reveal an error made several fields ago means the reader has to scroll back and re-find their mistake. Validating a field once the reader has finished with it — not only at the very end — catches the problem while it's still fresh instead of turning it into a scavenger hunt."),
    },
    principleSlug: "forms-inputs",
  },
];
