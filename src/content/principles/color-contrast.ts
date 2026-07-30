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
    html("Low contrast doesn't just look \"soft\" or \"modern\" — it's illegible to a meaningful chunk of any audience: people with low vision, people over 40 (whose eyes naturally lose contrast sensitivity), and anyone using a phone outdoors in direct sunlight. Light-gray text on a white background might look fine on a calibrated laptop screen in a dim office and be unreadable everywhere else."),
  ],
  coreRule: [
    html("Body text needs a contrast ratio of at least <strong>4.5:1</strong> against its background. Large text (24px+, or 18.66px+ bold) can drop to <strong>3:1</strong>. These numbers come from WCAG (the Web Content Accessibility Guidelines) and every browser's dev tools will calculate the ratio for you — you never have to eyeball it."),
  ],
  goodVsBad: {
    good: {
      label: "Good — 7.7:1",
      code: "color: #1a1a2e;      /* near-black text */\nbackground: #ffffff; /* white */",
      note: html("Comfortably passes the minimum for body text, with room to spare on smaller screens or in bright light."),
    },
    bad: {
      label: "Bad — 2.4:1",
      code: "color: #a0a0a0;      /* light gray text */\nbackground: #ffffff; /* white */",
      note: html("Looks like \"subtle\" gray text in a design mockup, and is genuinely hard to read for a large share of real users. Fails the 4.5:1 minimum by a wide margin."),
    },
  },
  mistakes: [
    { name: "Using gray-on-gray for \"de-emphasized\" text", body: html("Muted text (captions, timestamps, helper text) still needs to clear the contrast minimum — \"less important\" doesn't mean \"allowed to be unreadable.\"") },
    { name: "Placing text over a photo without a scrim", body: html("A busy image behind text makes contrast unpredictable pixel-by-pixel. Add a solid or gradient overlay behind the text so the ratio holds everywhere it appears.") },
    { name: "Checking contrast in isolation, not in the actual UI", body: html("A color pair that passes in a swatch can still fail once it's a link color on a tinted background, or a disabled-looking gray on a card. Check the ratio where the color is actually used.") },
    { name: "Relying on color alone to carry meaning", body: html("Red/green to mean error/success fails for colorblind users if there's no icon, label, or shape backing it up.") },
    { name: "Trusting how it looks on your monitor", body: html("Screens vary in brightness and calibration far more than people assume. Measure the ratio; don't eyeball it.") },
  ],
  checklist: [
    html("Body text is at least 4.5:1 against its background."),
    html("Large text (24px+/18.66px+ bold) is at least 3:1."),
    html("Text over images has a scrim or overlay, tested in the darkest and lightest parts of the image."),
    html("Any color-coded meaning (error, success, warning) also has an icon or text label."),
    html("Contrast was checked with a tool, not by eye."),
  ],
  practiceCourseId: "color-contrast",
  goDeeper: [
    { lead: "How the ratio is calculated", body: html("WCAG 2.x contrast is based on relative luminance — a weighted mix of a color's red, green, and blue channels adjusted for how the human eye perceives brightness (green looks brighter than blue at the same value). The ratio is <code>(L1 + 0.05) / (L2 + 0.05)</code>, where L1 is the lighter color's luminance and L2 the darker one's. You don't need to compute this by hand — browser DevTools' color picker, and tools like WebAIM's contrast checker, do it for you.") },
    { lead: "WCAG 3 / APCA", body: html("APCA is a newer contrast algorithm that factors in font weight and size, not just color — but it's still exploratory. WCAG 3's own working draft pulled the visual-contrast work out for further study in 2023 and hasn't settled on a replacement algorithm since, and WCAG 3 itself isn't expected to become an official standard until sometime around 2028–2030. The 4.5:1/3:1 ratio is the real, current requirement; APCA is worth watching, not designing against yet.") },
    { lead: "Dark mode isn't automatically higher contrast", body: html("Pure white text (#fff) on pure black (#000) can cause \"halation\" — a glow/blur effect for some readers with astigmatism. Slightly off-white text on a dark gray (not pure black) background is usually more comfortable while still clearing the ratio.") },
  ],
  datePublished: "2026-07-23",
};
