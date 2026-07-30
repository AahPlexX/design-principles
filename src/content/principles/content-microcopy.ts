// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const contentMicrocopy: Principle = {
  slug: "content-microcopy",
  title: "Content & Microcopy",
  category: "Task-Specific",
  blurb: "The small pieces of text that guide someone through an interface, and why vague ones lose people.",
  searchKeywords: "content microcopy the small pieces of text that guide someone through an interface and why vague ones lose people",
  definition: html("Microcopy is the small pieces of text throughout an interface — button labels, error messages, empty states, confirmation dialogs — that guide someone through using it, as distinct from the main body content they came to read."),
  whyItMatters: [
    html("A button labeled \"Submit\" doesn't tell the reader what actually happens when they click it; \"Create account\" does. An empty search results page that just says \"No results\" leaves someone stuck, while one that says \"No results for 'blue jacket' — try removing a filter\" gives them an actual next step. Microcopy is often the only text someone reads carefully on an entire screen, which makes vague microcopy disproportionately costly."),
  ],
  coreRule: [
    html("Write microcopy from the reader's next action, not the system's internal state. Say what will happen if they click something, not what the system is technically doing — and for anything destructive or hard to undo, name the specific action in the confirmation, don't just ask \"Are you sure?\""),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<h2>Delete \"Q3 Report.pdf\"?</h2>\n<p>This can't be undone.</p>\n<button>Delete file</button>\n<button>Cancel</button>",
      note: html("The dialog names the exact file, states the consequence plainly, and the confirm button repeats the specific action instead of a generic \"Yes\" — there's no ambiguity about what's about to happen."),
    },
    bad: {
      label: "Bad",
      code: "<h2>Are you sure?</h2>\n<button>Yes</button>\n<button>No</button>",
      note: html("\"Are you sure?\" doesn't say what it's confirming, and \"Yes\" requires the reader to remember what they just clicked rather than reading the confirmation itself."),
    },
  },
  mistakes: [
    { name: "Generic labels that don't describe the result", body: html("\"Submit,\" \"OK,\" and \"Click here\" tell the reader nothing about what happens next — a label should describe the outcome (\"Send message,\" \"Save changes\").") },
    { name: "Empty states with no next step", body: html("\"No data\" or \"Nothing here yet\" explains the current state but not what to do about it. A good empty state says why it's empty and what action would change that.") },
    { name: "Raw error codes or technical jargon shown to users", body: html("\"Error 400: Bad Request\" is meaningful to a developer and meaningless to almost everyone else — it needs a plain-language translation of what went wrong and what to do next.") },
    { name: "Vague confirmations for destructive actions", body: html("\"Are you sure?\" with generic Yes/No buttons is easy to click through without registering what's actually being confirmed. Name the action in both the message and the button.") },
    { name: "Inconsistent terminology for the same concept", body: html("Calling the same thing \"account\" in one screen, \"profile\" in another, and \"membership\" in a third forces the reader to work out whether these are the same thing or something different.") },
  ],
  checklist: [
    html("Button and link labels describe the specific result, not a generic verb."),
    html("Empty states explain why they're empty and suggest a next action."),
    html("Error messages avoid raw codes and jargon, and say what to do next."),
    html("Destructive-action confirmations name the specific thing being affected, in both the message and the button label."),
    html("The same concept is called the same thing everywhere in the product."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Voice vs. tone", body: html("Voice is a product's consistent personality (formal, playful, matter-of-fact) and stays constant; tone shifts with context — the same product's voice can sound reassuring in an error message and celebratory in a success message, without becoming a different voice.") },
    { lead: "Front-loading the important word", body: html("\"Delete file\" front-loads the consequential word; \"File will be deleted\" buries it at the end. In a UI a reader is scanning rather than reading fully, the first word often carries most of the weight.") },
    { lead: "Localization changes length, not just words", body: html("Microcopy that fits tightly in English (a two-word button label) can run noticeably longer in other languages — leave room in the layout rather than writing copy that only fits at exactly its original length.") },
  ],
  datePublished: "2026-07-23",
};
