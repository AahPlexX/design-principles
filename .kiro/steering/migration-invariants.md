# Migration Invariants — non-negotiable

This site was 173 hand-written HTML files served from `/docs`. It is now a Vite + React + Tailwind
application prerendered to static HTML. The rewrite is only correct if it is **invisible to every
existing visitor, link, and crawler**. The rules below are hard constraints, not preferences. A gate
in `scripts/gates/` enforces each one; if a change makes a gate fail, the change is wrong, not the gate.

## 1. URL parity — the public contract

The live site is served from the project subpath `https://aahplexx.github.io/design-principles/`.
GitHub Pages offers **no redirect configuration**, so a changed URL is a permanently broken URL.

- `vite.config.ts` must set `base: '/design-principles/'`.
- The build must emit **exactly** these 173 HTML files, at these paths, no more and no fewer:
  - `index.html`, `about.html`, `404.html`
  - `principles/<slug>.html` — 17 files
  - `craft/index.html`, `craft/<course-id>/index.html` — 9 files
  - `craft/<course-id>/lesson-<n>.html` — 12 files (flat courses)
  - `craft/<course-id>/level-<n>/lesson-<m>.html` — 132 files (leveled courses)
- **The `.html` suffix is part of the contract.** Do not "clean up" `/principles/color-contrast.html`
  into `/principles/color-contrast`. Those exact strings live in `sitemap.xml`, in every page's
  `<link rel="canonical">`, in `og:url`, in JSON-LD `mainEntityOfPage`, and in inbound external links.
- Directory URLs (`/craft/`, `/craft/<id>/`) must be real `index.html` files in a real directory,
  never `craft.html`.
- `.nojekyll` must be present in the deployed artifact (keep it in `public/`), or Pages' Jekyll pass
  drops paths beginning with `_`.

## 2. localStorage compatibility

Returning visitors have data under two keys. Renaming a key or an id silently wipes their progress.

- Key `"theme"` — value is the literal string `"light"` or `"dark"`, nothing else.
- Key `"craft-progress"` — value is JSON of shape `{ [courseId]: { [lessonId]: true } }`.
- Lesson id vocabulary is exactly two formats: `"lesson-<n>"` for flat courses,
  `"level-<n>-lesson-<m>"` for leveled courses. Do not normalise these into one format.
- A lesson is marked complete when the reader answers the quiz **at all** — right or wrong.

## 3. Theme precedence

An explicit user choice must beat the OS preference in both directions. The original CSS achieved
this by declaring dark values twice, once under
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` and once under
`:root[data-theme="dark"]`.

- Dark mode is driven by `data-theme` on `<html>`, **not** by a `.dark` class. Configure Tailwind's
  dark variant accordingly: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- The pre-paint theme bootstrap must stay an **inline** `<script>` in `<head>`, before the stylesheet.
  Moving it into the React bundle reintroduces a flash of the wrong theme.

## 4. Accessibility is the subject matter

This site teaches accessibility. A violation here is worse than a bug; it is a contradiction.

- Preserve: the `.skip-link` to `#main`, `aria-label="Primary"` on the nav, `aria-current="page"` on
  the active nav item, `aria-pressed` on the theme toggle, real `<button>` elements for quiz options,
  and a visible `:focus-visible` outline of at least 3px.
- The old CSS killed **all** transitions under `prefers-reduced-motion: reduce`. `motion` animations
  run in JS and ignore that media query, so every animation must be gated on `useReducedMotion()`.
- The axe gate runs against prerendered HTML and must report zero violations.

## 5. Right-to-left readiness

The original CSS used logical properties throughout (`inset-inline-start`, `padding-inline-start`,
`border-inline-end`, `text-align: start`) — deliberate, and consistent with the site's own
internationalization page. Prefer Tailwind's logical utilities (`ps-*`, `pe-*`, `ms-*`, `border-s-*`,
`text-start`) over their physical equivalents (`pl-*`, `text-left`).

## 6. Print output

Principle pages are printed as reference sheets. Reproduce the `@media print` rules: hide the header,
footer, skip-link, search box and theme toggle; drop the content max-width; force black text;
append `(url)` after external links; flatten cards and examples to white background with a black border.

Collapsible "Go deeper" content must auto-expand for printing. The original used `<details>` plus a
`beforeprint`/`afterprint` listener. shadcn's Collapsible and Accordion are **not** `<details>` and
will not expand on their own — either keep native `<details>` or force the open state on `beforeprint`.

## 7. Content is verbatim

Prose, quiz questions, quiz options, correct-answer flags, and feedback text are migrated **unchanged**.
This is a rewrite of the presentation layer only. Rewording content during the migration is out of scope
and defeats the content-fidelity gate.

## 8. Scope limits carried over from CLAUDE.md

- Progress stays client-side only. No accounts, no server, and explicitly **no points, streaks, or
  leaderboards** — that remains out of scope.
- Expert nuance stays in a collapsed block at the end of the same page, never on a separate route.
- Every page keeps the footer attribution: `Design Principles — source on GitHub, MIT licensed.`
- Tone rules still apply to any new UI copy: never write "simply" or "just" before an instruction.
