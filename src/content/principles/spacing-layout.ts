// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const spacingLayout: Principle = {
  slug: "spacing-layout",
  title: "Spacing & Layout",
  category: "Foundations",
  blurb: "Whitespace and alignment as the tools that show a reader what belongs together.",
  searchKeywords: "spacing layout whitespace and alignment as the tools that show a reader what belongs together",
  definition: html("Spacing is the empty room you leave around and between things. Layout is how you arrange them. Together they're the main tool for showing a reader which things are related without needing a label or a border to say so."),
  whyItMatters: [
    html("Picture a signup form where every margin is set to the same 16 pixels: the gap under a label, the gap under its input, the gap before the next field's label all match exactly. In the design file it looks disciplined — everything evenly spaced, nothing crowded. But hand it to someone actually filling it out and their eye can't find the field groups: the label above \"Last name\" sits exactly as close to the \"First name\" input above it as it does to its own field below. That's not a wording problem or a color problem. It's proximity — one of the Gestalt principles of perception (a set of rules, described by early-20th-century psychologists, for how the eye automatically groups what it looks at) — working against the page instead of for it. Things placed close together get read as belonging together, and things placed far apart get read as unrelated, before a reader has consciously parsed a single word of the label. Uniform spacing doesn't read as tidy. It reads as unlabeled."),
    html("The same failure compounds once it spreads across a whole page instead of one form. A settings screen where the gap between \"Profile\" and \"Notifications\" matches the gap between every field inside each of those sections looks like one long undifferentiated list of controls — a reader has to read every line to find where one topic stops and the next starts, instead of finding the boundary by glancing at the gaps. Inconsistent spacing does the same damage from the opposite direction: a page where margins were picked by eye, component by component — 13px here, 22px there, 18px somewhere else — reads as sloppy even though no single gap looks wrong in isolation. The eye picks up the absence of a pattern before the conscious mind can name what's off, the same way a page set in five slightly different fonts looks wrong before anyone notices it's the fonts."),
    html("On a touchscreen, the same failure has a sharper, more immediate cost. Two buttons placed edge-to-edge with no gap between them turn a single tap into a coin flip on a small screen, and the person who meant to tap \"Save draft\" hits \"Delete draft\" instead — not because they were careless, but because there was no room on the screen for their thumb to be as precise as the layout assumed it would be. The fix is almost never a bigger button; it's the empty space around it. A generous gap between adjacent controls prevents more mistaps than a larger hit area does, and unlike a redesigned button, it costs nothing to add."),
  ],
  coreRule: [
    html("Make the space between related items smaller than the space between unrelated groups, every time — proximity is the signal, so if two things are supposed to read as connected, the gap between them needs to be the smallest gap around them, not just smaller than average. Then pick every spacing value from one fixed scale — a short, deliberate list of allowed numbers (for example 4, 8, 12, 16, 24, 32, 48px) — instead of typing whatever pixel value looks right for a component in the moment. A scale keeps every gap on the page visibly related to every other gap, the same way a shared color palette keeps every color on the page visibly related instead of looking like fifty accidental shades of blue."),
  ],
  examples: [
    {
      context: "Label-to-field vs. group-to-group spacing in a form",
      good: {
        label: "Good — 8px label-to-input, 24px group-to-group",
        code: ".field { margin-bottom: 24px; }       /* gap before the next field group */\n.field label { margin-bottom: 8px; }   /* gap from a label to its own input */",
        note: html("The gap under a label (8px) is a third the size of the gap under a finished field (24px), so proximity alone tells the reader which input belongs to which label before they've read a single word of either one."),
      },
      bad: {
        label: "Bad — 16px everywhere",
        code: ".field { margin-bottom: 16px; }\n.field label { margin-bottom: 16px; }",
        note: html("Equal spacing erases the one signal that told the reader where a field group ends — the label above \"Last name\" now sits exactly as close to the \"First name\" input as it does to its own."),
      },
    },
    {
      context: "A spacing scale vs. ad hoc pixel values",
      good: {
        label: "Good — every gap traces back to one of five numbers",
        code: ":root {\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-3: 16px;\n  --space-4: 24px;\n  --space-5: 32px;\n}\n\n.card { padding: var(--space-3); }\n.card + .card { margin-top: var(--space-4); }\n.card h3 { margin-bottom: var(--space-2); }",
        note: html("Every margin and padding on the page is one of five allowed values, so a 16px gap anywhere on the site means the same relationship — related items, one step apart on the scale — as a 16px gap anywhere else."),
      },
      bad: {
        label: "Bad — three unrelated numbers, chosen by eye",
        code: ".card { padding: 18px; }\n.card + .card { margin-top: 25px; }\n.card h3 { margin-bottom: 11px; }",
        note: html("18px, 25px, and 11px might each look fine in isolation, but none of them is related to the others. The next component styled by someone else, on a different day, invents three more numbers just as arbitrary, and the page slowly loses any shared rhythm at all."),
      },
    },
    {
      context: "Centered vs. left-aligned body copy",
      good: {
        label: "Good — left-aligned, one edge to track",
        code: ".article p {\n  max-width: 65ch;   /* roughly 65 characters per line */\n  text-align: left;\n}",
        note: html("Every line starts at the same horizontal position, so the eye returns to one fixed spot at the start of each line instead of relocating it. The 65-character measure keeps lines inside the range — roughly 45 to 75 characters — that's easiest to track without losing your place, in either direction."),
      },
      bad: {
        label: "Bad — centered, a new edge every line",
        code: ".article p {\n  max-width: 65ch;\n  text-align: center;\n}",
        note: html("Every line starts at a different horizontal position, so the eye has to search for where the next line begins instead of sweeping back to a fixed edge. Fine for a one- or two-line pull quote; exhausting across a full paragraph."),
      },
    },
    {
      context: "Marking a section break with space vs. with a border",
      good: {
        label: "Good — 48px of space marks the break",
        code: ".settings-section + .settings-section {\n  margin-top: 48px;\n}",
        note: html("48px is larger than any gap used inside a section, so the jump itself reads as \"new topic\" before the reader even reaches the next heading — no divider required."),
      },
      bad: {
        label: "Bad — a border compensating for too little space",
        code: ".settings-section + .settings-section {\n  margin-top: 16px;\n  border-top: 1px solid #d0d0d0;\n}",
        note: html("The border is doing a job that more space could do with less visual noise. Sections stacked 16px apart don't feel separate on their own, so a line gets added to say what the spacing should already have said."),
      },
    },
  ],
  mistakes: [
    { name: "Equal spacing everywhere", body: html("When every gap on the page measures the same, nothing reads as a group. A settings page with 16px between every label, input, and section heading looks like one long undifferentiated list of controls, not a page organized into topics.") },
    { name: "Centering body copy", body: html("Centered text gives the eye a different starting position on every line, forcing a reader to relocate the start of the next line instead of sweeping back to one fixed edge. Reserve centering for headlines and other short, single-line elements where there's no \"next line\" to relocate — left-align (right-align for RTL languages) anything longer.") },
    { name: "Picking spacing values by eye, component by component", body: html("Without a shared scale, a page ends up with dozens of near-identical gaps — 13px here, 15px there, 22px somewhere else — that read as sloppy even though no single one looks wrong in isolation.") },
    { name: "Cramming content edge-to-edge on mobile to \"fit more in\"", body: html("Removing margin on small screens doesn't create more usable space — it removes the breathing room that makes content feel readable instead of crowded, and it's usually the first thing a reader notices as \"off\" about a page even if they can't say why.") },
    { name: "Reaching for a border or background tint before trying more space", body: html("A visible line or a tinted background is a heavier signal than most page structure needs. Try a bigger gap — and a heading, if one is warranted — before adding a border; it usually does the same job with less visual noise.") },
    { name: "Stacking margin on children inside a flex or grid container that already sets gap", body: html("<code>gap</code> already puts space between every child of a flex or grid container. Adding margin on top of it doubles the space at some edges and not others, producing gaps that look inconsistent even though every value in the CSS is deliberate. Use one or the other on a given axis, not both.") },
  ],
  checklist: [
    html("Related items sit closer together than unrelated items — proximity, not a label, tells the reader what's grouped."),
    html("Every spacing value comes from one fixed scale (e.g. 4, 8, 12, 16, 24, 32, 48px), not a number chosen by eye."),
    html("Body copy is left-aligned (right-aligned for RTL) with one consistent edge; centering is reserved for headlines and other short, single-line elements."),
    html("Body copy's measure stays around 45–75 characters per line, not stretched edge-to-edge on a wide screen."),
    html("Interactive elements (buttons, links, form controls) have enough space around them that a mistap or misclick is unlikely."),
    html("A section break is legible from spacing alone before a border or background color gets added."),
    html("Mobile layouts keep consistent margin at the screen edge — nothing touches the edge of the viewport."),
    html("Flex and grid containers use <code>gap</code> for spacing between children instead of doubling up with margin on every child."),
  ],
  practiceCourseId: "spacing-layout",
  goDeeper: [
    { lead: "Margin collapsing, and why gap sidesteps it", body: html("Two block-level elements stacked in normal flow don't add their vertical margins together — a 24px <code>margin-bottom</code> on one and a 24px <code>margin-top</code> on the next collapse into a single 24px gap, not 48px, because adjoining vertical margins between block boxes merge into whichever one is larger. This doesn't happen inside a flex or grid container, and it never happens between horizontal margins — which is exactly why relying on margin for spacing produces gaps of inconsistent size depending on where in the layout it's used. <code>gap</code> on a flex or grid container sidesteps the question entirely: it's never subject to collapsing, so a 24px gap is 24px everywhere it appears.") },
    { lead: "WCAG's target-size rule is a spacing rule in disguise", body: html("WCAG 2.2's Success Criterion 2.5.8, Target Size (Minimum) — a Level AA requirement — says an interactive target should be at least 24 by 24 CSS pixels. But a smaller target still passes if it has enough room around it: specifically, if a 24-pixel-diameter circle centered on it doesn't overlap the circle of any neighboring target. Size and space are treated as substitutes for each other. 24×24 is a floor, not a recommendation — Apple's Human Interface Guidelines call for 44 points and Google's Material Design calls for 48dp, both larger than the WCAG minimum.") },
    { lead: "The 8-point grid", body: html("Basing every spacing and sizing value on a multiple of 8px (with 4px available for finer adjustments) is a common convention, not a technical requirement. It persists because 8 divides evenly into the screen densities most devices actually use, and because a small, fixed set of allowed numbers is easier for a team to hold in their heads — and stay consistent with — than an unbounded one.") },
    { lead: "Gestalt principles beyond proximity", body: html("Similarity (things that look alike are read as related), common region (a shared background or border groups whatever sits inside it), and alignment (items sharing an edge are read as connected) all combine with proximity to communicate structure without a single word of labeling.") },
  ],
  datePublished: "2026-07-23",
};
