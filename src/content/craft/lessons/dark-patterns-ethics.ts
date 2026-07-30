// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Lesson } from "@/content/types";
import { html } from "@/lib/html";

export const darkPatternsEthicsLessons: readonly Lesson[] = [
  {
    courseId: "dark-patterns-ethics",
    lessonId: "lesson-1",
    levelId: null,
    levelNumber: null,
    lessonNumber: 1,
    title: "Pre-checked isn't consent",
    framing: [html("A checkbox that's already ticked when the page loads never made the reader say yes to anything. Someone has to notice it, read it, and untick it — and skimming eyes miss exactly that kind of thing most of the time.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A signup form has a checkbox reading \"Share my data with partners,\" ticked by default in small print below the submit button. Is this a dark pattern?") },
      ],
      options: [
        { text: html("No — as long as a checkbox exists at all, unticking it is the reader's responsibility."), correct: false },
        { text: html("Yes — defaulting it to \"on\" puts the burden of noticing and opting out on the reader, instead of asking for a genuine yes."), correct: true },
        { text: html("No — it's only a problem if the checkbox is hidden entirely, not just pre-checked."), correct: false },
        { text: html("Yes, but only because it mentions \"partners\" — any other wording would be fine pre-checked."), correct: false },
      ],
      feedback: html("Pre-checked opt-ins for data sharing, marketing email, or add-ons put the work of noticing and opting out on the reader instead of asking for a genuine yes. The honest version ships unchecked, so ticking it is an active choice the reader makes on purpose."),
    },
    principleSlug: "dark-patterns-ethics",
  },
  {
    courseId: "dark-patterns-ethics",
    lessonId: "lesson-2",
    levelId: null,
    levelNumber: null,
    lessonNumber: 2,
    title: "Confirmshaming vs. a neutral no",
    framing: [html("Every dialog with an accept and a decline button is making the same request twice, once in each button's label. Read the decline button on its own, separate from the offer next to it, and the tone gives the pattern away.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("A discount modal offers two buttons: \"Yes, upgrade me!\" and \"No thanks, I like paying more than I have to.\" What makes the decline button a dark pattern?") },
      ],
      options: [
        { text: html("Its wording guilts the reader for declining, instead of offering a neutral \"No thanks.\""), correct: true },
        { text: html("The accept button's exclamation point is manipulative on its own."), correct: false },
        { text: html("Nothing — as long as a decline option exists at all, its wording doesn't matter."), correct: false },
        { text: html("Offering a discount at all is the dark pattern, regardless of either button's wording."), correct: false },
      ],
      feedback: html("This is confirmshaming: wording a decline option to guilt the reader (\"No thanks, I don't want to save money\") instead of a neutral \"No thanks\" turns a simple choice into an emotional one. The fix is neutral wording on both buttons, not removing the decline option."),
    },
    principleSlug: "dark-patterns-ethics",
  },
  {
    courseId: "dark-patterns-ethics",
    lessonId: "lesson-3",
    levelId: null,
    levelNumber: null,
    lessonNumber: 3,
    title: "Easy in, hard out",
    framing: [html("Compare the number of steps to join with the number of steps to leave. If leaving takes more clicks, more screens, or a different channel entirely than joining did, that gap is the tell — not any single screen along the way.")],
    quiz: {
      prompt: [
        { kind: "text", html: html("Signing up for a service takes one click on the pricing page. Canceling requires calling a phone number during business hours and getting through a phone tree. Is this a dark pattern?") },
      ],
      options: [
        { text: html("Yes — canceling takes far more effort than signing up did, the \"roach motel\" pattern of easy in, hard out."), correct: true },
        { text: html("No — phone support is a legitimate customer service channel, so this is fine."), correct: false },
        { text: html("No — as long as cancellation is technically possible at all, however inconvenient, it isn't a dark pattern."), correct: false },
        { text: html("Yes, but only because it specifically involves a phone call — any other extra step wouldn't count."), correct: false },
      ],
      feedback: html("This is the roach motel pattern: one click to sign up against a phone call, a hidden menu, or multiple confirmation screens to cancel. Canceling or unsubscribing should take the same or fewer steps than signing up did, not more."),
    },
    principleSlug: "dark-patterns-ethics",
  },
];
