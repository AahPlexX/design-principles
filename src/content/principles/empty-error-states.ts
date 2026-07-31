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
    html("Empty and error states are often the very first thing a new user experiences — a brand-new account with zero data in it, or a search typo that turns up nothing. A blank white screen or a raw stack trace at that exact moment reads as broken, even when the underlying system is working exactly as intended. First impressions formed by an unhandled edge case are just as real as ones formed by the polished happy path."),
  ],
  coreRule: [
    html("Every empty or error state needs three things: what happened, in plain language; why, if that's useful and knowable; and what to do next. A state missing all three isn't a screen, it's a dead end."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<div class=\"empty-state\">\n  <h2>No projects yet</h2>\n  <p>Create your first project\n     to get started.</p>\n  <button>New project</button>\n</div>",
      note: html("Names the situation, and gives the reader something to do about it immediately, without needing to hunt for the right button elsewhere on the page."),
    },
    bad: {
      label: "Bad",
      code: "<div class=\"empty-state\">\n  <p>No data</p>\n</div>",
      note: html("States the fact and stops there — a brand-new user has no idea whether this is expected, broken, or something they need to fix."),
    },
  },
  mistakes: [
    { name: "Rendering nothing at all for an empty state", body: html("A section that collapses to a blank gap with no heading or explanation reads as a loading glitch, not an intentional \"there's nothing here yet.\"") },
    { name: "Generic error text with no next step", body: html("\"Something went wrong\" tells the reader there's a problem without telling them whether to wait, retry, or give up — always pair an error with an action.") },
    { name: "Showing raw technical detail to end users", body: html("A stack trace or a bare HTTP status code is meaningful to a developer and alarming or meaningless to almost everyone else — translate it into plain language before it reaches the reader.") },
    { name: "Treating every empty state the same", body: html("\"You haven't created anything yet\" and \"no results match your filters\" are different situations that need different messages — the first needs encouragement to start, the second needs a way to loosen the search.") },
    { name: "Error states with no way forward", body: html("A failed page load with no retry button, no link back, and no contact option leaves the reader stuck exactly where the error occurred.") },
  ],
  checklist: [
    html("Every empty state explains why it's empty and suggests a next action."),
    html("Error messages use plain language — no raw codes or stack traces shown to users."),
    html("\"Nothing here yet\" and \"nothing matches your filter\" are worded differently."),
    html("Every error state offers a way forward: retry, go back, or get help."),
    html("Empty and error states were actually designed, not left as an unstyled placeholder."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Loading vs. empty", body: html("A skeleton screen (a gray placeholder shaped like the content that's coming) communicates \"this is still loading\"; an empty state communicates \"this finished loading, and there's genuinely nothing here.\" Using the same visual for both makes a reader wait for content that was never coming.") },
    { lead: "404 pages as a design surface", body: html("A broken link is already a moment of friction — a 404 page that offers search, a link home, and possibly the page's likely intended destination turns a dead end back into forward progress.") },
    { lead: "Offline states", body: html("For anything that works (or partly works) offline, a distinct \"you're offline\" state — separate from a generic error — sets the right expectation and can point to what's still available without a connection.") },
  ],
  datePublished: "2026-07-27",
};
