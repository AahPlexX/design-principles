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
  definition: html("Microcopy is the small pieces of text throughout an interface — button labels, error messages, empty states, confirmation dialogs — that guide someone through using it, as distinct from the main body content they came to read. \"Content,\" in this page's title, means exactly that: the words a product itself writes, not the broader discipline of content strategy."),
  whyItMatters: [
    html("Picture someone checking out with a card that's actually fine, and the payment fails anyway because they mistyped a digit. The page shows \"Error: transaction failed. Please try again.\" That sentence doesn't say which field was wrong, whether the card was charged, or whether trying again risks a second charge. So they hesitate, retype the whole form out of caution, and if it fails a second time, they close the tab and buy from a competitor instead. Nothing about the product was broken — the checkout worked, the payment logic worked — but the one sentence standing between a mistake and a fix didn't do its job, and that's what the shopper actually experienced as \"broken.\""),
    html("That scene is closer to the norm than the exception. Usability research on checkout forms has found that the overwhelming majority of e-commerce sites reuse the same generic message — \"invalid input,\" \"something went wrong\" — for every kind of validation failure, regardless of what actually went wrong, while only a small fraction tell the reader which specific rule their input broke. In the same testing, generic messages were the versions that left people stuck with no way forward, while messages naming the exact problem let the same people fix it and move on in seconds. The words themselves were the entire difference between a completed order and an abandoned one — no code changed, only the sentence did."),
    html("Microcopy also carries more weight per word than body copy does, because of how people actually read on screens. Eye-tracking research is consistent that people scan web pages rather than read them start to finish — on a typical page, someone has time to read only a fifth to a quarter of the words before they move on. A button label, an error, or a confirmation dialog is different: it sits directly in the path of a decision the reader is about to make, so it's disproportionately likely to be one of the few things actually read on the entire screen. Getting three words right on a \"Delete\" button matters more than getting three hundred words right in a paragraph nobody will finish."),
  ],
  coreRule: [
    html("Write every piece of microcopy from the reader's next action, not the system's internal state: say what will happen if they click something, not what the system is technically doing behind the scenes. For anything destructive or hard to reverse, name the specific thing being affected in the confirmation — not a generic \"Are you sure?\" — because a specific sentence takes the same half-second to read and leaves no room to misunderstand what's about to happen."),
  ],
  examples: [
    {
      context: "A form's submit button",
      good: {
        label: "Good",
        code: "<button>Create account</button>",
        note: html("Names the actual result of clicking — the reader knows exactly what happens next without needing to infer it from the surrounding form."),
      },
      bad: {
        label: "Bad",
        code: "<button>Submit</button>",
        note: html("\"Submit\" describes the mechanical act of clicking, not what it does. It works on every form on earth, which is exactly the problem — it says nothing specific about this one."),
      },
    },
    {
      context: "An error after a failed action",
      good: {
        label: "Good",
        code: "<p role=\"alert\">\n  Card declined. Check the expiration date and try again.\n</p>",
        note: html("Names the likely cause and the fix in one sentence, so the reader has an actual next step instead of a reason to worry and retry blindly."),
      },
      bad: {
        label: "Bad",
        code: "<p role=\"alert\">\n  Something went wrong. Please try again.\n</p>",
        note: html("The reader can't tell if the card was charged, if the input was wrong, or if the site is down — \"try again\" is the only instruction, and it might make things worse."),
      },
    },
    {
      context: "Confirming a destructive action",
      good: {
        label: "Good",
        code: "<h2>Delete \"Q3 Report.pdf\"?</h2>\n<p>This can't be undone.</p>\n<button>Delete file</button>\n<button>Cancel</button>",
        note: html("Names the exact file, states the consequence plainly, and the confirm button repeats the specific action instead of a generic \"Yes\" — there's no ambiguity about what's about to happen."),
      },
      bad: {
        label: "Bad",
        code: "<h2>Are you sure?</h2>\n<button>Yes</button>\n<button>No</button>",
        note: html("\"Are you sure?\" doesn't say what it's confirming, and \"Yes\" requires the reader to remember what they just clicked rather than reading the confirmation itself."),
      },
    },
    {
      context: "A search with zero results",
      good: {
        label: "Good",
        code: "<p>No results for “blue jacket.” Try removing a filter or using a broader term.</p>",
        note: html("States why the page is empty and gives a concrete way to fix it, so the reader has something to try instead of a dead end."),
      },
      bad: {
        label: "Bad",
        code: "<p>No results found.</p>",
        note: html("Accurately reports the state and helps with nothing — the reader is left to guess whether to change their search, remove a filter, or give up."),
      },
    },
  ],
  mistakes: [
    { name: "Generic labels that don't name the outcome", body: html("\"Submit,\" \"OK,\" and \"Click here\" tell the reader nothing about what happens next — a label should describe the outcome (\"Send message,\" \"Save changes\") instead of the mechanical act of clicking.") },
    { name: "One error message reused for every kind of failure", body: html("Showing the same \"Invalid input\" or \"Something went wrong\" regardless of what actually broke is the default on most sites, and it's the version that leaves people stuck with no way to recover. Naming the specific rule that failed — and what to do about it — is what actually gets someone unstuck.") },
    { name: "Raw error codes or backend jargon shown to the reader", body: html("\"Error 400: Bad Request\" is meaningful to a developer and meaningless to almost everyone else — it needs a plain-language translation of what went wrong and what to do next, with the technical code kept in the console or a details link, not the headline.") },
    { name: "Empty states with no next step", body: html("\"No data\" or \"Nothing here yet\" explains the current state but not what to do about it. A good empty state says why it's empty and what action would change that.") },
    { name: "Vague confirmations for destructive actions", body: html("\"Are you sure?\" with generic Yes/No buttons is easy to click through without registering what's actually being confirmed. Name the action in both the message and the button.") },
    { name: "Inconsistent terminology for the same concept", body: html("Calling the same thing \"account\" in one screen, \"profile\" in another, and \"membership\" in a third forces the reader to work out whether these are the same thing or something different.") },
  ],
  checklist: [
    html("Button and link labels describe the specific result, not a generic verb."),
    html("Error messages name what specifically went wrong, not one generic message reused everywhere."),
    html("Error messages avoid raw codes and backend jargon, and say what to do next."),
    html("Empty states explain why they're empty and suggest a next action."),
    html("Destructive-action confirmations name the specific thing being affected, in both the message and the button label."),
    html("The same concept is called the same thing everywhere in the product."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Voice vs. tone", body: html("Voice is a product's consistent personality (formal, playful, matter-of-fact) and stays the same no matter what; tone is how that personality adapts to a given moment. The same voice can sound reassuring in an error message and celebratory in a success message without becoming a different voice — tone shifts with context, voice doesn't.") },
    { lead: "Adaptive error messages", body: html("Most sites write one message per field and show it for every way that field can fail — \"invalid phone number\" whether a digit is missing, a letter snuck in, or the area code is wrong. An adaptive error message changes based on which specific rule was broken, so the text itself tells the reader which of those three happened. It takes more upfront writing and validation logic than a single fallback string, which is why so few products bother, but it's the difference between a reader fixing the problem in one try and guessing at it three times.") },
    { lead: "Front-loading the important word", body: html("\"Delete file\" front-loads the consequential word; \"File will be deleted\" buries it at the end. Because a reader scanning a UI catches the first word of a label far more reliably than the last, the word that matters most should be the one they hit first, not the one they hit if they keep reading.") },
    { lead: "Localization changes length, not just words", body: html("Microcopy that fits tightly in English can run noticeably longer once translated — short German UI labels commonly run 30-50% longer than the English source, in part because it strings compound nouns together into single long words, and other European languages typically add somewhere in the range of 15-25%. Design the layout to absorb that growth (wrap, don't truncate) rather than writing copy that only fits at exactly its original English length.") },
    { lead: "Checking readability without guessing", body: html("A Flesch reading-ease score — a formula that scores text from 0 to 100 using average sentence length and average syllables per word, where a higher number means easier to read — gives a concrete number instead of a gut feeling about whether copy is simple enough. Without any tooling, reading the copy aloud and noting exactly where you stumble or run out of breath catches most of the same problems a formula would flag.") },
  ],
  datePublished: "2026-07-23",
};
