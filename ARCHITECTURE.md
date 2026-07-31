# Architecture

The site is a **prerendered multi-page application**. React runs at build time to generate 173 static
HTML documents; a small amount of TypeScript runs in the browser to make specific things interactive.

There is no server, no client-side router, and no data fetching at runtime. The deployed artifact is
static files on GitHub Pages, exactly as before.

## Why not a single-page app

Two reasons, both hard constraints rather than preferences.

**The URLs are a public contract.** Every page ends in `.html`
(`/principles/color-contrast.html`, `/craft/color-contrast/level-1/lesson-1.html`), and those exact
strings are in `sitemap.xml`, in every `<link rel="canonical">`, and in inbound external links.
GitHub Pages has no redirect configuration, so a client-routed SPA would either change 173 URLs or
need a JavaScript redirect shim in `404.html`. Prerendering to the same paths costs nothing and
breaks nothing.

**It is a reference site.** Readers arrive from search on a single page, read it, and leave. A router
plus a hydrated content bundle would ship JavaScript to re-describe prose that is already in the HTML,
which is the wrong trade for this traffic shape. Cross-document view transitions and speculation rules
(below) give near-instant navigation without any of that cost.

## Rendering pipeline

```
src/content/**          typed content modules — the source of truth
   ↓
src/lib/routes.ts       derives all 173 routes from content
   ↓
src/entry-server.tsx    render(route) → complete HTML document string
   ↓
scripts/prerender.ts    writes dist/client/<exact legacy path>
```

`npm run build` runs three steps: a client build (bundles browser TypeScript and CSS, emits
`manifest.json`), an SSR build (bundles `entry-server`), then the prerender, which reads the manifest
to get hashed asset filenames and injects them into each document's `<head>`.

Server rendering uses `renderToStaticMarkup`, not `renderToString`. The output has no hydration
markers, which keeps it clean for the W3C validator and means the HTML is exactly what a hand-author
would have written.

`src/lib/routes.ts` is the single source of truth for the URL surface. The URL-parity gate compares
the files on disk in `dist/client` against that table in both directions, so a route that stops being
emitted and a file that should not exist both fail the build.

## Client-side JavaScript: enhancers and islands

The browser bundle has two kinds of thing in it, and the distinction matters.

### Enhancers — behaviour attached to server-rendered markup

`src/client/enhancers/*.ts`. Plain TypeScript, no React. Each one queries for markup the server
already rendered and attaches behaviour to it: the theme toggle, quiz answering, progress badges and
lesson checkmarks, print expansion, home search filtering.

These are ports of the original `docs/assets/*.js` scripts, with types and tests. They stay
non-React deliberately — re-rendering a quiz through React would mean shipping its question, four
options and feedback text a second time as JSON props, duplicating content that is already in the
HTML. An enhancer toggles attributes and classes on markup that is already correct, so it costs
almost nothing and cannot produce a hydration mismatch.

### Islands — React components hydrated with small props

`src/client/islands/*.tsx`. React, shadcn, and motion, mounted only where genuinely stateful UI earns
its keep: the mobile navigation sheet, the ⌘K command palette, and the table-of-contents scroll-spy.

An island is server-rendered inside its container, and the client hydrates that same container with
the same props, which travel in a sibling `<script type="application/json">`. Props are kept to
identifiers and short labels — never page prose.

The rule for choosing between them: **if the interaction only changes attributes or visibility on
markup the server already produced, write an enhancer. If it renders new UI in response to state,
write an island.**

## Navigation feel without a router

- `@view-transition { navigation: auto }` gives cross-document view transitions where supported.
- A `<script type="speculationrules">` block prefetches same-origin documents on hover intent.
- Both degrade to ordinary full page loads, which on a page this small are already fast.

## Content

`src/content/` holds typed modules — one per principle, one per lesson, plus the course manifest and
site-level data such as nav order and home page categories. `src/content/types.ts` defines the shape.

Content was extracted mechanically from the legacy HTML by `scripts/extract/legacy-extract.ts`, a
one-off tool kept in the repo for provenance. It is not part of the build; the extracted modules are
the source of truth now.

Prose that contained inline markup (`<strong>`, `<code>`, `<a>`) is stored as HTML strings and rendered
through a single sanitising helper, so the set of allowed inline tags is enforced in one place rather
than trusted per call site.

## Styling

Tailwind v4, configured in CSS (`src/styles/globals.css`) rather than a JavaScript config file. The
design tokens from the original `style.css` are ported into `@theme`: the palette, the `clamp()` fluid
type scale, spacing, radii and shadows.

Dark mode is driven by `data-theme` on `<html>`, not a class, because that is what the existing
`localStorage` value and pre-paint script already use:

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

See `.kiro/steering/migration-invariants.md` for the rules this must not break — theme precedence,
localStorage compatibility, RTL logical properties, print output, and accessibility.

## Validation gates

`npm run gate:all` runs every check, in dependency order, and is what CI runs. Individual gates live
in `scripts/gates/`. See that directory's `README.md` for what each one proves.
