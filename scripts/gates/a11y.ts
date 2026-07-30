/**
 * Gate: axe-core finds no accessibility violations in the prerendered HTML.
 *
 * This site's own pages tell readers to do this, so shipping a violation is a contradiction, not a
 * defect to triage later.
 *
 * Scope and its limits: the pages are analysed in jsdom, which has no layout engine. Rules that need
 * computed geometry or painted colour — `color-contrast` above all — cannot run here and are checked
 * separately by `gate:contrast`, which computes the ratios from the design tokens directly. That is a
 * stronger check than sampling rendered pixels, because it covers every token pair in both themes
 * rather than only the combinations that happen to appear on the pages sampled.
 *
 *   npm run gate:a11y
 */
import { JSDOM } from "jsdom";

import { Gate, distPages, readDistPage, requireDist } from "./lib";

const gate = new Gate("Accessibility (axe-core)");
requireDist(gate);

/**
 * One page per template, rather than all 173.
 *
 * The pages are generated from seven components, so every lesson page has identical structure. Running
 * all of them would multiply the runtime by twenty to re-test the same markup. A representative of each
 * template is chosen, including both course shapes and both quiz shapes.
 */
const SAMPLE: readonly { page: string; why: string }[] = [
  { page: "index.html", why: "home: card grid, search box" },
  { page: "about.html", why: "about: prose, ordered list, code block" },
  { page: "404.html", why: "error page" },
  {
    page: "principles/color-contrast.html",
    why: "principle: example pair, mistakes, checklist, details",
  },
  { page: "principles/data-tables.html", why: "principle: a second instance, tables in prose" },
  { page: "craft/index.html", why: "craft catalog: course cards, progress badges" },
  { page: "craft/color-contrast/index.html", why: "course overview: levelled, 9 levels" },
  { page: "craft/accessibility/index.html", why: "course overview: flat" },
  { page: "craft/color-contrast/level-1/lesson-1.html", why: "lesson: levelled, quiz" },
  { page: "craft/accessibility/lesson-1.html", why: "lesson: flat, quiz" },
  { page: "craft/spacing-layout/level-2/lesson-1.html", why: "lesson: a second levelled instance" },
  /*
   * Added because the entry above was labelled as the code-block case and is not one — its prompt is a
   * single paragraph. Seven lessons interleave a `<pre>` between two prompt paragraphs, and that shape
   * is the one worth auditing: the option group takes its accessible name from the whole prompt, and the
   * code block inside it is a focusable scroll container.
   */
  {
    page: "craft/spacing-layout/level-4/lesson-3.html",
    why: "lesson: quiz containing a code block",
  },
];

const available = new Set(distPages());

// Disabled because jsdom cannot evaluate them, not because they do not matter.
const CANNOT_RUN_IN_JSDOM = ["color-contrast", "color-contrast-enhanced", "target-size"];

interface AxeNode {
  readonly html: string;
  readonly target: readonly string[];
}
interface AxeViolation {
  readonly id: string;
  readonly impact: string | null;
  readonly help: string;
  readonly nodes: readonly AxeNode[];
}
interface AxeResults {
  readonly violations: readonly AxeViolation[];
}

/** What axe adds to the window its source is evaluated in. */
interface AxeWindow {
  readonly axe: {
    run: (context: unknown, options: unknown) => Promise<AxeResults>;
  };
}

async function auditPage(page: string): Promise<void> {
  const dom = new JSDOM(readDistPage(page), {
    url: `https://aahplexx.github.io/design-principles/${page}`,
    pretendToBeVisual: true,
    runScripts: "outside-only",
  });

  // axe attaches itself to a window, so its source is evaluated inside the jsdom realm rather than
  // imported into this one. axe-core is CommonJS, so the namespace import puts it behind `default`.
  const { default: axe } = await import("axe-core");
  dom.window.eval(axe.source);

  const results = await (dom.window as unknown as AxeWindow).axe.run(dom.window.document, {
    resultTypes: ["violations"],
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    rules: Object.fromEntries(CANNOT_RUN_IN_JSDOM.map((id) => [id, { enabled: false }])),
  });

  for (const violation of results.violations) {
    const first = violation.nodes[0];
    gate.fail(
      `${page}: [${violation.id}${violation.impact === null ? "" : `/${violation.impact}`}] ` +
        violation.help +
        (first ? ` — at ${first.target.join(" ")}: ${first.html.slice(0, 110)}` : "") +
        (violation.nodes.length > 1 ? ` (+${String(violation.nodes.length - 1)} more nodes)` : ""),
    );
  }

  gate.check(true, "");
  dom.window.close();
}

for (const { page, why } of SAMPLE) {
  if (!available.has(page)) {
    gate.fail(`sample page missing from the build: ${page} (${why})`);
    continue;
  }
  await auditPage(page);
}

gate.note(`${String(SAMPLE.length)} template representatives audited`);
gate.note(
  `rules skipped (need a layout engine, covered by gate:contrast): ${CANNOT_RUN_IN_JSDOM.join(", ")}`,
);
gate.report();
