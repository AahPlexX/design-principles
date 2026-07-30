/**
 * Shared plumbing for the validation gates.
 *
 * Every gate is a standalone script with the same contract: print what it checked, print every failure
 * it found rather than only the first, and exit non-zero if anything failed. Reporting all failures
 * matters when the caller is an agent — a gate that stops at the first problem turns one fix-and-rerun
 * cycle into ten.
 */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
export const DIST = path.join(repoRoot, "dist", "client");

export class Gate {
  private readonly failures: string[] = [];
  private readonly notes: string[] = [];
  private checks = 0;

  constructor(private readonly name: string) {}

  /** Records a check. `detail` is shown only when the check fails. */
  check(passed: boolean, detail: string): void {
    this.checks += 1;
    if (!passed) this.failures.push(detail);
  }

  fail(detail: string): void {
    this.checks += 1;
    this.failures.push(detail);
  }

  /** Something worth surfacing that is not a failure — a size trend, a skipped rule. */
  note(detail: string): void {
    this.notes.push(detail);
  }

  get failureCount(): number {
    return this.failures.length;
  }

  /** Prints the report and exits non-zero on failure. */
  report(): never {
    const width = 74;
    console.log("");
    console.log(`${this.name}  ${"─".repeat(Math.max(0, width - this.name.length - 2))}`);

    for (const note of this.notes) console.log(`  note  ${note}`);

    if (this.failures.length === 0) {
      console.log(`  PASS  ${String(this.checks)} checks`);
      process.exit(0);
    }

    // Capped so a systemic break (every page missing a tag) does not bury the summary in 173 lines.
    const shown = this.failures.slice(0, 40);
    for (const failure of shown) console.log(`  FAIL  ${failure}`);
    if (this.failures.length > shown.length) {
      console.log(`  ...   and ${String(this.failures.length - shown.length)} more`);
    }
    console.log(`  FAIL  ${String(this.failures.length)} of ${String(this.checks)} checks failed`);
    process.exit(1);
  }
}

/** Every prerendered page, as a repo-relative output path. */
export function distPages(): string[] {
  return globSync(path.join(DIST, "**", "*.html"))
    .map((file) => path.relative(DIST, file).split(path.sep).join("/"))
    .sort();
}

export function readDistPage(outputPath: string): string {
  return readFileSync(path.join(DIST, outputPath), "utf8");
}

export function requireDist(gate: Gate): void {
  if (distPages().length === 0) {
    gate.fail("dist/client contains no HTML — run `npm run build` first");
    gate.report();
  }
}
