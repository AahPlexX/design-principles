// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const visualHierarchy: Principle = {
  slug: "visual-hierarchy",
  title: "Visual Hierarchy",
  category: "Foundations",
  blurb: "How size, contrast, spacing, and position decide what a reader notices first.",
  searchKeywords: "visual hierarchy how size, contrast, spacing, and position decide what a reader notices first",
  definition: html("Visual hierarchy is the order in which a reader's eye moves through a page — controlled by size, contrast, spacing, and position — so the most important thing gets noticed first, and everything else falls into place behind it."),
  whyItMatters: [
    html("Picture someone who has already decided to buy something — they've typed in their card number and are seconds from finishing. If the \"Complete purchase\" button and a \"Save for later\" button next to it are the same size, weight, and color, that shopper has to stop and read both labels carefully before clicking, right at the moment hesitation costs the sale the most. That pause isn't a personality quirk of one careless reader. It's what happens to anyone when a page gives two things equal <strong>visual weight</strong> — how strongly an element pulls the eye, based on its size, color, contrast, and position working together — and silently asks them to decide which one actually matters."),
    html("The same failure shows up more quietly, and far more often, on internal tools. A support dashboard that renders total tickets, tickets closed today, average response time, and a banner about a new integration all at the same 14px, medium-weight style gives an on-call engineer no way to tell which number needs their attention without reading every one of them first. Nothing on the screen is hidden — it's all equally loud, and equally loud has the same effect on a reader as unemphasized: nothing stands out enough to be read first."),
    html("Left unmanaged, this compounds over a product's lifetime. Each new banner, badge, or callout gets added at full visual weight because, in isolation, it looks reasonable — nobody sets out to build a cluttered screen in one sitting. A year of one more \"harmless\" addition at a time later, a page that launched with a single clear focal point has five things competing for the same top-of-attention spot, and the reader is left doing the sorting work the design was supposed to do for them."),
  ],
  coreRule: [
    html("Give every screen exactly one element with the most <strong>visual weight</strong> — how strongly something pulls the eye, based on its size, color, contrast, and position working together, not any single one of those alone. Before adding a second bold headline, a second brightly colored button, or a second large image, decide which single element matters most for this specific screen, then deliberately style everything else to weigh less than it. Hierarchy breaks the moment two elements compete for that same top spot."),
  ],
  examples: [
    {
      context: "Two primary buttons on a sign-up screen",
      good: {
        label: "Good — one loud action, one quiet one",
        code: "<h1>Start your free trial</h1>\n<p>No credit card required.</p>\n<button class=\"btn-primary\">Get started</button>\n<a class=\"btn-text\" href=\"/pricing\">See pricing</a>\n\n<style>\n.btn-primary {\n  background: #2952e3;\n  color: #ffffff;\n  font-weight: 600;\n  padding: 12px 24px;\n  border-radius: 6px;\n}\n.btn-text {\n  color: #2952e3;\n  font-weight: 400;\n  text-decoration: underline;\n}\n</style>",
        note: html("A filled, high-contrast button next to a plain underlined link makes the primary action unmistakable — the page has already decided what it wants the reader to do."),
      },
      bad: {
        label: "Bad — two buttons, equal weight",
        code: "<h1>Start your free trial</h1>\n<button class=\"btn-primary\">Get started</button>\n<button class=\"btn-primary\">See pricing</button>\n\n<style>\n.btn-primary {\n  background: #2952e3;\n  color: #ffffff;\n  font-weight: 600;\n  padding: 12px 24px;\n  border-radius: 6px;\n}\n</style>",
        note: html("Both buttons share the exact same background, weight, and size, so the reader has to read both labels and choose — the layout never actually decided which action was the point."),
      },
    },
    {
      context: "A hero illustration sized larger than the headline it supports",
      good: {
        label: "Good — art supports the headline",
        code: "<section class=\"hero\">\n  <img src=\"illustration.svg\" alt=\"\" class=\"hero-art\" />\n  <h1>Plan your trip in minutes</h1>\n  <p>Live pricing across 200 airlines.</p>\n</section>\n\n<style>\n.hero-art {\n  width: 220px;\n}\nh1 {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-top: 24px;\n}\n</style>",
        note: html("At 220px the illustration sets a friendly tone without competing with the 2.5rem, bold headline underneath it — a first-time visitor still reads the words first."),
      },
      bad: {
        label: "Bad — art outweighs the headline",
        code: "<section class=\"hero\">\n  <img src=\"illustration.svg\" alt=\"\" class=\"hero-art\" />\n  <h1>Plan your trip in minutes</h1>\n  <p>Live pricing across 200 airlines.</p>\n</section>\n\n<style>\n.hero-art {\n  width: 640px;\n}\nh1 {\n  font-size: 1.25rem;\n  font-weight: 500;\n  margin-top: 8px;\n}\n</style>",
        note: html("At 640px next to a 1.25rem headline, the illustration is nearly three times the headline's footprint and the headline is smaller than the body copy below it — the one thing a first-time visitor needs to read is the easiest thing on the screen to skip."),
      },
    },
    {
      context: "A metrics dashboard with no dominant number",
      good: {
        label: "Good — one clear headline metric",
        code: "<div class=\"dashboard\">\n  <div class=\"metric-hero\">\n    <span class=\"value\">$48,230</span>\n    <span class=\"label\">Revenue this month</span>\n  </div>\n  <div class=\"metric-row\">\n    <div class=\"metric-small\"><span>1,204</span> New signups</div>\n    <div class=\"metric-small\"><span>3.2%</span> Churn</div>\n    <div class=\"metric-small\"><span>92</span> Support tickets</div>\n  </div>\n</div>\n\n<style>\n.metric-hero .value {\n  font-size: 3rem;\n  font-weight: 700;\n}\n.metric-small span {\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n</style>",
        note: html("Revenue renders at 3rem while the other three metrics sit at 1.125rem — a viewer knows which number the business cares about most before reading a single label."),
      },
      bad: {
        label: "Bad — four equally weighted cards",
        code: "<div class=\"dashboard-grid\">\n  <div class=\"metric-card\"><span>$48,230</span> Revenue this month</div>\n  <div class=\"metric-card\"><span>1,204</span> New signups</div>\n  <div class=\"metric-card\"><span>3.2%</span> Churn</div>\n  <div class=\"metric-card\"><span>92</span> Support tickets</div>\n</div>\n\n<style>\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n.metric-card span {\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n</style>",
        note: html("All four cards share the same size, weight, and layout, so revenue carries no more visual weight than the support-ticket count next to it — the viewer has to read and compare all four before knowing which one matters."),
      },
    },
    {
      context: "Visual order rearranged away from the underlying HTML order",
      good: {
        label: "Good — visual order matches HTML order",
        code: "<div class=\"card\">\n  <h2>Order #48213</h2>\n  <p class=\"status\">Shipped</p>\n  <p class=\"detail\">Arriving Thursday</p>\n</div>\n\n<style>\n.card {\n  display: flex;\n  flex-direction: column;\n}\n</style>",
        note: html("A sighted reader scanning top to bottom and a screen reader (software that reads the page aloud or sends it to a braille display) announcing the same markup top to bottom land on the identical sequence: order number, then status, then detail."),
      },
      bad: {
        label: "Bad — flex-direction: column-reverse flips the visual order",
        code: "<div class=\"card\">\n  <p class=\"detail\">Arriving Thursday</p>\n  <h2>Order #48213</h2>\n  <p class=\"status\">Shipped</p>\n</div>\n\n<style>\n.card {\n  display: flex;\n  flex-direction: column-reverse;\n}\n</style>",
        note: html("<code>column-reverse</code> visually leads with \"Shipped,\" but the HTML — and everything a screen reader announces or a keyboard tabs through — still starts with \"Arriving Thursday.\" The two hierarchies disagree with each other."),
      },
    },
  ],
  mistakes: [
    { name: "Making everything bold or loud", body: html("If every heading, badge, and button is styled to stand out, none of them do — hierarchy only exists as contrast between an emphasized element and an unemphasized one. A dashboard where every metric renders at the same size, like the bad version of the metrics example above, is this mistake at the level of a whole screen.") },
    { name: "Running two primary actions on one screen", body: html("A checkout page with a full-price \"Buy now\" button and an equally styled \"Add to wishlist\" button next to it forces the reader to stop and decide which one the page actually wants clicked — see the sign-up example above for the fix: one filled button, one quieter text link.") },
    { name: "Sizing decorative art larger than the content it's framing", body: html("A large hero illustration above a small, easy-to-miss headline inverts the hierarchy the page actually needs — the mood-setting graphic gets read first, and the sentence explaining what the product does gets skipped.") },
    { name: "Letting CSS visual order drift from HTML order", body: html("Properties like <code>order</code> and <code>flex-direction: column-reverse</code> change what a sighted mouse user sees without touching the underlying markup, so a screen reader or keyboard user still moves through the original, un-reordered sequence — the two audiences experience two different hierarchies on the same page.") },
    { name: "Treating hierarchy as a one-time decision", body: html("Adding a new banner, badge, or callout to an existing screen without re-checking what it now competes with is how pages quietly end up with two or three \"most important\" elements a year after launch.") },
  ],
  checklist: [
    html("Each screen has exactly one element that reads as most important."),
    html("Primary and secondary actions are visually distinct (e.g., filled button vs. text link), never matched in weight."),
    html("A hero image or illustration is smaller and quieter than the headline it's supporting."),
    html("When several numbers appear together (a dashboard, a pricing table), one is visually dominant — not all sized the same."),
    html("Visual (CSS) order matches the underlying HTML order, verified with the Tab key and a screen reader, not by eye alone."),
    html("Adding a new banner, badge, or callout didn't quietly create a second competing focal point."),
  ],
  practiceCourseId: "visual-hierarchy",
  goDeeper: [
    { lead: "Gestalt grouping principles", body: html("Hierarchy leans on the same perceptual shortcuts as spacing does: proximity (items placed close together read as related), similarity (items sharing a style read as the same kind of thing), figure/ground (a clear separation between a foreground element and its background makes the foreground read as more important), common region (elements enclosed by a shared border or background are read as one group, even when they differ in size or color — the reason a card component groups its contents visually no matter what's inside it), the law of Prägnanz (the eye resolves an ambiguous or overly complex shape into the simplest, most recognizable form it can — the five interlocking Olympic rings read instantly as five circles, not as a knot of overlapping curves, because the simpler reading takes less mental effort), and the law of uniform connectedness (elements joined by a visible line or connector — a flowchart's boxes linked by arrows, or a chart's data point linked to its label by a thin leader line — read as related even more strongly than proximity or shared style alone would produce; it's a distinct principle from common region because it draws a line between elements instead of a border around them).") },
    { lead: "The Aesthetic-Usability Effect", body: html("People perceive attractive designs as more usable, even when the underlying usability hasn't actually changed — a polished-looking screen earns a reader's patience for a small rough edge that an ugly screen with the identical flaw wouldn't get. It's the Law of UX most directly adjacent to this page's core rule: getting visual weight right doesn't only guide the eye correctly, it also makes a screen look more considered, and that impression of polish primes a reader to judge it as easier to use before they've tried a single thing on it.") },
    { lead: "CRAP is a memory aid, not a fifth concept", body: html("Contrast, Repetition, Alignment, and Proximity — the CRAP mnemonic taught in many design courses — don't introduce anything new beyond what's already on this page and on Spacing & Layout. Contrast is this page's visual weight under another name; proximity and alignment are Gestalt principles covered on the Spacing & Layout page; repetition is what makes a button style or heading style recognizable as the same kind of thing everywhere it appears. The acronym exists only to make four already-covered ideas easier to hold in your head at once.") },
    { lead: "Reading patterns describe weak hierarchy, not a template", body: html("Eye-tracking research describes common scan patterns — an \"F\" shape for text-heavy pages, a \"Z\" shape for sparser ones — but these describe what eyes do by default when nothing on the page directs them otherwise. A page with strong, deliberate hierarchy overrides the default scan pattern instead of designing around it.") },
    { lead: "The CSS order property is a focus-order risk, not only a visual one", body: html("The <code>order</code> property, and values like <code>flex-direction: reverse</code> or <code>column-reverse</code>, change only how flex and grid items are painted on screen — they do not change the DOM order, so keyboard focus still moves, and screen readers still announce content, in the original source order. That is exactly how the mismatch in the reordering example above becomes possible, and why WCAG's Meaningful Sequence and Focus Order success criteria treat visual reordering as something to verify with a keyboard and a screen reader, not something to check by eye with a mouse alone.") },
    { lead: "Newer CSS is starting to close the gap", body: html("A newer pair of properties, <code>reading-flow</code> and <code>reading-order</code>, lets a developer state explicitly what order flex or grid items should be focused and read in, independent of their visual position. As of mid-2026 they ship only in Chromium-based browsers and are still labeled experimental, so they're worth watching rather than relying on as your only fix for a visual/DOM order mismatch today.") },
  ],
  datePublished: "2026-07-23",
};
