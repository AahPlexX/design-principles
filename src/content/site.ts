import { html } from "@/lib/html";

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

export const HOME_PAGE = {
  title: "Design Principles",
  blurb:
    "The single source of truth for web design principles, methods, and concepts — explained so anyone can follow them.",
  definition: html(
    "The single source of truth for web design principles, methods, and concepts — explained so anyone can follow them, and packaged so a machine can act on them too.",
  ),
  intro: html(
    'Every concept here is written once, in one canonical place. Pick a principle to read it, or work through a <a href="craft/">Craft course</a> to practise applying one.',
  ),
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
  body: html(
    'Head back to the <a href="./">home page</a> and use the filter box to find the principle you were looking for, or pick one directly from the navigation above.',
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
