/**
 * Runs every gate, in dependency order, and reports a single verdict.
 *
 * This is what `npm run gate:all` and CI both call, and it is the definition of "done" for a change to
 * this site.
 *
 * Order matters. The cheap, source-level checks run first so an obvious mistake fails in seconds
 * instead of after a full build. Everything from `build` onward inspects `dist/`, so the build has to
 * succeed before any of it means anything — and if the build fails, the run stops there rather than
 * reporting twelve confusing downstream failures.
 *
 * Every gate after the build is allowed to run even if an earlier one failed, so one run surfaces every
 * problem rather than making the caller re-run to find the next.
 *
 *   npm run gate:all
 *   npm run gate:all -- --skip html   (skip a gate whose external tool is unavailable locally)
 */
import { spawnSync } from "node:child_process";

import { repoRoot } from "./lib";

interface GateSpec {
  readonly id: string;
  readonly label: string;
  readonly command: string;
  readonly args: readonly string[];
  /** A failure here makes every later gate meaningless, so the run stops. */
  readonly blocking?: boolean;
}

const GATES: readonly GateSpec[] = [
  { id: "format", label: "Formatting", command: "npm", args: ["run", "--silent", "format:check"] },
  { id: "lint", label: "Lint", command: "npm", args: ["run", "--silent", "lint"] },
  { id: "types", label: "Types", command: "npm", args: ["run", "--silent", "typecheck"] },
  {
    id: "content",
    label: "Content invariants",
    command: "npx",
    args: ["tsx", "scripts/gates/content-invariants.ts"],
  },
  {
    id: "contrast",
    label: "Colour contrast",
    command: "npx",
    args: ["tsx", "scripts/gates/contrast.ts"],
  },
  { id: "test", label: "Unit tests", command: "npm", args: ["run", "--silent", "test"] },
  {
    id: "build",
    label: "Build and prerender",
    command: "npm",
    args: ["run", "--silent", "build"],
    blocking: true,
  },
  { id: "urls", label: "URL parity", command: "npx", args: ["tsx", "scripts/gates/url-parity.ts"] },
  {
    id: "links",
    label: "Internal links",
    command: "npx",
    args: ["tsx", "scripts/gates/link-check.ts"],
  },
  { id: "seo", label: "SEO and metadata", command: "npx", args: ["tsx", "scripts/gates/seo.ts"] },
  { id: "a11y", label: "Accessibility", command: "npx", args: ["tsx", "scripts/gates/a11y.ts"] },
  {
    id: "budget",
    label: "Performance budget",
    command: "npx",
    args: ["tsx", "scripts/gates/budget.ts"],
  },
  {
    id: "html",
    label: "HTML validity",
    command: "npx",
    args: ["tsx", "scripts/gates/html-validate.ts"],
  },
];

const skipIndex = process.argv.indexOf("--skip");
const skipped = new Set(skipIndex === -1 ? [] : process.argv.slice(skipIndex + 1));

const results: { spec: GateSpec; status: "pass" | "fail" | "skip"; ms: number }[] = [];
let stopped = false;

for (const spec of GATES) {
  if (skipped.has(spec.id)) {
    results.push({ spec, status: "skip", ms: 0 });
    continue;
  }
  if (stopped) {
    results.push({ spec, status: "skip", ms: 0 });
    continue;
  }

  const started = Date.now();
  const run = spawnSync(spec.command, [...spec.args], {
    cwd: repoRoot,
    stdio: "inherit",
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  const ms = Date.now() - started;
  const passed = run.status === 0;
  results.push({ spec, status: passed ? "pass" : "fail", ms });

  if (!passed && spec.blocking) {
    console.log(
      `\n${spec.label} failed, and everything after it inspects its output. Stopping here.`,
    );
    stopped = true;
  }
}

/* ------------------------------------------------------------------- summary */

const failures = results.filter((r) => r.status === "fail");
const skippedResults = results.filter((r) => r.status === "skip");

console.log(`\n${"═".repeat(74)}`);
console.log("Gate summary\n");
for (const { spec, status, ms } of results) {
  const mark = status === "pass" ? "pass" : status === "fail" ? "FAIL" : "skip";
  const timing = status === "pass" || status === "fail" ? `${(ms / 1000).toFixed(1)}s` : "";
  console.log(`  ${mark.padEnd(5)} ${spec.label.padEnd(22)} ${timing}`);
}

console.log("");
if (failures.length === 0 && skippedResults.length === 0) {
  console.log("All gates passed.");
} else if (failures.length === 0) {
  console.log(
    `All gates passed (${String(skippedResults.length)} skipped: ${skippedResults.map((r) => r.spec.id).join(", ")}).`,
  );
} else {
  console.log(
    `${String(failures.length)} gate(s) failed: ${failures.map((r) => r.spec.id).join(", ")}`,
  );
}
console.log(`${"═".repeat(74)}\n`);

process.exit(failures.length === 0 ? 0 : 1);
