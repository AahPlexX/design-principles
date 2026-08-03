/**
 * Gate: the content model holds the guarantees the site's own rules promise.
 *
 * This runs against the content modules rather than the rendered HTML, so it catches a broken quiz or
 * a missing section at the source. It is the replacement for the old `verify-site.py` structural
 * checks, which worked by looking for literal heading text in hand-written files.
 *
 *   npm run gate:content
 */
import { courses, lessons, principles } from "../../src/content/index.ts";
import { NAV_PRINCIPLE_ORDER, HOME_GROUPS } from "../../src/content/site.ts";
import { toPlainText } from "../../src/lib/html.ts";
import { orderedLessonIds, totalLessons } from "../../src/lib/routes.ts";

import { Gate } from "./lib";

const gate = new Gate("Content invariants");

/* ------------------------------------------------------------------ principles */

gate.check(principles.length === 17, `expected 17 principles, found ${String(principles.length)}`);

const slugs = new Set<string>();
for (const principle of principles) {
  const where = `principle "${principle.slug}"`;

  gate.check(!slugs.has(principle.slug), `${where}: duplicate slug`);
  slugs.add(principle.slug);

  gate.check(principle.title.trim() !== "", `${where}: empty title`);
  gate.check(
    !principle.title.includes("&amp;") && !principle.title.includes("&#"),
    `${where}: title contains an HTML entity, which renders literally as text — ${principle.title}`,
  );

  // The five sections every principle page must have. These were previously enforced by searching for
  // literal <h2> text; now the structure makes the requirement explicit.
  gate.check(principle.definition.trim() !== "", `${where}: missing definition`);
  gate.check(
    principle.whyItMatters.length >= 2,
    `${where}: "Why it matters" has ${String(principle.whyItMatters.length)} paragraph(s), expected at least 2 — a single abstract sentence doesn't earn the section`,
  );
  gate.check(principle.coreRule.length > 0, `${where}: missing "The core rule"`);
  gate.check(
    principle.examples.length >= 2,
    `${where}: has ${String(principle.examples.length)} example scenario(s), expected at least 2 — one worked example rarely covers a topic's real breadth`,
  );
  for (const [index, scenario] of principle.examples.entries()) {
    const label = `example ${String(index + 1)}`;
    gate.check(scenario.context.trim() !== "", `${where}: ${label} has no context label`);
    gate.check(
      scenario.good.code.trim() !== "" && scenario.bad.code.trim() !== "",
      `${where}: ${label} ("${scenario.context}") has an incomplete good/bad pair`,
    );
    // ExamplePair renders label and note unconditionally, so an empty one is a blank panel, not a
    // missing-but-harmless field.
    for (const side of [scenario.good, scenario.bad] as const) {
      gate.check(
        side.label.trim() !== "" && toPlainText(side.note).trim() !== "",
        `${where}: ${label} ("${scenario.context}") has an empty label or note`,
      );
      // `preview` is optional, but a side that declares one is promising a real live-rendered demo —
      // an empty or whitespace-only string would render a blank iframe with nothing to show.
      if (side.preview !== undefined) {
        gate.check(
          side.preview.trim() !== "",
          `${where}: ${label} ("${scenario.context}") declares a preview but it is empty`,
        );
        gate.check(
          /<!doctype html>/i.test(side.preview),
          `${where}: ${label} ("${scenario.context}") preview is not a self-contained HTML document — it must start with <!doctype html> so it renders correctly in a sandboxed iframe on its own`,
        );
      }
    }
  }
  // Trimmed, since a context that differs only by leading/trailing whitespace renders identically (and
  // collides as a React key) but would otherwise slip past a raw-string uniqueness check.
  const exampleContexts = new Set(principle.examples.map((scenario) => scenario.context.trim()));
  gate.check(
    exampleContexts.size === principle.examples.length,
    `${where}: two example scenarios share a context label`,
  );
  gate.check(
    principle.mistakes.length >= 3,
    `${where}: expected at least 3 named mistakes, found ${String(principle.mistakes.length)}`,
  );
  gate.check(principle.checklist.length > 0, `${where}: empty checklist`);
  gate.check(principle.goDeeper.length > 0, `${where}: missing "Go deeper" content`);

  gate.check(
    /^\d{4}-\d{2}-\d{2}$/.test(principle.datePublished),
    `${where}: datePublished is not an ISO date (${principle.datePublished})`,
  );

  // The blurb is the meta description and the home card text. Over ~160 characters it is truncated in
  // search results mid-sentence.
  const blurbLength = principle.blurb.length;
  gate.check(
    blurbLength > 20 && blurbLength <= 165,
    `${where}: blurb is ${String(blurbLength)} characters, outside the 20–165 range meta descriptions need`,
  );

  // A mistake's bolded name is read as a heading, so it has to stand alone.
  for (const mistake of principle.mistakes) {
    gate.check(
      mistake.name.trim() !== "" && !mistake.name.endsWith("."),
      `${where}: mistake name should be a bare phrase without a trailing period — "${mistake.name}"`,
    );
    gate.check(
      mistake.body.trim() !== "",
      `${where}: mistake "${mistake.name}" has no explanation`,
    );
  }

  // Tone rule from CLAUDE.md: neither word survives contact with a reader who needed the page.
  const prose = [
    principle.definition,
    ...principle.whyItMatters,
    ...principle.coreRule,
    ...principle.checklist,
  ]
    .map((fragment) => toPlainText(fragment))
    .join(" ");
  for (const word of ["simply", "just "]) {
    const offender = new RegExp(`\\b${word.trim()}\\b`, "i").test(prose);
    if (offender)
      gate.note(`${where}: prose contains "${word.trim()}" — check it is not an instruction`);
  }

  if (principle.practiceCourseId !== null) {
    gate.check(
      courses.some((course) => course.id === principle.practiceCourseId),
      `${where}: points at course "${principle.practiceCourseId}", which does not exist`,
    );
  }
}

/* ------------------------------------------------------- navigation and grouping */

gate.check(
  NAV_PRINCIPLE_ORDER.length === principles.length,
  `navigation lists ${String(NAV_PRINCIPLE_ORDER.length)} principles but ${String(principles.length)} exist`,
);
for (const slug of NAV_PRINCIPLE_ORDER) {
  gate.check(slugs.has(slug), `navigation references unknown principle "${slug}"`);
}

const grouped = HOME_GROUPS.flatMap((group) => group.slugs);
gate.check(
  grouped.length === principles.length,
  `the home page groups ${String(grouped.length)} principles but ${String(principles.length)} exist`,
);
gate.check(
  new Set(grouped).size === grouped.length,
  "a principle appears in more than one home group",
);
for (const slug of slugs) {
  gate.check(
    grouped.includes(slug),
    `principle "${slug}" is not in any home page group, so it is unreachable there`,
  );
}

/* --------------------------------------------------------------------- courses */

gate.check(courses.length === 8, `expected 8 courses, found ${String(courses.length)}`);

for (const course of courses) {
  const where = `course "${course.id}"`;

  gate.check(
    slugs.has(course.principleSlug),
    `${where}: pairs with unknown principle "${course.principleSlug}"`,
  );

  // Naming rule from CLAUDE.md: a concrete outcome phrase, 3–6 words.
  const words = course.title.trim().split(/\s+/).length;
  gate.check(
    words >= 3 && words <= 6,
    `${where}: title should be a 3–6 word outcome phrase, found ${String(words)} words — "${course.title}"`,
  );

  const ids = orderedLessonIds(course);
  gate.check(new Set(ids).size === ids.length, `${where}: duplicate lesson ids`);
  gate.check(ids.length > 0, `${where}: has no lessons`);

  const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id);
  gate.check(
    courseLessons.length === ids.length,
    `${where}: declares ${String(ids.length)} lessons but ${String(courseLessons.length)} content modules exist`,
  );

  for (const id of ids) {
    gate.check(
      courseLessons.some((lesson) => lesson.lessonId === id),
      `${where}: declares lesson "${id}" with no content`,
    );
  }

  if (course.structure.kind === "levelled") {
    for (const level of course.structure.levels) {
      gate.check(level.title.trim() !== "", `${where}: level ${level.id} has no title`);
      gate.check(level.lessonIds.length > 0, `${where}: level ${level.id} has no lessons`);
      // Level titles were missing from two course pages before the migration because the markup
      // omitted the headings entirely. They exist in the manifest, so this asserts they are usable.
      gate.check(
        !/^Level \d+$/.test(level.title),
        `${where}: level ${level.id} has a placeholder title`,
      );
    }
  }
}

/* --------------------------------------------------------------------- lessons */

gate.check(lessons.length === 171, `expected 171 lessons, found ${String(lessons.length)}`);

const seenLessons = new Set<string>();
for (const lesson of lessons) {
  const where = `lesson ${lesson.courseId}/${lesson.lessonId}`;
  const key = `${lesson.courseId}:${lesson.lessonId}`;

  gate.check(!seenLessons.has(key), `${where}: duplicate lesson id within its course`);
  seenLessons.add(key);

  // The two id formats are localStorage keys for real visitors. Normalising them would discard
  // recorded progress, so the format is asserted rather than assumed.
  const expectedId =
    lesson.levelNumber === null
      ? `lesson-${String(lesson.lessonNumber)}`
      : `level-${String(lesson.levelNumber)}-lesson-${String(lesson.lessonNumber)}`;
  gate.check(
    lesson.lessonId === expectedId,
    `${where}: id does not match its position — expected "${expectedId}"`,
  );

  gate.check(
    (lesson.levelId === null) === (lesson.levelNumber === null),
    `${where}: levelId and levelNumber disagree about whether this course has levels`,
  );

  gate.check(lesson.title.trim() !== "", `${where}: empty title`);
  gate.check(
    !/^Lesson \d+/.test(lesson.title) && !/^Level \d+/.test(lesson.title),
    `${where}: title repeats its own numbering — "${lesson.title}"`,
  );
  gate.check(lesson.framing.length > 0, `${where}: no framing paragraph`);

  gate.check(lesson.quiz.prompt.length > 0, `${where}: quiz has no question`);
  gate.check(
    lesson.quiz.options.length === 4,
    `${where}: expected 4 options, found ${String(lesson.quiz.options.length)}`,
  );
  const correct = lesson.quiz.options.filter((option) => option.correct).length;
  gate.check(
    correct === 1,
    `${where}: expected exactly 1 correct option, found ${String(correct)}`,
  );
  gate.check(
    lesson.quiz.feedback.trim() !== "",
    `${where}: quiz has no explanation — a question without one teaches nothing`,
  );
  for (const [index, option] of lesson.quiz.options.entries()) {
    gate.check(option.text.trim() !== "", `${where}: option ${String(index + 1)} is empty`);
  }

  gate.check(
    slugs.has(lesson.principleSlug),
    `${where}: links to unknown principle "${lesson.principleSlug}"`,
  );
  gate.check(
    lesson.principleSlug === courses.find((c) => c.id === lesson.courseId)?.principleSlug,
    `${where}: links to a different principle than its course pairs with`,
  );
}

/* ------------------------------------------------------------------- totals */

const lessonTotal = courses.reduce((sum, course) => sum + totalLessons(course), 0);
gate.check(
  lessonTotal === lessons.length,
  `course structures declare ${String(lessonTotal)} lessons but ${String(lessons.length)} exist`,
);

gate.note(
  `${String(principles.length)} principles, ${String(courses.length)} courses, ${String(lessons.length)} lessons`,
);
gate.report();
