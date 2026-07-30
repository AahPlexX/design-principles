import { ContentHtml } from "@/components/common/ContentHtml";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { CourseCard } from "@/components/craft/CourseCard";
import { courses } from "@/content";
import { CRAFT_INDEX_PAGE } from "@/content/site";

/**
 * The Craft catalog.
 *
 * Eight cards, derived from the course manifest rather than listed here, so adding a course is a content
 * change and not a markup change. Every number on a card — levels, lessons, the progress denominator —
 * comes out of the course structure for the same reason.
 *
 * The grid sits under its own `<h2>` rather than directly under the `<h1>`. The card titles are `<h3>`,
 * which without that heading would be a level skipped from `<h1>` straight to `<h3>` — which is what the
 * pre-migration catalog did, and what `heading-order` in the axe gate catches.
 *
 * Renders at build time only. The one piece of behaviour on the page, filling in the progress badges, is
 * an enhancer attached to markup this already produced.
 */
export function CraftIndexPage() {
  return (
    <>
      <PageHeader
        title={CRAFT_INDEX_PAGE.title}
        definition={CRAFT_INDEX_PAGE.definition}
        intro={CRAFT_INDEX_PAGE.intro}
      />

      <Section id="courses" heading="Courses" className="mt-0">
        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.id} className="flex">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="more-on-the-way" heading={CRAFT_INDEX_PAGE.moreHeading}>
        <ContentHtml html={CRAFT_INDEX_PAGE.moreBody} className="text-ink-muted" />
      </Section>
    </>
  );
}
