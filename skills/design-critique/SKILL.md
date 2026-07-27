---
name: design-critique
description: Reviews a web page, component, or mockup against core design principles (hierarchy, typography, contrast, spacing, icons/imagery, responsiveness, performance, motion, i18n/l10n, navigation/IA, forms, microcopy, empty/error states, data tables, onboarding, accessibility, dark patterns) and gives specific, actionable feedback. Use when a user asks for a design review, UI critique, or "does this look right" check on HTML/CSS, a screenshot, or a Figma-style description.
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

**Visual hierarchy** — full reference: <https://aahplexx.github.io/design-principles/principles/visual-hierarchy.html>
- Exactly one element per screen reads as most important — no two competing focal points.
- Primary and secondary actions are visually distinct (e.g., filled button vs. text link).
- Visual (CSS) order matches the underlying HTML/reading order.

**Typography** — full reference: <https://aahplexx.github.io/design-principles/principles/typography.html>
- Body line length under ~75 characters at any width tested.
- Line height 1.4–1.6× for body text.
- Heading levels distinguishable by more than one property (size + weight, not size alone).
- No more than two typeface families.

**Color & contrast** — full reference: <https://aahplexx.github.io/design-principles/principles/color-contrast.html>
- Body text ≥ 4.5:1 contrast against its background; large text (24px+/18.66px+ bold) ≥ 3:1.
- Text over images has a scrim tested against the image's lightest and darkest regions.
- No meaning conveyed by color alone without a label or icon backup.

**Spacing & layout** — full reference: <https://aahplexx.github.io/design-principles/principles/spacing-layout.html>
- Related items sit closer together than unrelated groups.
- Spacing values look like they come from one consistent scale, not arbitrary numbers.
- Consistent alignment edge per column of content.

**Iconography & imagery** — full reference: <https://aahplexx.github.io/design-principles/principles/iconography-imagery.html>
- Every icon whose meaning isn't universally obvious (search, close) has a visible text label or accessible name.
- Icons come from one consistent visual system (stroke width, corner radius, fill style).
- Every image serves a real communicative purpose, not decoration for its own sake.

**Responsive design** — full reference: <https://aahplexx.github.io/design-principles/principles/responsive-design.html>
- No horizontal scroll or overflow at narrow widths.
- Fixed pixel widths aren't used for layout containers.
- Tap targets at least 44×44px on touch surfaces.

**Performance** — full reference: <https://aahplexx.github.io/design-principles/principles/performance.html>
- Images have explicit dimensions or `aspect-ratio` so nothing shifts on load.
- Below-the-fold images use `loading="lazy"`.
- Custom fonts use `font-display: swap` (or equivalent) instead of hiding text.

**Motion & feedback** — full reference: <https://aahplexx.github.io/design-principles/principles/motion-feedback.html>
- Every clickable control has a visible hover/active/focus state.
- Actions that take noticeable time show a loading or pending indicator.
- `prefers-reduced-motion: reduce` disables or minimizes non-essential animation.

**Internationalization & localization** — full reference: <https://aahplexx.github.io/design-principles/principles/internationalization-localization.html>
- Containers holding translatable text use flexible widths, not pixel widths measured against the source language.
- Dates, numbers, and currency are produced by a locale-aware formatting API, not a hand-built string.
- CSS uses logical properties (`margin-inline-start`, `text-align: start`) instead of `left`/`right`.

**Navigation & IA** — full reference: <https://aahplexx.github.io/design-principles/principles/navigation-ia.html>
- Navigation labels describe visitor goals, not internal org structure.
- The current page's location is visually indicated (`aria-current="page"`, a highlighted nav item, or a breadcrumb).
- Navigation works by tap as well as by mouse hover.

**Forms & inputs** — full reference: <https://aahplexx.github.io/design-principles/principles/forms-inputs.html>
- Every field has a persistent visible label, not just a placeholder.
- Error messages state the specific problem and, ideally, the fix.
- Input types match the data (email, tel, number) for correct mobile keyboards.

**Content & microcopy** — full reference: <https://aahplexx.github.io/design-principles/principles/content-microcopy.html>
- Button/link labels describe the specific result, not a generic verb ("Submit," "OK").
- Destructive-action confirmations name the specific thing being affected.
- The same concept is called the same thing everywhere in the product.

**Empty & error states** — full reference: <https://aahplexx.github.io/design-principles/principles/empty-error-states.html>
- Every empty state explains why it's empty and suggests a next action.
- Error messages use plain language — no raw codes or stack traces shown to users.
- Every error state offers a way forward: retry, go back, or get help.

**Data & tables** — full reference: <https://aahplexx.github.io/design-principles/principles/data-tables.html>
- Every table uses real `<th>` elements with the correct `scope`, not styled `div`s or plain `<td>`.
- Numeric columns are aligned consistently, not left-aligned like prose.
- A `<caption>` or equivalent text explains what the table contains.

**Onboarding & progressive disclosure** — full reference: <https://aahplexx.github.io/design-principles/principles/onboarding-progressive-disclosure.html>
- A new user can complete one meaningful first action without configuring anything else first.
- Advanced or rarely-used options are tucked behind a clear, findable disclosure, not shown by default.
- Any tour or walkthrough can be skipped and revisited later, never forced start-to-finish.

**Accessibility** — full reference: <https://aahplexx.github.io/design-principles/principles/accessibility.html>
- Interactive elements are real, focusable, keyboard-operable elements (button/a/input), not divs with click handlers.
- Focus states are visible, not removed without replacement.
- Images have appropriate alt text.

**Dark patterns & ethics** — full reference: <https://aahplexx.github.io/design-principles/principles/dark-patterns-ethics.html>
- No pre-checked boxes for anything that isn't strictly required to use the product.
- Declining an offer uses neutral wording, not guilt or shame.
- Canceling or unsubscribing takes the same or fewer steps than signing up did.
- Any urgency or scarcity claim shown is real, not fabricated.

## Output format

For each finding: **what** (the specific element), **why it matters** (the real consequence, one sentence), **the fix** (concrete — a CSS property, an HTML change, a copy edit). Close with a short list of what already works, so the review isn't only negative.
