## What this changes

<!-- New principle page, skill/prompt, site fix, CI change, etc. -->

## Checklist

- [ ] `npm run gate:all` passes clean
- [ ] If a page was added or removed: the URL snapshot was updated deliberately
      (`npx tsx scripts/gates/url-parity.ts --write`) and that diff is in this PR
- [ ] If a principle was added: it is registered in `src/content/index.ts`, `NAV_PRINCIPLE_ORDER`, and a
      `HOME_GROUPS` entry
- [ ] If a skill/prompt was added: it links back to its canonical page instead of restating the page's content
- [ ] No content/skill/prompt duplicates something another page or skill already covers (see `CONTRIBUTING.md`)
- [ ] Nothing here changes a `localStorage` key, a lesson id, or an existing URL
      (see `.kiro/steering/migration-invariants.md`)
