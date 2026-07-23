# CLAUDE.md — Internal Authoring Constitution

This file governs how anyone — human or AI — writes, edits, or reviews content in this repository. It is infrastructure, not content. Nothing in this file, and no reference to this file or its rules, ever appears on a published page, inside a skill's output, or in a system prompt's user-visible text. If a reader can tell we're "following an anti-slop policy," we have already failed the policy.

## Mission

This repo is the single source of truth (SSOT) for web design principles, methods, and concepts. Every concept has exactly one canonical page. Skills and prompts draw their checklists from that page instead of re-explaining the concept in their own words, so nothing drifts out of sync as the canonical page evolves.

The work takes three exported forms:

1. **The site** (`/docs`) — a browsable reference, published via GitHub Pages.
2. **Skills** (`/skills`) — Claude Code skills that turn a principle into a checklist an agent can run against real work.
3. **Prompts** (`/prompts`) — standalone system prompts that give an LLM the persona and judgment to apply these principles without being reminded.

## Rule Zero (internal only — never surface this on a page, in a skill, or in a prompt's visible text)

Every explanation must be reachable by a reader who has never opened a CSS file, and still respected by one who has shipped design systems for a decade. Concretely:

- **Plain words first.** Define a term in one sentence a non-designer would understand before using its technical name. If a technical term is unavoidable, define it in the same breath you introduce it — never assume prior vocabulary.
- **Decompose, don't summarize.** Break a concept into its smallest true parts rather than compressing it into a denser paragraph. A longer explanation a beginner follows beats a shorter one only an expert can parse.
- **Anti-slop.** No filler ("In today's digital landscape…"), no throat-clearing, no restating the heading as the first sentence, no padding a list to look thorough, no hedging on every claim. Every sentence must earn its place by adding a fact, an example, or a rule. If deleting a sentence loses nothing, delete it.
- **Show, don't just tell.** Prefer a concrete before/after example (code, a color pair, a spacing diagram) over an abstract description. Abstraction follows the example; it doesn't replace it.
- **Progressive depth, one page.** The beginner-legible version lives in the page's main flow. Expert nuance (edge cases, browser quirks, spec citations) goes inside a collapsed `<details>` block at the end, so one page serves both readers without either wading through the other's material.
- **Navigable over clever.** Every principle page follows the same skeleton (below) so a reader's mental model of "where do I find X" never breaks. Structural consistency beats a novel layout that fits one page slightly better.
- **No orphaned jargon in nav, headings, or names.** A menu label, a heading, and a skill or prompt's name must all be understandable out of context, before the reader has read the page behind them.

This is the one rule every other rule in this file exists to serve. If a new rule ever conflicts with Rule Zero, Rule Zero wins.

## Page skeleton (every file in `/docs/principles/*.html`)

1. **One-sentence plain-English definition** — no jargon, no unexpanded acronym.
2. **Why it matters** — the real consequence of getting it wrong, told as a concrete situation, not an abstraction.
3. **The core rule** — the single heuristic to remember, stated as an instruction, not a description.
4. **Good vs. bad example** — concrete and, where possible, visual or runnable, shown side by side.
5. **Common mistakes** — 3–5 specific, named failure modes, not generic warnings.
6. **Quick checklist** — scannable, actionable, checkbox-style.
7. *(optional)* **Go deeper** — a collapsed `<details>` block: edge cases, spec links, browser-support notes, for the reader who wants more than the page's main flow gives.

## Adding a new principle

1. Write the canonical page in `/docs/principles/` following the skeleton above.
2. Add its card to the home page grid (`/docs/index.html`) — title plus the one-sentence definition, nothing more.
3. If the concept has a pass/fail heuristic, add it to (or start) a matching skill in `/skills/`.
4. Never duplicate the page's explanation inside a skill or prompt — link back to the page and extract only the actionable checklist.

## Engineering standards

Every piece of markup, CSS, or code in this repo — the site, a skill, a prompt, a tool in `/scripts` — holds to:

- **Standards-compliant, not clever.** HTML and CSS must match current WHATWG/W3C specs and documented MDN behavior. No deprecated elements or attributes, no browser-specific hacks, no relying on undocumented behavior.
- **YAGNI.** Don't add a page, script, dependency, or abstraction for a need that doesn't exist yet. Build for the concept in front of you, not a hypothetical future one.
- **KISS.** The simplest markup, CSS, or script that correctly does the job wins over a more "capable" one nobody asked for. This is a static reference site — reach for a build step, framework, or dependency only when plain HTML/CSS genuinely can't do it.
- **DRY.** A rule, checklist, or nav list is written once and reused, never hand-duplicated in a way that can drift out of sync — the shared nav block across pages, or a skill linking back to its canonical page instead of restating it, are both this rule in practice.
- **Verify before calling it done.** Run `scripts/verify-site.py` after any change to the site: it checks that internal links resolve, that HTML tags balance, and that every principle page has all the sections the skeleton above requires. A change isn't finished until that check passes clean — this is the repo's substitute for a test suite.

## Tone

Direct, warm, zero condescension, zero hype. Write like a senior designer explaining something to a smart junior colleague over coffee, not like marketing copy or a spec document. Never write "simply" or "just" before an instruction — if it were simple or just, the reader would not need the page.
