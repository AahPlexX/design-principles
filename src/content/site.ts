import { html } from "@/lib/html";
import { slugify } from "@/lib/slug";

import { PRINCIPLE_CATEGORIES, type HtmlString, type PrincipleCategory } from "./types";

/**
 * The order principles appear in the primary navigation.
 *
 * This was previously a hand-maintained `<ul>` duplicated into all 173 HTML files, which is why
 * CONTRIBUTING.md used to instruct contributors to paste a new entry "into every existing HTML file,
 * in the same position". It is now written once.
 */
export const NAV_PRINCIPLE_ORDER = [
  "visual-hierarchy",
  "typography",
  "color-contrast",
  "spacing-layout",
  "iconography-imagery",
  "accessibility",
  "responsive-design",
  "performance",
  "motion-feedback",
  "internationalization-localization",
  "navigation-ia",
  "forms-inputs",
  "content-microcopy",
  "empty-error-states",
  "data-tables",
  "onboarding-progressive-disclosure",
  "dark-patterns-ethics",
] as const;

/**
 * How the home page groups principles.
 *
 * The grouping is editorial, so it is stated here rather than derived: "Inclusive by Default" is an
 * argument about what should be treated as baseline, not a fact about the pages.
 *
 * The `summary` lines are **new copy**, added by the redesign. The original page printed the four
 * category headings with no explanation, so a reader could see that "Ethics" held one principle and
 * "Foundations" held five without being told why either grouping existed. This is the only place the
 * migration adds prose rather than carrying it across; everything else is verbatim.
 */
export const HOME_GROUPS: readonly {
  readonly category: PrincipleCategory;
  readonly summary: string;
  readonly slugs: readonly string[];
}[] = [
  {
    category: "Foundations",
    summary: "The four or five decisions every screen makes whether you think about them or not.",
    slugs: [
      "visual-hierarchy",
      "typography",
      "color-contrast",
      "spacing-layout",
      "iconography-imagery",
    ],
  },
  {
    category: "Inclusive by Default",
    summary: "Not a later pass. Each of these is cheaper to get right the first time.",
    slugs: [
      "accessibility",
      "responsive-design",
      "performance",
      "motion-feedback",
      "internationalization-localization",
    ],
  },
  {
    category: "Task-Specific",
    summary: "Patterns for the specific jobs interfaces are asked to do.",
    slugs: [
      "navigation-ia",
      "forms-inputs",
      "content-microcopy",
      "empty-error-states",
      "data-tables",
      "onboarding-progressive-disclosure",
    ],
  },
  {
    category: "Ethics",
    summary:
      "Where a design decision stops being a preference and starts being a choice about people.",
    slugs: ["dark-patterns-ethics"],
  },
];

/**
 * The fragment id of a category's section on the home page.
 *
 * Derived rather than declared, and derived here rather than in the template, because the home page is
 * not the only thing that needs it: every principle page's category eyebrow links to
 * `/design-principles/#<id>`, so the string is shared and a second copy of it is a second thing to keep
 * in step. The four values are `foundations`, `inclusive-by-default`, `task-specific` and `ethics`.
 *
 * These ids are link targets, which makes them the same kind of public contract as the file names — a
 * renamed category would move an anchor that seventeen pages point at.
 */
export function categoryId(category: PrincipleCategory): string {
  return slugify(category);
}

export const HOME_PAGE = {
  /**
   * The `<h1>`, which is deliberately not the site name.
   *
   * The wordmark in the header already says "Design Principles"; repeating it as the heading would
   * spend the most prominent line on the page saying nothing new. This sentence is the original page's
   * heading and it does the work the wordmark cannot.
   */
  heading: "Web design, explained in plain English",
  /** Used for the `<title>` and the nav brand, where the site's name is what a reader is looking for. */
  title: "Design Principles",
  blurb:
    "A reference for how good web design actually works — the underlying rules, why they hold, and how to apply them.",
  definition: html(
    "This is a reference for how good web design actually works — not opinions, not trends, just the underlying rules and why they hold. Every page here is written to make sense whether you've never opened a CSS file or you've been doing this for a decade.",
  ),
  intro: html(
    "Pick a topic below. Each page follows the same shape: a plain definition, why it matters, the one rule to remember, a real good-vs-bad example, the mistakes people actually make, and a checklist you can run against your own work.",
  ),
  beyond: {
    heading: "Beyond the site",
    body: html(
      'These principles are also packaged as <a href="https://github.com/aahplexx/design-principles/tree/main/skills">Claude Code skills</a> you can drop into a project, and <a href="https://github.com/aahplexx/design-principles/tree/main/prompts">system prompts</a> you can hand to any LLM. See the <a href="/design-principles/about.html">About page</a> for how to use them.',
    ),
  },
} as const;

export const ABOUT_PAGE = {
  title: "About this site",
  blurb: "What this site is, who it's for, and how to use its exported skills and prompts.",
  definition: html(
    "A reference for web design that doesn't assume you already know the vocabulary, and doesn't waste the time of people who do.",
  ),
  sections: [
    {
      heading: "Who this is for",
      body: [
        html(
          "Anyone who touches a web page's design: developers who need to make a reasonable call without a designer in the room, designers who want a shared vocabulary with their team, and beginners who want to know <em>why</em> a rule exists, not just that it does.",
        ),
        html(
          'Every page is written so a first-time reader can follow it start to finish. If you already know the basics, the "Go deeper" section at the bottom of each page has the edge cases and spec details you\'re actually looking for.',
        ),
      ],
    },
    {
      heading: "How to read a page",
      body: [
        html(
          "Every principle page has the same six parts, in the same order, on purpose — once you know the shape, you can skim straight to the part you need:",
        ),
      ],
      steps: [
        { term: "Definition", detail: html("what the term means, in one sentence.") },
        { term: "Why it matters", detail: html("what actually breaks when you get it wrong.") },
        { term: "The core rule", detail: html("the one thing to remember.") },
        { term: "Good vs. bad example", detail: html("a concrete comparison, not a theory.") },
        {
          term: "Common mistakes",
          detail: html("the specific ways people get this wrong in practice."),
        },
        { term: "Checklist", detail: html("run this against your own work.") },
      ],
    },
  ],
  exports: {
    heading: "Using the exports",
    intro: html(
      "This site is the canonical explanation. Two other formats package the same rules for machine use, kept in sync with the site so none of them drift apart:",
    ),
    items: [
      {
        heading: "Skills",
        body: html(
          '<a href="https://github.com/aahplexx/design-principles/tree/main/skills">/skills</a> holds <a href="https://code.claude.com/docs">Claude Code</a> skills — each one turns a principle\'s checklist into something an agent can run against real code or copy. Copy the folder you want into your own project:',
        ),
        code: "cp -r skills/design-critique your-project/.claude/skills/",
      },
      {
        heading: "Prompts",
        body: html(
          "<a href=\"https://github.com/aahplexx/design-principles/tree/main/prompts\">/prompts</a> holds standalone system prompts. Each one gives an LLM a persona and a checklist — paste the file's contents in as a system prompt for whatever tool you're using.",
        ),
        code: null,
      },
    ],
  },
  contributing: {
    heading: "Contributing",
    body: html(
      'See <a href="https://github.com/aahplexx/design-principles/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> on GitHub for how to add a principle, skill, or prompt.',
    ),
  },
} as const;

export const NOT_FOUND_PAGE = {
  title: "This page doesn't exist",
  blurb: "This page doesn't exist — find your way back to the design principles reference.",
  definition: html(
    "The link that brought you here is either outdated or mistyped — this exact page was never part of the site, or it's been renamed since whatever linked to it was written.",
  ),
  heading: "What to do next",
  /*
   * Every href here is absolute.
   *
   * This page is GitHub Pages' error document for the whole site, so it is served *at the URL that was
   * not found* — which can be at any depth. A relative `./` would resolve against the missing page's
   * own directory and point at a second 404. The original page got this right; it is worth stating why,
   * because it looks like an unnecessary absolute path until you know.
   *
   * The wording no longer says "pick one from the navigation above": the header now carries three
   * destinations rather than all seventeen principle titles, so that sentence would describe a menu
   * that is not there.
   */
  body: html(
    'Head back to the <a href="/design-principles/">home page</a> and use the filter box to find the principle you were looking for, or search the whole site with the button in the header.',
  ),
  note: html(
    "If you followed a link from somewhere else on the web and it led you here, that link is stale — the page it pointed to has moved or no longer exists under that name.",
  ),
} as const;

export const CRAFT_INDEX_PAGE = {
  title: "Craft",
  blurb:
    "Short, hands-on courses that pair with a principle page — practise applying a rule, not just reading it.",
  definition: html(
    "A principle page is the textbook: why a rule holds. A Craft course is the practice: proving you can apply it.",
  ),
  intro: html(
    "Each course pairs with exactly one principle page and never re-teaches its explanation — it links back and puts you to work. Progress is saved in this browser only.",
  ),
  moreHeading: "More on the way",
  moreBody: html(
    'Courses are added as topics warrant them, not to fill a grid. If there is one you want, <a href="https://github.com/aahplexx/design-principles/issues/new/choose">open an issue</a>.',
  ),
} as const;

/** Footer attribution. Present on every page since the first commit; the licence requires it. */
export const FOOTER_TEXT: HtmlString = html(
  'Design Principles — <a href="https://github.com/aahplexx/design-principles">source on GitHub</a>, MIT licensed.',
);

export { PRINCIPLE_CATEGORIES };
