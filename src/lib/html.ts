import type { HtmlString } from "@/content/types";

/**
 * The inline elements content prose is allowed to contain.
 *
 * Content in this repository is authored by maintainers, not submitted by users, so this is not an
 * XSS boundary. It is a consistency boundary: it stops a block-level element or a stray `<script>`
 * from being introduced into a paragraph slot where the surrounding layout assumes inline flow, and
 * it fails loudly at build time rather than producing subtly broken markup on 173 pages.
 */
const ALLOWED_INLINE_TAGS = new Set([
  "a",
  "abbr",
  "b",
  "br",
  "cite",
  "code",
  "del",
  "em",
  "i",
  "ins",
  "kbd",
  "mark",
  "q",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "var",
  "wbr",
]);

const TAG_PATTERN = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9-]*)/g;

/**
 * Marks a string as trusted inline content HTML.
 *
 * Throws on a disallowed tag. This runs at module load during the build, so a bad fragment fails the
 * build instead of shipping.
 */
export function html(value: string): HtmlString {
  for (const match of value.matchAll(TAG_PATTERN)) {
    const tag = match[1]?.toLowerCase();
    if (tag && !ALLOWED_INLINE_TAGS.has(tag)) {
      throw new Error(
        `Content HTML contains <${tag}>, which is not in the allowed inline set. ` +
          `Either use a structural field in the content type instead of inline markup, or add the ` +
          `tag to ALLOWED_INLINE_TAGS in src/lib/html.ts if it is genuinely inline. Fragment: ` +
          value.slice(0, 120),
      );
    }
  }
  return value as HtmlString;
}

/** Strips tags and decodes the handful of entities used in content, for search text and meta tags. */
export function toPlainText(value: HtmlString | string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&rarr;/g, "\u2192")
    .replace(/&larr;/g, "\u2190")
    .replace(/\s+/g, " ")
    .trim();
}
