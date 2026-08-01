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
    html("Picture someone checking out on a shopping site late at night, on a phone with a spotty signal. They tap \"Place order,\" and the button looks exactly the same a second later as it did before the tap — same color, same label, nothing disabled, no spinner. They tap again, then once more just to be sure, because from where they're sitting there's no way to tell whether the first tap did anything at all. Three requests reach the server in the time it takes to think \"did that work?\" — and now there are three orders instead of one."),
    html("The opposite mistake causes real harm, not just annoyance. A hero section with an auto-playing background video, or a page where the background drifts at a different speed than the foreground as you scroll (a technique called parallax), keeps moving whether or not anyone asked it to. For most readers that's a mild distraction from the headline they came to read. For someone with a vestibular disorder — a condition affecting the inner ear's sense of balance — that same motion can trigger genuine dizziness or nausea, similar to how watching the scenery blur past a car's side window can sicken a passenger prone to motion sickness. That's not a matter of taste to wave off as \"some people find it distracting\"; it's a physical reaction some readers cannot push through to keep using the page."),
    html("Both failures trace back to the same misunderstanding: treating motion as decoration instead of as a channel of information. Motion's job is to answer three questions the reader is implicitly asking every time they act — did that register, what changed, and where did it go? An animation that doesn't answer one of those is either missing, leaving the reader guessing like the checkout example above, or in the way, competing for attention or causing discomfort like the parallax example. Get that balance right and motion becomes invisible in the best sense: the reader never has to wonder whether the interface heard them."),
  ],
  coreRule: [
    html("Every interactive action needs immediate feedback — a color change, a state change, a spinner, or (used sparingly) a short confirmation sound — and every animation needs a job: showing what changed, where it went, or that the system is working, never decoration for its own sake. A brief success or error sound is a legitimate feedback channel in its own right, and it's web-native, unlike haptic (vibration) feedback, which stays mostly in native mobile apps and is reasonably out of scope here. Before playing anything that isn't essential feedback, check <code>prefers-reduced-motion</code> — a setting the reader's operating system exposes to the browser once they've asked for less on-screen movement — and cut the motion itself, not the underlying state change it was communicating."),
  ],
  examples: [
    {
      context: "A button click with no visual confirmation",
      good: {
        label: "Good — a press state confirms the click",
        code: ".btn { transition: transform 0.15s ease-out; }\n.btn:active { transform: scale(0.97); }\n\n@media (prefers-reduced-motion: reduce) {\n  .btn { transition: none; }\n}",
        note: html("A short, purposeful press animation confirms the click registered. The reduced-motion query removes the animated transition, not the state change itself — the button still visibly presses, it just does so instantly instead of over 150ms."),
      },
      bad: {
        label: "Bad — nothing changes on press",
        code: ".btn {\n  /* no hover, active, or focus state at all */\n}\n\n<button onclick=\"submitOrder()\">Place order</button>\n<!-- looks identical before, during, and\n     after the click is handled -->",
        note: html("There's no way to tell the click landed. On a slow connection this is exactly what invites a second and third click on a request that's already in flight."),
      },
    },
    {
      context: "A form that takes a moment to submit",
      good: {
        label: "Good — the button shows it's working",
        code: "button.textContent = \"Placing order…\";\nbutton.disabled = true;\nbutton.setAttribute(\"aria-busy\", \"true\");\n\n// restore the label and re-enable the button\n// once the request resolves or fails",
        note: html("The label change and <code>aria-busy</code> tell a sighted reader and a screen-reader user alike that the request is in flight, and <code>disabled</code> physically blocks a second click from queuing a duplicate order."),
      },
      bad: {
        label: "Bad — the button stays clickable and silent",
        code: "<button onclick=\"submitOrder()\">\n  Place order\n</button>\n<!-- stays in this exact state for the\n     full duration of the network request -->",
        note: html("Nothing on screen indicates the request is running, so an impatient reader clicks again, and again, each click firing a fresh, identical request."),
      },
    },
    {
      context: "An auto-advancing hero carousel",
      good: {
        label: "Good — pausable, and off by default for reduced motion",
        code: "<div class=\"carousel\">\n  <button type=\"button\">Pause slideshow</button>\n</div>\n\n<script>\n  const reduceMotion =\n    matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n  // slides auto-advance every 6s, unless the\n  // reader has told their system they don't want it\n  if (!reduceMotion) startAutoAdvance();\n</script>",
        note: html("The visible pause control satisfies the requirement that any auto-advancing content running longer than five seconds be stoppable. Checking <code>prefers-reduced-motion</code> before ever starting the timer stops the motion outright for anyone who's asked for less of it — a CSS media query alone can pause a CSS animation, but it can't stop a JavaScript timer that's already running, so the check has to gate the code that starts it."),
      },
      bad: {
        label: "Bad — autoplays forever, no way to stop it",
        code: "<div class=\"carousel\">\n  <!-- slides auto-advance every 4s;\n       no pause control, no reduced-motion check -->\n</div>",
        note: html("Slides keep moving indefinitely with no control to pause, stop, or hide them, and no fallback for readers who've asked for less motion — a fast-cycling background someone is trying to read past."),
      },
    },
    {
      context: "A modal dialog opening",
      good: {
        label: "Good — a short transition tracks what appeared",
        code: ".modal {\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.2s, transform 0.2s;\n}\n.modal.is-open {\n  opacity: 1;\n  transform: translateY(0);\n}",
        note: html("A brief fade-and-rise gives the eye time to register that a new layer appeared and roughly where it came from, instead of the modal simply being there on the next frame."),
      },
      bad: {
        label: "Bad — the modal is just suddenly there",
        code: ".modal { display: none; }\n.modal.is-open { display: block; }",
        note: html("There's no intermediate state between hidden and shown — the layout jumps in a single frame, which is disorienting if it happens while someone is mid-read or clicking near that part of the screen."),
      },
    },
    {
      context: "A promotional banner that flashes for attention",
      good: {
        label: "Good — under three flashes per second",
        code: "@keyframes pulse {\n  50% { background-color: #fef08a; }\n}\n.flash-sale-banner {\n  animation: pulse 1s ease-in-out infinite;\n  /* one flash per second */\n}",
        note: html("One flash per second stays comfortably under WCAG 2.3.1's three-flashes-per-second seizure threshold — the point past which a flash can trigger a seizure in someone with photosensitive epilepsy — so the banner still grabs attention without carrying that risk."),
      },
      bad: {
        label: "Bad — strobes past the seizure threshold",
        code: "@keyframes strobe {\n  50% { background-color: #ff0000; }\n}\n.flash-sale-banner {\n  animation: strobe 0.15s steps(1) infinite;\n  /* toggles roughly 6-7 times per second */\n}",
        note: html("Toggling every 150ms flashes the banner six to seven times a second — more than double WCAG 2.3.1's three-per-second limit — and in saturated red, which the guideline treats as an even greater seizure risk than other colors. This isn't a matter of taste; it's a physical hazard for a real, definable population of readers."),
      },
    },
  ],
  mistakes: [
    { name: "No loading state for anything that takes a moment", body: html("A form submission, a search, or a page navigation that takes more than a couple hundred milliseconds needs a visible pending state — a spinner, a progress bar, or a disabled button — or the reader has no way to know whether to wait or try again. A spinner says <em>something is happening, but how long is unknown</em> (indeterminate); a progress bar says <em>X% done, here's how much is left</em> (determinate) — reach for a progress bar whenever the remaining work can actually be calculated, and fall back to a spinner when it can't. See the form-submission example above for what that pending state should actually communicate.") },
    { name: "Feedback animations that are too slow or too fast to read", body: html("Under roughly 100ms, a transition happens faster than the eye can register it, so it might as well be instant. Much past 500ms for a simple UI response — a menu opening, a tab switching — starts to feel sluggish rather than responsive. Most feedback animations belong well inside that window.") },
    { name: "Flashing or strobing content with no safeguard", body: html("Content that flashes more than three times in any one-second window — a fast-cycling promotional banner, a strobing loading animation, a rapid-cut video background — can trigger a seizure in someone with photosensitive epilepsy. That's a different hazard from the vestibular discomfort large-scale motion causes below: it's about flash rate and contrast, not the scale of movement, and it needs its own safeguard. Keep any flashing effect under that three-per-second threshold, or gate it behind an explicit warning and opt-in instead of playing it automatically (WCAG 2.3.1).") },
    { name: "Mishandling prefers-reduced-motion — ignoring it, or overcorrecting", body: html("Large-scale motion — parallax, zooming transitions, auto-playing background video — can trigger real vestibular discomfort for some readers, and checking for <code>prefers-reduced-motion</code> isn't a polish item to add if there's time left; it's respecting a preference the reader deliberately set at the operating-system level. But the setting asks for less motion, not silence: a press state, a focus outline, and a loading indicator aren't the large-scale motion it exists to suppress, so cutting feedback animations along with the decorative ones trades one accessibility problem for another — now the reader who asked for calmer motion also can't tell whether their click registered.") },
    { name: "Motion used purely as decoration", body: html("An element that animates in for no reason connected to what the reader is doing competes with the content for attention instead of supporting it. If removing an animation would change nothing about whether the reader can tell what happened, it was decoration, not feedback.") },
    { name: "Abrupt layout changes with no transition", body: html("Content that appears, disappears, or moves instantly — an accordion snapping open, a modal appearing with no transition — can be disorienting, because there's no visual thread connecting the before and after. A short transition, like the modal example above, gives the eye time to track what moved and where it went.") },
  ],
  checklist: [
    html("Every clickable control has a visible hover, active/pressed, and focus state."),
    html("Any action that takes noticeable time shows a loading or pending state, and disables the trigger so a second click can't queue a duplicate request."),
    html("UI feedback transitions land roughly in the 100–500ms range — long enough to register, short enough to feel instant."),
    html("<code>prefers-reduced-motion: reduce</code> turns off decorative and large-scale motion, while pressed states, focus indicators, and loading indicators still show up, just without the animated transition."),
    html("Any content that moves, auto-advances, or auto-updates for more than 5 seconds has a visible pause, stop, or hide control (WCAG 2.2.2, Level A)."),
    html("Elements that appear, disappear, or reposition get a short transition instead of snapping instantly."),
    html("Nothing on the page flashes more than three times in any one-second window (WCAG 2.3.1) — a seizure risk for photosensitive readers, separate from the vestibular-motion checks above."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Easing matters as much as duration", body: html("A linear transition (constant speed from start to finish) reads as mechanical. Easing curves that start fast and settle — <code>ease-out</code> — generally feel more natural for elements entering the screen; <code>ease-in</code>, which starts slow and accelerates, suits elements leaving it.") },
    { lead: "WCAG 2.2.2 (Pause, Stop, Hide)", body: html("This is a Level A success criterion — the baseline tier of WCAG conformance, required before a site can claim any level of accessibility compliance. It requires that any moving, blinking, scrolling, or auto-updating content lasting more than five seconds have a way for the reader to pause, stop, or hide it. The five-second threshold applies to the overall effect, not each individual transition — a carousel that keeps cycling past five seconds needs the control even if any single slide only shows for two or three.") },
    { lead: "Vestibular disorders and motion", body: html("Large-scale movement — especially simulated motion like parallax scrolling or zooming transitions — can trigger real physical symptoms (dizziness, nausea, migraine) for people with vestibular disorders, which affect the inner ear's sense of balance. That's the specific harm <code>prefers-reduced-motion</code> exists to let people opt out of — not a general preference against liveliness, but a documented physical trigger.") },
  ],
  datePublished: "2026-07-23",
};
