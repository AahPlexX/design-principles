# Contributing

Thanks for adding to this. Here's how the pieces fit together.

## Adding a new principle page

1. Copy the shape of an existing page in `docs/principles/` — every page has the same six sections: a one-sentence definition, why it matters, the core rule, a good/bad example, common mistakes, and a checklist.
2. Write for two readers at once: someone who has never touched CSS, and someone who has been doing this for ten years. Explain the term in plain words before you name it. Put expert-only detail (edge cases, browser quirks, spec links) inside a collapsed "Go deeper" section at the end, not the main flow.
3. Cut anything that doesn't teach something. No filler sentences, no restating the heading, no padding a list to look thorough.
4. Add a card for the new page to the grid on `docs/index.html`: a title and the same one-sentence definition, nothing more.
5. Add the page to the shared nav `<ul>` in every existing HTML file, in the same position, so the nav stays identical across pages.
6. Run `python3 scripts/verify-site.py` before committing. It checks that HTML tags balance, that every internal link resolves to a real file, and that every principle page has all six required sections — a change isn't done until it passes clean.

## Adding a skill

A skill in `/skills` should turn a principle's checklist into something an agent can actually run — not restate the page's explanation. Link back to the relevant page(s) on the site instead of re-explaining the concept.

## Adding a prompt

A prompt in `/prompts` is a persona, not a lesson. It should give the model judgment and a checklist to apply, in plain instructions — not a copy of a principle page's prose.

## Style

See [`CLAUDE.md`](./CLAUDE.md) for the full writing standard this repo holds itself to. The short version: plain words first, one idea per sentence, show a real example before you generalize, and never make the reader feel behind for not already knowing the jargon.
