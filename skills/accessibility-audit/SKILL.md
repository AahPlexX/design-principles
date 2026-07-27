---
name: accessibility-audit
description: Audits HTML/CSS/JSX for keyboard, screen-reader, and low-vision accessibility issues, and reports concrete fixes with file and line references. Use when a user asks for an accessibility check, a11y audit, WCAG review, or "will this work with a screen reader" question.
---

# Accessibility Audit

Full explanation and the underlying rule: <https://aahplexx.github.io/design-principles/principles/accessibility.html> — this skill turns that page's checklist into a line-by-line code-scanning procedure.

Read the target code (not a description of it — the actual markup) and check it against the rules below. Every finding needs a file/line reference and a specific fix; a finding without a fix is not useful.

## What to check, in priority order

1. **Keyboard operability.** Every element with a click handler (`onClick`, `addEventListener('click', ...)`) must be a native focusable, activatable element (`<button>`, `<a href>`, `<input>`, `<select>`) or, if it truly can't be, have `tabindex="0"`, a `role`, and handlers for both click and Enter/Space keydown. Flag every `<div onClick>` or `<span onClick>` found.

2. **Focus visibility.** Search for `outline: none` or `outline: 0` in CSS. Every instance needs a replacement focus style (a visible outline, ring, or background change) on the same selector — flag any that don't have one.

3. **Labels.** Every `<input>`, `<textarea>`, and `<select>` needs an associated `<label for="...">` (matching `id`), an `aria-label`, or an `aria-labelledby`. A `placeholder` alone does not count. Flag unlabeled fields by their line number.

4. **Images and icons.** Every `<img>` needs an `alt` attribute — either descriptive text for meaningful images, or `alt=""` for purely decorative ones (never omit the attribute entirely). An icon-only button (an `<svg>` or icon font with no visible text) needs an `aria-label` on the button itself.

5. **Heading structure.** Headings (`<h1>`–`<h6>`) should appear in order without skipping levels (an `<h2>` should not jump straight to an `<h4>`), and a page should have exactly one `<h1>`.

6. **Color-only meaning.** Search for patterns like error/success states styled only with a color class and no icon or text — flag these as relying on color alone.

7. **Custom components (modals, dropdowns, tabs).** Check for the matching ARIA pattern:
   - A modal needs `role="dialog"` and focus trapped inside it while open.
   - A dropdown/menu needs `aria-expanded` on its trigger.
   - Tabs need `role="tablist"/"tab"/"tabpanel"`.
   - If a component reinvents one of these without the ARIA and keyboard behavior, flag it and point to the native element instead, if one exists.

## Output format

Group findings by severity:
- **Blocking** — a keyboard or screen-reader user cannot complete a core task at all (unreachable control, unlabeled required field, focus trap with no exit).
- **Degraded** — usable but harder than it should be (missing alt text on a meaningful image, inconsistent heading order).
- **Minor** — technically correct but could be clearer (a generic aria-label that could be more specific).

For each finding: file:line, what's wrong, and the exact code change that fixes it. Don't restate the general rule — apply it to the actual line found.
