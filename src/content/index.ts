/**
 * The content registry.
 *
 * Every page component reads from here rather than importing individual content modules, so the
 * ordering rules (navigation order, home page grouping, lesson reading order) live in one place.
 */
import { courses } from "./craft/courses";
import { accessibilityLessons } from "./craft/lessons/accessibility";
import { colorContrastLessons } from "./craft/lessons/color-contrast";
import { darkPatternsEthicsLessons } from "./craft/lessons/dark-patterns-ethics";
import { formsInputsLessons } from "./craft/lessons/forms-inputs";
import { responsiveDesignLessons } from "./craft/lessons/responsive-design";
import { spacingLayoutLessons } from "./craft/lessons/spacing-layout";
import { typographyLessons } from "./craft/lessons/typography";
import { visualHierarchyLessons } from "./craft/lessons/visual-hierarchy";
import { accessibility } from "./principles/accessibility";
import { colorContrast } from "./principles/color-contrast";
import { contentMicrocopy } from "./principles/content-microcopy";
import { darkPatternsEthics } from "./principles/dark-patterns-ethics";
import { dataTables } from "./principles/data-tables";
import { emptyErrorStates } from "./principles/empty-error-states";
import { formsInputs } from "./principles/forms-inputs";
import { iconographyImagery } from "./principles/iconography-imagery";
import { internationalizationLocalization } from "./principles/internationalization-localization";
import { motionFeedback } from "./principles/motion-feedback";
import { navigationIa } from "./principles/navigation-ia";
import { onboardingProgressiveDisclosure } from "./principles/onboarding-progressive-disclosure";
import { performance } from "./principles/performance";
import { responsiveDesign } from "./principles/responsive-design";
import { spacingLayout } from "./principles/spacing-layout";
import { typography } from "./principles/typography";
import { visualHierarchy } from "./principles/visual-hierarchy";
import { NAV_PRINCIPLE_ORDER } from "./site";
import type { Course, Lesson, Principle } from "./types";

const ALL_PRINCIPLES: readonly Principle[] = [
  accessibility,
  colorContrast,
  contentMicrocopy,
  darkPatternsEthics,
  dataTables,
  emptyErrorStates,
  formsInputs,
  iconographyImagery,
  internationalizationLocalization,
  motionFeedback,
  navigationIa,
  onboardingProgressiveDisclosure,
  performance,
  responsiveDesign,
  spacingLayout,
  typography,
  visualHierarchy,
];

/**
 * Principles in navigation order.
 *
 * Sorting here rather than relying on import order means the navigation cannot silently reorder
 * itself because someone tidied the imports above.
 */
const navOrder: readonly string[] = NAV_PRINCIPLE_ORDER;

export const principles: readonly Principle[] = [...ALL_PRINCIPLES].sort(
  (a, b) => navOrder.indexOf(a.slug) - navOrder.indexOf(b.slug),
);

export const lessons: readonly Lesson[] = [
  ...visualHierarchyLessons,
  ...colorContrastLessons,
  ...accessibilityLessons,
  ...typographyLessons,
  ...spacingLayoutLessons,
  ...responsiveDesignLessons,
  ...formsInputsLessons,
  ...darkPatternsEthicsLessons,
];

export { courses };

const principlesBySlug = new Map(principles.map((principle) => [principle.slug, principle]));
const coursesById = new Map(courses.map((course) => [course.id, course]));

export function getPrinciple(slug: string): Principle {
  const principle = principlesBySlug.get(slug);
  if (!principle) throw new Error(`No principle content for slug "${slug}"`);
  return principle;
}

export function findPrinciple(slug: string): Principle | undefined {
  return principlesBySlug.get(slug);
}

export function getCourse(id: string): Course {
  const course = coursesById.get(id);
  if (!course) throw new Error(`No course content for id "${id}"`);
  return course;
}

export function findCourse(id: string): Course | undefined {
  return coursesById.get(id);
}

/** The course that pairs with a principle, when one exists. */
export function courseForPrinciple(slug: string): Course | undefined {
  return courses.find((course) => course.principleSlug === slug);
}
