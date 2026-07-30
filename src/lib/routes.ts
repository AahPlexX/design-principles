import { courses, lessons, principles } from "@/content";
import type { Course, Lesson, Principle } from "@/content/types";

import { BASE_PATH } from "./base";

/**
 * Every page the site serves.
 *
 * This table is the single source of truth for the URL surface. The prerenderer walks it to decide
 * what to write, and the URL-parity gate compares it against the files on disk in both directions —
 * so a route that stops being emitted and a stray file that should not exist both fail the build.
 */
export type Route =
  | { readonly kind: "home"; readonly id: "home"; readonly outputPath: "index.html" }
  | { readonly kind: "about"; readonly id: "about"; readonly outputPath: "about.html" }
  | { readonly kind: "not-found"; readonly id: "not-found"; readonly outputPath: "404.html" }
  | {
      readonly kind: "principle";
      readonly id: string;
      readonly outputPath: string;
      readonly principle: Principle;
    }
  | { readonly kind: "craft-index"; readonly id: "craft"; readonly outputPath: "craft/index.html" }
  | {
      readonly kind: "course";
      readonly id: string;
      readonly outputPath: string;
      readonly course: Course;
    }
  | {
      readonly kind: "lesson";
      readonly id: string;
      readonly outputPath: string;
      readonly course: Course;
      readonly lesson: Lesson;
    };

export function principlePath(slug: string): string {
  return `principles/${slug}.html`;
}

export function coursePath(courseId: string): string {
  return `craft/${courseId}/index.html`;
}

/**
 * Lesson file paths differ by course shape: levelled courses nest lessons in a level directory, flat
 * ones do not. Both forms are live URLs, so the shape is read from the lesson rather than guessed.
 */
export function lessonPath(lesson: Lesson): string {
  const file = `lesson-${String(lesson.lessonNumber)}.html`;
  return lesson.levelId === null
    ? `craft/${lesson.courseId}/${file}`
    : `craft/${lesson.courseId}/${lesson.levelId}/${file}`;
}

/** Relative href between two lessons in the same course, used by the prev/next lesson navigation. */
export function relativeLessonHref(from: Lesson, to: Lesson): string {
  const file = `lesson-${String(to.lessonNumber)}.html`;
  if (from.levelId === to.levelId) return file;
  if (to.levelId === null) return `../${file}`;
  return `../${to.levelId}/${file}`;
}

function lessonsForCourse(courseId: string): readonly Lesson[] {
  return lessons.filter((lesson) => lesson.courseId === courseId);
}

/** Lesson ids in the order the course presents them. */
export function orderedLessonIds(course: Course): readonly string[] {
  return course.structure.kind === "flat"
    ? course.structure.lessonIds
    : course.structure.levels.flatMap((level) => level.lessonIds);
}

/** Total lesson count, which drives the course progress badge. */
export function totalLessons(course: Course): number {
  return orderedLessonIds(course).length;
}

export function findLesson(courseId: string, lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.courseId === courseId && lesson.lessonId === lessonId);
}

/** The reading order of a course's lessons, flattened across levels. */
export function orderedLessons(course: Course): readonly Lesson[] {
  return orderedLessonIds(course).flatMap((lessonId) => {
    const lesson = findLesson(course.id, lessonId);
    return lesson ? [lesson] : [];
  });
}

export function buildRoutes(): readonly Route[] {
  const staticRoutes: Route[] = [
    { kind: "home", id: "home", outputPath: "index.html" },
    { kind: "about", id: "about", outputPath: "about.html" },
    { kind: "not-found", id: "not-found", outputPath: "404.html" },
    { kind: "craft-index", id: "craft", outputPath: "craft/index.html" },
  ];

  const principleRoutes: Route[] = principles.map((principle) => ({
    kind: "principle",
    id: `principle:${principle.slug}`,
    outputPath: principlePath(principle.slug),
    principle,
  }));

  const courseRoutes: Route[] = courses.map((course) => ({
    kind: "course",
    id: `course:${course.id}`,
    outputPath: coursePath(course.id),
    course,
  }));

  const lessonRoutes: Route[] = courses.flatMap((course) =>
    lessonsForCourse(course.id).map((lesson): Route => ({
      kind: "lesson",
      id: `lesson:${course.id}:${lesson.lessonId}`,
      outputPath: lessonPath(lesson),
      course,
      lesson,
    })),
  );

  return [...staticRoutes, ...principleRoutes, ...courseRoutes, ...lessonRoutes];
}

export const routes: readonly Route[] = buildRoutes();

/**
 * Resolves an incoming request path to a route, for the dev server.
 *
 * Mirrors how GitHub Pages resolves paths: the base prefix is stripped, and a directory path is
 * served by its `index.html`.
 */
export function findRouteByRequestPath(requestPath: string): Route | undefined {
  let path = requestPath;
  if (path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
  else if (`${path}/` === BASE_PATH) path = "";
  path = path.replace(/^\/+/, "");
  if (path === "" || path.endsWith("/")) path += "index.html";

  return routes.find((route) => route.outputPath === path);
}
