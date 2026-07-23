---
name: design-critique
description: Reviews a web page, component, or mockup against core design principles (hierarchy, typography, contrast, spacing, responsiveness, performance, motion, forms, microcopy) and gives specific, actionable feedback. Use when a user asks for a design review, UI critique, or "does this look right" check on HTML/CSS, a screenshot, or a Figma-style description.
---

# Design Critique

Review the target (HTML/CSS, a rendered screenshot, or a described layout) against the checklists below. Report only what actually applies to what's in front of you — do not pad the review with checklist items that don't apply to the target.

## How to review

1. Identify what's actually present: is there body text, a color scheme, a form, a grid of cards? Only check the categories that apply.
2. For each issue found, name the specific element (a selector, a visible label, a described region — not "the page" in general), state what's wrong, and state the fix. Never report a problem without a fix.
3. Rank findings by real impact: something that blocks a reader (unreadable contrast, an unusable form field) outranks something cosmetic (slightly inconsistent spacing).
4. If nothing is wrong in a category, don't manufacture a finding — say so briefly and move on.
5. Write findings in plain language. Say "the light-gray text on white is too faint to read comfortably" before adding the contrast ratio, not instead of it.

## Checklists to apply

**Visual hierarchy** — full reference: https://aahplexx.github.io/design-principles/principles/visual-hierarchy.html
- Exactly one element per screen reads as most important — no two competing focal points.
- Primary and secondary actions are visually distinct (e.g., filled button vs. text link).
- Visual (CSS) order matches the underlying HTML/reading order.

**Typography** — full reference: https://aahplexx.github.io/design-principles/principles/typography.html
- Body line length under ~75 characters at any width tested.
- Line height 1.4–1.6× for body text.
- Heading levels distinguishable by more than one property (size + weight, not size alone).
- No more than two typeface families.

**Color & contrast** — full reference: https://aahplexx.github.io/design-principles/principles/color-contrast.html
- Body text ≥ 4.5:1 contrast against its background; large text (24px+/18.66px+ bold) ≥ 3:1.
- Text over images has a scrim tested against the image's lightest and darkest regions.
- No meaning conveyed by color alone without a label or icon backup.

**Spacing & layout** — full reference: https://aahplexx.github.io/design-principles/principles/spacing-layout.html
- Related items sit closer together than unrelated groups.
- Spacing values look like they come from one consistent scale, not arbitrary numbers.
- Consistent alignment edge per column of content.

**Responsive design** — full reference: https://aahplexx.github.io/design-principles/principles/responsive-design.html
- No horizontal scroll or overflow at narrow widths.
- Fixed pixel widths aren't used for layout containers.
- Tap targets at least 44×44px on touch surfaces.

**Performance** — full reference: https://aahplexx.github.io/design-principles/principles/performance.html
- Images have explicit dimensions or `aspect-ratio` so nothing shifts on load.
- Below-the-fold images use `loading="lazy"`.
- Custom fonts use `font-display: swap` (or equivalent) instead of hiding text.

**Motion & feedback** — full reference: https://aahplexx.github.io/design-principles/principles/motion-feedback.html
- Every clickable control has a visible hover/active/focus state.
- Actions that take noticeable time show a loading or pending indicator.
- `prefers-reduced-motion: reduce` disables or minimizes non-essential animation.

**Forms & inputs** — full reference: https://aahplexx.github.io/design-principles/principles/forms-inputs.html
- Every field has a persistent visible label, not just a placeholder.
- Error messages state the specific problem and, ideally, the fix.
- Input types match the data (email, tel, number) for correct mobile keyboards.

**Content & microcopy** — full reference: https://aahplexx.github.io/design-principles/principles/content-microcopy.html
- Button/link labels describe the specific result, not a generic verb ("Submit," "OK").
- Empty states explain why they're empty and suggest a next action.
- Destructive-action confirmations name the specific thing being affected.

**Accessibility** — full reference: https://aahplexx.github.io/design-principles/principles/accessibility.html
- Interactive elements are real, focusable, keyboard-operable elements (button/a/input), not divs with click handlers.
- Focus states are visible, not removed without replacement.
- Images have appropriate alt text.

## Output format

For each finding: **what** (the specific element), **why it matters** (the real consequence, one sentence), **the fix** (concrete — a CSS property, an HTML change, a copy edit). Close with a short list of what already works, so the review isn't only negative.
