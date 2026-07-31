/**
 * Gate: every text/background token pair the site uses clears its WCAG minimum, in both themes.
 *
 * The site's own Color & Contrast page says body text needs 4.5:1, large text 3:1, and UI component
 * boundaries 3:1, and tells readers to measure rather than eyeball it. This gate holds the site to
 * that. Shipping a palette that fails its own page would discredit the page.
 *
 * Ratios are computed from the design tokens rather than sampled from rendered pixels, which means
 * every declared pair is covered in both themes — not only the combinations that happen to appear on
 * whichever pages a browser-based audit visited.
 *
 *   npm run gate:contrast
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import { Gate, repoRoot } from "./lib";

const gate = new Gate("Colour contrast (WCAG)");

const CSS = readFileSync(path.join(repoRoot, "src", "styles", "globals.css"), "utf8");

/* ------------------------------------------------------- oklch → sRGB → luminance */

function oklchToLinearSrgb(L: number, C: number, hDeg: number): [number, number, number] {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  // Oklab → LMS (cube of the intermediate), per Björn Ottosson's definition.
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** Relative luminance per WCAG 2.x, which is a weighted sum of the linear-light channels. */
function relativeLuminance([r, g, b]: [number, number, number]): number {
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b);
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(parseOklch(a));
  const lb = relativeLuminance(parseOklch(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const OKLCH = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/;

function parseOklch(value: string): [number, number, number] {
  const match = OKLCH.exec(value);
  if (!match?.[1] || !match[2] || !match[3]) {
    throw new Error(`Token value is not a parseable oklch() colour: "${value}"`);
  }
  return oklchToLinearSrgb(Number(match[1]), Number(match[2]), Number(match[3]));
}

/* ------------------------------------------------------------------ token reading */

/**
 * Reads a token block out of the stylesheet.
 *
 * The tokens are parsed from the CSS rather than duplicated here so the gate cannot drift from what
 * actually ships — a copy of the palette in this file would pass forever after someone edited the real
 * one.
 */
function readTokens(startPattern: RegExp): Map<string, string> {
  const start = startPattern.exec(CSS);
  if (!start) throw new Error(`Could not find the token block matching ${String(startPattern)}`);

  const from = start.index + start[0].length;
  const tokens = new Map<string, string>();
  let depth = 1;
  let cursor = from;

  while (cursor < CSS.length && depth > 0) {
    const char = CSS[cursor];
    if (char === "{") depth += 1;
    else if (char === "}") depth -= 1;
    cursor += 1;
  }

  const block = CSS.slice(from, cursor);
  for (const match of block.matchAll(/(--color-[\w-]+):\s*(oklch\([^)]+\))/g)) {
    if (match[1] && match[2]) tokens.set(match[1], match[2]);
  }
  return tokens;
}

const light = readTokens(/@theme\s*\{/);
const dark = readTokens(/:root\[data-theme="dark"\]\s*\{/);

// The dark block overrides a subset; anything it does not restate keeps its light value.
const darkResolved = new Map(light);
for (const [name, value] of dark) darkResolved.set(name, value);

/* ------------------------------------------------------------------------- pairs */

interface Pair {
  readonly fg: string;
  readonly bg: string;
  readonly min: number;
  readonly what: string;
}

/**
 * Every foreground/background combination the components actually use.
 *
 * 4.5:1 for body-size text, 3:1 where the site's own rule allows it: large text, and non-text
 * boundaries such as borders and focus rings.
 */
const PAIRS: readonly Pair[] = [
  { fg: "--color-ink", bg: "--color-canvas", min: 4.5, what: "body text on the page" },
  { fg: "--color-ink", bg: "--color-surface", min: 4.5, what: "body text on a raised surface" },
  { fg: "--color-ink-muted", bg: "--color-canvas", min: 4.5, what: "muted text on the page" },
  {
    fg: "--color-ink-muted",
    bg: "--color-surface",
    min: 4.5,
    what: "muted text on a raised surface",
  },
  { fg: "--color-ink-subtle", bg: "--color-canvas", min: 4.5, what: "subtle text on the page" },
  {
    fg: "--color-ink-subtle",
    bg: "--color-surface",
    min: 4.5,
    what: "subtle text on a raised surface",
  },
  { fg: "--color-accent", bg: "--color-canvas", min: 4.5, what: "link text on the page" },
  { fg: "--color-accent", bg: "--color-surface", min: 4.5, what: "link text on a raised surface" },
  { fg: "--color-accent-contrast", bg: "--color-accent", min: 4.5, what: "text on an accent fill" },
  { fg: "--color-good", bg: "--color-good-soft", min: 4.5, what: "the 'good' verdict label" },
  { fg: "--color-bad", bg: "--color-bad-soft", min: 4.5, what: "the 'bad' verdict label" },
  {
    fg: "--color-ink",
    bg: "--color-good-soft",
    min: 4.5,
    what: "body text inside a 'good' example",
  },
  { fg: "--color-ink", bg: "--color-bad-soft", min: 4.5, what: "body text inside a 'bad' example" },
  {
    fg: "--color-accent",
    bg: "--color-accent-soft",
    min: 4.5,
    what: "accent text on an accent tint",
  },
  // Non-text: 3:1 is the requirement for a component boundary or a focus indicator.
  { fg: "--color-line-strong", bg: "--color-canvas", min: 3, what: "input and control borders" },
  { fg: "--color-accent", bg: "--color-canvas", min: 3, what: "the focus ring against the page" },
  { fg: "--color-accent", bg: "--color-surface", min: 3, what: "the focus ring against a surface" },
  { fg: "--color-good", bg: "--color-canvas", min: 3, what: "the 'good' border" },
  { fg: "--color-bad", bg: "--color-canvas", min: 3, what: "the 'bad' border" },
];

for (const [theme, tokens] of [
  ["light", light],
  ["dark", darkResolved],
] as const) {
  for (const pair of PAIRS) {
    const fg = tokens.get(pair.fg);
    const bg = tokens.get(pair.bg);

    if (!fg || !bg) {
      gate.fail(`${theme}: token missing — ${!fg ? pair.fg : pair.bg}`);
      continue;
    }

    const ratio = contrastRatio(fg, bg);
    gate.check(
      ratio >= pair.min,
      `${theme}: ${pair.what} is ${ratio.toFixed(2)}:1, below the ${pair.min.toFixed(1)}:1 minimum ` +
        `(${pair.fg} on ${pair.bg})`,
    );
  }
}

gate.note(`${String(PAIRS.length)} token pairs checked in both themes`);
gate.report();
