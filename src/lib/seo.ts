import { courseForPrinciple } from "@/content";
import { CRAFT_INDEX_PAGE, ABOUT_PAGE, HOME_PAGE, NOT_FOUND_PAGE } from "@/content/site";
import type { Lesson } from "@/content/types";

import { SITE_NAME, absoluteUrl, canonicalPath } from "./base";
import { toPlainText } from "./html";
import type { Route } from "./routes";
import { orderedLessons, totalLessons } from "./routes";

export interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  /** JSON-LD graph nodes for this page. Serialised into one script tag. */
  readonly structuredData: readonly Record<string, unknown>[];
}

const ORGANIZATION = {
  "@type": "Organization",
  name: SITE_NAME,
  url: absoluteUrl(""),
} as const;

/**
 * The longest a `<title>` may be.
 *
 * Search results cut titles off around this width. A longer title is not penalised, but the part past
 * the cut does no work, and the cut lands mid-word.
 */
const TITLE_LIMIT = 68;

function truncateAtWord(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const clipped = value.slice(0, limit - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}\u2026`;
}

/**
 * Builds a title from a subject plus optional context, keeping whatever fits.
 *
 * Lesson titles are full sentences — up to 76 characters — so a fixed
 * `subject — course — site name` template overflows on a good number of them. Rather than truncating
 * every title to make one template fit, the context is appended only while there is room, so short
 * titles keep their course and site name and long ones spend the budget on the subject instead.
 */
function fitTitle(subject: string, context: readonly string[]): string {
  let title = truncateAtWord(subject, TITLE_LIMIT);
  for (const part of context) {
    const candidate = `${title} — ${part}`;
    if (candidate.length > TITLE_LIMIT) break;
    title = candidate;
  }
  return title;
}

function lessonHeading(lesson: Lesson): string {
  return lesson.levelNumber === null
    ? `Lesson ${String(lesson.lessonNumber)}: ${lesson.title}`
    : `Level ${String(lesson.levelNumber)}, Lesson ${String(lesson.lessonNumber)}: ${lesson.title}`;
}

/**
 * The `<h1>` a page renders. Kept next to the metadata because the two must agree: a page whose
 * heading and title describe different things is a search-result mismatch.
 */
export function pageHeading(route: Route): string {
  switch (route.kind) {
    case "home":
      return HOME_PAGE.title;
    case "about":
      return ABOUT_PAGE.title;
    case "not-found":
      return NOT_FOUND_PAGE.title;
    case "craft-index":
      return CRAFT_INDEX_PAGE.title;
    case "principle":
      return route.principle.title;
    case "course":
      return route.course.title;
    case "lesson":
      return lessonHeading(route.lesson);
  }
}

export function buildMeta(route: Route): PageMeta {
  const canonical = absoluteUrl(canonicalPath(route.outputPath));

  switch (route.kind) {
    case "home":
      return {
        title: fitTitle(`${SITE_NAME} — web design explained plainly`, []),
        description: HOME_PAGE.blurb,
        canonical,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: absoluteUrl(""),
            description: HOME_PAGE.blurb,
            publisher: ORGANIZATION,
          },
        ],
      };

    case "about":
      return {
        title: fitTitle(ABOUT_PAGE.title, [SITE_NAME]),
        description: ABOUT_PAGE.blurb,
        canonical,
        structuredData: [],
      };

    case "not-found":
      return {
        title: fitTitle("Page not found", [SITE_NAME]),
        description: NOT_FOUND_PAGE.blurb,
        canonical,
        structuredData: [],
      };

    case "craft-index":
      return {
        title: fitTitle("Craft — hands-on practice", [SITE_NAME]),
        description: CRAFT_INDEX_PAGE.blurb,
        canonical,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Craft — ${SITE_NAME}`,
            url: canonical,
            description: CRAFT_INDEX_PAGE.blurb,
          },
        ],
      };

    case "principle": {
      const { principle } = route;
      const course = courseForPrinciple(principle.slug);
      return {
        title: fitTitle(principle.title, [SITE_NAME]),
        description: principle.blurb,
        canonical,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: principle.title,
            description: principle.blurb,
            datePublished: principle.datePublished,
            author: ORGANIZATION,
            publisher: ORGANIZATION,
            mainEntityOfPage: canonical,
            ...(course ? { mentions: { "@type": "Course", name: course.title } } : {}),
          },
        ],
      };
    }

    case "course": {
      const { course } = route;
      return {
        title: fitTitle(course.title, ["Craft", SITE_NAME]),
        description: course.hook,
        canonical,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.hook,
            url: canonical,
            provider: ORGANIZATION,
            about: course.principleTitle,
            numberOfCredits: totalLessons(course),
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: `PT${String(Math.max(5, totalLessons(course) * 2))}M`,
            },
          },
        ],
      };
    }

    case "lesson": {
      const { course, lesson } = route;
      const order = orderedLessons(course);
      const position = order.findIndex((item) => item.lessonId === lesson.lessonId) + 1;
      return {
        title: fitTitle(lesson.title, [course.title, SITE_NAME]),
        description: toPlainText(lesson.framing[0] ?? lesson.title).slice(0, 155),
        canonical,
        structuredData: [
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lessonHeading(lesson),
            url: canonical,
            learningResourceType: "Lesson",
            isPartOf: {
              "@type": "Course",
              name: course.title,
              url: absoluteUrl(`craft/${course.id}/`),
            },
            position,
            provider: ORGANIZATION,
          },
        ],
      };
    }
  }
}
