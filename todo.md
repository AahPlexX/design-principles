# TODO — Design Principles, v1 Scope

> **Append-only.** Never delete a line. Mark items done in place; if scope changes, add a new line explaining why rather than editing history away. Every edit to this file is stamped with the turncount it happened at (see `changelog.md` for what a turncount is and its current value).

## v1 definitive deliverables (locked at turncount 1)

This is the finish line for the current phase. Nothing beyond this list gets added until every box below is checked **and verified** (not assumed) — see "Completion checkpoint." Brainstormed against the original ask ("gold-standard SSOT for web design principles, exportable as skills/prompts") and then deliberately bounded, since that ask has no natural ceiling otherwise.

### Quantitative
- [x] *(turn 1)* 10 canonical principle pages in `docs/principles/`: visual-hierarchy, typography, color-contrast, spacing-layout, accessibility, responsive-design, performance, motion-feedback, forms-inputs, content-microcopy
- [x] *(turn 1)* 3 Claude Code skills in `/skills`: design-critique, accessibility-audit, plain-language-rewrite
- [x] *(turn 1)* 3 system prompts in `/prompts`: web-design-mentor, design-critique-reviewer, plain-language-rewriter
- [x] *(turn 1)* 1 verification script (`scripts/verify-site.py`, stdlib-only)
- [x] *(turn 2)* 2 GitHub Actions workflows (`pages.yml`, `ci.yml`, 2 jobs: verify-site, link-check) + 1 Dependabot config. Super-Linter was tried and removed by explicit user instruction after 3 rounds of real failures (see `changelog.md` turn 2) — `scripts/verify-site.py` plus real `html5validator`/`stylelint` runs already covered correctness without it.
- [x] *(turn 2)* CI confirmed green on GitHub Actions for a real push to `main` — run 30236119416 (commit `c4feedb`), both jobs (verify-site, link-check) `conclusion: success`, overall run `conclusion: success`. Checked via the GitHub API directly, not inferred.
- [ ] *(blocked on user)* GitHub Pages confirmed live and publicly reachable — requires the one-time Settings -> Pages -> Source: GitHub Actions toggle, which no available tool can set

### Qualitative acceptance criteria
- [x] *(turn 1)* Every principle page passes `scripts/verify-site.py` (skeleton sections present, links resolve, tags balanced)
- [x] *(turn 1)* Every HTML page passes the real W3C Nu Html Checker (`html5validator`) with 0 errors — verified by actually running it, not assumed
- [x] *(turn 1)* No deprecated CSS properties; 1 documented validator false-positive exception (`text-decoration-thickness`, a legitimate CSS Text Decoration Level 3 property the W3C CSS checker's property list hasn't caught up with)
- [x] *(turn 1)* Nav parity verified byte-for-byte across all 12 HTML pages (audited via script, not eyeballed)
- [x] *(turn 1)* Every skill links back to its canonical page instead of restating content (accessibility-audit was missing this link; fixed)
- [ ] *(blocked on user)* `main` is the repository's actual default branch (currently still the old feature branch in repo settings; not required for CI/Pages to function, but recommended)

## Explicitly OUT of scope for v1 (deferred, not forgotten)

- Additional principle pages beyond the 10 locked above
- Additional skills/prompts beyond the 6 locked above
- Visual/design-system overhaul of the site itself
- Site search, i18n/translation, analytics, SEO tooling
- Additional MCP integrations beyond the ones selected in `codemap.json`'s `_meta.mcp_selection`
- External task trackers (Todoist, Notion, Sanity, Craft, Superhuman Docs) as a parallel system to this file — rejected as a DRY violation; this file is the one source of truth for task state

## Completion checkpoint

v1 is DONE when every box above is checked and independently verified (a workflow run actually observed green, not inferred). At that point: stop, report status, and wait for explicit go-ahead before starting any v2 work.

**Status as of turn 2: every item within available tooling's control is checked and verified.** The only two remaining boxes are both `*(blocked on user)*` — repo Settings changes no available tool can make. v1 is functionally complete pending those two manual steps.
