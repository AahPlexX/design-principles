---
name: performance-audit
description: Scans HTML/CSS for the layout and markup decisions that control how fast a page feels, independent of server response time — unsized images causing layout shift, render-blocking fonts, oversized/eager-loaded media, and above-the-fold contention. Use when a user asks for a performance review, a Core Web Vitals check, or "why does this page feel slow."
---

# Performance Audit

Full explanation and the underlying rule: <https://aahplexx.github.io/design-principles/principles/performance.html> — this skill turns that page's checklist into a line-by-line code-scanning procedure.

Read the actual markup/CSS (not a description of it) and check it against the rules below. Every finding needs a file/line reference and a specific fix; a finding without a fix is not useful. This skill covers the layout-level causes of a slow-feeling page — it does not replace server-side profiling, bundle analysis, or a real Lighthouse/WebPageTest run against a live URL.

## What to check, in priority order

1. **Images with no reserved dimensions.** Every `<img>` needs a `width`/`height` attribute pair or a CSS `aspect-ratio` so the browser reserves its space before the file loads. Flag any `<img>` missing both — this is the direct cause of Cumulative Layout Shift (content jumping as images pop in).

2. **Render-blocking web fonts.** Search `@font-face` rules and `<link rel="preload"...as="font">` tags for a missing `font-display` value (or a value other than `swap`/`optional`). Without it, text using that font can be invisible until the font finishes loading. Flag any `@font-face` without `font-display: swap` (or an equivalent fallback strategy).

3. **Eager-loaded below-the-fold images.** Any `<img>` that isn't part of the initial visible viewport should have `loading="lazy"`. Flag images without it that are plausibly below the fold (inside a footer, a "related content" section, far down a long page).

4. **Oversized source images.** If dimensions are inspectable (explicit `width`/`height`, or a linked asset you can check), flag images serving resolution far beyond their largest rendered size — e.g., a `width="400"` display size backed by a multi-thousand-pixel source file.

5. **Above-the-fold contention.** Look for autoplaying background video, large hero animations, or heavy embeds positioned above the primary heading/CTA. Flag anything decorative that competes for load priority with the content the page actually exists to deliver.

6. **Missing modern format/responsive-image hooks.** Note (lower severity) any `<img>` that could benefit from `<picture>`/`srcset` or a modern format (WebP/AVIF) instead of a single fixed JPEG/PNG source, especially for large hero images.

## Output format

Group findings by severity:
- **High** — causes visible layout shift or blocks content from appearing at all (unsized images, render-blocking fonts).
- **Medium** — wastes bandwidth/load priority but doesn't break the initial render (oversized images, missing lazy-loading, above-the-fold contention).
- **Low** — a real but minor optimization (modern format/responsive-image opportunities).

For each finding: file:line, what's wrong, and the exact markup/CSS change that fixes it. Close with what already works, so the audit isn't only negative. If the user wants real load-time numbers (LCP, CLS, INP), tell them this skill can't measure those directly — that requires running Lighthouse or WebPageTest against a live URL.
