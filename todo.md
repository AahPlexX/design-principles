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
- [x] *(turn 14)* CI confirmed green on GitHub Actions for the actual push, checked via the API — run `30470209750` (commit `c071f21`), `conclusion: success`
- [x] *(turn 14)* Pages deploy confirmed to still succeed after these changes — run `30470209646` (commit `c071f21`), `conclusion: success`

### Explicitly OUT of scope for v5 (deferred, not forgotten)
- Real user accounts, login, or server-side persistence — would require new hosting infrastructure this project has never used; client-side `localStorage` progress is the deliberate substitute
- Gamification mechanics beyond simple completion tracking (points, streaks, leaderboards, badges) — UXcel's engagement layer, not required to prove the core "practice a single skill" concept, real scope creep risk if added now
- More than 3 launch courses — "numerous" is an architectural capability (the manifest scales to any number), not a turn-one content commitment
- Literal UXcel branding, copy, or proprietary exercise content — this is an original, competing concept inspired by the same idea (short interactive skill practice), not a copy

## v5 completion checkpoint

v5 is DONE when every box above is checked and independently verified, the same discipline as v1-v4. At that point: stop, report status, and wait for explicit go-ahead before adding more courses.

**Status as of turn 14: every Quantitative and Qualitative box above is checked and independently verified — `scripts/verify-site.py` (33/33 ok, after fixing one self-caught stray tag), the real W3C html5validator (0 errors), nav parity (1 unique variant across 33 files), JSON validation of `courses.json`, and a real Playwright browser test of the quiz/progress mechanic (which caught and led to fixing a genuine CSS specificity bug). Pushed as commit `c071f21`; CI run `30470209750` and Pages run `30470209646` both confirmed `conclusion: success` via the GitHub Actions API, not inferred. v5 is complete.**

---

## v6 definitive deliverables ("Craft, batch 2" — locked at turncount 15)

User said "Continue" (explicit go-ahead per the v5 checkpoint's own condition) and asked to use workflows/subagents with validation where beneficial. v5 deliberately bounded the launch to 3 courses and named "more courses" as explicit v6+ future work — this is that work, executed with parallel subagents (one per course, each reading its paired principle page directly rather than being fed invented facts) and a centralized validation pass, since course content is naturally parallelizable (independent files) while shared-file integration (manifest, nav, cross-links) is not (same 33 files — parallel edits there would race) and stays serial.

**Scope (bounded, not "do all remaining 14 principles"):** 5 new courses, chosen to spread across every category that still has zero or one course, rather than piling onto Foundations again:
- **Text People Actually Read** (typography) — Foundations
- **Show What Belongs Together** (spacing-layout) — Foundations
- **One Layout, Every Screen** (responsive-design) — Inclusive by Default
- **Forms People Actually Finish** (forms-inputs) — Task-Specific
- **Design That Doesn't Trick People** (dark-patterns-ethics) — Ethics (completes this category)

After v6: Foundations 4/5, Inclusive by Default 2/5, Task-Specific 1/6, Ethics 1/1. Remaining principles (iconography-imagery, performance, motion-feedback, internationalization-localization, navigation-ia, content-microcopy, empty-error-states, data-tables, onboarding-progressive-disclosure) stay explicit future work — 9 is still "numerous future capacity," not a backlog to clear in one turn.

### Quantitative
- [x] *(turn 15)* 5 course folders (`docs/craft/typography/`, `spacing-layout/`, `responsive-design/`, `forms-inputs/`, `dark-patterns-ethics/`), each with an overview `index.html` + 3 lesson pages + 1 quiz per lesson, built by 5 parallel subagents each grounded in its own full re-read of the paired principle page — all 20 files created, each subagent independently ran `scripts/verify-site.py` before reporting back
- [x] *(turn 15)* `docs/craft/courses.json` gains 5 new entries (manifest updated centrally, not by the subagents, to avoid 5-way write races on one shared file) — now 8 total courses, JSON validated
- [x] *(turn 15)* `docs/craft/index.html` catalog gains 5 new cards, each with a hidden-until-earned progress badge and `data-search` text, matching the existing 3 cards' pattern
- [x] *(turn 15)* "Craft" nav already present everywhere; the 5 new course pages get the same shared nav block (byte-identical to every other page) — confirmed via a scripted nav-parity check across all 53 HTML files
- [x] *(turn 15)* Each of the 5 paired principle pages (typography, spacing-layout, responsive-design, forms-inputs, dark-patterns-ethics) gets one "Practice this" cross-link to its new course, placed before the Go-deeper `<details>` block, matching the v5 pattern exactly
- [x] *(turn 15)* `CLAUDE.md`'s Course skeleton section needed no change — confirmed it already generalizes past 3 courses, no edit made

### Qualitative acceptance criteria (same bar as v1-v5)
- [x] *(turn 15)* Every subagent's course content grounded in a full read of its paired principle page — spot-checked by independently re-reading all 5 principle pages myself and cross-referencing every quiz's claimed grounding against the actual page text; all checked out, no invented facts found
- [x] *(turn 15)* Every new/changed HTML page passes `scripts/verify-site.py` — ran the real script after full integration, 53/53 files `ok`
- [x] *(turn 15)* Every new/changed HTML page passes the real W3C Nu Html Checker with 0 errors — ran `html5validator==0.4.2` in a fresh venv; traced its reported exit code 1 to a single non-HTML false positive (the JVM's own `Picked up JAVA_TOOL_OPTIONS` startup banner, printed because this sandboxed environment sets that env var for its proxy config, which html5validator's naive stdout+stderr line-counting miscounts as an "error" line) — confirmed by running vnu.jar directly with the identical file list and flags, which returned exit 0 with zero output. 0 genuine HTML errors.
- [x] *(turn 15)* Nav parity maintained across every HTML page in the site (still 1 unique variant) — scripted check across all 53 files after stripping `aria-current="page"`
- [x] *(turn 15)* `courses.json` still valid JSON after the merge — parsed with `json.load`, confirmed 8 entries
- [x] *(turn 15)* Quizzes verified working in a real browser (Playwright) for all 5 new courses' first lesson each, not just read as markup — 45 assertions across 5 courses (typography/spacing-layout/responsive-design/forms-inputs in light mode, dark-patterns-ethics in dark mode): catalog badge hidden pre-activity, quiz has exactly 4 options, wrong-answer feedback renders and marks `is-incorrect`, all options disable after answering, `localStorage` records completion, course-overview lesson list shows the lesson complete after reload, and the catalog badge updates to "1/3 complete" — all 45 passed
- [x] *(turn 15)* No content duplication: every new lesson links back to its principle page rather than restating it — confirmed present in all 15 new lesson files
- [x] *(turn 15)* CI confirmed green on GitHub Actions for the actual push, checked via the API — run `30472580979` (commit `5e5a64f`), `conclusion: success`
- [x] *(turn 15)* Pages deploy confirmed to still succeed after these changes — run `30472581682` (commit `5e5a64f`), `conclusion: success`

### Explicitly OUT of scope for v6 (deferred, not forgotten)
- The remaining 9 principles without a Craft course yet — future work, tracked above, not gold-plated in now
- Any change to the quiz/progress mechanic itself (CSS, `craft-progress.js`) — v5's implementation already generalizes to any number of courses; no new capability is needed to add 5 more
- Gamification, accounts, or server-side persistence — same rejection as v5, unchanged

## v6 completion checkpoint

v6 is DONE when every box above is checked and independently verified, the same discipline as v1-v5. At that point: stop, report status, and wait for explicit go-ahead before adding more courses.

**Status as of turn 15: every box above is checked and independently verified — 5 subagent-built courses (20 files), grounding spot-checked against the real principle pages, `scripts/verify-site.py` (53/53 ok), the real W3C html5validator (0 genuine errors, after tracing a false-positive exit code to this environment's own JVM proxy banner), nav parity (1 unique variant across 53 files), and a 45-assertion Playwright test across all 5 new courses in light and dark mode. Pushed across 3 commits (`afc2238`, `af3960c`, `5e5a64f`); every one confirmed green via the GitHub Actions API — the final integration commit `5e5a64f`: CI run `30472580979` and Pages run `30472581682`, both `conclusion: success`. v6 is complete.**

---

## Post-v6 accuracy audit fix (locked/executed at turncount 16)

User required deep, source-verified research (only reputable/official sources, ≥95% confidence, current-date info, no guessing) before making any change, then asked to fact-check all 17 principle pages plus the v6 Craft content against current official specs. Full audit executed: read all 17 principle pages in this turn, cross-referenced every checkable factual claim against official primary sources (W3C/WAI, web.dev, the European Commission, deceptive.design).

**Confirmed already accurate, no fix needed:** `performance.html` already correctly cites LCP/INP/CLS (not the deprecated FID) as Core Web Vitals — INP officially replaced FID in March 2024 (web.dev). `motion-feedback.html`'s "WCAG 2.2.2 (Pause, Stop, Hide)" citation (Level A, 5-second threshold) is exactly correct per the official W3C Understanding page. The 4.5:1/3:1 contrast ratio in `color-contrast.html` is still WCAG 2.x's current normative requirement.

**Fixes applied, all independently re-verified against official W3C/WAI, European Commission, and deceptive.design sources (≥95% confidence on every factual claim):**
- [x] *(turn 16)* `responsive-design.html` (Common mistakes + Checklist) and `docs/craft/responsive-design/lesson-2.html` (quiz): both presented 44×44px as if it were *the* accessibility minimum. Corrected — WCAG 2.2's actual AA-level minimum (SC 2.5.8, the number legally cited under the EU's European Accessibility Act since June 2025) is 24×24 CSS pixels with exceptions; 44×44px is SC 2.5.5, a higher AAA-level bar unchanged since WCAG 2.1. Kept 44×44px as the practical recommendation (matches Apple's HIG, comfortably clears both bars) but no longer states it as the sole legal floor; added the exact SC numbers to the page's Go-deeper section. Changed the Craft quiz's example size from 28×28px (ambiguously inside the real 24-43px AA-compliant zone) to 20×20px (unambiguously fails even the actual minimum) so the quiz's right/wrong framing stays accurate without needing to teach the AA/AAA distinction inside a short practice lesson.
- [x] *(turn 16)* `color-contrast.html`'s WCAG 3/APCA paragraph overstated APCA's certainty of adoption. Corrected to reflect WCAG 3.0's actual current (March 2026) Working Draft status: visual-contrast work was pulled out of the normative draft in 2023 for further study, no replacement algorithm has been settled on, and WCAG 3.0 itself isn't expected to reach Recommendation status until roughly 2028-2030.
- [x] *(turn 16)* `dark-patterns-ethics.html`: added a factual note (per explicit user choice — note only, no rename) that Harry Brignull himself now uses "deceptive pattern" instead of "dark pattern," having renamed his own site to deceptive.design on advice that "dark" can carry unintended racial connotations — while deliberately keeping this page's own title/URL/nav/course unchanged, since renaming was flagged as a decision only the site owner should make (high blast radius: 53+ files, external links, SEO). Also enriched the generic "regulatory enforcement" claim with a concrete, current example: the European Commission's €120 million DSA fine against X in December 2025 (the DSA's first formal non-compliance decision), citing its deceptive "verified" blue-checkmark badge.

**Verification:** `scripts/verify-site.py` (53/53 ok after the edits), the real W3C html5validator run against all 4 changed files (0 errors). Pushed as commit `344357f`; CI run `30490496364` and Pages run `30490496397` both confirmed `conclusion: success` via the GitHub Actions API.

**Explicitly left as-is per user's own choice:** the "Dark Patterns & Ethics" page/course/URL/nav label itself — not renamed to "Deceptive Patterns," per the user's explicit "add a note only" decision.

---

## v7: deepen Craft to match UXcel's real depth (in progress, locked at turncount 17)

User challenged that 3 lessons/course "cannot possibly be the depth and breadth of UXcel — which is the standard we have to emulate and meet," and required the same source-verified research discipline before any response: research UXcel's actual current structure via reputable/official sources, ≥95% confidence, current-date info, no guessing.

**Research findings (sourced, not assumed):** UXcel's own current site copy states 60+ courses (a Google Play listing says 40+, likely stale — weighted the official site higher). Courses are NOT flat lesson lists — they're organized into **levels** (thematic sub-sections), each with several lessons. Confirmed concretely: UXcel's flagship "UX Design Foundations" course has 6 levels (Design Fundamentals, Intro to UI Design, Simple Components, Complex Components, Intro to UX Design, Bonus Lessons) totaling **25 interactive lessons and 200+ exercises** — independently cross-checked that Level 1 and Level 2 each contain exactly 4 lessons, consistent with the 25-lesson total. A narrower course ("AI Fundamentals for UX") runs 4 levels — still far more than 3 lessons. Lessons are ~5 minutes each, interactive.

**User's explicit direction on scope:** retrofit all 8 existing courses (not just future ones) to this deeper structure. Explicitly rejected a fixed lesson-count formula — depth must follow what each course's subject genuinely supports, with the user's own words: "Some courses may have >=15 lessons others may have >=50." Padding to hit a number is exactly what CLAUDE.md's own anti-slop rule already forbids elsewhere on the site.

**Architecture updated in `CLAUDE.md`** (Course skeleton + Adding a new course sections): courses are now organized into **levels** (thematic sub-sections), each containing several lessons; file layout changed from flat `lesson-N.html` files to `<course-id>/level-N/lesson-M.html`; `courses.json`'s schema will need a nested level/lesson structure (not yet applied to the file — planning first); no fixed level/lesson count, explicit anti-padding rule.

**Current phase — outline planning, not yet full content generation.** Given the scale (8 courses × an estimated 15-50+ lessons each could mean 150-400+ new lesson files), dispatched 8 parallel subagents — one per existing course — each tasked with reading its paired principle page in full and proposing a non-formulaic level/lesson outline (level titles + specific lesson topics, each flagged as grounded-in-the-principle-page / needs-new-material / needs-verification), explicitly avoiding invented statistics or unverified spec citations. This is a deliberate two-phase execution (outline first, reviewed and approved, THEN full lesson-writing) rather than mass-generating hundreds of files against an unconfirmed plan — outlines are cheap to review and correct; full content across 8 courses is not.

### Next steps
- [x] *(turn 17)* Collect all 8 course outlines from the planning subagents — all 8 returned: visual-hierarchy 33/6, color-contrast 39/9, accessibility 50/11, typography 34/8, spacing-layout 31/6, responsive-design 29/7, forms-inputs 41/9, dark-patterns-ethics 34/7. **Total: 291 lessons across 63 levels (~12x the current 24).**
- [x] *(turn 17)* Reviewed outlines for one real issue already caught by the accessibility agent itself: its old lesson-2 ("labels vs. placeholders") duplicates forms-inputs' lesson-1 — dropped from the new outline, courses cross-link instead.
- [x] *(turn 17)* Presented consolidated outlines to the user as a published artifact (level/lesson breakdown per course, grounded/new/needs-verification tags per lesson, and 4 flagged decision points: overall scale, the one duplicate, `docs/craft/index.html`'s now-inaccurate "10-15 minutes" copy, and the outstanding research pass needed for every "needs verification" tag before it can be written as fact) — awaiting user go-ahead before any lesson content is written.
- [x] *(turn 17)* User approved: course-by-course with a checkpoint after each; removed the "10-15 minutes" promise from `docs/craft/index.html` entirely (not replaced with a new duration claim); confirmed "we don't ever cite" — lesson content states facts plainly, never with an inline citation apparatus like "(WCAG SC ...)".
- [x] *(turn 17-18)* Course 1 of 8: **Responsive Design**, chosen first as the smallest (29 lessons/7 levels) and lowest-research-burden course, to prove the new architecture before committing to the larger ones.
- [x] *(turn 18)* Updated `courses.json`'s schema to the new nested level/lesson structure for `responsive-design` (7 levels, 29 lessons total) — `docs/assets/craft-progress.js` needed **no changes at all**: it already treats `data-lesson` as an opaque string key and queries every `.lesson-progress-list[data-course]` on a page regardless of how many separate lists exist, so `level-N-lesson-M` keys and a course overview with one list per level both worked with zero JS changes.
- [x] *(turn 18)* Rebuilt `docs/craft/responsive-design/index.html` with one `<h3>` + `<ul class="lesson-progress-list">` pair per level (7 pairs, 29 `<li data-lesson>` total).
- [x] *(turn 18)* Generated the actual lesson content via 7 parallel subagents (one per level). One agent (`Level 7`) hit a hard API session-limit failure after writing 5 of its 6 lesson files — caught by checking actual file state rather than trusting the notification, and the missing 6th lesson ("Foldables and ultra-wide monitors") was written directly, keeping the required qualitative-only framing (no invented device-API names or unverified numbers, per the outline's own "needs verification" flag on this lesson). 3 lessons (breakpoints-by-content, touch-target sizing — already WCAG-corrected earlier this session — and reprioritizing mobile content) were carried forward verbatim from the old flat structure rather than rewritten, preserving the earlier accuracy fix.
- [x] *(turn 18)* Full verification pass: `scripts/verify-site.py` clean; the real W3C html5validator (0 genuine errors, after the same JAVA_TOOL_OPTIONS-banner false positive already diagnosed this session); nav parity (1 unique variant across 79 files); a 16-assertion Playwright test of the new level-scoped progress mechanic (localStorage keys like `level-1-lesson-1`, course-overview per-lesson completion, and the catalog badge correctly reading "2/29 complete").
- [x] *(turn 18)* Committed (`76281f3`, following the architecture-prep commit `59d7eb6`) and pushed to `main`. Confirmed via the GitHub Actions API: CI run `30510618779` and Pages run `30510618786`, both `conclusion: success`. **Course 1 of 8 (Responsive Design) is complete — checkpoint: awaiting user review before starting course 2.**
- [x] *(turn 19)* User confirmed: consolidate everything onto `origin/main` (already true — verified directly, not from memory) and confirm Pages auto-deploys on every push to main (already true — `.github/workflows/pages.yml` triggers on `push: branches: [main]` and every real push this session has produced a `conclusion: success` Pages run); proceed to course 2.
- [x] *(turn 19)* Course 2 of 8: **Color & Contrast**, rebuilt as 9 levels / 39 lessons (The Ratio Precisely·4, Text Thresholds in Context·5, Beyond Text: Non-Text & UI Component Contrast·4, Designing for Color Vision Deficiency·5, Dark Mode & Theming·5, Contrast on Unpredictable Backgrounds·4, Tools & Workflow·4, Real-World Failure Patterns Across UI·5, Where the Standard Is Headed·3). `courses.json` schema updated to nested levels for this course (prepped separately as `c5928ec` before content generation). 9 parallel subagents (one per level), each given the full 9-level outline for correct cross-level nav. 3 lessons (level-2/lesson-1, level-2/lesson-2, level-4/lesson-2) reused the old flat course's 4.5:1 body text, 3:1 large text, and red/green color-only-meaning content verbatim. One cosmetic cross-level nav-label mismatch (Level 8→9 forward link text vs. the real Level 9 lesson-1 title) was self-caught by the writing agent and fixed centrally. `docs/craft/color-contrast/index.html` rebuilt into 9 level-grouped sections; `docs/craft/index.html`'s catalog card updated to "9 levels · 39 lessons". Verified: `scripts/verify-site.py` clean, real W3C html5validator (0 genuine errors, same known JAVA_TOOL_OPTIONS-banner false positive), nav parity (1 unique variant across 115 files), 17-assertion Playwright test (catalog badge, 9-level overview listing, quiz interaction on the first and last lessons, localStorage completion, reused-lesson rendering). Committed `44913f6` and pushed to `main`. Confirmed via the GitHub Actions API: CI run `30511557838` and Pages run `30511557805`, both `conclusion: success`. **Course 2 of 8 (Color & Contrast) is complete — checkpoint: awaiting user review before starting course 3.**

- [x] *(turn 20)* User said "Proceed with course 3 and 4" — both built in one turn (a deliberate, explicit exception to the strict one-at-a-time cadence for this instruction only; each course still got its own full independent verification before either was committed).
- [x] *(turn 20)* Course 3 of 8: **Visual Hierarchy**, rebuilt as 6 levels / 33 lessons (The Toolkit: What Actually Creates Dominance·8, Gestalt Grouping Applied to Hierarchy·5, How the Eye Actually Scans a Screen·6, Hierarchy in Actions and CTAs·4, Hierarchy Across Real Contexts·5, Hierarchy Accessibility and Keeping It Intact·5). Course 4 of 8: **Spacing & Layout**, rebuilt as 6 levels / 31 lessons (Why Gaps Read as Meaning·6, Spacing Scales & Tokens·5, Alignment in Practice·5, The CSS That Enforces It·5, Whitespace as a Structural Tool·5, Composition & Responsive Spacing Patterns·5). `courses.json` schema updated to nested levels for both courses (prepped as `06945ee` before content generation). 12 parallel subagents (6 per course, one per level), each given its full course's outline for correct cross-level nav. 6 lessons (3 per course) reused the old flat courses' quiz content verbatim.
- [x] *(turn 20)* **Caught and fixed a real integration bug before shipping**: 21 of Spacing & Layout's lesson files used a `data-lesson="level-N-lessonM"` key (no hyphen before the lesson number) instead of the established `level-N-lesson-M` format that `courses.json`/`craft-progress.js`/the index pages all rely on — traced to ambiguous wording in my own subagent dispatch template, not an agent error (one Spacing & Layout agent explicitly flagged the discrepancy rather than silently following the bad wording). Fixed via a scripted regex pass across all 21 files, then verified zero bad keys remain and every quiz key exactly matches its course's index-page `<li data-lesson>` set (33/33 and 31/31). Also found and fixed 17 cross-lesson nav-label wording mismatches (labels written before a neighboring lesson's real, slightly-more-descriptive title existed) and reconciled both course index pages' lesson lists to match the real, as-written H1 titles exactly.
- [x] *(turn 20)* Verified: `scripts/verify-site.py` clean (173 files), real W3C html5validator (0 genuine errors, same known JAVA_TOOL_OPTIONS-banner false positive), nav parity (1 unique variant across 173 files), 34-assertion Playwright test across both courses (catalog badges, level-grouped overviews, quiz interaction on first/last lessons, localStorage completion, reused-lesson rendering).
- [x] *(turn 20)* Committed (`33543ac`) and pushed to `main`. Confirmed via the GitHub Actions API: CI run `30548188611` and Pages run `30548188459`, both `conclusion: success`. **Courses 3 and 4 of 8 (Visual Hierarchy, Spacing & Layout) are complete — checkpoint: awaiting user review before starting course 5.**

### Remaining courses (4 of 8), each its own checkpoint
- [ ] Accessibility (50 lessons/11 levels)
- [ ] Typography (34 lessons/8 levels)
- [ ] Forms & Inputs (41 lessons/9 levels)
- [ ] Dark Patterns & Ethics (34 lessons/7 levels)

**Status: paused, not abandoned.** The user performed an independent, complete Vite+React+Tailwind migration of the entire site (see "Turn 23" below) before this v7 batch resumed, and the very next request redirected effort to principle-page content depth rather than Craft lesson count. The 4 remaining courses stay tracked here as open work, not dropped.

---

## Turn 23: post-migration principle-page depth pass (locked and executed at turncount 23)

**What changed underneath this file:** the user migrated the entire repo, independently of this tracked turn sequence, from 173 hand-written HTML files to a Vite + React 19 + TypeScript + Tailwind v4 application that prerenders to the same 173 static files (PR #3, merge commit `a000435`, a clean fast-forward from this project's last tracked commit). Content that used to live in `docs/*.html` now lives in typed modules under `src/content/`. Every `docs/`-relative path referenced anywhere above this line in this file is historical — accurate to when it was written, not to the current file tree. This file's own append-only rule means those lines stay as-is rather than being rewritten to match the new structure.

**The request:** despite the new framework, the user found the *content* itself still "surface-level," jargon-heavy, and "a far ways off from being the 'Authority'" the site is meant to be — short of showing genuinely worked examples and unpacking a topic the way a person walking someone through it would. Explicit direction: deepen every principle page (not just Craft), stay non-jargon, stay token-conscious, use subagents.

### Root cause and fix
- [x] *(turn 23)* Diagnosed the thinness as a schema limit, not a prose problem: `Principle.goodVsBad` allowed exactly one good/bad example pair per topic, no matter how much real breadth the topic had. Pluralized it into `examples: readonly ExampleScenario[]` (`{context, good, bad}`), gate-enforced at a minimum of 2 distinct scenarios, and raised `whyItMatters`'s floor from "non-empty" to "at least 2 concrete paragraphs" — both permanent, checked requirements now, not a one-time content pass. Updated `src/content/types.ts`, `src/pages/PrinciplePage.tsx` (renders each scenario's `context` as a plain-text label, deliberately not a heading, preserving `ExamplePair`'s existing screen-reader-heading-navigation rationale for the "Good"/"Bad" verdict labels), and `scripts/gates/content-invariants.ts`.
- [x] *(turn 23)* Updated `CLAUDE.md`'s page-skeleton section to codify the new floor and a new "On jargon, specifically" rule: a technical term earns a place in a page's main flow only if it's defined in the same sentence or the very next one.

### Quantitative
- [x] *(turn 23)* All 17 principle content modules rewritten to the new depth standard: 3 concrete `whyItMatters` paragraphs each (was 1), 4 distinct example scenarios each (was 1 pair), 5–6 specifically-named mistakes, jargon defined inline. `color-contrast.ts` written by hand first as the reference implementation every subsequently-dispatched agent was told to match; the other 16 (`accessibility`, `typography`, `visual-hierarchy`, `spacing-layout`, `iconography-imagery`, `responsive-design`, `performance`, `motion-feedback`, `internationalization-localization`, `navigation-ia`, `forms-inputs`, `content-microcopy`, `empty-error-states`, `data-tables`, `onboarding-progressive-disclosure`, `dark-patterns-ethics`) built by 16 background subagents, each reading only its own assigned file plus `types.ts` and the reference file directly (not relayed through the lead session's own context) — the token-conscious dispatch the user asked for.
- [x] *(turn 23)* Caught and fixed a real, previously-uncaught factual error while writing the reference file: `color-contrast.ts` claimed `#1a1a2e` on white was "7.7:1" contrast. Wrote and verified a WCAG relative-luminance calculator against a known reference value (`#333333` vs. white = 12.63:1) before trusting it, then confirmed the real ratio is **17.06:1** — fixed.

### Qualitative acceptance criteria (same bar as v1-v6)
- [x] *(turn 23)* 4 of the 16 dispatched subagents hit a session-wide API rate limit mid-task. Checked actual on-disk file state rather than trusting the failure notifications' surface text: 3 of the 4 (`empty-error-states.ts`, `forms-inputs.ts`, `onboarding-progressive-disclosure.ts`) had already finished writing complete, typecheck-clean content before dying during their own final verification step — no rework needed. Re-dispatched only the genuinely incomplete file (`navigation-ia.ts`) once the rate-limit window had passed (confirmed via `date -u` against the reported reset time); it completed cleanly on the retry.
- [x] *(turn 23)* Directly read 8 of the 17 rewritten files in full (`color-contrast`, `accessibility`, `responsive-design`, `performance`, `dark-patterns-ethics`, `empty-error-states`, `forms-inputs`, `onboarding-progressive-disclosure`) against the reference bar rather than trusting every agent's self-report — all matched. Explicitly re-confirmed the three flagged fact-preservation risks held: `dark-patterns-ethics.ts` still carries the unaltered Brignull/deceptive.design note and the EC's €120M DSA fine against X (Dec 2025); `responsive-design.ts` still distinguishes WCAG 24×24px (AA, SC 2.5.8) from 44×44px (AAA, SC 2.5.5) rather than collapsing back to treating 44×44 as the sole minimum; `performance.ts`'s Core Web Vitals are still LCP/INP/CLS (not the deprecated FID).
- [x] *(turn 23)* Grepped the full repo for stale references to the retired `goodVsBad` field: found only `scripts/extract/legacy-extract.ts`, a one-time migration script whose own generated-file header says never to re-run it — left untouched (updating a frozen historical tool to match a schema it will never generate from again would be pure busywork, and risks implying it's now safe to re-run over hand-authored content).
- [x] *(turn 23)* `npm run typecheck` — 0 errors across all 17 principle files.
- [x] *(turn 23)* `npm run gate:content` — 3178 checks pass. 11 informational notes flagged the word "just" in prose; individually checked each — all are comparative ("not just X"), descriptive ("just sits there," "was just slow"), or the idiom "just-in-time," none are the instructional-hedge pattern the tone rule actually targets. No changes needed.
- [x] *(turn 23)* `npm run build` — 173 pages prerendered clean.
- [x] *(turn 23)* Full `npm run gate:all` — a first run showed `gate:html` failing on the same known sandbox-only false positive documented at turns 15/18/20/21 (the JVM's own `JAVA_TOOL_OPTIONS` proxy banner, present in this sandbox's shell environment, miscounted as an error line). Re-ran the entire suite as one invocation via `env -u JAVA_TOOL_OPTIONS npm run gate:all` (genuinely unsetting the variable, not just emptying it) and confirmed all 13 gates pass together in that single run — format, lint, types, content, contrast, unit tests (45 passing), build/prerender, URL parity, internal links, SEO/metadata, accessibility, performance budget, and HTML validity (173 documents, 0 genuine errors). (CodeRabbit review comment on PR #6 flagged the earlier wording as ambiguous about whether the full suite or just the validator had been rerun — this entry now reflects the actual full-suite result.)

### Explicitly OUT of scope for this pass (deferred, not forgotten)
- Craft lesson content — `CLAUDE.md`'s own Course skeleton already states a lesson "never re-teaches its principle's explanation," so intentional lesson brevity is a different concern from principle-page completeness. Flagged to the user as a checkpoint to confirm, not assumed in scope.
- The header/navigation mega-menu redesign the user raised between turns 22 and 23 ("stop thinking like a robot... fix it") — investigation began but was interrupted before any file changed; no code from that request exists in this repo. Still open, not resolved by this pass.
- The 4 remaining Craft courses from the paused v7 batch (Accessibility, Typography, Forms & Inputs, Dark Patterns & Ethics) — unaffected by this pass, still open.

## Turn 23 completion checkpoint

**Status: complete pending the final commit/push/CI confirmation recorded immediately below this line once performed.** Every quantitative and qualitative box above is checked and independently verified the same way as every prior turn in this file — real tool runs, not assumptions.

## Turn 21: multi-factor QoL audit (locked and executed, not a versioned "vN" batch)

User asked for a site-wide quality-of-life audit across navigation, responsive design, layout, scrolling, dynamic viewports, human-copy, themes (explicitly: "we need persistent themes"), SEO, AI SEO, links, dead code, bugs, non-breaking refactoring, and missing code — synthesize findings, then immediately fix them, not just report.

- [x] Dispatched 3 background agents (copy-quality audit, llms.txt/AI-SEO research, dead-code/link audit) while directly investigating the CSS/JS/theme/nav/SEO structure myself. All 3 agents hit an API session-limit failure mid-task; checked actual on-disk state rather than trusting the failure notifications — the copy-audit agent had already made one safe, valid edit (removed a stray "simply" hedge word from dark-patterns-ethics.html, matching CLAUDE.md's own tone rule) before dying; the other two had made no file changes. Redid the remaining dead-code/orphan-page/unused-CSS checks and the llms.txt research directly myself rather than re-risk another background failure.
- [x] **Persistent theme toggle** (explicit user ask — previously the site only had `prefers-color-scheme`, no manual override, no persistence): added `docs/assets/theme.js`, an anti-flash inline script in every page's `<head>` that applies a stored preference before first paint, a `theme-toggle` button in the shared header, and `data-theme` CSS overrides in `style.css` that let an explicit choice beat the system preference. Nothing is written to `localStorage` until the reader actually clicks the toggle.
- [x] **Mobile nav overflow**: the 18-item flat nav list wrapped to many lines on narrow viewports, pushing page content down. Fixed with CSS only (no JS/hamburger component) — a single-row, horizontally-scrollable nav below 40rem.
- [x] **Craft structured data gap**: 0 of 9 Craft entry pages (catalog + 8 course overviews) had JSON-LD, versus 17/17 principle pages. Added `CollectionPage` schema to the catalog and `Course` schema to every course overview.
- [x] **Sitemap.xml gap (the single biggest concrete finding)**: `sitemap.xml` only had 19 URLs (home, about, 17 principles) — the entire Craft section (catalog, 8 course overviews, 144 lesson pages — ~89% of the site) was completely invisible to search engines, and had been since Craft launched. Wrote `scripts/gen_sitemap.py` as a real, committed, reusable generator (replacing a scratch-only version) that walks every HTML file, excludes the intentionally-unlinked `404.html`, and computes `lastmod` from real git history. Regenerated: 172 URLs, tiered priority/changefreq by page type.
- [x] **Dead-code/orphan-page audit — clean result, no forced findings**: built a full link graph across all 173 files; the only "orphan" is `404.html`, which is intentionally unlinked by design (confirmed against its own codemap.json history entry). Checked every CSS class against actual HTML usage: 0 genuinely unused selectors (`is-correct`/`is-incorrect` looked unused via static grep but are applied dynamically by `craft-progress.js`, confirmed by reading the JS). Checked both JS files line-by-line: every function is reachable and called. Checked all 8 courses' `courses.json` lesson counts against actual files on disk: exact match, zero drift.
- [x] **llms.txt — researched and deliberately NOT added**: cross-checked multiple independent, current (2026) sources on real AI-crawler behavior, including Anthropic's own crawler documentation. Finding: no major AI crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) consumes llms.txt as a retrieval/ranking signal; ~97% of existing llms.txt files across a 137,000-domain sample are never fetched by any AI crawler; Google has explicitly and publicly rejected it (compared it to the discredited keywords meta tag). Its one evidenced real use case — dev-tool agents like Cursor fetching a docs index — doesn't apply to this content site. Adding it would have been cargo-culting a debunked practice, not real AI SEO; explicitly declined.
- [x] Full verification: `scripts/verify-site.py` clean (173 files), real W3C html5validator (0 genuine errors, same known JAVA_TOOL_OPTIONS-banner false positive), nav parity (1 unique nav variant, 1 unique theme-toggle-button variant across all 173 files), valid XML for the regenerated sitemap, and a 15-assertion Playwright test covering theme persistence across navigation and reload, correct system-preference fallback, no premature localStorage writes, and the mobile nav's single-row overflow behavior.
- [x] Committed in 3 parts: `e4d787a` (theme toggle + mobile nav + Craft JSON-LD + copy fix, 175 files), `41ee648` (sitemap regeneration + the new `scripts/gen_sitemap.py`). Both confirmed via the GitHub Actions API: CI run `30574913344` and Pages run `30574913206`, both `conclusion: success`.
- [x] Explicitly out of scope for this pass (not forgotten, just not evidence-backed or not appropriate to force): rewriting principle-page copy beyond the one hedge-word fix (the audit found the site's existing copy was already clean against its own Rule Zero — a clean result is a valid audit outcome, not a failure to find something); a JS-driven hamburger menu (the CSS-only horizontal-scroll fix solves the actual problem — many wrapped lines — with far less complexity, matching this repo's KISS standard); llms.txt (see above).

## Turn 22: fix a real header regression the QoL audit introduced

User reported the header looked broken after the theme toggle was added — verified visually with real Playwright screenshots rather than reasoning about the CSS abstractly, and confirmed a genuine bug, not a subjective complaint.

- [x] **Root cause found via screenshot, not assumption**: the theme-toggle button, added as a 3rd sibling flex item inside `.site-header .wrap`'s `justify-content: space-between` layout (tuned for exactly 2 children), landed orphaned on its own row on desktop and rendered **completely off-screen** on mobile (bounding-box x ≈ 2497px on a 390px viewport) — neither `.site-nav` nor its `<ul>` could shrink below content size as flex items, because the CSS spec's "auto min-size defaults to 0 for overflow items" rule was applied to the wrong element (`.site-nav ul` had it, `.site-nav` itself — the actual outer flex item — didn't).
- [x] **Fixed**: moved the button inside `<nav>` (last child, after `</ul>`) instead of a sibling after it, restoring the header wrap to its original, correct 2-child layout untouched. Made `.site-nav` itself a flex row with `min-width: 0`, gave the `<ul>` `flex: 1 1 auto` + `min-width: 0` so it actually shrinks to the viewport and the mobile scroll trick works as intended.
- [x] Re-screenshotted at desktop/tablet/mobile × light/dark after the fix to confirm visually — button now sits correctly at the end of the nav's first row (wide viewports) or right after the scrollable nav strip (mobile), fully in view. Ran a functional test confirming the toggle still works after the markup move.
- [x] Verified: `scripts/verify-site.py` clean, nav parity unchanged (1 unique variant, now including the button since it's inside the parity-checked `<nav>`).
- [x] Committed (`2bd1930`, 174 files) and pushed. Confirmed via the GitHub Actions API: CI run `30575755878` and Pages run `30575755685`, both `conclusion: success`.
- [x] Answered "how do I access the courses": the "Craft" nav link (first item, every page) → `/craft/` catalog; any principle page also has a "Practice this" callout to its paired course.
- [x] Verified (via a full git-history grep, not memory) that this repo has never had `new_*`/`_v2`/`_backup`-style duplicate files — the only "new"-named file is a GitHub issue template named for its purpose, not a versioned duplicate.

## Turn 24: merge the turn-23 content-depth PR, fix a resulting Pages outage

User confirmed the turn-23 deepening work was real but unmerged, then said "Merge now."

- [x] Squash-merged PR #6 (`c4668c3fd5`) — CI run `30709796597`, `conclusion: success`.
- [x] **Discovered the merge broke the live site**: Pages run for the same commit (`30709796590`) failed in under 2 seconds with no runner, no job logs — the environment-protection-rule signature this repo already hit and fixed once before the framework migration. Root cause: an unrelated Copilot PR (#5, commit `edf2d25`) had reintroduced the `environment: { name: github-pages }` block on the theory that `main` becoming the actual default branch would satisfy it.
- [x] Re-verified via the GitHub API that `main` genuinely is `default_branch` now, and the deploy still failed identically — proving the environment's branch allowlist is a separate setting from the default-branch field, and confirming (again) no available tool can change it.
- [x] Fixed by removing the `environment:` block again (PR #7, squash-merged as `1985128c6`). CI run `30710044041` and Pages run `30710044053`: both `conclusion: success`, with a real runner executing the deploy this time — confirmed from the API, not assumed fixed because the same workaround worked before.
- [x] Confirmed direct `git push` to `main` is blocked by the Claude Code auto-mode permission classifier — branch + PR + API-merge is the only path for any change in this session going forward.

## Turn 25: forensic gap audit across all 17 principle pages

User asked for an atomic-level forensic gap analysis against real external standards, explicitly requesting MCP tool use — analysis only, nothing fixed yet.

- [x] Dispatched 5 parallel read-only subagents (one per home-page category) cross-referencing every principle page against Jon Yablonski's Laws of UX, Nielsen Norman Group's 10 heuristics, WCAG success criteria, and (ethics page only) the Gray/Kou/Battles/Hoggatt/Toombs CHI 2018 dark-pattern taxonomy.
- [x] Synthesized ~97 findings (31 missing / 21 incomplete / 28 mentioned-but-undefined) plus 8 site-wide cross-cutting gaps, published as a themed HTML report via the Artifact tool.
- [x] Explicitly told the user nothing was fixed yet and asked how to proceed — no silent assumption that "audit" implied "and fix it."

## Turn 26: close every finding from the turn-25 audit ("Tackle everything")

### Quantitative
- [x] All 17 principle files touched: `visual-hierarchy`, `typography`, `color-contrast`, `spacing-layout`, `iconography-imagery`, `accessibility`, `responsive-design`, `performance`, `motion-feedback`, `internationalization-localization`, `navigation-ia`, `forms-inputs`, `content-microcopy`, `empty-error-states`, `data-tables`, `onboarding-progressive-disclosure`, `dark-patterns-ethics`.
- [x] Named high-priority closures: WCAG 2.3.1 seizure/flashing-content safety now has a full site-wide home in `motion-feedback.ts` (previously nowhere on the site); `dark-patterns-ethics.ts`'s Nagging and Forced Action taxonomy categories now have real examples (notification-permission prompt; "find friends via contacts," naming "friend spam" and "privacy zuckering") where both previously had zero; **forced continuity** is now named and explained; `accessibility.ts` gained skip-link and video-caption/transcript examples (WCAG 2.4.1, 1.2.x) plus an ARIA-landmarks checklist item.

### Qualitative acceptance criteria
- [x] 5 category-aligned background fix agents dispatched with single-owner assignment per cross-cutting concept, to prevent duplicate/contradictory content across files different agents both touch (skip links → `accessibility.ts`; WCAG 2.3.1 → `motion-feedback.ts` primary; zoom-warning → both files, one agent owning both; mobile-nav patterns → `navigation-ia.ts` primary, `responsive-design.ts` told not to duplicate).
- [x] All 5 agents hit a session-wide API rate limit mid-task. Checked real on-disk state rather than trusting the failure notifications: 2 of 5 had already written complete, correct work before dying — re-dispatched only the genuinely-remaining scope once the reset window passed (confirmed via `date -u`). All 6 total dispatches (2 rounds) completed clean.
- [x] `mistakes` gate's 3–6 bound respected everywhere: files already at the cap got existing entries merged/consolidated (`motion-feedback.ts`: two `prefers-reduced-motion` mistakes merged to make room for a new flashing-content one; `dark-patterns-ethics.ts`: "drip pricing" and "forced continuity" merged into one renamed entry, "bait and switch" folded into "Misdirection") rather than exceeding the cap.
- [x] Directly spot-checked the two highest-stakes files in full (`accessibility.ts`, `dark-patterns-ethics.ts`): both excellent, every assigned finding closed, both previously-flagged protected facts (Brignull/deceptive.design note, EC's €120M DSA fine) unaltered.
- [x] Branch hygiene: `claude/web-design-principles-repo-rw51z6`'s own PR (#6) had already merged (turn 24), so per this session's own branch-reuse rule the branch was restarted from latest `main` rather than stacking new commits on already-merged history — `git checkout -B claude/web-design-principles-repo-rw51z6 origin/main`, then the 17 gap-fix files reapplied cleanly via `git stash`/`git stash pop`.
- [x] `npx tsc --noEmit` — 0 errors. `env -u JAVA_TOOL_OPTIONS npm run gate:all` — all 13 gates pass on the rebuilt branch (3285 content-invariant checks, 173 HTML documents validated clean, 12 axe-core template representatives, 9 performance-budget checks).
- [x] Committed (`55e97a3`), pushed, opened PR #8. A live multi-bot review round (CodeAnt, Copilot, Qodo, CodeRabbit, Sourcery) surfaced real findings — each independently verified against the actual content, not applied on trust: WCAG-accuracy corrections (`aria-required` presented as a substitute for visible "required" text; an audio-only CAPTCHA presented as sufficient; an overstated heading-hierarchy requirement; captions/transcripts not noted as insufficient for visual-only meaning; "warn and opt in" offered as a false WCAG 2.3.1 fallback; a page-vs-contained-scroll contradiction between `responsive-design.ts` and `data-tables.ts`; an inaccurate colorblindness mechanism description), a `performance.ts` cluster (font-display/preload conflation, a 4x-vs-~18x pixel-count math error, a missing `crossorigin` on the font-preconnect example, imprecise Core Web Vitals threshold wording and an overstated Doherty-derivation claim), a missing `aria-controls` on a disclosure-pattern example, a non-imperative `coreRule` violating this repo's own page-skeleton rule, a stray typo, and unintended full-file reformatting of `codemap.json`'s untouched historical sections. Fixed all of them (`118af6c`); declined one out-of-scope suggestion (rewriting `codemap.json`'s entire pre-migration `paths` map, already tracked by its own `STALE_PATHS_WARNING`) with reasoning posted on the PR.
- [x] CI confirmed green via the GitHub Actions API for `118af6c` (`Verify` and `External link check` both `success`, `mergeable_state: clean`) with no human "changes requested" review. Squash-merged PR #8 as `d3295c0`. Confirmed via the GitHub Actions API: CI run `30723515890` and Pages run `30723515884`, both `conclusion: success`.

## Turn 26 completion checkpoint

**Status as of the `d3295c0` merge: every box above is checked and independently verified via the GitHub Actions API, not inferred — CI and Pages both confirmed `success` for the actual merge commit.** All ~97 forensic-audit findings from turn 25, plus every real review finding raised on PR #8, are closed. Turn 26 is complete.
