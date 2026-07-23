# Design Principles

The single source of truth for web design principles, methods, and concepts — explained so anyone can follow them, and packaged so a machine can act on them too.

**Live site:** https://aahplexx.github.io/design-principles/

## What's here

Every concept in this repo is written once, in one canonical place, and reused everywhere else so nothing drifts out of sync.

| Folder | What it is | Who uses it |
|---|---|---|
| [`/docs`](./docs) | The browsable site (published to GitHub Pages) | Anyone learning or looking something up |
| [`/skills`](./skills) | Claude Code skills — checklists an agent can run against real work | Claude Code users, via `.claude/skills` |
| [`/prompts`](./prompts) | Standalone system prompts that give an LLM the judgment to apply these principles | Anyone building an LLM app or agent |

## Using the exports

**A skill:** copy the folder you want from `/skills` into your own project's `.claude/skills/` directory. Each skill is self-contained.

```bash
cp -r skills/design-critique /path/to/your/project/.claude/skills/
```

**A prompt:** open the file in `/prompts` and use its contents as-is for a system prompt, or paste it into whatever tool accepts one.

**The site:** just browse it. Every page follows the same shape — a plain-English definition, why it matters, the core rule, a good/bad example, common mistakes, and a checklist — so once you know one page, you know how to read all of them.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a new principle, skill, or prompt.

## License

[MIT](./LICENSE)
