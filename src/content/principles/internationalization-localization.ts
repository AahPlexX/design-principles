// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const internationalizationLocalization: Principle = {
  slug: "internationalization-localization",
  title: "Internationalization & Localization",
  category: "Inclusive by Default",
  blurb: "Designing so the interface still works when the language, reading direction, or cultural conventions change, not just when the words get swapped.",
  searchKeywords: "internationalization localization i18n l10n designing so the interface still works when the language reading direction or cultural conventions change",
  definition: html("Internationalization (often shortened to i18n) is building an interface so it <em>can</em> adapt to any language, reading direction, or region. Localization (l10n) is actually adapting it for one specific one. You need the first before you can do the second well."),
  whyItMatters: [
    html("Picture a product team that ships its checkout flow in English, tests it thoroughly, and then turns on the Arabic version for a launch in the Gulf. The layout was built with <code>padding-left</code> and <code>border-right</code> pinned to the English reading order, so the moment the interface switches to <strong>right-to-left (RTL)</strong> — a reading direction where the eye moves from the right edge of the screen toward the left, the way Arabic, Hebrew, Persian, and Urdu are written — everything looks wrong at once. The \"back\" arrow still points left, except left is now forward. The sidebar that always sat on the left is still on the left, except now it's blocking the space where readers expect content to start. The words themselves render in the right order, because right-to-left scripts carry their own directionality in Unicode and the browser handles that part automatically — but the padding, the icons, and the layout were built by hand, and hand-built things don't fix themselves."),
    html("This isn't a translation bug you can catch by squinting at the target language — it's a layout bug hiding behind one. The interface encoded a directional assumption (\"padding goes on the left\") as if it were a universal fact instead of a decision tied to one <strong>locale</strong> — the reader's language-and-region combination, like \"en-US\" or \"ar-EG,\" that determines which conventions actually apply to them, from reading direction to how a date is written. Retrofitting that assumption later means hunting down every hardcoded <code>left</code>, every fixed pixel width, every hand-built date string across the whole codebase, instead of writing each one so it adapts from the start. That gap is the entire distinction between the two halves of this principle: internationalization is the up-front work of building things so a locale can be swapped in cleanly, and localization is doing the swap for one locale. Skip the first and every later swap costs like a rebuild."),
    html("None of this is a rounding-error audience either. Right-to-left languages aren't an edge case: Arabic alone has roughly 400 million native speakers, and Hebrew, Persian, and Urdu add tens of millions more — an interface that only works left-to-right isn't unpolished for a market that size, it's unusable. The smaller-looking failures cost real money too: a date field that prints \"03/04/2026\" reads as March 4th in the United States and the 3rd of April almost everywhere else, and a shipment, an appointment, or a contract built on that misreading doesn't look like a translation problem when it goes wrong — it looks like the product got the order wrong."),
  ],
  coreRule: [
    html("Never bake in an assumption that only holds for the language you wrote the interface in — not a pixel width measured against your source text, not a hand-built date or number string, not which physical side of the screen a control sits on. Ask the locale what it needs instead of assuming every reader formats and scans a page the way you do. In CSS, that means reaching for <strong>logical properties</strong> — properties like <code>padding-inline-start</code> and <code>text-align: start</code> that describe layout in terms of reading order (<em>start</em> and <em>end</em>) rather than a fixed physical side (<code>left</code>/<code>right</code>) — so the same stylesheet works whether the page reads left-to-right or right-to-left, with no separate override to maintain."),
  ],
  examples: [
    {
      context: "A toolbar built with physical left/right instead of logical properties",
      good: {
        label: "Good — flips automatically under dir=\"rtl\"",
        code: ".toolbar {\n  padding-inline-start: 16px;\n  border-inline-end: 1px solid #ddd;\n}",
        note: html("<code>inline-start</code> and <code>inline-end</code> are relative to reading direction, not a screen side — the browser resolves them to <code>left</code> or <code>right</code> based on the page's direction, so this rule needs no override when the interface switches to Arabic or Hebrew."),
      },
      bad: {
        label: "Bad — stays pinned to the English layout",
        code: ".toolbar {\n  padding-left: 16px;\n  border-right: 1px solid #ddd;\n}",
        note: html("<code>padding-left</code> and <code>border-right</code> mean the same physical side no matter which way the page reads. Once the interface runs right-to-left, the padding and the divider land on the side readers now expect content to <em>end</em>, not start — fixing it means a second, hand-maintained override."),
      },
    },
    {
      context: "A button box sized to fit the English label exactly",
      good: {
        label: "Good — width follows the label",
        code: "button {\n  padding-inline: 12px 20px;\n  width: max-content;\n}",
        note: html("The button grows or shrinks with whatever text ends up inside it, so a translated label that's longer or shorter than the English original still fits without wrapping or clipping."),
      },
      bad: {
        label: "Bad — width was measured against the English text",
        code: "button {\n  width: 90px;\n}",
        note: html("90px fits \"Add to cart\" with room to spare in English. The German translation, \"In den Warenkorb legen,\" runs roughly 30–50% longer — a well-documented range for German UI strings — and that extra length has nowhere to go but a clipped label or an awkward wrap."),
      },
    },
    {
      context: "An order-confirmation date",
      good: {
        label: "Good — formatted for the reader's locale",
        code: "new Intl.DateTimeFormat(userLocale, { dateStyle: \"long\" })\n  .format(orderDate);\n// en-US -> \"March 4, 2026\"\n// fr-FR -> \"4 mars 2026\"",
        note: html("The browser's built-in <code>Intl</code> API looks up the reader's actual locale and spells the date out the way that locale expects — no month/day guessing required, for the reader or for you."),
      },
      bad: {
        label: "Bad — one hardcoded format for everyone",
        code: "`${month}/${day}/${year}`\n// always renders \"03/04/2026\"",
        note: html("\"03/04/2026\" means March 4th under the U.S. convention and the 3rd of April under the day-month convention most of the rest of the world uses — the same string, two different real dates, decided entirely by where the reader happens to be."),
      },
    },
    {
      context: "A cart-count message assembled from translated fragments",
      good: {
        label: "Good — one full sentence, plural-aware",
        code: "t(\"cart.itemCount\", { count });\n// en: \"You have 3 items in your cart.\"\n// ar: correctly selects one of Arabic's six plural forms",
        note: html("The whole sentence is translated as one unit, and the plural form is chosen by a rule table built for that language, not by a single English-shaped count check."),
      },
      bad: {
        label: "Bad — built by gluing English grammar onto a number",
        code: "\"You have \" + count + \" item\" +\n  (count === 1 ? \"\" : \"s\") + \" in your cart.\";",
        note: html("This hardcodes English word order and English's two-form plural rule (add an \"s\" past one). Languages that put the number elsewhere in the sentence, or that have more than two plural forms — Arabic has six — can't be represented by this pattern at all."),
      },
    },
  ],
  mistakes: [
    { name: "Sizing containers for the source language", body: html("English is often one of the more compact languages for UI labels. German, Finnish, and other languages routinely run 30–50% longer for the same meaning, and a button or nav item sized tightly around the English text has nowhere for that extra length to go — see the button-sizing example above.") },
    { name: "Hardcoding date, number, or currency formats", body: html("Concatenating month, day, and year by hand, or prepending a hardcoded \"$\", locks the output to one region's convention. A locale-aware formatting API — the <code>Intl</code> object built into every modern browser — produces the right separators, symbol placement, and date order for whoever's actually reading it.") },
    { name: "Flipping the text but not the layout", body: html("A right-to-left language needs the whole interface mirrored, not just the paragraph text: a \"back\" arrow that visually points the wrong way, a sidebar still pinned to its English-language side, a toolbar whose icons read in the wrong order. Logical properties fix the CSS side of this (see the toolbar example above); icons that encode direction, like arrows, still need a mirrored variant supplied on purpose.") },
    { name: "Concatenating translated string fragments", body: html("Building a sentence out of separately translated pieces — \"You have \" + count + \" items\" — assumes every language shares English word order and English's two plural forms. Most don't: Arabic alone has six grammatical plural forms. A full template sentence with a placeholder, translated and pluralized as one unit, survives translation intact.") },
    { name: "Shipping culturally specific imagery with no way to swap it", body: html("A hand gesture, a color used for celebration in one culture and mourning in another, or an icon whose meaning is regionally specific can misfire once the same image ships everywhere with no localization hook to swap it per region.") },
    { name: "Testing only in the source language", body: html("A UI that's only ever been opened in English hides every one of these problems, because the one language it was built around is the one language that can't reveal its own hardcoded assumptions. Pseudo-localization — running the interface through a fake locale that pads strings and reverses their direction — surfaces overflow and directionality bugs before a real translation ever ships.") },
  ],
  checklist: [
    html("Containers holding translatable text use flexible widths (like <code>width: max-content</code> or padding-based sizing), not pixel widths measured against the source language."),
    html("Dates, numbers, and currency are produced by a locale-aware formatting API (like <code>Intl</code>), never a hand-built string."),
    html("CSS uses logical properties — <code>padding-inline-start</code>, <code>border-inline-end</code>, <code>text-align: start</code> — instead of <code>left</code>/<code>right</code>, so a right-to-left layout doesn't require a second, hand-maintained set of overrides."),
    html("Icons that encode direction (arrows, chevrons) have a mirrored variant ready for right-to-left layouts, not just mirrored text sitting around them."),
    html("Translated strings are handed to translators as full sentences with placeholders, never assembled from separately translated fragments, and pluralization runs through a rule table instead of a single count-equals-one check."),
    html("Icons, imagery, and color choices have been checked against the specific cultures the product actually ships to."),
    html("The interface has been tested in at least one right-to-left locale and one deliberately long pseudo-locale before launch, not only in the source language."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "The Unicode CLDR", body: html("The Common Locale Data Repository is the standard source most locale-aware formatting libraries (including the browser's built-in <code>Intl</code> object) draw from for date formats, number separators, plural rules, and more, across thousands of locales — reaching for it via <code>Intl</code> is almost always better than hand-rolling locale logic.") },
    { lead: "Plural rules are not just singular/plural", body: html("English has two plural forms; some languages, Arabic among them, have six. A message-formatting system that supports full CLDR plural categories (like ICU MessageFormat) handles this correctly; a simple <code>count === 1 ? \"item\" : \"items\"</code> check only works for languages shaped like English.") },
    { lead: "The bidi algorithm handles inline mixing, not layout", body: html("The Unicode Bidirectional Algorithm automatically keeps embedded left-to-right content — a product code, an English brand name — reading in the correct order inside a right-to-left sentence, with no markup required. It governs the order of characters and words inside a run of text and nothing more; it does nothing for a hardcoded <code>padding-left</code> or a toolbar's icon order, which is why layout still needs logical properties and mirrored icons on top of it.") },
    { lead: "The lang attribute isn't cosmetic", body: html("Setting <code>lang</code> on the <code>&lt;html&gt;</code> element (or on a specific element with mixed-language content) tells screen readers which pronunciation rules to use — without it, a screen reader may read foreign-language text using the wrong language's pronunciation rules entirely.") },
  ],
  datePublished: "2026-07-27",
};
