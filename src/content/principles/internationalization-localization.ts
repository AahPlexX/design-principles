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
    html("A button built to fit \"Add to cart\" exactly, in a fixed-width box, holds up fine in English — then breaks the moment the German translation (\"In den Warenkorb legen\") comes in nearly twice as long and wraps onto three lines or gets clipped. A date field showing \"03/04/2026\" means March 4th in the United States and the 3rd of April almost everywhere else — the same string, two different real dates, and a shipping or billing error that looks like a typo but is actually a design assumption baked into the interface."),
  ],
  coreRule: [
    html("Never hardcode an assumption that belongs to one language or region: not a fixed-width container sized for your source text, not a date/number format, not which side of the screen \"forward\" is. Build the interface to ask the locale what it needs, rather than assuming everyone reads and formats things the way you do."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<button style=\"min-width: max-content\">\n  Add to cart\n</button>\n\nnew Intl.DateTimeFormat(userLocale)\n  .format(orderDate);",
      note: html("The button's width flexes to whatever the translated label needs, and the date is formatted according to the reader's actual locale instead of a hardcoded string — both adapt automatically instead of assuming English/US conventions."),
    },
    bad: {
      label: "Bad",
      code: "<button style=\"width: 90px\">\n  Add to cart\n</button>\n\n`${month}/${day}/${year}`",
      note: html("The fixed width was measured against the English label and will clip or wrap a longer translation; the hand-built date string always means MM/DD/YYYY no matter who's reading it, silently misreading dates for most of the world."),
    },
  },
  mistakes: [
    { name: "Fixed-width containers sized for the source language", body: html("English is often one of the more compact languages for UI labels — German, Finnish, and many other languages routinely run 30–50% longer for the same meaning, and a button or nav item sized tightly around English text has nowhere for that extra length to go.") },
    { name: "Hardcoded date, number, or currency formatting", body: html("Building a date or currency string by hand (concatenating month/day/year, or prepending a \"$\") locks the output to one convention. A locale-aware formatting API produces the right format for whoever's actually reading it.") },
    { name: "Only flipping text direction, not layout", body: html("A right-to-left language (Arabic, Hebrew) needs the whole layout mirrored — icons like a \"back\" arrow, the position of a sidebar, the reading order of a toolbar — not just the paragraph text itself reversed while everything around it stays pinned to the original side.") },
    { name: "Concatenating translated string fragments", body: html("Building a sentence out of separately translated pieces (\"You have \" + count + \" items\") assumes every language shares English word order and pluralization rules; most don't. A full template sentence with a placeholder, translated as one unit, survives translation intact.") },
    { name: "Culturally specific imagery with no way to swap it", body: html("A hand gesture, a color used for celebration in one culture and mourning in another, or an icon whose meaning is regionally specific can misfire badly once the same image ships everywhere with no localization hook to change it per region.") },
  ],
  checklist: [
    html("Containers holding translatable text use flexible widths, not pixel widths measured against the source language."),
    html("Dates, numbers, and currency are produced by a locale-aware formatting API, not a hand-built string."),
    html("CSS uses logical properties (<code>margin-inline-start</code>, <code>text-align: start</code>) instead of <code>left</code>/<code>right</code>, so a right-to-left layout doesn't require rewriting styles."),
    html("Translated strings are handed to translators as full sentences with placeholders, never assembled from separately translated fragments."),
    html("Icons, imagery, and color choices have been checked against the specific cultures the product actually ships to."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "The Unicode CLDR", body: html("The Common Locale Data Repository is the standard source most locale-aware formatting libraries (including the browser's built-in <code>Intl</code> object) draw from for date formats, number separators, plural rules, and more, across thousands of locales — reaching for it via <code>Intl</code> is almost always better than hand-rolling locale logic.") },
    { lead: "Plural rules are not just singular/plural", body: html("English has two plural forms; some languages (Arabic, for example) have six. A message-formatting system that supports full CLDR plural categories (like ICU MessageFormat) handles this correctly; a simple <code>count === 1 ? \"item\" : \"items\"</code> check only works for languages shaped like English.") },
    { lead: "The lang attribute isn't cosmetic", body: html("Setting <code>lang</code> on the <code>&lt;html&gt;</code> element (or on a specific element with mixed-language content) tells screen readers which pronunciation rules to use — without it, a screen reader may read foreign-language text using the wrong language's pronunciation rules entirely.") },
  ],
  datePublished: "2026-07-27",
};
