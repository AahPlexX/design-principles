# Design Principles

The single source of truth for web design principles, methods, and concepts — explained so anyone can follow them, and packaged so a machine can act on them too.

**Live site:** <https://aahplexx.github.io/design-principles/>

## What's here

Every concept in this repo is written once, in one canonical place, and reused everywhere else so nothing drifts out of sync.

| Folder | What it is | Who uses it |
| --- | --- | --- |
| [`/src/content`](./src/content) | The canonical content — every principle, course, and lesson, as typed modules | Anyone adding or editing content |
| [`/src`](./src) | The site that renders it, published to GitHub Pages | Anyone learning or looking something up |
| [`/skills`](./skills) | Claude Code skills — checklists an agent can run against real work | Claude Code users, via `.claude/skills` |
| [`/prompts`](./prompts) | Standalone system prompts that give an LLM the judgment to apply these principles | Anyone building an LLM app or agent |

## Using the exports

**A skill:** copy the folder you want from `/skills` into your own project's `.claude/skills/` directory. Each skill is self-contained.

```bash
cp -r skills/design-critique /path/to/your/project/.claude/skills/
```

**A prompt:** open the file in `/prompts` and use its contents as-is for a system prompt, or paste it into whatever tool accepts one.

**The site:** just browse it. Every page follows the same shape — a plain-English definition, why it matters, the core rule, a good/bad example, common mistakes, and a checklist — so once you know one page, you know how to read all of them.

## Running it locally

```bash
npm install
npm run dev        # http://localhost:5173/design-principles/
npm run gate:all   # the full check: types, tests, build, links, a11y, SEO, W3C validity
```

The site is a Vite + React + Tailwind application prerendered to static HTML — 173 pages, generated
from the content modules, served by GitHub Pages with no server behind it.
[`ARCHITECTURE.md`](./ARCHITECTURE.md) explains how and why.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a new principle, course, skill, or prompt.

## License

[MIT](./LICENSE)
