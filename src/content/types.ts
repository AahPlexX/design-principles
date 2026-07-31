/**
 * The shape of the site's content.
 *
 * These types are the contract between the content modules and the page components. Content was
 * extracted from the original hand-written HTML, so a few fields are HTML strings rather than plain
 * text: the prose contained inline `<strong>`, `<code>`, `<em>` and `<a>` markup that carries meaning
 * and would be lost if it were flattened.
 */

/**
 * A fragment of trusted inline HTML from a content module.
 *
 * The brand is not security theatre — it makes `dangerouslySetInnerHTML` call sites impossible to
 * reach with an arbitrary string. Values are produced by `html()` in `@/lib/html`, which is the one
 * place that validates the allowed tag set. Content comes from this repository, never from a user.
 */
export type HtmlString = string & { readonly __html: unique symbol };

/** The four groupings the home page organises principles into, in display order. */
export const PRINCIPLE_CATEGORIES = [
  "Foundations",
  "Inclusive by Default",
  "Task-Specific",
  "Ethics",
] as const;

export type PrincipleCategory = (typeof PRINCIPLE_CATEGORIES)[number];

/** One side of a principle page's side-by-side comparison. */
export interface ExampleSide {
  /** Verdict plus the number that justifies it, e.g. `Good — 7.7:1`. */
  readonly label: string;
  /** Verbatim code sample. Rendered in a `<pre><code>`, so whitespace is significant. */
  readonly code: string;
  /** One sentence on why this side lands where it does. */
  readonly note: HtmlString;
}

/**
 * One concrete before/after scenario inside a principle's "Good vs. bad" section.
 *
 * A principle almost never has just one real context it shows up in — color contrast applies to body
 * text, buttons, and text over a photo; visual hierarchy applies to a checkout page and a dashboard.
 * One example proves the rule holds once; several prove it's actually a rule. `context` names the
 * specific situation ("Body text on a white card", "A disabled-looking button") so a reader can jump
 * straight to the one closest to what they're building.
 */
export interface ExampleScenario {
  readonly context: string;
  readonly good: ExampleSide;
  readonly bad: ExampleSide;
}

/** A named failure mode. The name is bolded and read as a heading, so it stands alone. */
export interface Mistake {
  readonly name: string;
  readonly body: HtmlString;
}

/** One expert-nuance entry inside the collapsed "Go deeper" block. */
export interface DeepDive {
  readonly lead: string;
  readonly body: HtmlString;
}

export interface Principle {
  readonly slug: string;
  readonly title: string;
  readonly category: PrincipleCategory;
  /** One sentence. Doubles as the meta description and the home page card blurb. */
  readonly blurb: string;
  /** Lowercase keyword blob backing home page search and the command palette. */
  readonly searchKeywords: string;
  /** Plain-English definition, before any jargon. */
  readonly definition: HtmlString;
  /** At least two concrete paragraphs — a single abstract sentence doesn't earn the section. */
  readonly whyItMatters: readonly HtmlString[];
  readonly coreRule: readonly HtmlString[];
  /** At least two scenarios covering genuinely different contexts the rule applies in. */
  readonly examples: readonly ExampleScenario[];
  readonly mistakes: readonly Mistake[];
  readonly checklist: readonly HtmlString[];
  /** Set when a Craft course pairs with this principle. */
  readonly practiceCourseId: string | null;
  readonly goDeeper: readonly DeepDive[];
  /** ISO date, carried through to JSON-LD `datePublished`. */
  readonly datePublished: string;
}

/**
 * A lesson's identifier within its course.
 *
 * Two formats exist and both must survive: `lesson-3` in flat courses and `level-2-lesson-3` in
 * levelled ones. These strings are localStorage keys for real visitors, so normalising them into a
 * single format would silently discard existing progress.
 */
export type LessonId = string;

/**
 * A quiz prompt is a short sequence of blocks, not a single paragraph.
 *
 * Most questions are one paragraph, but seven lessons interleave a code sample between two
 * paragraphs — "here is the CSS, now what breaks?" — and that sample cannot be inline markup because
 * whitespace in it is significant.
 */
export type QuizPromptBlock =
  | { readonly kind: "text"; readonly html: HtmlString }
  | { readonly kind: "code"; readonly code: string };

export interface Quiz {
  readonly prompt: readonly QuizPromptBlock[];
  /** Always four, exactly one of which is correct. A gate enforces both. */
  readonly options: readonly QuizOption[];
  /**
   * Shown after answering, identical for right and wrong answers — the explanation of *why* does not
   * change based on what the reader guessed. Only the accent colour differs.
   */
  readonly feedback: HtmlString;
}

export interface QuizOption {
  readonly text: HtmlString;
  readonly correct: boolean;
}

export interface Lesson {
  readonly courseId: string;
  readonly lessonId: LessonId;
  /** Null in flat courses. */
  readonly levelId: string | null;
  readonly levelNumber: number | null;
  readonly lessonNumber: number;
  /** Title without the "Level 1, Lesson 2:" prefix, which is derived at render time. */
  readonly title: string;
  readonly framing: readonly HtmlString[];
  readonly quiz: Quiz;
  /** The principle page carrying the full explanation this lesson practises. */
  readonly principleSlug: string;
}

export interface CourseLevel {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly lessonIds: readonly LessonId[];
}

export interface Course {
  readonly id: string;
  /** A 3–6 word concrete outcome phrase, per the naming rule in CLAUDE.md. */
  readonly title: string;
  readonly hook: string;
  /**
   * The course page's opening sentence.
   *
   * Longer and more specific than `hook`, which is the one-liner the catalog card shows. Each course
   * page was hand-written with its own, and they are not interchangeable.
   */
  readonly definition: HtmlString;
  /** The paragraph naming the principle page that carries the explanation this course practises. */
  readonly pairing: HtmlString;
  readonly principleSlug: string;
  readonly principleTitle: string;
  readonly searchKeywords: string;
  /**
   * Levelled courses group lessons under thematic levels; flat ones do not. The distinction changes
   * the URL shape (`level-1/lesson-1.html` vs `lesson-1.html`), so it is modelled rather than
   * inferred.
   */
  readonly structure:
    | { readonly kind: "levelled"; readonly levels: readonly CourseLevel[] }
    | { readonly kind: "flat"; readonly lessonIds: readonly LessonId[] };
}

/** A home page card. Kept separate from `Principle` so the grid's order and grouping are explicit. */
export interface PrincipleGroup {
  readonly category: PrincipleCategory;
  readonly slugs: readonly string[];
}
