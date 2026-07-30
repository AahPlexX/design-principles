/**
 * Turns a human-readable heading into a fragment id.
 *
 * These ids are part of the URL surface, not an implementation detail: the home page's category
 * sections are linked from all seventeen principle pages, and every `Section` heading on the site is a
 * copyable deep link. Deriving them from the heading rather than writing them down beside it means the
 * id and the text it names cannot drift apart.
 *
 * Deliberately narrow — lowercase ASCII words joined by hyphens, which is what the existing hand-written
 * ids (`why-it-matters`, `common-mistakes`) already look like. It is not a general transliterator: no
 * heading in this content contains non-ASCII letters, and inventing rules for cases that do not exist
 * would be untested code.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
