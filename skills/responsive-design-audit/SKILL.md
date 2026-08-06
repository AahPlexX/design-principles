---
name: responsive-design-audit
description: Scans HTML/CSS for fixed-width layouts, guessed device breakpoints, and touch-target sizing that break on screens other than the one they were designed for. Use when a user asks for a responsive/mobile review, "does this work on phones," or a breakpoint audit.
---

# Responsive Design Audit

Full explanation and the underlying rule: <https://aahplexx.github.io/design-principles/principles/responsive-design.html> — this skill turns that page's checklist into a line-by-line code-scanning procedure.

Read the actual CSS/markup (not a description of it) and check it against the rules below. Every finding needs a file/line reference and a specific fix; a finding without a fix is not useful. Where possible, verify claims by actually resizing a rendered page (a browser tool, viewport emulation) rather than reasoning about the CSS alone — a fixed-width rule can look fine in isolation and still break in practice.

## What to check, in priority order

1. **Fixed pixel widths on layout containers.** Search for `width: <N>px` (or unitless large numbers) on containers, wrappers, or grid/flex items meant to hold page content. Flag these — they're correct at exactly one viewport width and broken everywhere else. The fix is a flexible unit (`%`, `fr`, `rem`, `minmax()`) or `max-width` with a fluid fallback.

2. **Breakpoints keyed to device names instead of content.** Look for comments or media query values that reference specific devices ("iPhone breakpoint," `@media (width: 375px)` matching a specific phone exactly). Flag these — screen widths are continuous and new device sizes appear constantly; a breakpoint should sit at the width where the *specific layout* starts to look bad, found by actually testing, not guessed from a device chart.

3. **Text/columns that shrink instead of reflowing.** Look for `font-size` shrinking inside narrow-viewport media queries applied to a column that stays a fixed width — this squeezes text smaller rather than letting the column narrow and text wrap. Flag it; the fix is letting the container's width become flexible so text reflows at a stable, readable size.

4. **Touch targets under 24×24px.** Check the rendered (not just declared) size of buttons, links, and form controls intended for touch use — padding counts toward the hit area, a small icon with no padding does not. Flag anything that renders smaller than 24×24 CSS pixels (WCAG 2.2's AA minimum) on a touch-capable viewport, unless it has enough surrounding space to qualify for WCAG's spacing exception (a 24px-diameter circle centered on the target doesn't overlap the circle of any neighboring target) — check that before flagging, since a small icon with generous padding around it can still pass. Note as a lower-priority improvement anything between 24×24 and the more comfortable 44×44px, but don't flag it as a defect — 44×44 is the AAA target, not the required floor.

5. **Content hidden on mobile instead of re-prioritized.** Search for `display: none` inside narrow-viewport media queries applied to primary content (contact info, a key action, essential navigation) rather than genuinely secondary content. Flag cases where something a mobile user would specifically need has been hidden rather than rearranged.

6. **Missing viewport meta tag.** Every page needs `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`. Flag its absence — without it, mobile browsers render at a desktop-width virtual viewport and scale down, defeating any responsive CSS entirely.

7. **Horizontal scroll/overflow.** If you can render the page, check at widths from ~320px up for any horizontal scrollbar or content overflowing its container — this is often caused by one of the fixed-width issues above, but confirm the actual rendered symptom rather than only inspecting the CSS.

## Output format

For each finding: file:line, the specific selector/element, what's wrong, and the exact CSS change that fixes it (a real replacement value, not "make this responsive"). Rank fixed-width layout bugs and missing-viewport-meta above touch-target and content-hiding issues, since the former can break a page outright while the latter degrade usability. Close with what already works, so the audit isn't only negative.
