---
name: plain-language-rewrite
description: Rewrites jargon-heavy UI copy, error messages, or documentation into plain language a first-time reader can follow, without dumbing down the underlying meaning. Use when a user asks to simplify copy, remove jargon, make text more readable, or rewrite something for a non-technical audience.
---

# Plain-Language Rewrite

Rewrite the given text so a reader with no prior background can follow it on first read, while keeping every fact it originally contained. This is decomposition, not summarization — the rewrite may be longer than the original if that's what it takes to make each step clear.

## Method

1. **Find every term the reader might not already know.** A term counts as jargon if a smart person outside the field would need to look it up — not just acronyms, but domain words used in a specialized sense ("hydrate," "debounce," "contrast ratio").
2. **Define, don't delete.** Don't just cut a jargon term — either replace it with a plain-language equivalent, or keep the term and define it in the same sentence the first time it appears. If the term is genuinely useful vocabulary (the reader will see it again), teach it; if it's just an accidental piece of internal shorthand, replace it outright.
3. **Break compound sentences into steps.** A sentence doing three things at once ("Because X causes Y, which triggers Z unless W is set, you should...") becomes an ordered list or a sequence of short sentences. One idea per sentence.
4. **Keep every fact, cut every filler word.** The rewrite must not lose information the original had, but should have no sentence that exists only to sound thorough or polite ("Please note that...", "It is important to understand that...").
5. **Check it out loud.** After rewriting, read it as if hearing it for the first time with no context. If any sentence needs the sentence before it re-read to make sense, restructure it — each sentence should build on the last, never require jumping back.
6. **Don't patronize.** Plain language isn't baby language — keep the reader's intelligence intact. The goal is removing unnecessary vocabulary barriers, not removing nuance or talking down.

## Output

Return the rewritten text. If the rewrite meaningfully changes structure (e.g., a paragraph becomes a numbered list), briefly note why in one line — but never include commentary about "following plain-language principles" inside the rewritten text itself; the rewrite should just read plainly, not announce that it does.
