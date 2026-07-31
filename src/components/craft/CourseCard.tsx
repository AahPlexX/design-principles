import { CardBody, CardLink, CardMeta, CardTitle } from "@/components/ui/card";
import { getPrinciple } from "@/content";
import type { Course } from "@/content/types";
import { canonicalPath, withBase } from "@/lib/base";
import { coursePath, totalLessons } from "@/lib/routes";

import { CourseProgressBadge } from "./CourseProgressBadge";

interface CourseCardProps {
  readonly course: Course;
}

/**
 * One course on the Craft catalog.
 *
 * `canonicalPath` is applied to the course path deliberately: `coursePath` returns
 * `craft/<id>/index.html`, and the directory form is what the course page declares as its own canonical
 * and what is already in the sitemap. Linking the file would give the same page a second URL.
 *
 * The counts are derived from the course structure rather than written down. The pre-migration catalog
 * hand-typed "6 levels · 33 lessons" into each card, which is a number in two places and therefore a
 * number that eventually disagrees with itself.
 *
 * The paired principle's title comes from `getPrinciple` rather than `course.principleTitle` for the
 * same reason — the course module carries a copy of it, and a copy is a thing that can drift.
 */
export function CourseCard({ course }: CourseCardProps) {
  const lessonCount = totalLessons(course);
  const levelCount = course.structure.kind === "levelled" ? course.structure.levels.length : 0;
  const principle = getPrinciple(course.principleSlug);

  return (
    <CardLink href={withBase(canonicalPath(coursePath(course.id)))} className="h-full">
      <div className="flex items-start justify-between gap-3">
        <CardTitle>{course.title}</CardTitle>
        <CourseProgressBadge courseId={course.id} totalLessons={lessonCount} />
      </div>

      <CardBody>{course.hook}</CardBody>

      <CardMeta>
        Pairs with {principle.title}
        {levelCount > 0 ? ` · ${String(levelCount)} levels` : ""} · {lessonCount} lessons
      </CardMeta>
    </CardLink>
  );
}
