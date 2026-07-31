# CLAUDE.md — Internal Authoring Constitution

This file governs how anyone — human or AI — writes, edits, or reviews content in this repository. It is infrastructure, not content. Nothing in this file, and no reference to this file or its rules, ever appears on a published page, inside a skill's output, or in a system prompt's user-visible text. If a reader can tell we're "following an anti-slop policy," we have already failed the policy.

## Mission

This repo is the single source of truth (SSOT) for web design principles, methods, and concepts. Every concept has exactly one canonical page. Skills and prompts draw their checklists from that page instead of re-explaining the concept in their own words, so nothing drifts out of sync as the canonical page evolves.

The work takes four exported forms:

1. **The site** (`/docs`) — a browsable reference, published via GitHub Pages.
2. **Skills** (`/skills`) — Claude Code skills that turn a principle into a checklist an agent can run against real work.
3. **Prompts** (`/prompts`) — standalone system prompts that give an LLM the persona and judgment to apply these principles without being reminded.
4. **Craft** (`/docs/craft`) — short, hands-on practice courses that pair with a principle page. The principle page is the textbook (why the rule holds); a Craft course is the practice (proving you can apply it). A course never re-teaches its principle's explanation — it links back to it, the same rule skills and prompts already follow.

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

## Page skeleton (every file in `src/content/principles/*.ts`, rendered by `PrinciplePage.tsx`)

1. **One-sentence plain-English definition** — no jargon, no unexpanded acronym.
2. **Why it matters** — at least two concrete paragraphs, not one abstract sentence. Tell a real situation (who hits this, what breaks, what it costs them) before naming the consequence in the abstract. A reader should recognize themselves or their product in it, not just be told a rule exists.
3. **The core rule** — the single heuristic to remember, stated as an instruction, not a description.
4. **Good vs. bad example(s)** — at least two scenarios (`examples`, plural), each a genuinely different real context the rule shows up in, not the same context restated. One worked example proves the rule holds once; several prove it's actually a rule. Each scenario gets a short context label (e.g. "Text over a photo", "A disabled-looking button") so a reader can jump to the one closest to what they're building.
5. **Common mistakes** — 3–6 specific, named failure modes, not generic warnings. Size to what the topic actually supports — a narrow principle may only have three real ones; don't invent a fourth to hit a round number, and don't cap a rich topic at three if it genuinely has five.
6. **Quick checklist** — scannable, actionable, checkbox-style.
7. **Go deeper** — a collapsed `<details>` block: edge cases, spec-adjacent nuance, browser-support notes, for the reader who wants more than the page's main flow gives.

**On jargon, specifically:** a term earns its place in the main flow only if it's defined in the same sentence or the one right after it. If a reader would need to already know the term to parse the sentence it's in, that's a Rule Zero violation, not an acceptable level of "technical." Reserve genuinely unavoidable jargon — spec names, algorithm names, browser-internals terms — for "Go deeper," where the reader has already opted into more depth.

## Adding a new principle

1. Write the canonical content module in `src/content/principles/` following the skeleton above.
2. Add its slug to `NAV_PRINCIPLE_ORDER` and to the right category in `HOME_GROUPS`, both in `src/content/site.ts` — the home page card and nav entry are derived from these, not hand-written.
3. If the concept has a pass/fail heuristic, add it to (or start) a matching skill in `/skills/`.
4. Never duplicate the page's explanation inside a skill or prompt — link back to the page and extract only the actionable checklist.

## Course skeleton (every course in `/docs/craft/*`)

A Craft course is the practice companion to exactly one principle page. It never restates that page's explanation — it links to it, then puts the reader to work.

**Naming rule.** A course's title is a short (3–6 word) concrete outcome-phrase, not a category label. "Where the Eye Goes First," not "Visual Hierarchy 101" or "Introduction to Hierarchy." If you can't tell what you'll be _able to do_ after the course from its title alone, rewrite the title.

**File layout — one manifest, one module per course, nothing hand-duplicated:**

```
src/content/craft/
  courses.ts       single source of truth: id, title, hook, the course's own prose,
                   the principle it pairs with, and its full level/lesson structure
  lessons/
    <course-id>.ts every lesson in that course: framing, question, four options,
                   exactly one correct, and the explanation
```

The catalog, each course overview, every lesson page, the search index and the sitemap are all generated from those modules — a course is described once and appears everywhere. There is no page markup to keep in step, and no second listing to hand-copy into.

This is the rule the pre-migration site stated and did not keep: `courses.json` was described as the single source of truth while the catalog's cards, level counts and lesson totals were hand-typed beside it, free to drift. Two of the four levelled course pages had also silently lost their level headings. Deriving the pages from the manifest is what makes the claim true.

**Per course:**

1. **The hook** — one sentence, stated as a concrete outcome, on the overview page and in the manifest (this is what sells the click — see Tone below for how persuasive differs from hype).
2. **What you'll practice** — 1-2 sentences, plain language, naming the specific skill.
3. **A link to the paired principle page** — "why this rule holds" lives there, not here.
4. **Levels and lessons, sized to the topic, never to a formula.** A course is organized into levels — thematic sub-sections of the subject — each containing several short lessons. How many levels and lessons a course has is determined by how much the subject genuinely supports, not a preset target: a narrow topic might complete in 3-4 levels; a broad one might need six or more. Never pad a level or a lesson to hit a round number — the same anti-slop rule that governs a principle page's checklist ("no padding a list to look thorough") applies here exactly. Each lesson is still short: a one-paragraph bite-sized framing (not a restatement of the principle page), then one interactive multiple-choice question with instant right/wrong feedback and a one-sentence explanation of _why_ — never a question without a real explanation on both the correct and incorrect paths.
5. **Progress**, tracked client-side only (`localStorage` via `docs/assets/craft-progress.js`) — no accounts, no server. A lesson is either complete or not; a course's progress badge counts completed lessons against its actual total, whatever that total is. No points, streaks, or leaderboards (see Engineering standards — that's gamification scope, not proof-of-skill scope, and stays out until a real need for it exists).

## Adding a new course

1. Add the course's entry to `docs/craft/courses.json` first — id, title (per the naming rule above), hook, the principle it pairs with, and its full level/lesson structure.
2. Plan the level/lesson outline before writing any lesson content — level titles and lesson titles, sized to what the topic actually supports (see point 4 above). Sense-check the outline for padding before writing a single lesson.
3. Write the course folder following the Course skeleton above.
4. Add a "Practice this" link from the paired principle page to the new course — the only place the principle page should mention Craft at all.
5. Run `npm run gate:all` before committing, same as any other site change.

## Engineering standards

Every piece of markup, CSS, or code in this repo — the site, a skill, a prompt, a tool in `/scripts` — holds to:

- **Standards-compliant, not clever.** HTML and CSS must match current WHATWG/W3C specs and documented MDN behavior. No deprecated elements or attributes, no browser-specific hacks, no relying on undocumented behavior.
- **YAGNI.** Don't add a page, script, dependency, or abstraction for a need that doesn't exist yet. Build for the concept in front of you, not a hypothetical future one.
- **KISS.** The simplest markup, CSS, or script that correctly does the job wins over a more "capable" one nobody asked for. Prefer the platform: if plain HTML and CSS do the job, that is the answer. See the recorded exception below for the site's build step.
- **DRY.** A rule, checklist, or nav list is written once and reused, never hand-duplicated in a way that can drift out of sync — the shared nav block across pages, or a skill linking back to its canonical page instead of restating it, are both this rule in practice.
- **Verify before calling it done.** Run `npm run gate:all` after any change to the site. It type-checks, lints, unit-tests, builds, prerenders, then verifies URL parity, content invariants, W3C validity, link resolution, and accessibility. A change isn't finished until that passes clean — this is the repo's test suite.

### Recorded exception: the site has a build step

The site's presentation layer is a Vite + TypeScript + React + Tailwind application, prerendered to
static HTML. This is a deliberate, recorded exception to KISS and YAGNI above, not an oversight.

**Why.** The no-build-step version reached 173 hand-written HTML files that duplicated the same
`<head>`, nav, and footer 173 times. DRY was already broken and getting worse: `CONTRIBUTING.md` had
to instruct contributors to paste a new nav item "into every existing HTML file, in the same
position," and `courses.json` had drifted out of sync with the catalog markup that was supposed to be
derived from it. At that scale the duplication, not the tooling, had become the source of defects.

**What it does not license.** The exception covers the presentation layer only:

- Content remains the source of truth and stays in typed content modules — one canonical definition
  per concept, as the Mission requires. Adding a dependency to avoid writing content is still wrong.
- Output is still static HTML on GitHub Pages. No server, no runtime data fetching, no accounts.
- Every URL the hand-written site served is still served, byte-identical (see
  `.kiro/steering/migration-invariants.md`).
- The output must still pass the W3C Nu Html Checker. Standards-compliant markup is unchanged as a
  requirement; the framework is not an excuse for markup a validator rejects.
- New dependencies beyond the established toolchain still need the YAGNI argument made and won.

## Tone

Direct, warm, zero condescension, zero hype. Write like a senior designer explaining something to a smart junior colleague over coffee, not like marketing copy or a spec document. Never write "simply" or "just" before an instruction — if it were simple or just, the reader would not need the page.
