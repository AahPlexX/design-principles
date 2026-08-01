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
    html("Picture someone filling out a checkout form on their phone during a lunch break: they type their card number, tap submit, and the page reloads with a red asterisk next to a field near the top — no message, no indication of which of the six fields on the page it belongs to. They scroll up, guess, retype the same digits, and get the same red mark back. After the second failed guess, they close the tab and buy the item from a competitor instead, or abandon the purchase entirely. Nothing about the product changed and the price didn't move — the only thing standing between them and paying was a form that couldn't say what it wanted."),
    html("That failure repeats at every task a form exists to do: signing up, checking out, filling in a contact page, applying for a job, booking an appointment. A form is the one part of a page where the reader has to do something instead of reading, and doing something is where confusion turns into abandonment. A form problem doesn't register as a form problem to the person hitting it — it registers as \"this site is broken\" or \"I did something wrong,\" and either way, the response is the same: leave, rather than debug someone else's interface."),
    html("The stakes are highest for anyone using a screen reader, a switch device (an assistive input — a single button or a small set of buttons — that lets someone with limited mobility select on-screen options by scanning, instead of a mouse or touchscreen), or voice control, because a form asks those tools to do their most interpretive work on the page. A screen reader user tabbing to a field hears whatever is programmatically tied to it — if that's a placeholder that vanished on focus, or nothing at all, they're filling in a box with no idea what it wants from them. Someone with a motor impairment who wants to type as little as possible, or someone who relies on autofill to avoid re-entering the same information on every site, depends on the same handful of form conventions everyone else benefits from without noticing: a real label, a specific error, an input that asks the browser for the right kind of help."),
  ],
  coreRule: [
    html("Every field needs three things before it's finished: a label that stays visible the whole time (not a placeholder that vanishes the moment someone starts typing), an error message that names the specific problem and, where possible, the fix — shown as soon as the reader leaves that field, not held back until they hit submit — and a reason for existing that you could state in one sentence. If you can't state that reason, delete the field: every field left on the page is a place someone can get stuck or give up."),
    html("Accept the way people actually type real-world data — spaces, dashes, or parentheses in a phone number — and normalize it yourself rather than rejecting anything that doesn't match one exact pattern. This is Postel's Law applied to a form: be liberal in what you accept from the reader, and conservative — consistent, predictable — in what you show and send back."),
  ],
  examples: [
    {
      context: "A required email field",
      good: {
        label: "Good",
        code: "<label for=\"email\">Email</label>\n<input\n  id=\"email\"\n  type=\"email\"\n  autocomplete=\"email\"\n  required\n>",
        note: html("A label that stays on screen after typing starts, <code>type=\"email\"</code> for the right mobile keyboard, and <code>autocomplete=\"email\"</code> so a returning visitor's browser can fill it in with one tap."),
      },
      bad: {
        label: "Bad",
        code: "<input type=\"text\" placeholder=\"Email\">",
        note: html("The placeholder is the only label there is. It disappears the instant someone types a single character, so anyone who gets interrupted, or scrolls back up to double check, has no way to see what this field was asking for."),
      },
    },
    {
      context: "The error after a failed submit",
      good: {
        label: "Good",
        code: "<label for=\"password\">Password</label>\n<input\n  id=\"password\"\n  type=\"password\"\n  aria-describedby=\"password-err\"\n  aria-invalid=\"true\"\n>\n<p id=\"password-err\" role=\"alert\">\n  Password needs at least 8 characters\n  and one number.\n</p>",
        note: html("Names the exact rule that failed, so the reader knows what to change without guessing. <code>aria-invalid=\"true\"</code> tells assistive technology the field currently fails validation, and <code>aria-describedby</code> ties the message to the field, so a screen reader announces it as soon as the input gets focus, not only if it happens to be read next."),
      },
      bad: {
        label: "Bad",
        code: "<input id=\"password\" type=\"password\">\n<p class=\"error\">Invalid input</p>",
        note: html("\"Invalid input\" doesn't say which rule — length, a number, a symbol — was the one that failed, and nothing in the markup connects this paragraph to the field it's about, so a screen reader user may never hear it at all."),
      },
    },
    {
      context: "When validation errors appear",
      good: {
        label: "Good — checked as the reader leaves the field",
        code: "emailInput.addEventListener(\"blur\", () => {\n  if (!emailInput.validity.valid) {\n    showError(emailInput, \"Enter an email with an @, like name@example.com\");\n  }\n});",
        note: html("Catches the mistake while the reader is still thinking about that field, one at a time, instead of saving every error up for the end."),
      },
      bad: {
        label: "Bad — checked only on submit",
        code: "form.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  validateAllFields(); // every error surfaces at once, here\n});",
        note: html("Someone who filled out a ten-field form correctly except for field two doesn't find out until after finishing the other eight — then has to scroll back to find the one that's wrong."),
      },
    },
    {
      context: "A card or PIN number field",
      good: {
        label: "Good",
        code: "<label for=\"card\">Card number</label>\n<input\n  id=\"card\"\n  type=\"text\"\n  inputmode=\"numeric\"\n  autocomplete=\"cc-number\"\n>",
        note: html("<code>inputmode=\"numeric\"</code> brings up a number pad on mobile without the side effects of <code>type=\"number\"</code> — no spin-button arrows, and no accidental change from a stray scroll while the field has focus."),
      },
      bad: {
        label: "Bad",
        code: "<label for=\"card\">Card number</label>\n<input id=\"card\" type=\"number\">",
        note: html("<code>type=\"number\"</code> treats a card number as an actual number: it adds spin-button arrows that mean nothing here, and scrolling the page while the field is focused can silently change a digit in some engines."),
      },
    },
    {
      context: "A file upload",
      good: {
        label: "Good — limits stated up front, feedback once a file is picked",
        code: "<label for=\"resume\">Resume (PDF, max 5MB)</label>\n<div class=\"dropzone\">\n  <input id=\"resume\" type=\"file\" accept=\".pdf\">\n  <p>Drag a file here, or click to browse.</p>\n</div>\n<!-- once a file is chosen: -->\n<p>resume.pdf — 1.2MB\n  <progress value=\"70\" max=\"100\"></progress>\n</p>",
        note: html("States the accepted format and the size limit before the reader picks anything, and once a file is chosen, shows its name, size, and upload progress — nothing here depends on the reader guessing what happened after they click."),
      },
      bad: {
        label: "Bad — the limit only appears after a slow rejection",
        code: "<input type=\"file\">",
        note: html("Gives no hint anywhere on the page about accepted formats or a size limit, so the reader finds out only after choosing a large file, waiting for it to upload, and getting rejected for a rule they were never told about."),
      },
    },
  ],
  mistakes: [
    { name: "Placeholder text used as the only label", body: html("It vanishes the instant someone types a single character, so anyone who gets interrupted, whose browser autofills something unexpected, or who scrolls back up to check has no way to see what the field was for. Use a persistent, visible label element instead — a placeholder can supplement it with a format hint, never replace it.") },
    { name: "Vague error messages", body: html("\"Invalid input\" or \"Something went wrong\" tells the reader an error exists without telling them what it is, so they're left guessing at rules they can't see. Name the specific rule that failed (\"Password needs at least 8 characters\") and, where you can, the fix.") },
    { name: "Validating only on submit", body: html("Holding every error until the reader clicks submit means a mistake in field two surfaces only after they've filled in fields three through ten — and now they have to scroll back to find it. Validate a field once the reader has finished with it, on blur, and keep the full-form check at submission as a backstop, not the only check.") },
    { name: "Asking for information the task doesn't use", body: html("Every extra field is one more decision, one more chance to stall, and one more reason to abandon the form entirely. If nothing downstream reads a field's answer, the field doesn't belong on the page.") },
    { name: "Input type that doesn't match the data", body: html("A phone number field left as <code>type=\"text\"</code> brings up a full alphabetic keyboard on a phone instead of a numeric one; a quantity field set to <code>type=\"number\"</code> adds spin-button arrows nobody asked for and lets an accidental scroll change the value while the field is focused. Match the type, or <code>inputmode</code>, to what's actually being typed.") },
    { name: "Turning autocomplete off to tidy up the markup", body: html("<code>autocomplete=\"off\"</code> on a login or address field mostly doesn't do what it's set to do — most browsers ignore it on those fields and offer to save the password anyway, because they've decided remembering login details matters more than a site's preference. What it does reliably do is remove the autofill that readers with motor or cognitive disabilities depend on to avoid retyping the same information on every form they meet. Leave it on, and set specific values (<code>email</code>, <code>given-name</code>, <code>street-address</code>) so the browser fills the right field with the right thing.") },
  ],
  checklist: [
    html("Every field has a persistent, visible <code>&lt;label&gt;</code> — not a placeholder standing in for one."),
    html("Error messages name the specific problem and, where possible, the fix, instead of settling for \"invalid.\""),
    html("Errors are tied to their field with <code>aria-describedby</code> so a screen reader announces them."),
    html("Fields validate as the reader finishes each one, not only on final submit."),
    html("Input types and <code>inputmode</code> match the data (<code>email</code>, <code>tel</code>, <code>inputmode=\"numeric\"</code>) so mobile keyboards adapt."),
    html("<code>autocomplete</code> is set to a specific value for common fields (<code>email</code>, <code>name</code>, <code>street-address</code>) rather than switched off."),
    html("Every field's purpose could be explained in one sentence — if it can't, it's cut."),
    html("Required fields are marked in a way everyone can perceive — pair a red asterisk or color with the word \"required\" in the label (or an <code>aria-required</code> attribute), since color and a lone asterisk both fail for colorblind readers and screen-reader users who can't see either."),
    html("Format requirements (a password's rules, a username's allowed characters) are shown before a field is touched, so the reader avoids a mistake instead of only being told about one after making it."),
    html("Auto-formatting input (adding dashes to a phone number, spacing a card number) never fights what the reader is actively typing — the cursor doesn't jump, and a pasted value isn't broken by the mask."),
    html("A CAPTCHA or other bot check offers a non-visual path — an audio alternative, or a behavior-based check that needs no puzzle at all — instead of relying only on distorted text or image grids that exclude screen-reader and low-vision readers."),
  ],
  practiceCourseId: "forms-inputs",
  goDeeper: [
    { lead: "The full autocomplete vocabulary", body: html("<code>autocomplete</code> recognizes dozens of specific values beyond <code>email</code> and <code>name</code> — <code>given-name</code>, <code>family-name</code>, <code>street-address</code>, <code>postal-code</code>, <code>tel</code>, <code>cc-number</code>, <code>new-password</code>, <code>current-password</code>, and <code>one-time-code</code> for an SMS or authenticator code, among others. A form with two addresses (shipping and billing) can tell the browser which is which by adding a <code>shipping</code> or <code>billing</code> prefix, or a custom <code>section-*</code> token when it has more than one of the same kind. This is also the mechanism behind WCAG's Identify Input Purpose criterion (1.3.5, Level AA), which exists specifically so assistive technology and browser autofill can recognize what a field is asking for even when its visible label is unconventional.") },
    { lead: "role=\"alert\" is assertive — use it deliberately", body: html("<code>role=\"alert\"</code> is equivalent to <code>aria-live=\"assertive\"</code>: it interrupts whatever a screen reader is currently announcing to speak immediately. That's the right behavior for an error that appears once, when a field loses focus — but wiring it to something that updates on every keystroke means it re-interrupts on every keystroke too, which is disorienting rather than helpful. For real-time-as-you-type feedback, a quieter <code>aria-live=\"polite\"</code> region, or no live region at all beyond <code>aria-describedby</code>, is the better default.") },
    { lead: "Multi-step forms", body: html("Breaking a long form into steps can reduce how effortful it feels — but only under two conditions. First, progress has to be visible: a step indicator naming how many steps remain (\"Step 2 of 4\"), not a bare form with no sense of how much is left. Second, answers already given have to survive the reader clicking back to check or fix an earlier step — re-asking a question they already answered undoes the entire point of splitting the form up. An invisible multi-step flow adds extra clicks without the psychological benefit, and one that discards answers on back is worse than a single long page.") },
    { lead: "When blur validation backfires: confirmation fields", body: html("Validating on blur assumes leaving a field means the reader is finished with it, which isn't true for a password-confirmation field: tabbing away to glance back at the first password fires a false \"doesn't match\" error on the confirmation field before the reader has finished retyping it. Validate a confirmation field only once both it and the original have content, not on a blind blur.") },
    { lead: "Why <code>&lt;input type=\"number\"&gt;</code> keeps causing trouble", body: html("Browsers give <code>&lt;input type=\"number\"&gt;</code> an implicit spin-button role, and by default a mouse wheel or trackpad scroll over a focused number field silently changes its value with no visual confirmation — a real risk for a field like a donation amount or a quantity. Browser vendors have been walking this back — Firefox and other engines have shipped changes to stop scroll from changing the value by default — but behavior still isn't consistent everywhere, so don't design around it being fixed. For anything numeric that isn't meant to be incremented with arrows, such as a PIN, a card number, or a year, <code>type=\"text\"</code> with <code>inputmode=\"numeric\"</code> is the more predictable choice.") },
  ],
  datePublished: "2026-07-23",
};
