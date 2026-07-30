import { courses, lessons, principles } from "@/content";

import { withBase } from "./base";
import { coursePath, lessonPath, principlePath } from "./routes";

/**
 * One searchable destination.
 *
 * Field names are single letters because this file is fetched by the browser when the palette opens,
 * and at ~170 entries the key names would otherwise be a meaningful share of the payload.
 */
export interface SearchEntry {
  /** Title */
  readonly t: string;
  /** URL */
  readonly u: string;
  /** Group label shown in the palette */
  readonly g: string;
  /** Lowercased haystack */
  readonly k: string;
  /** Supporting line */
  readonly d: string;
}

/**
 * Builds the palette's index at build time.
 *
 * Emitted as a separate JSON file rather than bundled into the client entry: it is only needed if the
 * reader opens the palette, and inlining it would put every lesson title into the critical path of
 * every page load.
 */
export function buildSearchIndex(): readonly SearchEntry[] {
  const principleEntries: SearchEntry[] = principles.map((principle) => ({
    t: principle.title,
    u: withBase(principlePath(principle.slug)),
    g: "Principles",
    k: principle.searchKeywords,
    d: principle.blurb,
  }));

  const courseEntries: SearchEntry[] = courses.map((course) => ({
    t: course.title,
    u: withBase(coursePath(course.id)),
    g: "Craft courses",
    k: `${course.searchKeywords} ${course.title} ${course.principleTitle}`.toLowerCase(),
    d: course.hook,
  }));

  const lessonEntries: SearchEntry[] = lessons.map((lesson) => {
    const course = courses.find((item) => item.id === lesson.courseId);
    const label =
      lesson.levelNumber === null
        ? `Lesson ${String(lesson.lessonNumber)}`
        : `Level ${String(lesson.levelNumber)}, Lesson ${String(lesson.lessonNumber)}`;
    return {
      t: lesson.title,
      u: withBase(lessonPath(lesson)),
      g: "Lessons",
      // Title and course only. Including each lesson's framing paragraph tripled the index's transfer
      // size for matches the title already covers, and a palette that matches on body text surfaces
      // near-duplicate results for common words.
      k: `${lesson.title} ${course?.title ?? ""}`.toLowerCase(),
      d: `${course?.title ?? lesson.courseId} · ${label}`,
    };
  });

  return [...principleEntries, ...courseEntries, ...lessonEntries];
}
