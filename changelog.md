# Changelog

> **Append-only.** Never delete or rewrite a past entry — if something later turns out wrong, add a new entry correcting it and leave the old one for the record.

**Turncount protocol (non-negotiable, user-specified):** `turncount` increments by exactly 1 on every assistant response in this project, starting now, and never resets.
Every entry in this file is filed under the turncount it happened at. Every edit to `todo.md` or `codemap.json` is stamped with the same turncount for cross-reference.
Turncount did not exist before this turn — there is no turn 0 to backfill, since this tracking infrastructure is being created in the same turn it starts counting from.

**Current turncount: 2**

---

## Turn 1 — 2026-07-23

- Established `todo.md`, `changelog.md`, `codemap.json` as permanent, append-only project-tracking infrastructure (explicit user request). This entry documents that setup plus everything else done in the same turn.
- Brainstormed and locked the v1 deliverables scope in `todo.md`: 10 principle pages, 3 skills, 3 prompts, verification script, CI/CD — explicitly excluding further expansion (more pages/skills/prompts/MCPs) until v1 is verifiably complete. Gold-plating and scope creep are now a standing violation of project policy, not just this turn's instruction.
- Reviewed all connected MCP servers and selected: **Mem0** as the project's memory layer (tested via `add_memory`, confirmed reachable).
  **Context7** for verifying current library/framework/spec docs when authoring content (available, not yet invoked — no concrete need arose this turn).
  **Mermaid Chart** as reserved for future diagram needs (not yet used — no diagram was necessary this turn, and forcing one would itself be scope creep).
  Rejected as redundant with git-tracked files (DRY): Todoist, Notion, Sanity, Craft, Superhuman Docs, Whimsical, Excalidraw.
  Rejected as out of domain for a static content repo: Cloudflare, Make, Postman, Sentry, Semrush, HyperFrames, Magic Patterns, Three.js Viewer.
- Audited existing work against the newly-locked qualitative criteria instead of taking prior turns' claims at face value:
  - Confirmed byte-identical nav across all 12 HTML pages via script, not by eye.
  - Found `skills/accessibility-audit/SKILL.md` had no link back to its canonical page (violating this repo's own SSOT/DRY rule in `CLAUDE.md`) — fixed with a one-line reference.
  - Checked the actual GitHub Actions run results for the previous turn's CI/Pages setup instead of assuming they passed. **They did not.** Pages failed at "Configure Pages" (expected — Pages source isn't set to "GitHub Actions" yet, a manual step outside available tooling). CI failed all three jobs for real, previously-unverified reasons:
    1. `actions/setup-python`'s `cache: pip` requires a lockfile to hash and none existed (`html5validator` was being installed ad hoc). Fixed by adding `scripts/requirements.txt` (pinning the exact version already verified locally, `0.4.2`) and setting `cache-dependency-path`.
    2. Super-Linter fatally rejects mixing `VALIDATE_ALL_CODEBASE` with explicit per-linter `true`/`false` overrides — confirmed from the actual failure message, not documentation. Rewrote the env block as a pure opt-in whitelist.
    3. `lychee` errors trying to resolve our root-relative internal links (`/design-principles/...`) as filesystem paths *before* the `--scheme` filter is ever applied — confirmed from the actual failure message. Added `--exclude '^/design-principles'`.
  - Pushed the fix (`f5add93`) and re-checked the run. `verify-site` job now passed fully (proof the requirements.txt fix works on GitHub's real runner, not just locally) — but `super-linter` and `link-check` still failed, for *different* reasons than the first round, each confirmed from actual logs rather than assumed fixed:
    1. The `--exclude '^/design-principles'` fix did not work. lychee's `--exclude` only matches URLs it has already resolved; our links fail at resolution itself, before `--exclude` ever runs. Downloaded the real `lychee` binary locally to test empirically (same discipline as the `html5validator` check) rather than guess again from `--help` text summaries.
       Found `--scheme https,http` was *also* silently broken — it excluded genuine `https://` links too, meaning the external-link check had never actually checked anything.
       Fixed by creating a `design-principles -> docs` symlink in a scratch directory and using `--root-dir` to resolve the absolute-path convention correctly; confirmed locally (197/197 links OK, including a real `[200]` hit on a genuine GitHub URL) and confirmed the check has real teeth (a deliberately broken URL was correctly flagged). `--scheme` removed entirely.
    2. Super-Linter's real stylelint run surfaced 42 CSS findings: one genuine bug (two separate `body {}` rules — a real DRY violation, merged), three genuine spec-currency improvements (`#ffffff`→`#fff`, `--step--1` renamed to the kebab-case `--step-neg-1`, `(max-width: 40rem)` → the modern Media Queries Level 4 range syntax `(width <= 40rem)`).
       The remaining ~35 findings were purely cosmetic formatting-opinion rules (single-line declaration limits, blank-line-before-rule) that conflict with this file's intentional compact style for one-off overrides — added `.stylelintrc.json` disabling only those specific cosmetic rules, verified locally against the real `stylelint` + `stylelint-config-standard`.
    3. Markdownlint surfaced real findings across `/prompts`, `README.md`, and `skills/design-critique/SKILL.md`: missing language tags on fenced code blocks (added `text`), bare URLs (wrapped in `<>`), and inconsistent Markdown table pipe spacing (fixed).
       Also discovered `.markdownlint.yml`'s `MD013: false` was not actually taking effect in Super-Linter (its default there is 400 chars, not the standard 80, meaning the repo config isn't being picked up the way assumed).
       Rather than debug that discovery mechanism further, swept every `.md` file directly for lines over 400 chars and fixed the ones found (several in this changelog, ironically, written earlier in this same turn).
    4. Super-Linter was also getting a 403 posting per-linter commit statuses back to the GitHub API, because the workflow's `contents: read`-only permission didn't include `statuses: write`. Added that permission scoped to just the `super-linter` job (least-privilege: the other two jobs don't need it).
  - Re-verified everything locally one more time after all of the above (`scripts/verify-site.py`, `html5validator`, real `stylelint`, the manual markdown sweep, and a browser screenshot at a narrow viewport to confirm the CSS changes didn't break the responsive layout) before pushing again.
- No principle pages, skills, or prompts were added this turn — the v1 count stays at 10/3/3, per the no-scope-creep instruction.

## Turn 2 — 2026-07-27

- Round 3 of CI: the round-2 push (`f080954`) had `verify-site` and `link-check` both pass on GitHub's real runner (confirming the round-2 fixes actually worked), but `super-linter` failed again on a new, different real issue: a 506-char line in `todo.md` tripped `MD013` at Super-Linter's actual 400-char default, plus new `yamllint` warnings on the workflow files (missing `---` document-start, a few lines over 80 chars) that hadn't surfaced before.
- User interrupted mid-diagnosis with an explicit instruction: **remove Super-Linter from the CI workflow entirely.** After 3 rounds of real, unrelated failures from a single tool, this is the right call — `scripts/verify-site.py` plus the `verify-site` job's real `html5validator` run, and the manual `stylelint`/markdown verification already done in Turn 1, cover this repo's actual correctness needs without it.
- Removed the `super-linter` job from `.github/workflows/ci.yml`. Also removed `.stylelintrc.json`, `.markdownlint.yml`, and `.yamllint.yml`, since all three existed solely to configure Super-Linter's bundled tools and had no other consumer once it was gone — keeping them would have been orphaned, unread config (this repo's own "backend file system stays clean" standard, established earlier).
- `ci.yml` is now two jobs: `verify-site` (unchanged) and `link-check` (unchanged). Verified locally (YAML parses, `scripts/verify-site.py` passes) before pushing.
- Updated `todo.md` and `codemap.json` to reflect the removal, marking the three deleted config files `"status": "removed"` in `codemap.json`'s history rather than deleting their entries outright, per this file's own append-only convention.
- Queried Mem0 at the start of this turn to recall prior context before acting (consistent MCP use, per explicit instruction) — confirmed it correctly recalled the locked v1 scope, the tracking-file convention, and the two human-blocked items from Turn 1.
- Pushed the Super-Linter removal (`c4feedb`) and checked the resulting run directly via the GitHub API: run `30236119416`, both jobs (`verify-site`, `link-check`) `conclusion: success`, overall run `conclusion: success`. **This is the first fully green CI run of this project** — checked the box in `todo.md` accordingly.
- **v1 completion checkpoint reached for everything within available tooling's control.** Every checklist item is checked and verified except the two `*(blocked on user)*` items (Pages source setting, default branch), which no available tool can act on. Stopping here per the checkpoint's own rule: wait for explicit go-ahead before any v2 work.
