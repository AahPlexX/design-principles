/**
 * One-off migration tool: reads the original hand-written HTML in `docs/` and writes typed content
 * modules into `src/content/`.
 *
 * Kept in the repository for provenance — it documents exactly how the content was derived, and lets
 * anyone re-run the extraction to audit the result against the pre-migration HTML. It is not part of
 * the build. Once the content modules exist, they are the source of truth.
 *
 * The tool is deliberately strict: it asserts the shape it expects at every step and throws on
 * anything unexpected rather than guessing. A crash here is cheap. Silently dropping a paragraph from
 * one of 173 pages is not.
 *
 *   npm run extract:legacy
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const DOCS = path.join(repoRoot, "docs");
const OUT = path.join(repoRoot, "src", "content");

const REQUIRED_H2 = [
  "Why it matters",
  "The core rule",
  "Good vs. bad",
  "Common mistakes",
  "Checklist",
] as const;

class ExtractionError extends Error {
  constructor(file: string, message: string) {
    super(`${path.relative(repoRoot, file)}: ${message}`);
    this.name = "ExtractionError";
  }
}

function assert(condition: unknown, file: string, message: string): asserts condition {
  if (!condition) throw new ExtractionError(file, message);
}

/** Collapses insignificant whitespace the way an HTML renderer would, without touching entities. */
function tidyInline(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

function innerHtml($: CheerioAPI, el: Cheerio<AnyNode>): string {
  return tidyInline($(el).html() ?? "");
}

/* ------------------------------------------------------------------ principles */

interface ExtractedPrinciple {
  slug: string;
  title: string;
  blurb: string;
  definition: string;
  whyItMatters: string[];
  coreRule: string[];
  good: { label: string; code: string; note: string };
  bad: { label: string; code: string; note: string };
  mistakes: { name: string; body: string }[];
  checklist: string[];
  practiceCourseId: string | null;
  goDeeper: { lead: string; body: string }[];
  datePublished: string;
}

function extractPrinciple(file: string): ExtractedPrinciple {
  const $ = cheerio.load(readFileSync(file, "utf8"));
  const slug = path.basename(file, ".html");
  const root = $("main .wrap");
  assert(root.length === 1, file, `expected one main .wrap, found ${String(root.length)}`);

  // `.text()` rather than `.html()`: the title is rendered as JSX text, so it needs the decoded
  // character. Keeping `&amp;` here would print the entity literally on the page.
  const title = tidyInline(root.children("h1").first().text());
  assert(title, file, "missing <h1>");

  const blurb = $('meta[name="description"]').attr("content")?.trim() ?? "";
  assert(blurb, file, "missing meta description");

  const h2s = root
    .children("h2")
    .map((_, el) => $(el).text().trim())
    .get();
  assert(
    REQUIRED_H2.every((needed, i) => h2s[i] === needed),
    file,
    `unexpected section headings: ${JSON.stringify(h2s)}`,
  );

  // Bucket every direct child of the content wrapper under the <h2> that precedes it.
  const sections = new Map<string, Cheerio<AnyNode>[]>();
  let current = "";
  root.children().each((_, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === "h2") {
      current = $(el).text().trim();
      sections.set(current, []);
      return;
    }
    if (current) sections.get(current)?.push($(el));
  });

  const sectionParagraphs = (heading: string): string[] => {
    const nodes = sections.get(heading) ?? [];
    const paragraphs = nodes
      .filter((node) => node.is("p") && !node.hasClass("callout") && !node.hasClass("definition"))
      .map((node) => innerHtml($, node));
    assert(paragraphs.length > 0, file, `section "${heading}" has no paragraphs`);
    return paragraphs;
  };

  const definitionEl = root.children("p.definition").first();
  assert(definitionEl.length === 1, file, "missing p.definition");

  // Good vs. bad
  const pair = root.find(".example-pair").first();
  assert(pair.length === 1, file, "missing .example-pair");
  const readSide = (which: "good" | "bad") => {
    const side = pair.find(`.example.${which}`).first();
    assert(side.length === 1, file, `missing .example.${which}`);
    const label = side.find(".example-label").first().text().trim();
    const code = side.find("pre > code").first().text();
    const note = innerHtml($, side.children("p").first());
    assert(label, file, `.example.${which} missing label`);
    assert(code.length > 0, file, `.example.${which} missing code`);
    assert(note, file, `.example.${which} missing note`);
    return { label, code, note };
  };

  // Common mistakes: each <li> opens with a bolded name, then the explanation.
  const mistakes = root
    .find("ul.mistakes > li")
    .map((_, li) => {
      const $li = $(li);
      const strong = $li.children("strong").first();
      assert(strong.length === 1, file, "a mistake <li> has no leading <strong>");
      const name = tidyInline(strong.text()).replace(/\.$/, "");
      const clone = $li.clone();
      clone.children("strong").first().remove();
      return { name, body: tidyInline(clone.html() ?? "") };
    })
    .get();
  assert(
    mistakes.length >= 3,
    file,
    `expected at least 3 mistakes, found ${String(mistakes.length)}`,
  );

  const checklist = root
    .find("ul.checklist > li")
    .map((_, li) => innerHtml($, $(li)))
    .get();
  assert(checklist.length > 0, file, "empty checklist");

  // "Practice this" callout, present only on principles that have a paired course.
  const calloutHref = root.find("p.callout a").first().attr("href") ?? null;
  const practiceCourseId = calloutHref
    ? (/\/craft\/([^/]+)\/?$/.exec(calloutHref)?.[1] ?? null)
    : null;
  if (calloutHref) {
    assert(practiceCourseId, file, `could not read a course id from callout href "${calloutHref}"`);
  }

  // "Go deeper": each paragraph is a bolded lead-in followed by the detail.
  const details = root.find("details").first();
  assert(details.length === 1, file, "missing <details> go-deeper block");
  const summaryText = details.find("summary").first().text().trim();
  assert(summaryText === "Go deeper", file, `unexpected <summary> text "${summaryText}"`);
  const goDeeper = details
    .children("p")
    .map((_, p) => {
      const $p = $(p);
      const strong = $p.children("strong").first();
      assert(strong.length === 1, file, "a go-deeper paragraph has no leading <strong>");
      const lead = tidyInline(strong.text()).replace(/[:.]$/, "");
      const clone = $p.clone();
      clone.children("strong").first().remove();
      return { lead, body: tidyInline(clone.html() ?? "") };
    })
    .get();
  assert(goDeeper.length > 0, file, "empty go-deeper block");

  // datePublished comes from the page's TechArticle JSON-LD.
  let datePublished = "";
  $('script[type="application/ld+json"]').each((_, el) => {
    const parsed: unknown = JSON.parse($(el).text());
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "datePublished" in parsed &&
      typeof parsed.datePublished === "string"
    ) {
      datePublished = parsed.datePublished;
    }
  });
  assert(/^\d{4}-\d{2}-\d{2}$/.test(datePublished), file, "missing JSON-LD datePublished");

  return {
    slug,
    title,
    blurb,
    definition: innerHtml($, definitionEl),
    whyItMatters: sectionParagraphs("Why it matters"),
    coreRule: sectionParagraphs("The core rule"),
    good: readSide("good"),
    bad: readSide("bad"),
    mistakes,
    checklist,
    practiceCourseId,
    goDeeper,
    datePublished,
  };
}

/* ---------------------------------------------------------------------- home */

interface HomeCard {
  slug: string;
  category: string;
  searchKeywords: string;
}

function extractHomeCards(): HomeCard[] {
  const file = path.join(DOCS, "index.html");
  const $ = cheerio.load(readFileSync(file, "utf8"));
  const cards: HomeCard[] = [];

  $("section.principle-group").each((_, group) => {
    const category = $(group).children("h2").first().text().trim();
    assert(category, file, "a principle group has no heading");
    $(group)
      .find("a.card")
      .each((_, card) => {
        const href = $(card).attr("href") ?? "";
        const slug = /\/principles\/([^/]+)\.html$/.exec(href)?.[1];
        assert(slug, file, `card href "${href}" is not a principle page`);
        cards.push({
          slug,
          category,
          searchKeywords: tidyInline($(card).attr("data-search") ?? ""),
        });
      });
  });

  assert(cards.length === 17, file, `expected 17 home cards, found ${String(cards.length)}`);
  return cards;
}

/* -------------------------------------------------------------------- courses */

interface CourseManifestEntry {
  id: string;
  title: string;
  hook: string;
  principle: string;
  principleTitle: string;
  levels?: { id: string; title: string; lessons: string[] }[];
  lessons?: string[];
}

function extractCourses(): {
  courses: (CourseManifestEntry & { searchKeywords: string })[];
} {
  const manifestFile = path.join(DOCS, "craft", "courses.json");
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8")) as {
    courses: CourseManifestEntry[];
  };

  const catalogFile = path.join(DOCS, "craft", "index.html");
  const $ = cheerio.load(readFileSync(catalogFile, "utf8"));
  const keywordsById = new Map<string, string>();
  const totalsById = new Map<string, number>();
  $("a.course-card").each((_, card) => {
    const href = $(card).attr("href") ?? "";
    const id = /\/craft\/([^/]+)\/?$/.exec(href)?.[1];
    assert(id, catalogFile, `course card href "${href}" is not a course page`);
    keywordsById.set(id, tidyInline($(card).attr("data-search") ?? ""));
    const total = Number($(card).find("[data-total-lessons]").attr("data-total-lessons") ?? "0");
    totalsById.set(id, total);
  });

  const courses = manifest.courses.map((course) => {
    const declared = course.levels
      ? course.levels.reduce((sum, level) => sum + level.lessons.length, 0)
      : (course.lessons?.length ?? 0);
    const catalogTotal = totalsById.get(course.id);

    // The catalog's hand-typed lesson counts were free to drift from the manifest. Report the
    // disagreement rather than silently trusting one of them.
    if (catalogTotal !== undefined && catalogTotal !== declared) {
      console.warn(
        `  ! ${course.id}: catalog says ${String(catalogTotal)} lessons, manifest says ${String(declared)}`,
      );
    }

    return { ...course, searchKeywords: keywordsById.get(course.id) ?? "" };
  });

  return { courses };
}

/* -------------------------------------------------------------------- lessons */

interface ExtractedLesson {
  courseId: string;
  lessonId: string;
  levelId: string | null;
  levelNumber: number | null;
  lessonNumber: number;
  title: string;
  framing: string[];
  prompt: ({ kind: "text"; html: string } | { kind: "code"; code: string })[];
  options: { text: string; correct: boolean }[];
  feedback: string;
  principleSlug: string;
}

function extractLesson(file: string): ExtractedLesson {
  const $ = cheerio.load(readFileSync(file, "utf8"));
  const root = $("main .wrap");
  assert(root.length === 1, file, "expected one main .wrap");

  const quiz = root.find("[data-quiz]").first();
  assert(quiz.length === 1, file, "expected exactly one [data-quiz] block");

  const courseId = quiz.attr("data-course") ?? "";
  const lessonId = quiz.attr("data-lesson") ?? "";
  assert(courseId, file, "quiz missing data-course");
  assert(lessonId, file, "quiz missing data-lesson");

  // The lesson id doubles as a localStorage key for real visitors, so its format is load-bearing.
  const levelled = /^level-(\d+)-lesson-(\d+)$/.exec(lessonId);
  const flat = /^lesson-(\d+)$/.exec(lessonId);
  assert(levelled ?? flat, file, `unrecognised lesson id "${lessonId}"`);

  const levelNumber = levelled ? Number(levelled[1]) : null;
  const lessonNumber = Number(levelled ? levelled[2] : flat?.[1]);
  const levelId = levelNumber === null ? null : `level-${String(levelNumber)}`;

  // Cross-check the id against the file's own location on disk.
  const relative = path.relative(path.join(DOCS, "craft"), file);
  const expected =
    levelId === null
      ? path.join(courseId, `lesson-${String(lessonNumber)}.html`)
      : path.join(courseId, levelId, `lesson-${String(lessonNumber)}.html`);
  assert(
    relative === expected,
    file,
    `lesson id "${lessonId}" disagrees with its path (${relative})`,
  );

  const rawTitle = tidyInline(root.children("h1").first().text());
  const titleMatch = /^(?:Level \d+, )?Lesson \d+:\s*(.+)$/.exec(rawTitle);
  assert(titleMatch?.[1], file, `unexpected <h1> format "${rawTitle}"`);
  const title = titleMatch[1];

  // Framing paragraphs sit between the <h1> and the quiz.
  const framing: string[] = [];
  let afterH1 = false;
  root.children().each((_, el) => {
    const $el = $(el);
    if (el.tagName.toLowerCase() === "h1") {
      afterH1 = true;
      return;
    }
    if ($el.is("[data-quiz]")) {
      afterH1 = false;
      return;
    }
    if (afterH1 && $el.is("p")) framing.push(innerHtml($, $el));
  });
  assert(framing.length > 0, file, "lesson has no framing paragraph");

  // The prompt is the run of blocks before the options list: paragraphs, and occasionally a code
  // sample whose whitespace matters.
  const prompt: ExtractedLesson["prompt"] = [];
  quiz.children().each((_, el) => {
    const $el = $(el);
    if ($el.is("p.quiz-question")) prompt.push({ kind: "text", html: innerHtml($, $el) });
    else if ($el.is("pre"))
      prompt.push({ kind: "code", code: $el.find("code").first().text() || $el.text() });
  });
  assert(prompt.length > 0, file, "quiz has no question");

  const options = quiz
    .find(".quiz-option")
    .map((_, button) => ({
      text: innerHtml($, $(button)),
      correct: $(button).attr("data-correct") === "true",
    }))
    .get();
  assert(options.length === 4, file, `expected 4 options, found ${String(options.length)}`);
  const correctCount = options.filter((option) => option.correct).length;
  assert(
    correctCount === 1,
    file,
    `expected exactly 1 correct option, found ${String(correctCount)}`,
  );

  const feedbackParagraphs = quiz
    .find(".quiz-feedback > p")
    .map((_, p) => innerHtml($, $(p)))
    .get();
  const [feedback] = feedbackParagraphs;
  assert(
    feedbackParagraphs.length === 1 && feedback !== undefined,
    file,
    `expected 1 feedback paragraph, found ${String(feedbackParagraphs.length)}`,
  );

  const explanationHref = root.find('a[href*="/principles/"]').first().attr("href") ?? "";
  const principleSlug = /\/principles\/([^/]+)\.html$/.exec(explanationHref)?.[1];
  assert(
    principleSlug,
    file,
    `could not find the linked principle page (href "${explanationHref}")`,
  );

  return {
    courseId,
    lessonId,
    levelId,
    levelNumber,
    lessonNumber,
    title,
    framing,
    prompt,
    options,
    feedback,
    principleSlug,
  };
}

/* ------------------------------------------------------------ about and 404 */

interface StaticPage {
  title: string;
  blurb: string;
  definition: string;
  blocks: string[];
}

/**
 * The about and 404 pages are prose with no repeating structure, so their body is captured as a list
 * of serialised blocks and hand-shaped afterwards. This keeps the extractor honest: it does not
 * pretend to understand markup it has no model for.
 */
function extractStaticPage(name: string): StaticPage {
  const file = path.join(DOCS, name);
  const $ = cheerio.load(readFileSync(file, "utf8"));
  const root = $("main .wrap");
  const definition = innerHtml($, root.children("p.definition").first());
  const blocks: string[] = [];
  root.children().each((_, el) => {
    const $el = $(el);
    if ($el.is("h1") || $el.is("p.definition")) return;
    blocks.push(tidyInline($.html($el)));
  });
  return {
    title: tidyInline(root.children("h1").first().text()),
    blurb: $('meta[name="description"]').attr("content")?.trim() ?? "",
    definition,
    blocks,
  };
}

/* ------------------------------------------------------------ code generation */

const lit = (value: string) => JSON.stringify(value);
/** Wraps a fragment in `html()` so it is typed as trusted content and validated at load. */
const htmlLit = (value: string) => `html(${lit(value)})`;

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

const BANNER = `// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.
`;

function writeFile(relativePath: string, contents: string): void {
  const full = path.join(OUT, relativePath);
  mkdirSync(path.dirname(full), { recursive: true });
  writeFileSync(full, contents, "utf8");
}

function emitPrinciple(p: ExtractedPrinciple, category: string, searchKeywords: string): void {
  const body = `${BANNER}
import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const ${camel(p.slug)}: Principle = {
  slug: ${lit(p.slug)},
  title: ${lit(p.title)},
  category: ${lit(category)},
  blurb: ${lit(p.blurb)},
  searchKeywords: ${lit(searchKeywords)},
  definition: ${htmlLit(p.definition)},
  whyItMatters: [
${p.whyItMatters.map((x) => `    ${htmlLit(x)},`).join("\n")}
  ],
  coreRule: [
${p.coreRule.map((x) => `    ${htmlLit(x)},`).join("\n")}
  ],
  goodVsBad: {
    good: {
      label: ${lit(p.good.label)},
      code: ${lit(p.good.code)},
      note: ${htmlLit(p.good.note)},
    },
    bad: {
      label: ${lit(p.bad.label)},
      code: ${lit(p.bad.code)},
      note: ${htmlLit(p.bad.note)},
    },
  },
  mistakes: [
${p.mistakes.map((m) => `    { name: ${lit(m.name)}, body: ${htmlLit(m.body)} },`).join("\n")}
  ],
  checklist: [
${p.checklist.map((x) => `    ${htmlLit(x)},`).join("\n")}
  ],
  practiceCourseId: ${p.practiceCourseId ? lit(p.practiceCourseId) : "null"},
  goDeeper: [
${p.goDeeper.map((d) => `    { lead: ${lit(d.lead)}, body: ${htmlLit(d.body)} },`).join("\n")}
  ],
  datePublished: ${lit(p.datePublished)},
};
`;
  writeFile(path.join("principles", `${p.slug}.ts`), body);
}

function emitLessons(courseId: string, lessons: ExtractedLesson[]): void {
  const entries = lessons
    .map(
      (l) => `  {
    courseId: ${lit(l.courseId)},
    lessonId: ${lit(l.lessonId)},
    levelId: ${l.levelId ? lit(l.levelId) : "null"},
    levelNumber: ${l.levelNumber === null ? "null" : String(l.levelNumber)},
    lessonNumber: ${String(l.lessonNumber)},
    title: ${lit(l.title)},
    framing: [${l.framing.map((f) => htmlLit(f)).join(", ")}],
    quiz: {
      prompt: [
${l.prompt
  .map((block) =>
    block.kind === "text"
      ? `        { kind: "text", html: ${htmlLit(block.html)} },`
      : `        { kind: "code", code: ${lit(block.code)} },`,
  )
  .join("\n")}
      ],
      options: [
${l.options.map((o) => `        { text: ${htmlLit(o.text)}, correct: ${String(o.correct)} },`).join("\n")}
      ],
      feedback: ${htmlLit(l.feedback)},
    },
    principleSlug: ${lit(l.principleSlug)},
  },`,
    )
    .join("\n");

  writeFile(
    path.join("craft", "lessons", `${courseId}.ts`),
    `${BANNER}
import type { Lesson } from "@/content/types";
import { html } from "@/lib/html";

export const ${camel(courseId)}Lessons: readonly Lesson[] = [
${entries}
];
`,
  );
}

function emitCourses(courses: (CourseManifestEntry & { searchKeywords: string })[]): void {
  const entries = courses
    .map((c) => {
      const structure = c.levels
        ? `{
      kind: "levelled",
      levels: [
${c.levels
  .map(
    (level, index) =>
      `        {
          id: ${lit(level.id)},
          number: ${String(index + 1)},
          title: ${lit(level.title)},
          lessonIds: [${level.lessons.map((n) => lit(`${level.id}-${n}`)).join(", ")}],
        },`,
  )
  .join("\n")}
      ],
    }`
        : `{ kind: "flat", lessonIds: [${(c.lessons ?? []).map((n) => lit(n)).join(", ")}] }`;

      return `  {
    id: ${lit(c.id)},
    title: ${lit(c.title)},
    hook: ${lit(c.hook)},
    principleSlug: ${lit(c.principle)},
    principleTitle: ${lit(c.principleTitle)},
    searchKeywords: ${lit(c.searchKeywords)},
    structure: ${structure},
  },`;
    })
    .join("\n");

  writeFile(
    path.join("craft", "courses.ts"),
    `${BANNER}
import type { Course } from "@/content/types";

export const courses: readonly Course[] = [
${entries}
];
`,
  );
}

/* ------------------------------------------------------------------------ run */

function main(): void {
  assert(existsSync(DOCS), DOCS, "the legacy docs/ directory is missing — nothing to extract");

  console.log("Extracting content from the pre-migration HTML\n");

  const homeCards = extractHomeCards();
  const categoryBySlug = new Map(homeCards.map((c) => [c.slug, c.category]));
  const keywordsBySlug = new Map(homeCards.map((c) => [c.slug, c.searchKeywords]));

  // Start clean so a removed page cannot linger as a stale module.
  for (const dir of ["principles", "craft"]) {
    rmSync(path.join(OUT, dir), { recursive: true, force: true });
  }

  const principleFiles = globSync(path.join(DOCS, "principles", "*.html")).sort();
  const principles = principleFiles.map((file) => extractPrinciple(file));
  for (const principle of principles) {
    const category = categoryBySlug.get(principle.slug);
    assert(category, principle.slug, "principle has no home page card, so no category");
    emitPrinciple(principle, category, keywordsBySlug.get(principle.slug) ?? "");
  }
  console.log(`  principles     ${String(principles.length)}`);

  const { courses } = extractCourses();
  emitCourses(courses);
  console.log(`  courses        ${String(courses.length)}`);

  const lessonFiles = globSync(path.join(DOCS, "craft", "**", "lesson-*.html")).sort();
  const lessons = lessonFiles.map((file) => extractLesson(file));
  const byCourse = new Map<string, ExtractedLesson[]>();
  for (const lesson of lessons) {
    const list = byCourse.get(lesson.courseId) ?? [];
    list.push(lesson);
    byCourse.set(lesson.courseId, list);
  }
  for (const [courseId, courseLessons] of byCourse) {
    courseLessons.sort(
      (a, b) => (a.levelNumber ?? 0) - (b.levelNumber ?? 0) || a.lessonNumber - b.lessonNumber,
    );
    emitLessons(courseId, courseLessons);
  }
  console.log(`  lessons        ${String(lessons.length)}`);

  // Every lesson the manifest declares must have been found on disk, and vice versa.
  for (const course of courses) {
    const declared = course.levels
      ? course.levels.flatMap((l) => l.lessons.map((n) => `${l.id}-${n}`))
      : (course.lessons ?? []);
    const found = (byCourse.get(course.id) ?? []).map((l) => l.lessonId);
    const missing = declared.filter((id) => !found.includes(id));
    const extra = found.filter((id) => !declared.includes(id));
    assert(
      missing.length === 0 && extra.length === 0,
      course.id,
      `manifest and disk disagree — missing ${JSON.stringify(missing)}, unexpected ${JSON.stringify(extra)}`,
    );
  }

  // The prose pages have no repeating structure; dump them for hand-shaping rather than guessing.
  const staticPages = {
    about: extractStaticPage("about.html"),
    notFound: extractStaticPage("404.html"),
  };
  mkdirSync(path.join(repoRoot, "scripts", "extract"), { recursive: true });
  writeFileSync(
    path.join(repoRoot, "scripts", "extract", "static-pages.json"),
    `${JSON.stringify(staticPages, null, 2)}\n`,
    "utf8",
  );
  console.log(`  static pages   2 (written to scripts/extract/static-pages.json for hand-shaping)`);

  const totalLessons = [...byCourse.values()].reduce((sum, l) => sum + l.length, 0);
  console.log(
    `\nDone. ${String(principles.length)} principles, ${String(courses.length)} courses, ${String(totalLessons)} lessons.`,
  );
}

main();
