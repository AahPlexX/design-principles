// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const colorContrast: Principle = {
  slug: "color-contrast",
  title: "Color & Contrast",
  category: "Foundations",
  blurb: "Why some color pairs are unreadable, and the math that tells you which ones are safe.",
  searchKeywords: "color contrast why some color pairs are unreadable and the math that tells you which ones are safe",
  definition: html("Contrast is how different two colors look next to each other — usually text against its background. It's not a matter of taste: there's a formula for it, and a minimum score text needs to hit before it's reliably readable."),
  whyItMatters: [
    html("Picture a designer working on a laptop in a dim office, screen brightness turned down, eyes adjusted to the room. Light-gray text on a white background looks clean there — understated, modern, exactly the mood the mockup is going for. That same page, opened on a phone in direct sunlight, or on an older monitor with washed-out blacks, or by someone in their fifties whose eyes no longer separate close shades of gray as sharply as they used to, is a page with no visible text at all. The color choice didn't change. The reader's ability to see it did."),
    html("This isn't a small or edge-case audience. Contrast sensitivity — the eye's ability to tell a color apart from what's behind it — declines gradually for almost everyone starting in their forties, long before anyone would describe themselves as having \"low vision.\" Add outdoor glare, a cheap uncalibrated screen, or a genuine visual impairment, and low-contrast text stops being merely uncomfortable and becomes unreadable for a meaningful share of any real audience — not a rare accommodation, a routine one."),
    html("The cost isn't abstract either: a reader who can't comfortably read your price, your error message, or your button label doesn't file a complaint — they leave, or they guess, or they assume the button is disabled because it looks too faint to be clickable. Contrast failures read as bugs even when no code broke."),
  ],
  coreRule: [
    html("Body text needs a contrast ratio of at least <strong>4.5:1</strong> against its background. Large text (24px and up, or bold text 18.66px and up) can drop to <strong>3:1</strong>, since bigger, heavier strokes stay legible at a lower ratio. These numbers come from WCAG (the Web Content Accessibility Guidelines — the standard most accessibility laws and audits are measured against), and you never have to eyeball them: every browser's built-in dev tools calculate the exact ratio for any two colors you pick."),
  ],
  examples: [
    {
      context: "Body text on a white card",
      good: {
        label: "Good — 17.1:1",
        code: "color: #1a1a2e;      /* near-black text */\nbackground: #ffffff; /* white */",
        note: html("Comfortably clears the 4.5:1 minimum with enormous room to spare — this pair would still read clearly even on a washed-out screen in bright light."),
      },
      bad: {
        label: "Bad — 2.6:1",
        code: "color: #a0a0a0;      /* light gray text */\nbackground: #ffffff; /* white */",
        note: html("Looks like intentionally \"soft\" text in a design file, and is genuinely hard to read for a large share of real users. Fails the 4.5:1 minimum by more than half."),
      },
    },
    {
      context: "A muted caption or timestamp",
      good: {
        label: "Good — 4.5:1",
        code: "color: #767676;      /* muted, still readable */\nbackground: #ffffff;",
        note: html("\"De-emphasized\" doesn't have to mean \"unreadable.\" This gray reads as clearly secondary next to darker body text, while still landing right at the 4.5:1 floor."),
      },
      bad: {
        label: "Bad — 2.8:1",
        code: "color: #999999;      /* looks \"subtle\" in a design file */\nbackground: #ffffff;",
        note: html("This is the exact gray that shows up in most design files labeled \"secondary text.\" It looks deliberate on a calibrated monitor and disappears everywhere else — a timestamp or byline styled this faint just isn't there for a meaningful share of readers."),
      },
    },
    {
      context: "Text placed over a photo",
      good: {
        label: "Good — scrim holds the ratio everywhere",
        code: "background-image: linear-gradient(\n  to top,\n  rgb(0 0 0 / 0.65),\n  rgb(0 0 0 / 0)\n), url(\"hero.jpg\");\ncolor: #ffffff;",
        note: html("The dark gradient (a \"scrim\") sits between the photo and the text, so white text stays readable no matter what's directly behind it — a bright sky, a dark jacket, anything in between."),
      },
      bad: {
        label: "Bad — contrast depends on the pixel underneath",
        code: "background-image: url(\"hero.jpg\");\ncolor: #ffffff;",
        note: html("Contrast here isn't one number — it changes every time the photo changes. White text over a light patch of sky can fail completely, even though the exact same text over a dark patch of the same photo would pass."),
      },
    },
    {
      context: "Body text in dark mode",
      good: {
        label: "Good — 15.4:1, no halation",
        code: "color: #e7e7ea;      /* off-white */\nbackground: #101014; /* dark gray, not pure black */",
        note: html("Comfortably passes, and the slightly-off values on both sides avoid the glare some readers get from pure white on pure black."),
      },
      bad: {
        label: "Bad — passes the ratio, still uncomfortable",
        code: "color: #ffffff;      /* pure white */\nbackground: #000000; /* pure black */",
        note: html("This pair actually has the highest contrast ratio physically possible (21:1) — the problem isn't the math, it's <em>halation</em>: for readers with astigmatism, extreme light-on-dark edges bloom and blur. Passing the ratio doesn't guarantee comfort at the extremes."),
      },
    },
  ],
  mistakes: [
    { name: "Using gray-on-gray for \"de-emphasized\" text", body: html("Muted text (captions, timestamps, helper text) still needs to clear the contrast minimum — \"less important\" doesn't mean \"allowed to be unreadable.\" See the muted-caption example above for a gray that does both jobs at once.") },
    { name: "Placing text over a photo with no overlay behind it", body: html("A busy image behind text makes contrast unpredictable pixel by pixel. Add a solid or gradient overlay (a \"scrim\") behind the text so the ratio holds everywhere it appears, not just in the one spot you happened to check.") },
    { name: "Checking contrast in isolation, not in the actual UI", body: html("A color pair that passes in a swatch can still fail once it's a link color on a tinted background, or a disabled-looking gray on a card. Check the ratio where the color is actually used, not where it was first picked.") },
    { name: "Relying on color alone to carry meaning", body: html("Red and green to mean error and success fails for colorblind readers if there's no icon, label, or shape backing it up — the color is a bonus signal, never the only one. Red-green color vision deficiency is the classic failure case because it can make red and green difficult or impossible to distinguish — a color that reads clearly as red to a typical viewer can read as muddy or greenish to someone with one of these conditions. Blue-yellow confusion (tritanopia) is rarer, but the fix is identical either way: never let color be the only signal.") },
    { name: "Trusting how it looks on your own monitor", body: html("Screens vary in brightness and calibration far more than most people assume, and a designer's monitor is usually better-calibrated than an average reader's. Measure the ratio with a tool; don't eyeball it on the screen in front of you.") },
  ],
  checklist: [
    html("Body text is at least 4.5:1 against its background."),
    html("Large text (24px+, or bold 18.66px+) is at least 3:1."),
    html("Text over images has a scrim or overlay, tested against the lightest and darkest parts of the image, not just the average."),
    html("Any color-coded meaning (error, success, warning) also has an icon or text label, not color alone."),
    html("Dark-mode text avoids pure white on pure black — an off-white on dark gray passes the same ratio without the glare."),
    html("Every ratio was checked with a tool, not by eye."),
  ],
  practiceCourseId: "color-contrast",
  goDeeper: [
    { lead: "This page covers contrast, not color theory", body: html("Contrast and color-scheme choice are related but separate concerns. Contrast asks whether two colors are different enough in lightness to read clearly — the only question this page answers. Color theory asks which colors feel right together: complementary schemes (colors opposite each other on the color wheel, like blue and orange) create bold, high-contrast pairings, while analogous schemes (colors next to each other on the wheel, like teal and green) create a calmer, more cohesive palette. Neither guarantees the other — two complementary colors can still fail the 4.5:1 minimum, and two analogous colors can still pass it — so picking a pleasant palette and picking an accessible one are two different checks, and this page is only the second one.") },
    { lead: "How the ratio is calculated", body: html("WCAG 2.x contrast is based on relative luminance — a weighted mix of a color's red, green, and blue channels adjusted for how the human eye perceives brightness (green reads as brighter than blue at the same raw value). The ratio is <code>(L1 + 0.05) / (L2 + 0.05)</code>, where L1 is the lighter color's luminance and L2 the darker one's. You don't need to compute this by hand — browser DevTools' color picker, and tools like WebAIM's contrast checker, do it for you.") },
    { lead: "Why pure white on pure black causes halation", body: html("The extreme edge between the two most different values the eye can register forces a large, sudden adjustment in the eye's local response, which some readers — particularly those with astigmatism — perceive as a glow or blur around the letterforms. It's an optical effect, not a contrast-math failure, which is exactly why the ratio alone can't catch it.") },
    { lead: "WCAG 3 / APCA", body: html("APCA is a newer contrast algorithm that factors in font weight and size, not just color — but it's still exploratory. WCAG 3's own working draft pulled the visual-contrast work out for further study in 2023 and hasn't settled on a replacement algorithm since, and WCAG 3 itself isn't expected to become an official standard until sometime around 2028–2030. The 4.5:1/3:1 ratio is the real, current requirement; APCA is worth watching, not designing against yet.") },
  ],
  datePublished: "2026-07-23",
};
