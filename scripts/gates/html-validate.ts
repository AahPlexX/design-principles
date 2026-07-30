/**
 * Gate: the build's HTML passes the W3C Nu Html Checker.
 *
 * Carried over from the pre-migration CI. Adding a framework does not lower the bar for
 * standards-compliant markup — if anything it raises the risk, since the markup is now assembled by
 * code rather than typed out and read.
 *
 * Wraps the same `html5validator` (and therefore the same Nu checker) the old pipeline used, pointed at
 * `dist/client` instead of `docs/`.
 *
 *   npm run gate:html
 */
import { spawnSync } from "node:child_process";

import { DIST, Gate, distPages, requireDist } from "./lib";

const gate = new Gate("HTML validity (W3C Nu)");
requireDist(gate);

const probe = spawnSync("html5validator", ["--version"], { encoding: "utf8" });

if (probe.error) {
  gate.fail(
    "html5validator is not installed — run `pip install -r scripts/requirements.txt` " +
      "(CI installs it before this gate)",
  );
  gate.report();
}

/*
 * HTML only, matching what the pre-migration CI checked.
 *
 * The Nu checker's bundled CSS validator predates `@property` and `@view-transition` — both shipped
 * CSS features that Tailwind v4 emits — so pointing it at the stylesheet reports hundreds of errors
 * about valid CSS. Stylesheet correctness is covered by the build itself (Tailwind fails on invalid
 * input) and by `gate:contrast` for the part that carries an accessibility obligation.
 */
const result = spawnSync("html5validator", ["--root", DIST], { encoding: "utf8" });

const output = `${result.stdout}${result.stderr}`.trim();

if (result.status === 0) {
  gate.check(true, "");
  gate.note(`${String(distPages().length)} documents validated clean`);
} else {
  // The checker reports one line per problem; surface them all rather than only the exit code.
  for (const line of output.split("\n").filter((l) => l.includes(":"))) {
    gate.fail(line.replace(DIST, "dist/client").trim());
  }
  if (gate.failureCount === 0)
    gate.fail(`html5validator exited ${String(result.status)}: ${output}`);
}

gate.report();
