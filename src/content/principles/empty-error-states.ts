// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const emptyErrorStates: Principle = {
  slug: "empty-error-states",
  title: "Empty & Error States",
  category: "Task-Specific",
  blurb: "Designing what a reader sees when there's nothing to show yet, or when something has gone wrong.",
  searchKeywords: "empty error states designing what a reader sees when there's nothing to show yet or when something has gone wrong",
  definition: html("An empty state is what a reader sees when there's genuinely nothing to show yet — an inbox with no messages, a search with no matches. An error state is what they see when something has gone wrong. Both are real screens that need real design, not a blank gap left over after the \"actual\" design was finished."),
  whyItMatters: [
    html("A shopper on a furniture site searches for \"wallnut desk\" — one letter off from \"walnut\" — and the results page comes back blank: no heading, no suggestion, no sign that six walnut desks exist under the correct spelling. The page did exactly what it was told, returning zero matches and rendering nothing beyond that. To the shopper, though, it looks like the store carries no desks at all, and they leave for a competitor's site rather than trying the search again."),
    html("This moment — the search that turns up nothing, the brand-new account with an empty dashboard, the checkout that fails on the last step — is not a rare corner of a product. For a meaningful share of visitors, one of these is the very first real screen they see, before the \"actual\" product has had any chance to prove itself. A first-time visitor who mistypes a search, or opens an account before adding anything to it, forms an opinion of the whole product from that one blank or broken screen, not from the polished pages three clicks deeper that they may never reach."),
    html("The cost of getting this wrong rarely shows up as a support ticket, because a blank screen gives the reader nothing to complain about — it looks intentional, so they assume the product has nothing for them and move on. A 404 with no path forward reads as though the whole site is down, not one broken link. A form error with no named field turns a thirty-second fix into a guessing game the reader may not finish. None of this registers as a dramatic failure in an analytics dashboard; it surfaces as a shopper who never returns, a sign-up funnel that quietly leaks at one particular step, or a support inbox full of \"your website is broken\" messages describing a page that was, in fact, doing exactly what it was coded to do."),
  ],
  coreRule: [
    html("Every empty or error state needs three things, in this order: <strong>what happened</strong>, stated in plain language a reader with no technical background would recognize; <strong>why</strong> it happened, when the reason is both true and useful to share; and <strong>what to do next</strong> — one specific action, not a vague acknowledgment. Leave out the last part and the reader is stopped with nowhere to go; leave out the first and they don't know whether to keep reading. A state missing any of the three isn't a screen — it's a dead end with different words on it."),
  ],
  examples: [
    {
      context: "A brand-new list with nothing in it yet",
      good: {
        label: "Good — names it and gives a next step",
        code: "<div class=\"empty-state\">\n  <h2>No projects yet</h2>\n  <p>Create your first project to\n     get started.</p>\n  <button>New project</button>\n</div>",
        note: html("Tells a brand-new user this is expected, not broken, and puts the one action that matters — creating a project — right where their eyes already are."),
      },
      bad: {
        label: "Bad — states a fact and stops",
        code: "<div class=\"empty-state\">\n  <p>No data</p>\n</div>",
        note: html("A first-time user has no way to tell whether this is normal, whether something failed to load, or whether they're missing a step — \"no data\" describes the screen instead of telling the reader what to do about it."),
      },
    },
    {
      context: "Zero results after a search or filter",
      good: {
        label: "Good — repeats the query, offers a way out",
        code: "<div class=\"empty-state\">\n  <h2>No results for \"wallnut desk\"</h2>\n  <p>Check the spelling, or\n     <button>clear your search</button>.</p>\n</div>",
        note: html("Echoing the exact search term back makes a typo visible at a glance, and the \"clear search\" option gives the reader a way out of a dead-end filtered view without having to hunt for it themselves."),
      },
      bad: {
        label: "Bad — identical to \"nothing exists yet\"",
        code: "<div class=\"empty-state\">\n  <p>No results found.</p>\n</div>",
        note: html("Uses the same wording as a brand-new, never-populated list, so the reader can't tell whether the product has nothing at all or their own search term is the problem — and there's no control to undo the search."),
      },
    },
    {
      context: "A broken or outdated link (404)",
      good: {
        label: "Good — two ways forward",
        code: "<main>\n  <h1>We can't find that page</h1>\n  <p>It may have moved, or the link\n     might be out of date.</p>\n  <a href=\"/\">Back to homepage</a>\n  <input type=\"search\"\n         placeholder=\"Search the site\" />\n</main>",
        note: html("Names what likely happened, then offers two different routes forward — home, or a search for whatever the reader was actually looking for — instead of leaving them stranded on a dead link."),
      },
      bad: {
        label: "Bad — a wall with no doors",
        code: "<main>\n  <h1>404 Not Found</h1>\n</main>",
        note: html("Confirms the page is broken and stops there. The reader's only options are the browser's back button or retyping the URL from memory, neither of which the page suggested."),
      },
    },
    {
      context: "A failed form submission",
      good: {
        label: "Good — names the field and the fix",
        code: "<label for=\"email\">Email</label>\n<input id=\"email\" aria-invalid=\"true\"\n       aria-describedby=\"email-err\" />\n<p id=\"email-err\" class=\"error\">\n  Enter an email with an @, like\n  name@example.com\n</p>",
        note: html("Points at the exact field, states what's wrong with it, and shows what a correct value looks like, so the reader can fix it in one pass instead of re-reading the whole form."),
      },
      bad: {
        label: "Bad — a banner with no field named",
        code: "<div class=\"banner error\">\n  Form submission failed. Please\n  check your input and try again.\n</div>",
        note: html("Doesn't say which of the form's fields failed or why, so a form with ten fields becomes ten fields the reader has to re-check by hand to find the one that's wrong."),
      },
    },
  ],
  mistakes: [
    { name: "Rendering nothing at all for an empty state", body: html("A section that collapses to a blank gap with no heading, no explanation, and no button reads as a loading glitch or a broken layout, not an intentional \"there's nothing here yet.\" The brand-new-list example above shows the smallest version of what a genuine first-run screen needs.") },
    { name: "Error text generic enough to fit any failure", body: html("\"Something went wrong\" or \"please check your input and try again\" sounds like guidance, but on a form with several fields it leaves the reader re-checking every one to find the one that's wrong. The failed-form example above shows the fix: name the exact field, and the reader corrects it in one pass instead of guessing.") },
    { name: "Showing raw technical detail to end users", body: html("A stack trace or a bare HTTP status code is meaningful to a developer and alarming or meaningless to almost everyone else. Translate it into plain language before it reaches the reader, and log the technical detail somewhere a developer can still find it if the real cause needs debugging.") },
    { name: "Treating every empty state as the same message", body: html("\"You haven't created anything yet\" and \"no results match your search\" are different situations that call for different messages — the first needs encouragement to start from zero, the second needs a way to loosen or clear the search. The two empty-state examples above share a layout but say something different, because the reader is in a different situation.") },
    { name: "Error states with no way forward", body: html("A failed page load with no retry button, no link back, and no contact option leaves the reader stuck exactly where the error occurred. The 404 example above shows how little it takes to turn a dead end back into forward progress.") },
    { name: "Guessing at a cause instead of stating a known one", body: html("An error message that names a specific cause the system never actually confirmed — blaming \"your session expired\" when the real fault was a server error — sends the reader down the wrong fix (they'll log in again, which won't help). When the real cause isn't known, state only what's certain: that something failed, and what to try next.") },
  ],
  checklist: [
    html("Every empty state names the reason it's empty and gives one specific next action, not a link to \"learn more.\""),
    html("\"Nothing created yet\" and \"no results for your search or filters\" are worded and designed differently, not the same message reused."),
    html("Error messages use plain language — no raw status codes or stack traces shown to end users."),
    html("Every error names the specific field or step where it happened, not a generic \"try again.\""),
    html("A stated cause for an error is a fact the system confirmed, not a guess — leave it out entirely rather than state one that isn't verified."),
    html("404 and other dead-end pages offer at least one way forward: a link home, a search box, or the page's likely intended destination."),
    html("Loading, empty, and error states are visually distinct from each other, not the same placeholder reused for all three."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Loading vs. empty", body: html("A skeleton screen — a gray placeholder shaped like the content that's coming — communicates \"this is still loading\"; an empty state communicates \"this finished loading, and there's genuinely nothing here.\" Using the same visual for both makes a reader wait for content that was never coming, and can bury an empty state's next-step button under a spinner that never resolves.") },
    { lead: "404 pages as a design surface", body: html("A broken link is already a moment of friction. Treating the resulting page as a real design surface — offering search, a link home, and where possible the page's likely intended destination — turns that dead end back into forward progress instead of confirming that the site is broken.") },
    { lead: "Offline states", body: html("For anything that works, even partly, without a network connection, a distinct \"you're offline\" state — separate from a generic error — sets the right expectation and can point to what's still usable without one, instead of implying the whole product has failed.") },
    { lead: "Error summaries for long forms", body: html("On a short form, an inline message under each field is enough. On a long one — a multi-page checkout, a government form with dozens of fields — scrolling back up to recheck each field adds real friction, which is why many long forms pair inline messages at each field with a summary list at the top of the page, each item linking straight down to the field it describes. Short forms rarely need this; the pattern earns its complexity only once a form is long enough that a reader can lose track of which fields still need fixing.") },
  ],
  datePublished: "2026-07-27",
};
