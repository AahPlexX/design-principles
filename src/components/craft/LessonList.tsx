import type { Course, Lesson } from "@/content/types";
import { courseRelativeLessonHref } from "@/lib/routes";

interface LessonListProps {
  readonly course: Course;
  /** The lessons to list, in reading order. One call per level in a levelled course. */
  readonly lessons: readonly Lesson[];
}

/**
 * A course's lessons, with the completion state of each.
 *
 * The markup is the progress enhancer's contract: `[data-lesson-list][data-course]` on the list and
 * `[data-lesson]` on each item, carrying the lesson id verbatim. Those ids — `lesson-3` in a flat
 * course, `level-2-lesson-3` in a levelled one — are the keys real visitors already have progress
 * recorded under, so they are passed straight through rather than normalised into one format.
 *
 * An `<ol>` rather than the `<ul>` the original used: the reading order is the point of the list, and
 * "Lesson 4" after "Lesson 3" is a sequence, not a set. The markers are turned off because each item
 * already names its own number in the link text, which is what a reader copying a link needs to see.
 *
 * Completion is drawn as a ring that gains a tick, and stated in words for a screen reader. Both states
 * are spelled out rather than only the finished one, because an unlabelled ring beside every unfinished
 * lesson is a state a non-visual reader cannot see the absence of. The words go inside the link so they
 * are part of its accessible name, which is what a reader navigating by links list hears.
 */
export function LessonList({ course, lessons }: LessonListProps) {
  return (
    <ol data-lesson-list data-course={course.id} className="space-y-1.5">
      {lessons.map((lesson) => (
        <li
          key={lesson.lessonId}
          data-lesson={lesson.lessonId}
          className="group flex items-start gap-2.5"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-[0.42em] size-[1.05em] shrink-0 text-line-strong transition-colors group-data-[complete=true]:text-good"
          >
            <circle cx="10" cy="10" r="8.6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              d="M5.9 10.3l2.8 2.8 5.4-5.7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden group-data-[complete=true]:block"
            />
          </svg>

          <a
            href={courseRelativeLessonHref(lesson)}
            className="text-ink no-underline decoration-accent/40 underline-offset-2 transition-colors group-data-[complete=true]:text-ink-muted hover:text-accent hover:underline"
          >
            Lesson {lesson.lessonNumber}: {lesson.title}{" "}
            <span className="sr-only group-data-[complete=true]:hidden">(not started)</span>
            <span className="sr-only hidden group-data-[complete=true]:inline">(completed)</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
