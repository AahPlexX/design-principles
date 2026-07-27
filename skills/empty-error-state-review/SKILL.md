---
name: empty-error-state-review
description: Reviews empty states (nothing to show yet) and error states (something went wrong) for whether they explain the situation and give the reader a next step. Use when a user asks to review a loading/empty/error screen, a 404 page, a "no results" state, or asks "what should this show when there's nothing here."
---

# Empty & Error State Review

Full explanation and the underlying rule: <https://aahplexx.github.io/design-principles/principles/empty-error-states.html> — this skill turns that page's checklist into a per-state review procedure.

Read the actual markup or copy for each empty/error state (not a description of it) and check each one against the three-part rule and the mistakes below. Every finding needs the specific state it applies to and a concrete rewrite; a finding without a fix is not useful.

## The three-part rule to check per state

Every empty or error state needs, in the copy or the screen itself:
1. **What happened**, in plain language — no raw error codes or stack traces.
2. **Why**, if that's useful and actually knowable — skip this if there's nothing true to say.
3. **What to do next** — a specific action (a button, a link, a suggestion), not just an acknowledgment of the problem.

Flag any state missing part 1 or part 3 outright — a state with no next step is a dead end, not a review pass.

## What to check, in priority order

1. **Blank-gap empty states.** Search for a container that renders literally nothing (no heading, no text) when its data is empty. Flag it — it reads as a loading glitch, not an intentional state.

2. **Raw technical detail shown to end users.** Search for stack traces, raw HTTP status codes ("Error 400"), or internal exception messages rendered directly in user-facing markup. Flag each one and require a plain-language translation.

3. **Generic errors with no action.** Flag any error text ("Something went wrong," "An error occurred") that has no accompanying retry button, link back, or contact option next to it.

4. **Empty states that don't distinguish situations.** Compare the copy for "you haven't created anything yet" against "no results match your search/filter" wherever both exist in the same product. Flag identical or near-identical wording — the first needs encouragement to start, the second needs a way to loosen the search.

5. **Loading state reused as empty state.** Check whether a skeleton/placeholder visual used for loading is also what's shown once loading finishes with zero results. Flag this — a reader will keep waiting for content that was never coming.

6. **Missing offline state.** For anything that works or partly works offline, check for a distinct "you're offline" state rather than a generic error being shown for connectivity failures.

## Output format

List findings per state (name the screen/component). For each: what's missing from the three-part rule, and the exact rewritten copy or markup that fixes it. Close with a short list of states that already pass, so the review isn't only negative.
