import { ArrowLeft, ArrowRight } from "lucide-react";

import { CardLink } from "@/components/ui/card";
import type { Course, Lesson } from "@/content/types";
import { canonicalPath, withBase } from "@/lib/base";
import { coursePath, orderedLessons, relativeLessonHref } from "@/lib/routes";
import { lessonHeading } from "@/lib/seo";

interface LessonNavProps {
  readonly course: Course;
  readonly lesson: Lesson;
}

interface Destination {
  readonly href: string;
  readonly eyebrow: string;
  readonly title: string;
  /** Undefined for the course overview: `up` is not a link type HTML defines, and `prev` would lie. */
  readonly rel: "prev" | "next" | undefined;
}

/**
 * Previous and next, in the course's reading order.
 *
 * This is what stops 144 lesson pages being reachable only from their course overview — the reason
 * `gate:links` counts orphans at all. `orderedLessons` flattens the levels, so "next" crosses a level
 * boundary without having to know it did, and `relativeLessonHref` produces the
 * `../level-3/lesson-1.html` form a relative link needs when it does.
 *
 * Neither end is a dead end. The first lesson's back link and the last lesson's forward link both go to
 * the course overview, so the sequence closes rather than stopping. That link uses the course's
 * canonical directory URL, not `index.html`, so it does not introduce a second URL for that page.
 *
 * `print:hidden`: navigation between documents means nothing on paper.
 */
export function LessonNav({ course, lesson }: LessonNavProps) {
  const order = orderedLessons(course);
  const at = order.findIndex((item) => item.lessonId === lesson.lessonId);

  const previousLesson = at > 0 ? order[at - 1] : undefined;
  const nextLesson = at >= 0 && at < order.length - 1 ? order[at + 1] : undefined;
  const courseHref = withBase(canonicalPath(coursePath(course.id)));

  const previous: Destination = previousLesson
    ? {
        href: relativeLessonHref(lesson, previousLesson),
        eyebrow: "Previous",
        title: lessonHeading(previousLesson),
        rel: "prev",
      }
    : { href: courseHref, eyebrow: "Course overview", title: course.title, rel: undefined };

  const next: Destination = nextLesson
    ? {
        href: relativeLessonHref(lesson, nextLesson),
        eyebrow: "Next",
        title: lessonHeading(nextLesson),
        rel: "next",
      }
    : {
        href: courseHref,
        eyebrow: "Last lesson — back to",
        title: course.title,
        rel: undefined,
      };

  return (
    <nav
      aria-label="Lessons in this course"
      className="mt-12 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 print:hidden"
    >
      <CardLink href={previous.href} rel={previous.rel} className="sm:col-start-1">
        <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
          <ArrowLeft aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
          {previous.eyebrow}
        </span>
        <span className="font-semibold text-ink transition-colors group-hover:text-accent">
          {previous.title}
        </span>
      </CardLink>

      <CardLink href={next.href} rel={next.rel} className="sm:col-start-2 sm:items-end sm:text-end">
        <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
          {next.eyebrow}
          <ArrowRight aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
        </span>
        <span className="font-semibold text-ink transition-colors group-hover:text-accent">
          {next.title}
        </span>
      </CardLink>
    </nav>
  );
}
