// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const motionFeedback: Principle = {
  slug: "motion-feedback",
  title: "Motion & Feedback",
  category: "Inclusive by Default",
  blurb: "Using animation and visual response to confirm an action happened, without turning it into decoration.",
  searchKeywords: "motion feedback animation using animation to confirm an action happened without turning it into decoration",
  definition: html("Motion and feedback are the visual responses that confirm an action actually happened — a button pressing down, a spinner while something loads, a panel sliding in — used to show what changed and where, not to decorate the page."),
  whyItMatters: [
    html("A button that looks exactly the same before and after being clicked leaves the reader unsure whether anything happened at all — which is how people end up clicking \"Submit\" three times and accidentally placing three orders. The opposite problem is just as real: motion added purely for polish (auto-playing carousels, aggressive parallax scrolling) pulls attention away from the content someone actually came for, and can cause real discomfort — nausea or dizziness — for people sensitive to motion."),
  ],
  coreRule: [
    html("Every interactive action needs immediate, visible feedback, and every animation needs a job: showing what changed, where it went, or that the system is working — not decoration for its own sake. And always check for <code>prefers-reduced-motion</code> before playing anything non-essential."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: ".btn { transition: transform 0.15s; }\n.btn:active { transform: scale(0.97); }\n\n@media (prefers-reduced-motion: reduce) {\n  .btn { transition: none; }\n}",
      note: html("A short, purposeful press animation confirms the click registered, and it's disabled entirely for anyone who has asked their system to reduce motion."),
    },
    bad: {
      label: "Bad",
      code: ".btn { /* no active/hover/focus state at all */ }\n/* form submit button with no loading\n   indicator while the request is pending */",
      note: html("Nothing visibly changes on press, and if the form takes a moment to submit, there's no indication anything is happening — inviting repeat clicks on a request that's already in flight."),
    },
  },
  mistakes: [
    { name: "No loading state for anything that takes time", body: html("A form submit, a search, a page navigation that takes more than a couple hundred milliseconds needs a visible pending state (a spinner, a disabled button, a progress indicator) — otherwise the reader has no way to know whether to wait or try again.") },
    { name: "Animations that are too slow or too fast to read", body: html("Under about 100ms, a transition is imperceptible and might as well not exist; much past 500ms for a simple UI transition (a menu opening, a tab switching) starts to feel sluggish rather than responsive. Most UI feedback animations land well inside that range.") },
    { name: "Ignoring prefers-reduced-motion", body: html("Large-scale motion (parallax, zooming transitions, auto-playing background video) can trigger real vestibular discomfort for some people — this isn't a preference to politely support, it's an accessibility requirement to respect.") },
    { name: "Motion used purely as decoration", body: html("An element that animates in for no reason connected to what the reader is doing competes with the content for attention instead of supporting it.") },
    { name: "Abrupt layout changes with no transition", body: html("Content that appears, disappears, or moves instantly (an accordion snapping open, a modal appearing with no transition) can be disorienting — a short transition helps the reader track what moved and where it went.") },
  ],
  checklist: [
    html("Every clickable control has a visible hover, active/pressed, and focus state."),
    html("Any action that takes noticeable time shows a loading or pending indicator."),
    html("UI transitions land roughly in the 150–500ms range."),
    html("<code>prefers-reduced-motion: reduce</code> disables or minimizes non-essential animation."),
    html("No motion that autoplays for more than 5 seconds without a way to pause it (a WCAG requirement, not just a nicety)."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Easing matters as much as duration", body: html("A linear transition (constant speed start to finish) reads as mechanical; easing curves that start fast and settle (ease-out) generally feel more natural for elements entering the screen, while ease-in suits elements leaving it.") },
    { lead: "WCAG 2.2.2 (Pause, Stop, Hide)", body: html("any moving, blinking, or auto-updating content that lasts more than five seconds must have a way for the reader to pause, stop, or hide it — this covers carousels, auto-advancing slideshows, and background video alike.") },
    { lead: "Vestibular disorders and motion", body: html("large-scale movement — especially simulated 3D motion like parallax scrolling or zooming transitions — can trigger real physical symptoms (dizziness, nausea) for people with vestibular disorders, which is the specific harm <code>prefers-reduced-motion</code> exists to let people opt out of.") },
  ],
  datePublished: "2026-07-23",
};
