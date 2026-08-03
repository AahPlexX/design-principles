/**
 * Builds a self-contained HTML document for an `ExampleSide.preview`.
 *
 * Every preview needs the same boilerplate — doctype, charset, a margin reset, the `<body>` wrapper —
 * so a content module supplies only what actually varies: the CSS that demonstrates the example (its
 * `body{...}` line plus whatever selectors the example is about) and the demo markup itself. Written
 * once here instead of eight times inline, so the two can't quietly drift apart across examples.
 */
export function previewDocument(css: string, bodyHtml: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>html,body{margin:0}${css}</style></head><body>${bodyHtml}</body></html>`;
}
