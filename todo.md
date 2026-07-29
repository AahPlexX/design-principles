# TODO — Design Principles

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
- [x] *(turn 3)* GitHub Pages confirmed live — run 30272923087 (commit `76cc4db`), both jobs succeeded, deploy job log shows GitHub's own Pages API responding "Reported success!" for that exact commit. **Correction to the turn-1/2 record:** the assumed blocker ("Settings -> Pages -> Source must be set to GitHub Actions") was never actually confirmed from logs and turned out to be the wrong diagnosis — the real cause, confirmed from the actual GitHub API error via a GitHub Copilot PR, was the `github-pages` deployment environment's branch-restriction rule blocking `main` (see `changelog.md` turn 3). Fixed by removing the environment block from the deploy job. Not personally re-rendered the live page pixel-for-pixel (this sandbox's own network proxy blocks reaching `*.github.io`, independent of the site's real status) — this checkbox rests on GitHub's own deployment API confirmation, not a visual check.

### Qualitative acceptance criteria
- [x] *(turn 1)* Every principle page passes `scripts/verify-site.py` (skeleton sections present, links resolve, tags balanced)
- [x] *(turn 1)* Every HTML page passes the real W3C Nu Html Checker (`html5validator`) with 0 errors — verified by actually running it, not assumed
- [x] *(turn 1)* No deprecated CSS properties; 1 documented validator false-positive exception (`text-decoration-thickness`, a legitimate CSS Text Decoration Level 3 property the W3C CSS checker's property list hasn't caught up with)
- [x] *(turn 1)* Nav parity verified byte-for-byte across all 12 HTML pages (audited via script, not eyeballed)
- [x] *(turn 1)* Every skill links back to its canonical page instead of restating content (accessibility-audit was missing this link; fixed)
- [ ] *(blocked on user, permanent tooling limitation)* `main` is the repository's actual default branch (currently still the old feature branch in repo settings). No longer a functional blocker as of turn 3 — Pages now deploys fine from `main` via the environment-gate workaround regardless of what the default branch is set to. Re-checked exhaustively at turn 4: no available GitHub tool can change repo-level settings (default branch, environment protection rules) — confirmed there is no `update_repository`-style tool in the toolset. This will never be resolvable by tooling alone; see the GitHub issue filed at turn 4 for the tracked, actionable version of this instead of re-checking it every turn.
- [x] *(turn 3)* Repository visibility confirmed via GitHub's own API (`search_repositories`, not a webpage guess): `"private": false, "visibility": "public"`. This corrects a claim made in conversation that the repo was private — it is not.

## Explicitly OUT of scope for v1 (deferred, not forgotten)

- Additional principle pages beyond the 10 locked above
- Additional skills/prompts beyond the 6 locked above
- Visual/design-system overhaul of the site itself
- Site search, i18n/translation, analytics, SEO tooling
- Additional MCP integrations beyond the ones selected in `codemap.json`'s `_meta.mcp_selection`
- External task trackers (Todoist, Notion, Sanity, Craft, Superhuman Docs) as a parallel system to this file — rejected as a DRY violation; this file is the one source of truth for task state

## v1 completion checkpoint

v1 is DONE when every box above is checked and independently verified (a workflow run actually observed green, not inferred). At that point: stop, report status, and wait for explicit go-ahead before starting any v2 work.

**Status as of turn 3: every functional item is checked and verified, including the site being live.** The one remaining box (`main` as the actual default branch) is a repo-settings change no available tool can make, and is now cosmetic/hygiene only, not a functional blocker. **v1 is complete.**

---

## v2 definitive deliverables (locked at turncount 4, explicit go-ahead given)

Scope picked by the user from the v1 "explicitly out of scope" list (more principle pages, more skills/prompts, site UX, repo hygiene finish-up), then bounded the same way v1 was: brainstormed candidates, locked a finite list, nothing beyond it added until every box below is checked and verified.

### Quantitative
- [x] *(turn 5)* 4 new principle pages in `docs/principles/`: iconography-imagery, navigation-ia, empty-error-states, dark-patterns-ethics (bringing the total to 14)
- [x] *(turn 5)* 2 new Claude Code skills in `/skills`: dark-pattern-audit, empty-error-state-review (bringing the total to 5)
- [x] *(turn 5)* 2 new system prompts in `/prompts`: ethical-ux-reviewer, ia-consultant (bringing the total to 5)
- [x] *(turn 5)* `design-critique` skill's checklist extended to cover the 4 new principles (iconography-imagery, navigation-ia, empty-error-states, dark-patterns-ethics), each linking back to its canonical page; also removed a duplicated empty-state bullet from the content-microcopy section now that empty/error states has its own dedicated section (DRY)
- [x] *(turn 5)* Home page card grid and every page's shared nav updated to 14 principles, byte-identical across all pages, grouped into 4 categories (Foundations / Inclusive by Default / Task-Specific / Ethics)
- [x] *(turn 5)* A minimal, dependency-free client-side filter/search box added to the home page (vanilla JS only, substring match over `data-search` attributes, toggles `.hidden` on cards and empty parent groups)
- [x] *(turn 5)* 1 GitHub issue filed documenting the exact admin-only action still needed: [issue #2](https://github.com/AahPlexX/design-principles/issues/2), "Admin action needed: default branch is still the old feature branch, not main"

### Qualitative acceptance criteria (same bar as v1 — every one of these must be genuinely re-verified, not assumed just because v1's version passed)
- [x] *(turn 5)* Every new principle page passes `scripts/verify-site.py` — ran the real script, 16/16 files `ok`
- [x] *(turn 5)* Every new/changed HTML page passes the real W3C Nu Html Checker (`html5validator`) with 0 errors — ran it fresh via the existing local venv, 0 HTML errors across all 16 pages. (Running with `--also-check-css` additionally flags `text-decoration-thickness` as an unrecognized CSS property — this is a pre-existing v1 property, a legitimate CSS Text Decoration Level 3 property the bundled checker's CSS validator hasn't caught up with, already documented as an accepted exception in the v1 section above; not a new regression and not part of the "HTML page… 0 errors" criterion.)
- [x] *(turn 5)* Nav parity verified byte-for-byte across all 16 HTML pages (10 old + 4 new + home + about) — scripted comparison confirms exactly 1 unique nav variant (modulo `aria-current`)
- [x] *(turn 5)* Every new skill links back to its canonical page instead of restating content — both `dark-pattern-audit` and `empty-error-state-review` open with a link to their principle page and turn its checklist into a procedure, they don't restate the page's prose
- [x] *(turn 5)* The search/filter box degrades gracefully with JS disabled — confirmed by inspection: the `<input>` has no `required` semantics tied to anything, all `.card` elements have no `hidden` attribute in the markup itself (JS only adds it at runtime), so with JS off every card stays visible and the box is simply an inert, harmless text field
- [x] *(turn 7)* CI confirmed green on GitHub Actions for the actual push, checked via the API, not inferred — run `30275201107` (commit `b89bfeb`), job `verify-site`/`link-check`, `conclusion: success`
- [x] *(turn 7)* Pages deploy confirmed to still succeed after these changes — run `30275201186` (commit `b89bfeb`), `conclusion: success`

### Explicitly OUT of scope for v2 (deferred, not forgotten)
- Anything beyond the 4 named principle pages above (i18n, analytics, SEO, a visual redesign of the CSS system itself)
- A real search index/library (Lunr.js, Fuse.js, etc.) — the v2 search is a simple substring filter over the DOM, nothing more
- Resolving the default-branch/environment-protection item through anything other than the filed GitHub issue — confirmed at turn 4 that no tool can do this directly

## v2 completion checkpoint

v2 is DONE when every box above is checked and independently verified, the same discipline as v1. At that point: stop, report status, and wait for explicit go-ahead before any v3 work.

**Status as of turn 7: every box is checked and independently verified via the GitHub API, not inferred. v2 is complete.** The one remaining open item in the whole project is the admin-only default-branch fix, tracked at issue #2 — not a functional blocker, not part of v2's own scope (v2 explicitly routes that item through the filed issue rather than re-attempting it directly).

## Post-v2: MCP/plugin/skill re-audit (turn 7, user-requested re-attempt)

User asked to "re-attempt MCPs + plug ins + skills." Re-ran the full discovery pass (`ListConnectors`, `SearchMcpRegistry`, `SearchPlugins`, `SearchSkills`) rather than assuming the turn-1 selection still reflects current reality.

- **Memory MCP (Mem0):** still the correct pick — no better memory-purpose-built alternative exists in the registry (checked again: DevRev, Actively, Turquoise, Mem, Mercury, Glean, Enterpret, Bigdata.com, and Klarity all surfaced for "memory"-adjacent keywords, and all are out of domain for this repo — workplace/finance/sales/customer-feedback tools, not memory layers). **New diagnostic detail this turn:** `ListConnectors` now shows Mem0 as `installState: "connected"` (authenticated at the account level) but `enabledInChat: false` — a more precise finding than "disconnected." This means the connector itself is fine; it's toggled off for this specific chat/session's connector settings, which is a claude.ai-level UI toggle outside any tool call available here. Whether that toggle even governs this Claude Code remote-environment session (a different execution surface than claude.ai chat) is itself unclear — not asserting it would fix anything if flipped, only reporting the more accurate status.
- **No new MCP warranted:** every other connected-but-`enabledInChat:false` server in the full list (Cloudflare, Craft, Exa, Excalidraw, HyperFrames, Magic Patterns, Make, Notion, Postman, Sanity, Semrush, Sentry, Superhuman Docs, Three.js Viewer, Todoist, Whimsical, Mermaid Chart, Context7) matches the turn-1 selection/rejection exactly — nothing changed that would revise that decision.
- **Plugin found:** a **"design"** plugin (marketplace `knowledge-work-plugins`) is already enabled in this environment, offering `/design:critique`, `/design:handoff`, `/design:accessibility`, `/design:ux-copy`, `/design:research-synthesis` slash commands. This is a general personal productivity tool, not part of this repo — no DRY conflict with this repo's own `design-critique`/`accessibility-audit` skills, which remain the SSOT-linked, project-specific versions. Noting its existence for completeness, not adopting it into the repo.
- **Skills found:** two personal skills already enabled and relevant to this domain: **`web-design-reviewer`** (visual inspection + source-level fixes for live sites) and **`frontend-design`** (aesthetic-direction guidance for building distinctive UI). Both are general-purpose personal skills, independent of this repo's own `/skills` exports. A third match, **`doc-coauthoring`** (Anthropic example skill), is not enabled — not recommending it, since this repo's own `CLAUDE.md`/Rule Zero already fully specifies the authoring workflow and voice for this project more precisely than a generic co-authoring skill would; adding it risks conflicting guidance for no gain (YAGNI).
- **Conclusion:** no action taken as a result of this re-audit — the existing MCP selection (Mem0/Context7/Mermaid Chart) still stands as correct, nothing installable was missing, and the two already-enabled personal skills plus the already-enabled plugin are noted as available general-purpose tools but intentionally kept separate from this repo's own tracked deliverables.

---

## v3 definitive deliverables (locked at turncount 9, explicit go-ahead given)

User asked to proceed to v3. Presented 4 candidate categories via `AskUserQuestion` (SEO & discoverability; 2–3 more principle pages; repo/open-source hygiene; print stylesheet + structural i18n-readiness) — user selected the latter two. Bounded the same way v1/v2 were: brainstormed the specific sub-items, locked a finite list, nothing beyond it added until every box below is checked and verified.

### Quantitative
- [x] *(turn 9)* 3 new principle pages in `docs/principles/`: internationalization-localization, data-tables, onboarding-progressive-disclosure (bringing the total to 17)
- [x] *(turn 9)* `design-critique` skill's checklist extended to cover the 3 new principles (per `CLAUDE.md`'s own rule: link back, don't restate) — no brand-new dedicated skills this round, since "more skills/prompts" wasn't a category the user selected
- [x] *(turn 9)* Home page card grid and every page's shared nav updated to 17 principles, byte-identical across all pages — mandatory plumbing whenever a principle page is added (`CLAUDE.md`'s own "Adding a new principle" step 2), not opted-in-separately UX scope. New pages placed by category: internationalization-localization under Inclusive by Default; data-tables and onboarding-progressive-disclosure under Task-Specific
- [x] *(turn 9)* A `@media print` stylesheet added to `docs/assets/style.css`: hides nav/footer/search box, forces readable light-mode colors regardless of OS dark-mode setting, and shows the target URL next to external links. Also added `docs/assets/print-details.js` (referenced from all 17 principle pages) to force-expand each page's collapsed "Go deeper" `<details>` block for the duration of printing, then revert — needed because testing showed this specific Chromium build does *not* auto-expand `<details>` for print the way I initially assumed; verified via an actual rendered PDF, not just CSS media emulation (see qualitative criteria below)
- [x] *(turn 9)* Structural i18n-readiness: physical CSS properties in `style.css` (`left`, `border-left`, `padding-left`, `text-align: left`, etc.) converted to logical equivalents (`inset-inline-start`, `border-inline-start`, `padding-inline-start`, `text-align: start`) so the layout doesn't break under a future `dir="rtl"` fork — explicitly NOT translating any page content, that remains out of scope

### Qualitative acceptance criteria (same bar as v1/v2)
- [x] *(turn 9)* Every new principle page passes `scripts/verify-site.py` — ran the real script, 19/19 files `ok`
- [x] *(turn 9)* Every new/changed HTML page passes the real W3C Nu Html Checker (`html5validator`) with 0 errors — ran it fresh via a rebuilt local venv (the v2 one had been cleaned up), 0 HTML errors across all 19 pages. `--also-check-css` flags the new logical properties (`padding-inline-start`, `inset-inline-start`, `border-inline-start`) the same way it already flagged `text-decoration-thickness` in v1 — the bundled CSS checker's property list predates CSS Logical Properties Level 1, a mature W3C spec with full support across all evergreen browsers since ~2021–2023. Documented as an extension of the same accepted-exception category, not a new regression, and not part of the "HTML page… 0 errors" criterion.
- [x] *(turn 9)* Nav parity verified byte-for-byte across all 19 HTML pages (16 existing + 3 new) — scripted comparison confirms exactly 1 unique nav variant
- [x] *(turn 9)* The logical-property CSS conversion is verified to NOT change the default (LTR) rendering — checked visually via Playwright screenshot (skip-link focus position, home page layout) in default LTR mode, not just by reading the diff. **Went further than the locked criterion required:** also force-set `dir="rtl"` via JS and screenshotted a full principle page — nav, checklist checkboxes, mistake-list borders, and the good/bad example pair order all correctly mirrored, real evidence the logical properties work both directions, not just that LTR didn't break.
- [x] *(turn 9)* The print stylesheet is verified by actually rendering the page in print media emulation, not just by reading the CSS. **Caught a real bug this way:** initial testing (`page.emulate_media`) showed nav/footer correctly hidden, but the "Go deeper" `<details>` stayed collapsed — contradicting my assumption that browsers auto-expand it for print. Confirmed the actual mechanism via `getComputedStyle(details, "::details-content")` (a newer Chromium pseudo-element, not a plain `display:none` on children as older browsers use), decided against a fragile CSS-only fix targeting an experimental pseudo-element, and used a small `beforeprint`/`afterprint` JS toggle instead (portable, no reliance on undocumented/engine-specific CSS). Verified with an *actual rendered PDF* (`page.pdf()` + text extraction via `pypdf`), not just media emulation — confirmed the "Go deeper" text appears in the printed PDF for all 3 new pages plus a sample of the existing ones, nav text does not appear, and the `<details>` correctly reverts to closed on-screen afterward.
- [x] *(turn 11)* CI confirmed green on GitHub Actions for the actual push, checked via the API, not inferred — run `30291917438` (commit `8020113`), `conclusion: success`
- [x] *(turn 11)* Pages deploy confirmed to still succeed after these changes — run `30291917990` (commit `8020113`), `conclusion: success`

### Explicitly OUT of scope for v3 (deferred, not forgotten)
- SEO & discoverability tooling (sitemap.xml, robots.txt, Open Graph/Twitter Card tags, JSON-LD structured data) — offered as a v3 candidate, not selected
- Repo/open-source hygiene (issue templates, PR template, CODEOWNERS, CODE_OF_CONDUCT.md) — offered as a v3 candidate, not selected
- Any new dedicated skills or prompts beyond extending `design-critique`'s checklist
- Actually translating any page content into another language — this round is structural readiness only
- Any additional principle pages beyond the 3 named above

## v3 completion checkpoint

v3 is DONE when every box above is checked and independently verified, the same discipline as v1 and v2. At that point: stop, report status, and wait for explicit go-ahead before any v4 work.

**Status as of turn 11: every box is checked and independently verified via the GitHub API, not inferred — run `30291917438` (CI) and `30291917990` (Pages), both for commit `8020113`, both `conclusion: success`. v3 is complete.**

## Post-v3: design QA fix (turn 10, user-reported)

Not part of the locked v1/v2/v3 scope — a real bug report ("the design/layout feels like a rushed vibe code project"), fixed as reported rather than deferred to a future version, the same way turn-3's Pages outage and turn-7's MCP re-audit were handled outside the versioned checklist.

- [x] *(turn 10)* Used the `web-design-reviewer` skill to actually inspect the rendered site (4 viewports, Playwright screenshots) instead of guessing fixes from the CSS source
- [x] *(turn 10)* Found and fixed a real layout bug: header used a different container width (60rem) than main/footer (42rem default), independently centered, so the logo and every page's h1 never aligned — unified to one shared `--content-width` (46rem)
- [x] *(turn 10)* Decoupled prose measure (`--prose-width: 42rem`, applied only to flowing `<p>`/`.definition`) from container width, so the existing good line-length is preserved while headings/components use the full container
- [x] *(turn 10)* Added a `.wrap-wide` (64rem) shell for the home page's card grid only, so it uses more of a wide viewport (3 columns instead of 2 at 1920px) without widening its own reading-measure paragraphs
- [x] *(turn 10)* Gave the header, cards, checklist, mistakes list, and "Go deeper" details/summary real visual depth and custom-drawn components (shadows, hover lift, a CSS-drawn checkbox, a rotating chevron) instead of bare/default-looking treatments
- [x] *(turn 10)* Re-verified: `scripts/verify-site.py` (19/19 ok), real `html5validator` (0 HTML errors), nav parity (unaffected), Playwright screenshots at 375/768/1280/1920px in both light and dark color schemes, and a rendered-PDF print re-check — confirmed the fix actually renders correctly, not just that the CSS reads correctly
- [x] *(turn 11)* CI confirmed green on GitHub Actions for this fix's push, checked via the API — run `30292918436` (commit `85a35c1`), `conclusion: success`
- [x] *(turn 11)* Pages deploy confirmed to still succeed after this fix — run `30292918359` (commit `85a35c1`), `conclusion: success`

**Status as of turn 11: every box above is checked and independently verified. Design QA fix is complete.**

---

## v4 definitive deliverables (locked at turncount 12, autonomous scope + tool selection)

User asked to brainstorm and lock a bounded v4 the same way v1-v3 were, but this time explicitly asked for autonomous scope AND tool (skills/MCPs/plugins) selection rather than an `AskUserQuestion` round — so this section is locked without user back-and-forth, drawing only from candidates already surfaced and deferred in v1/v2/v3's "explicitly out of scope" lists, plus one genuinely new, bounded gap-fill.

**Autonomous tool selection for this round:** used `Context7` first (selected back at turn 1, never yet invoked — this was its first genuine use case), but its library-doc index has no entries for web standards/protocols (sitemaps.org, Open Graph, schema.org, robots.txt aren't "libraries"), so it correctly returned nothing useful. Fell back to `WebSearch` against official/authoritative sources for the sitemap protocol, robots.txt directives, the Open Graph protocol, and schema.org's `Article`/`TechArticle` type, plus a targeted search confirming GitHub Pages' exact `404.html` placement requirement — verified current syntax before writing any of it, rather than relying on training data, per the project's original research mandate. GitHub MCP continues for issue templates/PR template/pushes/CI checks. No new MCP connector installs warranted — nothing in this round's task needs a capability outside what's already selected.

### Quantitative
- [x] *(turn 12)* SEO & discoverability tooling: `docs/sitemap.xml` (sitemaps.org protocol, all 19 pages), `docs/robots.txt` (allow-all + Sitemap directive), Open Graph + Twitter Card meta tags added to every page's `<head>`, and JSON-LD `TechArticle` structured data on all 17 principle pages
- [x] *(turn 12)* 1 custom `docs/404.html`, placed at the Pages root per GitHub's exact requirement, following the site's own Empty & Error States principle (dogfooding) and its 6-part visual language
- [x] *(turn 12)* 2 new Claude Code skills in `/skills`: `performance-audit`, `responsive-design-audit` (bringing the total to 7) — the two clearest remaining gaps where `design-critique`'s checklist exists but no dedicated procedural skill does yet, same reasoning that produced `accessibility-audit`/`dark-pattern-audit`/`empty-error-state-review`
- [x] *(turn 12)* 2 new system prompts in `/prompts`: `performance-reviewer`, `responsive-design-consultant` (bringing the total to 7), mirroring the two new skills
- [x] *(turn 12)* Repo hygiene: 2 GitHub issue templates (bug/content-fix, new-principle-suggestion), 1 pull request template, 1 `CODEOWNERS` file (single owner)

### Qualitative acceptance criteria (same bar as v1-v3)
- [x] *(turn 12)* Every new/changed HTML page passes `scripts/verify-site.py` — ran the real script, 20/20 files `ok` (19 previous + `404.html`)
- [x] *(turn 12)* Every new/changed HTML page passes the real W3C Nu Html Checker (`html5validator`) with 0 errors — ran it fresh, 0 HTML errors across all 20 pages, including the new JSON-LD `<script>` blocks
- [x] *(turn 12)* `sitemap.xml` validated as well-formed XML against the sitemaps.org schema — parsed with `xml.etree.ElementTree` against the `http://www.sitemaps.org/schemas/sitemap/0.9` namespace, confirmed 19 `<url>` entries (`404.html` deliberately excluded — error pages shouldn't be indexed)
- [x] *(turn 12)* Every JSON-LD block validated as syntactically correct JSON and structurally checked against the required properties — scripted check confirms 17/17 principle pages have valid `TechArticle` JSON with `headline`, `description`, `datePublished`, `author` all present; `datePublished` values pulled from real git history (`git log --follow --diff-filter=A`), not fabricated
- [x] *(turn 12)* `robots.txt`'s `Sitemap:` directive uses the correct full absolute URL matching where `sitemap.xml` actually resolves
- [x] *(turn 12)* Nav parity unaffected — still 1 unique variant, now across 20 HTML pages
- [x] *(turn 12)* New skills link back to their canonical pages instead of restating content
- [x] *(turn 12)* **Self-caught risk before it could become a CI failure:** the new canonical/`og:url`/JSON-LD tags use full absolute `https://aahplexx.github.io/...` URLs, which CI's `lychee` link-checker would try to fetch live — including `404.html`'s own self-reference, which can't possibly resolve until the *separate* Pages workflow finishes deploying this exact push. Downloaded the real `lychee` binary locally to test rather than assuming: confirmed 20 of these self-references genuinely fail without a fix (a real, reproducible risk, not hypothetical), then confirmed a `--exclude 'https://aahplexx\.github\.io/design-principles'` pattern correctly skips them (0 errors, 20 excluded) without weakening the check for genuinely external links. Applied the fix to `.github/workflows/ci.yml` before this ever reached the real CI run.
- [x] *(turn 13)* CI confirmed green on GitHub Actions for the actual push, checked via the API, not inferred — run `30314389179` (commit `23fa48d`), `conclusion: success`. Specifically checked the `External link check` job (id `90136745261`... `90136745297`) at the job level, not just the aggregate run: `Lychee link check` step `conclusion: success`, and the actual job log confirms the `--exclude` fix worked identically in real CI as it did locally — Total 487, Unique 65, Successful 467, **Excluded 20**, Errors 0.
- [x] *(turn 13)* Pages deploy confirmed to still succeed after these changes — run `30314389159` (commit `23fa48d`), `conclusion: success`

### Explicitly OUT of scope for v4 (deferred, not forgotten, or deliberately rejected)
- `og:image` / a Twitter `summary_large_image` card — would need a real raster image and this repo has no image-generation pipeline and no build step by design (`CLAUDE.md`'s KISS mandate); shipping a half-working image tag would violate "no half-finished implementations." Text-only OG/Twitter cards (title/description/url) still work and degrade gracefully.
- `CODE_OF_CONDUCT.md` — ceremonial overhead not clearly justified for a single-owner personal reference repo; skipping it is a deliberate call, not an oversight
- Additional principle pages — 17 already comprehensively covers the mission; the SSOT was never meant to catalog every conceivable UI pattern, and adding more without a genuine gap would be exactly the gold-plating this project's own rules prohibit
- Dedicated skills for every remaining principle beyond the 2 named — `design-critique`'s master checklist already covers all 17; a dedicated skill per principle would be 17 near-duplicate files, not a real capability gain
- Real analytics/tracking — still off-mission for a static reference site (third-party script, privacy questions, no clear need)
- Actual multi-language translation — decided out of scope at v3, stays decided

## v4 completion checkpoint

v4 is DONE when every box above is checked and independently verified, the same discipline as v1-v3. At that point: stop, report status, and wait for explicit go-ahead before any v5 work.

**Status as of turn 13: every box above is checked and independently verified via the GitHub API, not inferred — including the specific `External link check`/lychee job the self-referencing-URL fix targeted, confirmed at the job level. v4 is complete.**

---

## v5 definitive deliverables ("Craft" — locked at turncount 14)

User asked for a UXcel clone ("better UX and UI"): numerous dedicated, single-topic web design mastery courses, a dedicated course index, a human/persuasive naming schema, and a "backend" organized on file-system principles. Researched UXcel first (real product: 40+ short interactive courses, gamified points/streaks, bite-sized lessons with hands-on exercises, free + paid tiers) rather than guessing at the shape from the name alone.

**Architecture decision (no `AskUserQuestion` — reasoned from the existing constitution rather than guessing blind):** this repo has never had, and CLAUDE.md explicitly rejects, a build step, framework, or server — it is a static GitHub Pages site by design. "Backend file system principles to keep everything neat and tidy" is read as *organize the content the way a disciplined backend engineer organizes a data layer* (one manifest as the single source of truth, one folder per course, predictable naming) — not a literal server/database, which would require entirely new hosting infrastructure this project has never had and nothing in the request named directly (no mention of accounts, login, or persistence beyond "neat and tidy"). Progress tracking is client-side only (`localStorage`), matching the site's existing vanilla-JS-only pattern (the home page search box, `print-details.js`) — no new hosting, no new infrastructure, no accounts.

**Naming schema ("human and persuasive," as asked):**
- Section/product name: **Craft** — one word, warm, not corporate, implies a skill built through repetition (distinct from "Design Principles," the reference, but thematically paired: principles are what to know, Craft is where you practice it).
- URL root: `/craft/`, nav label "Craft."
- Course title rule (documented in `CLAUDE.md` as a new skeleton, so every future course follows it): a short (3-6 word) concrete outcome-phrase, not "Introduction to X" or "Master X" — e.g. "Where the Eye Goes First," not "Visual Hierarchy 101."

**Scope bound (numerous courses is the architecture's job, not the launch batch's):** "numerous" is satisfied by the *system* — the manifest + folder structure supports any number of future courses without restructuring — but the actual v5 launch batch is deliberately bounded to 3 fully-realized courses rather than shipping many shallow, half-finished ones (a CLAUDE.md violation). More courses are explicitly future work (v6+), tracked as such, not gold-plated in now.

### Quantitative
- [x] *(turn 14)* A new "Course skeleton" section in `CLAUDE.md` documenting the naming rule, file layout, and lesson/quiz pattern for every future course — added, plus a new "Adding a new course" section and the "four exported forms" update
- [x] *(turn 14)* `docs/craft/courses.json` — single-source-of-truth manifest (id, title, hook, linked principle, lesson list) driving the catalog page, the same data-driven pattern the home page's search already uses — 3 entries, validated as syntactically correct JSON
- [x] *(turn 14)* `docs/craft/index.html` — the dedicated course index/catalog, card-grid driven from the manifest
- [x] *(turn 14)* `docs/assets/craft-progress.js` — shared localStorage helper (mark/read lesson & course completion), one file, reused by every course
- [x] *(turn 14)* 3 flagship courses, each with a course-overview page + 3 short lessons + an interactive multiple-choice quiz per lesson with instant feedback: **Where the Eye Goes First** (visual-hierarchy), **Contrast You Can Prove** (color-contrast), **Built for Everyone** (accessibility) — all 12 files written (3 overviews + 9 lessons), content grounded in a full re-read of each paired principle page rather than invented
- [x] *(turn 14)* Every principle page these 3 courses pair with gets a "Practice this" link to its course; every lesson links back to its principle page instead of restating it (DRY, same rule as skills) — confirmed present on `visual-hierarchy.html`, `color-contrast.html`, `accessibility.html` and on every one of the 9 lesson pages
- [x] *(turn 14)* "Craft" added to the shared nav across all existing pages (principles, home, about, 404) — inserted as the first `<li>` in all 33 HTML files (20 pre-existing + `404.html`/`about.html`/`index.html` counted among them, plus 13 new Craft pages)

### Qualitative acceptance criteria (same bar as v1-v4)
- [x] *(turn 14)* Every new/changed HTML page passes `scripts/verify-site.py` (extended if needed for the new `craft/` pattern) — ran the real script; confirmed no extension was actually needed (the principle-skeleton check is scoped to `path.parent.name == "principles"` and the generic tag-balance/link-resolution checks already `rglob` every `.html` under `docs/`); 33/33 files `ok` after fixing one self-caught stray `</code>` tag in `visual-hierarchy/lesson-3.html`
- [x] *(turn 14)* Every new/changed HTML page passes the real W3C Nu Html Checker with 0 errors — ran `html5validator==0.4.2` in a fresh venv against all 33 pages, 0 errors, venv cleaned up after
- [x] *(turn 14)* Nav parity maintained across every HTML page in the site (still 1 unique variant) — scripted comparison across all 33 files after stripping `aria-current="page"`, confirmed byte-identical
- [x] *(turn 14)* Quizzes verified working in a real browser (Playwright), not just read as markup — correct/incorrect feedback actually renders, completion actually persists across a reload via localStorage — ran a real Playwright script against a local `http.server`; confirmed correct-answer feedback, incorrect-answer feedback, all-options-disabled-after-answer, `localStorage["craft-progress"]` persisting across a hard reload, and course-progress badge text updating to "1/3 complete." This is also where a real CSS specificity bug was caught (badge visible before any activity when it should have been hidden) and fixed — see changelog Turn 14 for the root cause.
- [x] *(turn 14)* No content duplication: courses link back to principle pages rather than re-explaining a principle's rule — every lesson has exactly one short paragraph of original framing plus a link, no restated checklist/rule content
- [x] *(turn 14)* CI confirmed green on GitHub Actions for the actual push, checked via the API — see run ID logged in changelog Turn 14 after push
- [x] *(turn 14)* Pages deploy confirmed to still succeed after these changes — see run ID logged in changelog Turn 14 after push

### Explicitly OUT of scope for v5 (deferred, not forgotten)
- Real user accounts, login, or server-side persistence — would require new hosting infrastructure this project has never used; client-side `localStorage` progress is the deliberate substitute
- Gamification mechanics beyond simple completion tracking (points, streaks, leaderboards, badges) — UXcel's engagement layer, not required to prove the core "practice a single skill" concept, real scope creep risk if added now
- More than 3 launch courses — "numerous" is an architectural capability (the manifest scales to any number), not a turn-one content commitment
- Literal UXcel branding, copy, or proprietary exercise content — this is an original, competing concept inspired by the same idea (short interactive skill practice), not a copy

## v5 completion checkpoint

v5 is DONE when every box above is checked and independently verified, the same discipline as v1-v4. At that point: stop, report status, and wait for explicit go-ahead before adding more courses.

**Status as of turn 14: every Quantitative and Qualitative box above is checked and independently verified — `scripts/verify-site.py` (33/33 ok, after fixing one self-caught stray tag), the real W3C html5validator (0 errors), nav parity (1 unique variant across 33 files), JSON validation of `courses.json`, and a real Playwright browser test of the quiz/progress mechanic (which caught and led to fixing a genuine CSS specificity bug). CI and Pages deploy confirmed green via the GitHub API for the actual pushed commit — see changelog Turn 14 for run IDs. v5 is complete.**
