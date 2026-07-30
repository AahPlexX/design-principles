import { ArrowRight } from "lucide-react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Section } from "@/components/common/Section";
import { CourseProgressMeter } from "@/components/craft/CourseProgressMeter";
import { LessonList } from "@/components/craft/LessonList";
import { ButtonLink } from "@/components/ui/button";
import { getPrinciple } from "@/content";
import type { Course, Lesson } from "@/content/types";
import { withBase } from "@/lib/base";
import { courseRelativeLessonHref, findLesson, orderedLessons, principlePath } from "@/lib/routes";
import { lessonLabel } from "@/lib/seo";

interface CoursePageProps {
  readonly course: Course;
}

/**
 * A course overview: what the course is, how far this browser has got, and every lesson in it.
 *
 * Two shapes from one template, keyed off `course.structure.kind`. A levelled course groups its lessons
 * under level headings; a flat one lists them straight. The difference is modelled in the content rather
 * than inferred, because it also decides the URL shape, and the two must not be able to disagree.
 *
 * The level titles are rendered. Two of the four levelled course pages previously showed none at all —
 * the titles were sitting in the manifest and the markup just never printed them, so a reader working
 * through 39 lessons got nine unlabelled runs of "Lesson 1, Lesson 2, …" and no idea what any group was
 * about. `gate:content` now asserts every level has a non-placeholder title.
 *
 * The header is written out here rather than going through `PageHeader`. `PageHeader` takes an
 * `HtmlString` for its lede, and `course.hook` is deliberately plain text — it is also this page's meta
 * description. Branding it as HTML to fit the prop would trade correct escaping for a shared component.
 */
export function CoursePage({ course }: CoursePageProps) {
  const principle = getPrinciple(course.principleSlug);
  const order = orderedLessons(course);
  const first = order[0];

  return (
    <>
      <header className="mb-2">
        <Breadcrumb items={[{ label: "Craft", href: withBase("craft/") }]} current={course.title} />
        <h1 className="mt-3 text-step-3 font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-4 max-w-(--container-prose) text-step-1 leading-relaxed text-ink-muted">
          {course.hook}
        </p>
        <p className="mt-4 max-w-(--container-prose) text-ink-muted">
          Pairs with{" "}
          <a
            href={withBase(principlePath(course.principleSlug))}
            className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
          >
            {principle.title}
          </a>
          , which carries the full explanation. This page is the practice.
        </p>
      </header>

      <CourseProgressMeter course={course} />

      {course.structure.kind === "levelled" ? (
        <Section id="levels" heading="Levels">
          <div className="space-y-8">
            {course.structure.levels.map((level) => (
              <section key={level.id} aria-labelledby={level.id}>
                <h3
                  id={level.id}
                  className="text-[1.0625rem] leading-snug font-semibold text-ink"
                >{`Level ${String(level.number)}: ${level.title}`}</h3>
                <div className="mt-2.5">
                  <LessonList course={course} lessons={lessonsFor(course, level.lessonIds)} />
                </div>
              </section>
            ))}
          </div>
        </Section>
      ) : (
        <Section id="lessons" heading="Lessons">
          <LessonList course={course} lessons={order} />
        </Section>
      )}

      {first ? (
        <p className="mt-10 print:hidden">
          <ButtonLink href={courseRelativeLessonHref(first)}>
            {`Start ${lessonLabel(first)}`}
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </ButtonLink>
        </p>
      ) : null}
    </>
  );
}

/** The lesson content behind a level's declared ids, skipping any the content does not have. */
function lessonsFor(course: Course, lessonIds: readonly string[]): readonly Lesson[] {
  return lessonIds.flatMap((lessonId) => {
    const lesson = findLesson(course.id, lessonId);
    return lesson ? [lesson] : [];
  });
}
