// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const formsInputs: Principle = {
  slug: "forms-inputs",
  title: "Forms & Inputs",
  category: "Task-Specific",
  blurb: "Why most forms lose people, and the handful of rules that fix almost all of it.",
  searchKeywords: "forms inputs why most forms lose people and the handful of rules that fix almost all of it",
  definition: html("A form is any part of a page where someone types, selects, or uploads something. Form design is about removing every point of friction and confusion between \"I want to submit this\" and actually submitting it."),
  whyItMatters: [
    html("Forms are where a site asks something of the reader instead of just giving them information, and that's exactly where people quit. A confusing error message, a field whose purpose isn't clear, or a validation rule discovered only after submitting is often the single biggest drop-off point in a signup, checkout, or contact flow."),
  ],
  coreRule: [
    html("Every field needs a visible label, a clear reason for existing, and an error message that says exactly what to fix — shown as close to the moment of the mistake as possible, not only after a full-page submit. If you can't explain why a field is required, remove it."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required>\n<p id=\"email-err\" role=\"alert\">\n  Enter an email with an @ symbol,\n  like name@example.com\n</p>",
      note: html("A real label, the right input type (brings up an email keyboard on mobile), and an error that tells you exactly what a valid answer looks like."),
    },
    bad: {
      label: "Bad",
      code: "<input type=\"text\" placeholder=\"Email\">\n<p>Invalid input</p>",
      note: html("The label disappears once you start typing, the input type doesn't help mobile keyboards, and \"Invalid input\" gives no clue what was wrong or how to fix it."),
    },
  },
  mistakes: [
    { name: "Placeholder text used as the only label", body: html("It vanishes the moment someone starts typing, so if they get interrupted or scroll back up, the field's purpose is gone. Use a persistent, visible label.") },
    { name: "Vague error messages", body: html("\"Invalid input\" or \"Something went wrong\" forces the reader to guess. Say what's wrong (\"Password needs at least 8 characters\") and, ideally, how to fix it.") },
    { name: "Validating only on submit", body: html("Waiting until the whole form is submitted to reveal an error made three fields ago means the reader has to scroll back and re-find their mistake. Validate a field once the reader has finished with it, not only at the very end.") },
    { name: "Asking for information the task doesn't need", body: html("Every extra field is another chance to abandon the form. If a field's answer isn't used anywhere, remove it.") },
    { name: "Wrong input type or keyboard", body: html("A phone number field using <code>type=\"text\"</code> brings up a full alphabetic keyboard on mobile instead of a numeric one — a small thing that adds friction to every single user on a phone.") },
  ],
  checklist: [
    html("Every field has a persistent, visible <code>&lt;label&gt;</code> — not just a placeholder."),
    html("Error messages state the specific problem and, where possible, the fix."),
    html("Fields validate as the reader finishes each one, not only on final submit."),
    html("Input types match the data (<code>email</code>, <code>tel</code>, <code>number</code>) so mobile keyboards adapt."),
    html("Every field's purpose could be explained in one sentence — if it can't, it's cut."),
    html("Required fields are marked clearly, not implied."),
  ],
  practiceCourseId: "forms-inputs",
  goDeeper: [
    { lead: "Autocomplete attributes", body: html("<code>autocomplete=\"email\"</code>, <code>autocomplete=\"name\"</code>, <code>autocomplete=\"street-address\"</code>, and similar values let the browser fill known fields automatically, which measurably speeds up form completion and reduces typos.") },
    { lead: "Associating errors with fields for screen readers", body: html("pairing <code>aria-describedby</code> on the input with the error message's <code>id</code> means a screen reader announces the error when the field receives focus, not only when it's visually near the input.") },
    { lead: "Multi-step forms", body: html("breaking a long form into steps can reduce the perceived effort, but only if progress is visible (a step indicator) and answers are preserved when someone goes back — an invisible multi-step flow just adds extra clicks without the psychological benefit.") },
  ],
  datePublished: "2026-07-23",
};
