# Contributing

Thanks for adding to this. Here's how the pieces fit together.

## Running the site locally

```bash
npm install
npm run dev        # http://localhost:5173/design-principles/
```

`npm run gate:all` is the full check — formatting, lint, types, content rules, colour contrast, unit
tests, the build, then URL parity, internal links, SEO, accessibility, the performance budget, and W3C
HTML validity. A change isn't done until it passes clean.

The site's pages are generated from typed content modules in `src/content/`. There is no HTML to edit.
See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for how rendering works and
[`.kiro/steering/migration-invariants.md`](./.kiro/steering/migration-invariants.md) for the
constraints that are not negotiable — chiefly that the site's URLs and its `localStorage` keys cannot
change without breaking real links and real readers' progress.

## Adding a new principle page

1. Add a content module in `src/content/principles/<slug>.ts` exporting a `Principle`. Copy the shape
   of an existing one — the type in `src/content/types.ts` requires every section the page skeleton
   needs, so the compiler will tell you what is missing.
2. Register it in `src/content/index.ts` (add the import to `ALL_PRINCIPLES`).
3. Add the slug to `NAV_PRINCIPLE_ORDER` and to the right group in `HOME_GROUPS`, both in
   `src/content/site.ts`. The navigation, the home page grid, the command palette and the sitemap all
   derive from those two lists — **you do not need to touch any page or any nav markup.** This used to
   mean pasting a nav entry into every HTML file in the repo, which is exactly why it doesn't any more.
4. Write for two readers at once: someone who has never touched CSS, and someone who has been doing
   this for ten years. Explain the term in plain words before you name it. Put expert-only detail (edge
   cases, browser quirks, spec links) in the `goDeeper` field, which renders as a collapsed section at
   the end — not in the main flow.
5. Cut anything that doesn't teach something. No filler sentences, no restating the heading, no padding
   a list to look thorough.
6. If the concept has a pass/fail heuristic, add it to (or start) a matching skill in `/skills`.
7. Run `npm run gate:all`.

Adding a principle changes the site's URL surface, so `gate:urls` will fail until you record the new
page as intentional:

```bash
npx tsx scripts/gates/url-parity.ts --write
```

Commit that diff alongside your change. It is deliberately a visible, reviewable edit — the same gate
is what stops an accidental rename from silently breaking a live URL.

## Adding a new course

1. Add the course to `src/content/craft/courses.ts` — id, title (a 3–6 word concrete outcome phrase),
   hook, its opening prose, the principle it pairs with, and its full level/lesson structure.
2. Plan the level and lesson outline before writing any lesson content, sized to what the topic
   actually supports. Sense-check it for padding first.
3. Add the lessons to `src/content/craft/lessons/<course-id>.ts` and register the export in
   `src/content/index.ts`. Each lesson is a short framing paragraph plus one multiple-choice question
   with four options, exactly one correct, and a real explanation of *why* — `gate:content` enforces
   the counts.
4. Set `practiceCourseId` on the paired principle so it links to the course.
5. Run `npm run gate:all`, then `--write` the URL snapshot as above.

## Adding a skill

A skill in `/skills` should turn a principle's checklist into something an agent can actually run — not
restate the page's explanation. Link back to the relevant page(s) on the site instead of re-explaining
the concept.

## Adding a prompt

A prompt in `/prompts` is a persona, not a lesson. It should give the model judgment and a checklist to
apply, in plain instructions — not a copy of a principle page's prose.

## Style

See [`CLAUDE.md`](./CLAUDE.md) for the full writing standard this repo holds itself to. The short
version: plain words first, one idea per sentence, show a real example before you generalize, and never
make the reader feel behind for not already knowing the jargon.
