---
name: dark-pattern-audit
description: Audits UI flows and copy for dark patterns — manipulative design that tricks someone into an action they wouldn't choose if it were presented plainly. Use when a user asks for an ethics review, a dark-pattern check, or "is this manipulative" question about a signup flow, cancellation flow, pricing page, or consent dialog.
---

# Dark Pattern Audit

Full explanation and the underlying rule: <https://aahplexx.github.io/design-principles/principles/dark-patterns-ethics.html> — this skill turns that page's checklist into a flow-by-flow audit procedure.

Read the actual flow (the real markup, copy, and sequence of screens — not a summary of it) and check it against the test and patterns below. Every finding needs the specific screen or element it occurs on and a concrete fix; a finding without a fix is not useful.

## The test to apply first

For every screen, ask: if you explained this interaction plainly to the person going through it, would they feel tricked by what you described? If yes, it's a dark pattern regardless of whether it's common practice elsewhere.

## What to check, in priority order

1. **Pre-checked opt-ins.** Search for `checked` on any checkbox tied to marketing email, data sharing, upsells, or add-ons. Anything not strictly required to use the product must default to unchecked.

2. **Confirmshaming.** Read the decline/no-thanks option's exact wording. Flag anything that guilts or shames the reader for declining ("No thanks, I don't want to save money") instead of stating the choice neutrally ("No thanks").

3. **Roach motel (easy in, hard out).** Compare the number of steps to sign up against the number of steps to cancel or unsubscribe. Flag any cancellation flow that requires more steps, a phone call, or a hidden menu when signup was a single click or form.

4. **Fabricated urgency or scarcity.** Look for countdown timers, "X left in stock," or "N people viewing this" — check whether the value is real (tied to actual inventory or a real deadline) or resets/regenerates on refresh. Flag anything that can't be verified as real.

5. **Drip pricing.** Trace the checkout flow for when mandatory fees (shipping, service charges, taxes) are first shown. Flag any mandatory cost revealed only at the final step, after the reader has already invested time selecting items.

6. **Forced continuity.** Check whether a free trial or introductory offer clearly states the date and amount of the first charge, and whether canceling before that date is straightforward. Flag any flow that de-emphasizes the conversion-to-paid moment.

7. **Misdirection.** Check visual weight between the action that benefits the business (highlighted, larger, brighter) and the action that benefits the user (dim, small, hidden as a text link) when both are legitimate, equally-weighted choices — such as "Accept all" vs. "Reject all" cookie consent.

## Output format

Group findings by pattern type (from the list above). For each: the specific screen/element, the exact copy or code that trips the test, and the concrete fix (the specific wording or code change, not a general recommendation). Close with a short list of what already passes the test, so the audit isn't only negative.
