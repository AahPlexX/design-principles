import { ArrowRight } from "lucide-react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContentHtml } from "@/components/common/ContentHtml";
import { Section } from "@/components/common/Section";
import { LessonNav } from "@/components/craft/LessonNav";
import { Quiz } from "@/components/craft/Quiz";
import { getPrinciple } from "@/content";
import type { Course, Lesson } from "@/content/types";
import { canonicalPath, withBase } from "@/lib/base";
import { coursePath, principlePath } from "@/lib/routes";
import { lessonHeading, lessonLabel } from "@/lib/seo";

interface LessonPageProps {
  readonly course: Course;
  readonly lesson: Lesson;
}

/**
 * A lesson: a short framing, one practice question, and a way onward.
 *
 * The `<h1>` comes from `lessonHeading`, which is the same function `buildMeta` uses for the page's
 * `<title>` and JSON-LD. Lesson titles are stored without their numbering, so `Level 2, Lesson 3:` is
 * derived — and derived once, because a page whose heading and title describe different things is a
 * search-result mismatch and the kind of thing nobody notices across 144 files.
 *
 * The framing is body prose, not a lede, so it is set at body size and not passed through `PageHeader`,
 * whose `definition` is deliberately larger. Four of these lessons have two framing paragraphs; sizing
 * the first as a lede would present those two as lede-plus-support, which is not what they are.
 *
 * No React reaches the browser from here. The quiz is an enhancer by design — see `Quiz`.
 */
export function LessonPage({ course, lesson }: LessonPageProps) {
  const principle = getPrinciple(lesson.principleSlug);

  return (
    <>
      <header className="mb-8">
        <Breadcrumb
          items={[
            { label: "Craft", href: withBase("craft/") },
            { label: course.title, href: withBase(canonicalPath(coursePath(course.id))) },
          ]}
          // The number, not the title: the title is the `<h1>` immediately below, and lesson titles run
          // to seventy-odd characters, which is a breadcrumb wrapping onto three lines.
          current={lessonLabel(lesson)}
        />

        <h1 className="mt-3 text-step-3 font-semibold tracking-tight">{lessonHeading(lesson)}</h1>

        <div className="mt-5 space-y-4">
          {lesson.framing.map((paragraph) => (
            <ContentHtml key={paragraph} html={paragraph} className="text-ink-muted" />
          ))}
        </div>
      </header>

      <Section id="practice" heading="Practice">
        <Quiz lesson={lesson} />
      </Section>

      <p className="mt-8">
        <a
          href={withBase(principlePath(lesson.principleSlug))}
          className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          Full explanation: {principle.title}
          <ArrowRight aria-hidden="true" className="ms-1 inline-block size-4 rtl:-scale-x-100" />
        </a>
      </p>

      <LessonNav course={course} lesson={lesson} />
    </>
  );
}
