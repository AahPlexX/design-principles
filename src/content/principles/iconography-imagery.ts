// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const iconographyImagery: Principle = {
  slug: "iconography-imagery",
  title: "Iconography & Imagery",
  category: "Foundations",
  blurb: "Choosing icons and images so their meaning is clear, not just decorative filler.",
  searchKeywords: "iconography imagery icons choosing icons and images so their meaning is clear not just decorative filler",
  definition: html("Icons and images are pictures a page uses instead of, or alongside, words. Like words, they need to be clear and purposeful — a picture only helps if the reader gets its meaning as fast as they'd get a label, not slower."),
  whyItMatters: [
    html("Open a food-delivery app's redesigned bottom bar and you'll often find four icons in a row — a house, a bag, a receipt, a person — with no word under any of them. A first-time user taps the receipt hoping it's their order history, lands on a coupon page instead, backs out, tries the bag, and finds the right screen on the third guess. Nothing was broken; every icon rendered exactly as designed. The problem is that four small pictures were asked to do a job words already do reliably, and none of them is unambiguous enough to do it alone."),
    html("An icon with no accompanying label is a bet that the reader already shares your exact visual vocabulary, and that vocabulary is far shakier than most teams assume. Even the icons treated as timeless exceptions only work because of decades of repeated exposure, not because their shape explains itself: the floppy disk that still means \"save\" depicts an object most people under 30 have never held, yet Nielsen Norman Group's research on the icon found that 96% of participants still correctly read it as either a floppy disk or as meaning \"save\" — purely because they've seen that exact shape in the same corner of the same toolbar thousands of times. A brand-new icon, or a familiar icon repurposed for a slightly different meaning than the one it built its reputation on, gets none of that inherited recognition. A reader just sees a shape."),
    html("That guesswork has a measured cost, not just an annoying one. When Nielsen Norman Group tested navigation hidden behind an icon (the classic \"hamburger\" menu) against navigation that stayed visible, people used the hidden menu in only 27% of relevant desktop tasks, compared to 48% for menus that stayed visible and 50% for a hybrid (\"combo\") pattern that showed the top-level items directly and tucked the rest behind a hamburger. The icon rendered fine — it just didn't get clicked. Decorative imagery erodes trust in a quieter way: a stock photo of strangers laughing at a laptop, dropped next to copy about a specific feature, adds download weight and tells the reader nothing about what that feature actually does. A reader who's learned that the photo next to a headline is usually filler starts skimming past the whole block — real information included."),
  ],
  coreRule: [
    html("Never let an icon carry meaning by itself unless it belongs to the small set of icons that have become genuinely universal through decades of repetition — a magnifying glass for search, an X to close, a checkmark for done. Every other icon needs a visible text label, at least the first time a reader encounters it, or an <strong>accessible name</strong>: text that isn't shown on screen but is announced to assistive technology such as a screen reader (software that reads a page aloud for someone who can't see it), so a reader who can't see the icon still knows what it does. A tooltip that only appears once a mouse hovers in place doesn't count as a reliable stand-in for either one — it never appears on a touchscreen, and screen readers expose it inconsistently at best."),
  ],
  examples: [
    {
      context: "An icon-only link in a navigation bar",
      good: {
        label: "Good — the label carries the meaning",
        code: "<nav>\n  <a href=\"/settings\">\n    <svg aria-hidden=\"true\">...</svg>\n    <span>Settings</span>\n  </a>\n</nav>",
        note: html("The gear reinforces the word instead of replacing it. A reader who's never seen this exact icon before still knows exactly where the link goes, because the label — not the picture — is doing the actual communicating."),
      },
      bad: {
        label: "Bad — meaning depends on a guess",
        code: "<nav>\n  <a href=\"/settings\">\n    <svg>...</svg>\n  </a>\n</nav>",
        note: html("A gear with no label could mean settings, tools, mechanics, or \"in progress,\" and nothing in the icon itself rules any of those out. The reader has to click to find out, which is exactly the interaction cost a label exists to remove."),
      },
    },
    {
      context: "A refresh icon that could mean three different things",
      good: {
        label: "Good — one glyph, one reading",
        code: "<button type=\"button\">\n  <svg aria-hidden=\"true\"><!-- circular-arrow icon --></svg>\n  <span>Refresh results</span>\n</button>",
        note: html("Refresh, sync, reset, and reload all share some version of this circular-arrow shape. The visible word next to it settles which one this particular button does, instead of leaving it to the reader's best guess."),
      },
      bad: {
        label: "Bad — a tooltip only a patient mouse user will see",
        code: "<button type=\"button\" title=\"Refresh\">\n  <svg aria-hidden=\"true\"><!-- circular-arrow icon --></svg>\n</button>",
        note: html("A <code>title</code> attribute isn't a substitute for a visible label — it only appears once a mouse hovers in place for a second, never appears on a touchscreen at all, and screen readers announce it inconsistently. Everyone else just sees an unlabeled icon."),
      },
    },
    {
      context: "A feature page's hero image",
      good: {
        label: "Good — shows the actual product",
        code: "<img\n  src=\"/img/export-dialog.png\"\n  alt=\"The export dialog, with CSV and PDF options and a date-range picker\"\n/>",
        note: html("A real screenshot answers the reader's actual question — what does this feature look like, and what does it let me do — before they've clicked anything."),
      },
      bad: {
        label: "Bad — generic and uninformative",
        code: "<img\n  src=\"/img/stock-people-laptop.jpg\"\n  alt=\"People collaborating\"\n/>",
        note: html("This photo could sit on almost any software company's homepage without anyone noticing it was swapped in. It adds download weight and answers none of the reader's real questions about the feature next to it."),
      },
    },
    {
      context: "A close button in a modal dialog",
      good: {
        label: "Good — announced to everyone, not just sighted users",
        code: "<button type=\"button\" aria-label=\"Close dialog\">\n  <svg aria-hidden=\"true\"><!-- X shape --></svg>\n</button>",
        note: html("The X is one of the handful of icons genuinely universal enough to skip a visible label for sighted readers — but <code>aria-label</code> still gives a screen reader something to announce besides the bare word \"button.\""),
      },
      bad: {
        label: "Bad — silent to a screen reader",
        code: "<button type=\"button\">\n  <svg><!-- X shape --></svg>\n</button>",
        note: html("Visually complete, functionally silent: a screen reader user hears \"button\" with no name and no purpose, and has to explore the rest of the dialog to work out what it does, if they find it at all."),
      },
    },
  ],
  mistakes: [
    { name: "Inventing a custom icon for a common action", body: html("A novel icon for \"save,\" \"delete,\" or \"share\" that doesn't resemble the floppy disk, trash can, or share-arrow convention people already recognize makes them re-learn something they already knew how to do.") },
    { name: "Pairing two ambiguous icons with no label", body: html("A pencil (edit) next to a document (view, or create a new one?), both icon-only, forces a guess between two plausible readings — and sitting side by side, the two icons make each other harder to parse, not easier, because the reader is comparing shapes instead of reading words.") },
    { name: "Decorative stock photography with no connection to the content", body: html("A generic photo of people smiling at a laptop, next to text about a specific feature, adds load time and visual noise without adding information — see the hero-image example above for what a real screenshot does instead.") },
    { name: "Mixing icon styles within one interface", body: html("Combining outlined and filled icons, or icons pulled from different sets with different stroke widths and corner radii, reads as unpolished and makes it harder to tell which icons belong to the same system — a reader starts wondering if a slightly different style means a different kind of action. A consistent icon system usually means every icon is drawn on the same canvas size, with the same stroke width and the same corner-rounding convention, so the whole set reads as one coherent family instead of a pile of mismatched imports from different sources.") },
    { name: "Relying on a tooltip or title attribute as the only explanation", body: html("A native HTML <code>title</code> attribute only appears after a mouse hovers in place for a second, never appears on a touchscreen, and is announced inconsistently by screen readers — see the refresh-icon example above for a label that works everywhere, not only for a patient mouse user.") },
    { name: "Testing icon meaning only on the people who designed it", body: html("A team that's stared at an icon for weeks will always find it obvious — the only real test is someone seeing it for the first time, ideally someone outside the team and outside the age range the icon happens to be most familiar to.") },
  ],
  checklist: [
    html("Every icon whose meaning isn't universally obvious has a visible text label, at least on first use."),
    html("Icon-only buttons have an accessible name (an <code>aria-label</code> or equivalent) even when a sighted user would recognize the icon instantly. They also meet <a href=\"/design-principles/principles/responsive-design.html\">Responsive Design</a>'s touch-target-size rule — a cramped tap target undermines an icon button as surely as a missing label does."),
    html("No meaningful icon depends on a <code>title</code> attribute or hover-only tooltip as its only explanation."),
    html("Icons come from one consistent visual system: stroke width, corner radius, and fill style all match."),
    html("Every image serves a real communicative purpose — a real screenshot or diagram, not decoration for its own sake."),
    html("Icon meaning has been checked against someone outside the team who's seeing it for the first time."),
    html("Images have appropriate <code>alt</code> text (see the Accessibility page for the full rule)."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "SVG over icon fonts", body: html("Icon fonts work by mapping each icon glyph (the drawn shape) to a Unicode code point — a numeric identifier, the exact same mechanism that maps an ordinary letter like \"A\" to the character your screen displays for it. That shared mechanism is exactly why an icon font can misfire: if the font fails to load, the browser still has the code point but no icon font left to supply a shape for it, so it falls back to whatever character a default font assigns to that same number — a reader, and a screen reader reading the page aloud, can end up seeing or hearing a stray letter instead of the icon's meaning. Inline SVG (Scalable Vector Graphics — a vector image format written directly as markup rather than drawn from a font, so it can be styled with CSS and scales to any size without blurring) sidesteps that failure mode entirely: it, or an <code>&lt;img&gt;</code> referencing one, renders correctly whether or not any font has loaded, and can carry its own <code>aria-hidden</code> or accessible name directly.") },
    { lead: "The handful of genuinely universal icons", body: html("A magnifying glass (search), an X (close), a hamburger (menu, though its own meaning is learned rather than intuitive), and a few others have become safe to use without a label purely through decades of repetition — but this list is much shorter than most teams assume, and it doesn't grow just because your specific audience uses the product daily.") },
    { lead: "Cultural variation in imagery", body: html("Hand gestures, color associations (white for mourning vs. celebration), and even the reading direction implied by an arrow or a progression of images can carry different meaning across cultures — worth a deliberate check for anything shipping to a global audience.") },
    { lead: "Art direction vs. responsive resizing", body: html("Responsive resizing — covered by <a href=\"/design-principles/principles/responsive-design.html\">Responsive Design</a>'s <code>srcset</code>/<code>sizes</code> guidance — serves the exact same crop of an image at different file sizes, so a phone downloads fewer pixels than a desktop monitor does. Art direction is a different problem: serving a genuinely different crop or composition at different breakpoints, such as a tight portrait crop of a person's face on a narrow phone screen versus a wide establishing shot of the whole scene once a desktop layout has the room for it. The <code>&lt;picture&gt;</code> element handles this case: each <code>&lt;source&gt;</code> inside it carries a <code>media</code> attribute written in the same syntax as a CSS media query, and the browser uses the first <code>&lt;source&gt;</code> whose condition matches, falling back to the required <code>&lt;img&gt;</code> if none do — for example, <code>&lt;source media=\"(min-width: 800px)\" srcset=\"wide-shot.jpg\"&gt;</code> paired with a narrower <code>&lt;img src=\"tight-crop.jpg\" alt=\"...\"&gt;</code> as the fallback.") },
  ],
  datePublished: "2026-07-27",
};
