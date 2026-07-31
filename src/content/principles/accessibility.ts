// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const accessibility: Principle = {
  slug: "accessibility",
  title: "Accessibility",
  category: "Inclusive by Default",
  blurb: "Designing so the site works for people using a keyboard, a screen reader, or low vision.",
  searchKeywords: "accessibility designing so the site works for people using a keyboard a screen reader or low vision",
  definition: html("Accessibility is designing a site so it still works for someone who can't use a mouse, can't see the screen, or can't see it well — using only a keyboard, a screen reader (software that reads the page aloud), or magnification."),
  whyItMatters: [
    html("Picture someone who's been blind since birth, shopping for a flight, moving through the page with a screen reader and the Tab key instead of a mouse. She reaches a control and the screen reader says only <em>\"button\"</em> — no name, no purpose — because whoever built it wrapped an airplane icon in a <code>&lt;div&gt;</code> with a click handler instead of a real <code>&lt;button&gt;</code> with a label. She can't tell whether it books the flight, opens a filter, or dismisses an ad. She backs out and books somewhere else. Nothing crashed. The page never told her what was there."),
    html("Now picture someone with no visual impairment at all: a developer who broke her wrist last week and is doing everything — email, banking, work — from the keyboard because gripping a mouse hurts. She tabs to what looks like a dropdown for choosing a shipping country, presses the down arrow, and nothing happens, because the \"dropdown\" is a styled <code>&lt;div&gt;</code> with click handlers standing in for a real <code>&lt;select&gt;</code>. There's no way to open it and no way to choose an option without a mouse she can't currently use. Her impairment is temporary, and it isn't rare — a sprain, a migraine that makes it painful to focus on a screen, a baby asleep on one arm — but the page fails her exactly the way it would fail someone with a lifelong disability, because the two situations need the same fix."),
    html("This adds up to more people than most teams assume: the World Health Organization estimates that roughly one in six people worldwide live with a significant disability, and that's before counting the temporary and situational limits above. None of them file a bug report when a site fails them this way — they leave, or they guess, or they never find out the button they couldn't identify did anything at all. A page that looks finished on the designer's own mouse and monitor can still be quietly unusable for a meaningful share of everyone who visits it."),
  ],
  coreRule: [
    html("Everything a mouse can do, a keyboard must also be able to do — and everything shown visually needs a text equivalent a screen reader (software that reads the page aloud for people who are blind, have low vision, or otherwise can't rely on a display) can announce. Two quick tests catch most violations before they ship: try reaching the control with Tab or Shift+Tab and activating it with Enter or Space, using no mouse at all; then cover the screen and see whether what gets announced actually tells you what the control does. If either test fails, it's not accessible yet."),
  ],
  examples: [
    {
      context: "An icon-only button with no accessible name",
      good: {
        label: "Good — announces as \"Close dialog, button\"",
        code: "<button aria-label=\"Close dialog\">\n  <svg aria-hidden=\"true\">\n    <!-- X icon -->\n  </svg>\n</button>",
        note: html("A real <code>&lt;button&gt;</code> is focusable and clickable by keyboard with no extra work, and <code>aria-label</code> gives a screen reader the name \"Close dialog\" even though the only visible content is an icon."),
      },
      bad: {
        label: "Bad — announces as nothing, or just \"clickable\"",
        code: "<div class=\"icon-button\" onclick=\"closeDialog()\">\n  <svg>\n    <!-- X icon -->\n  </svg>\n</div>",
        note: html("A <code>&lt;div&gt;</code> isn't focusable or keyboard-activatable by default, and with no label a screen reader has nothing to say about it — this control effectively doesn't exist for anyone not using a mouse."),
      },
    },
    {
      context: "A custom dropdown built to look like a <select>",
      good: {
        label: "Good — a native <select>",
        code: "<label for=\"country\">Country</label>\n<select id=\"country\" name=\"country\">\n  <option value=\"us\">United States</option>\n  <option value=\"ca\">Canada</option>\n  <option value=\"mx\">Mexico</option>\n</select>",
        note: html("Arrow keys move through the options, typing \"c\" jumps to Canada, Enter confirms, Escape closes it, and a screen reader announces it as a selectable control with the right option count — all without a line of extra code."),
      },
      bad: {
        label: "Bad — a <div> reimplementing a fraction of it",
        code: "<div class=\"dropdown\">\n  <div class=\"dropdown-selected\" onclick=\"toggleOpen()\">\n    United States\n  </div>\n  <div class=\"dropdown-options\" hidden>\n    <div onclick=\"select('us')\">United States</div>\n    <div onclick=\"select('ca')\">Canada</div>\n    <div onclick=\"select('mx')\">Mexico</div>\n  </div>\n</div>",
        note: html("It can look pixel-identical to the real thing, but none of these <code>&lt;div&gt;</code>s are focusable, arrow keys do nothing, and a screen reader doesn't announce any of it as a control worth interacting with — every behavior <code>&lt;select&gt;</code> gives away free would need to be hand-built and separately tested."),
      },
    },
    {
      context: "A modal dialog that doesn't manage focus",
      good: {
        label: "Good — native <dialog> with showModal()",
        code: "<dialog id=\"confirmDialog\" aria-labelledby=\"confirmTitle\">\n  <h2 id=\"confirmTitle\">Delete this file?</h2>\n  <button id=\"cancelBtn\" autofocus>Cancel</button>\n  <button id=\"deleteBtn\">Delete</button>\n</dialog>\n\n<script>\n  confirmDialog.showModal();\n</script>",
        note: html("<code>showModal()</code> traps Tab and Shift+Tab inside the dialog, makes the rest of the page inert so focus and screen readers can't wander into it, closes on Escape, and returns focus to whatever opened it when it's closed — all handled by the browser."),
      },
      bad: {
        label: "Bad — a positioned <div> standing in for a dialog",
        code: "<div class=\"modal-overlay\">\n  <div class=\"modal\">\n    <h2>Delete this file?</h2>\n    <button onclick=\"closeModal()\">Cancel</button>\n    <button onclick=\"confirmDelete()\">Delete</button>\n  </div>\n</div>",
        note: html("Nothing moves focus into the dialog when it opens, nothing stops Tab from wandering back out to the page underneath, and Escape does nothing — a keyboard or screen reader user can easily lose track of whether the dialog is even still open."),
      },
    },
    {
      context: "A focus outline removed with nothing to replace it",
      good: {
        label: "Good — outline kept for keyboard focus only",
        code: "button:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 2px;\n}",
        note: html("<code>:focus-visible</code> shows the outline when someone tabs to the button but skips it on a mouse click, so keyboard users keep a clear marker of where they are without a ring appearing on every click."),
      },
      bad: {
        label: "Bad — outline: none, nothing added back",
        code: "button:focus {\n  outline: none;\n}",
        note: html("This removes the browser's default focus indicator and puts nothing in its place — a keyboard user tabbing through the page has no way to see which button is about to activate when they press Enter."),
      },
    },
  ],
  mistakes: [
    { name: "Building custom controls out of <div> or <span>", body: html("Native elements (<code>&lt;button&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>) come with keyboard behavior, focus handling, and screen-reader semantics built in for free. Recreating one from a <code>&lt;div&gt;</code> means re-implementing all of that by hand — focusability, every keyboard interaction, every announcement — and it's almost always missing something.") },
    { name: "Images with no alt text, or alt text that doesn't help", body: html("A missing <code>alt</code> attribute makes a screen reader announce the filename instead of anything useful. A purely decorative image should get <code>alt=\"\"</code> so it's skipped entirely, not narrated. And alt text that just repeats a caption sitting right next to it, or describes irrelevant visual detail instead of the information the image is actually there to convey, technically exists without doing its job.") },
    { name: "Form fields with no visible, connected label", body: html("Placeholder text is not a label — it disappears the moment someone starts typing, offers no reminder if they forget what the field was, and some screen readers announce it inconsistently or not at all. Use a real <code>&lt;label&gt;</code> connected to the input with a matching <code>for</code>/<code>id</code> pair, so the label stays visible and gets announced every time.") },
    { name: "Removing the focus outline without replacing it", body: html("<code>outline: none</code> with nothing added back removes the only visual signal a keyboard user has for where they currently are on the page. If the default outline clashes with the design, restyle it — don't delete it. <code>:focus-visible</code> lets you do that while still skipping the ring on mouse clicks.") },
    { name: "Functionality that only works on hover", body: html("A menu or tooltip that only opens on mouse hover is unreachable by keyboard — there's no \"hover\" state to tab into — and unreliable on a touchscreen, where hover barely exists. Anything hover reveals needs a focus and/or tap equivalent, or it's invisible to everyone not using a mouse.") },
    { name: "Reordering content visually without reordering it in the HTML", body: html("CSS properties like <code>order</code>, <code>flex-direction: row-reverse</code>, or absolute positioning can make content appear in a different order on screen than it exists in the HTML. Tab order and most screen-reader navigation follow the HTML order, not the visual one, so a keyboard user can watch focus jump to a completely different part of the page than where their eyes are looking.") },
  ],
  checklist: [
    html("Every interactive control is reachable and operable with Tab, Enter, and Space alone."),
    html("Focus is always visible — never removed without a replacement like <code>:focus-visible</code>."),
    html("Icon-only buttons have an accessible name via <code>aria-label</code> or visually-hidden text."),
    html("Every image has appropriate <code>alt</code> text (or <code>alt=\"\"</code> if purely decorative)."),
    html("Every form field has a real, connected <code>&lt;label&gt;</code> — not a placeholder standing in for one."),
    html("Modals trap focus while open and return it to the trigger on close."),
    html("Visual order matches the HTML order, so Tab and screen readers follow what's actually shown on screen."),
    html("Headings are structured in order (one <code>&lt;h1&gt;</code>, then <code>&lt;h2&gt;</code>, etc.) so a screen reader user can navigate by heading."),
  ],
  practiceCourseId: "accessibility",
  goDeeper: [
    { lead: "WCAG's four principles (POUR)", body: html("content should be Perceivable (available to the senses, e.g. via alt text or captions), Operable (usable via keyboard and other input methods), Understandable (clear language and predictable behavior), and Robust (works with current and future assistive technology, largely via correct HTML semantics).") },
    { lead: "ARIA is a patch, not a first choice", body: html("ARIA attributes (<code>role</code>, <code>aria-*</code>) exist to describe custom components that HTML has no native element for. The first rule of ARIA is: if a native HTML element already does what you need, use that instead of adding ARIA to a div.") },
    { lead: "<dialog> handles focus, not naming", body: html("<code>showModal()</code> gives a dialog an implicit role of \"dialog\" and an implicit <code>aria-modal=\"true\"</code> for free, but it doesn't give the dialog an accessible name on its own. Pair it with <code>aria-labelledby</code> pointing at the dialog's own heading (or <code>aria-label</code> if it has none), so a screen reader announces what the dialog is about, not just that one opened.") },
    { lead: "Testing without a mouse", body: html("unplug your mouse (or just don't touch it) and try to complete your site's core task using only Tab, Shift+Tab, Enter, and Space. This alone catches a large share of accessibility issues before any specialized tooling is involved.") },
  ],
  datePublished: "2026-07-23",
};
