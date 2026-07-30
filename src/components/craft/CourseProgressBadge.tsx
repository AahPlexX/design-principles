import { Badge } from "@/components/ui/badge";

interface CourseProgressBadgeProps {
  readonly courseId: string;
  readonly totalLessons: number;
}

/**
 * A course's completion badge on the catalog card.
 *
 * Server-rendered empty and `hidden`, because the build has no idea what any particular reader has
 * finished — progress lives in that reader's `localStorage` and nowhere else. The progress enhancer
 * unhides it, writes its text and sets `data-state`, so the zero-progress state that ships in the HTML
 * is also the state a reader with no progress keeps.
 *
 * `hidden` at zero rather than "0/39" is the enhancer's decision, not this component's; the markup only
 * has to be honest about starting there. Note that `[hidden]` wins over the `inline-flex` the badge
 * brings with it, because Tailwind's preflight declares it `!important`.
 *
 * The attribute names are the enhancer's contract: `data-course-progress` carries the course id it
 * counts, `data-total-lessons` the denominator. The count comes from `totalLessons(course)` at the call
 * site rather than being written here — the pre-migration pages hand-typed both numbers into the
 * markup, which is why two of them had drifted from the lesson files by the time this was migrated.
 */
export function CourseProgressBadge({ courseId, totalLessons }: CourseProgressBadgeProps) {
  return (
    <Badge
      data-course-progress={courseId}
      data-total-lessons={totalLessons}
      hidden
      className="shrink-0 data-[state=complete]:border-good-line data-[state=complete]:bg-good-soft data-[state=complete]:text-good"
    />
  );
}
