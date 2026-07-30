import type { Course } from "@/content/types";
import { totalLessons } from "@/lib/routes";

interface CourseProgressMeterProps {
  readonly course: Course;
}

/**
 * How much of a course this browser has finished.
 *
 * The shape is the progress enhancer's contract: `[data-course-meter]` carries the course id and the
 * denominator, and holds a `[data-meter-label]` the enhancer writes text into, a `[data-meter-track]`
 * it sets `aria-valuenow` on, and a `[data-meter-fill]` whose `inline-size` it sets. Everything
 * rendered here is the honest zero state — "39 lessons", a bar at 0%, `aria-valuenow="0"` — which is
 * exactly what the enhancer produces for a reader with no progress, so the page never contradicts
 * itself between first paint and enhancement.
 *
 * `role="progressbar"` sits on the track, not on the wrapper, and that placement is the point: the role
 * makes its subtree presentational, so a label *inside* it is silently dropped from the accessibility
 * tree. With the role on the track, the visible "4 of 39 lessons done" is real text that gets announced,
 * and the bar keeps its own `aria-valuenow`/`aria-valuemax` for assistive technology that reports
 * progress numerically. Both readings stay correct because the enhancer updates both.
 *
 * ARIA rather than a native `<progress>`: `<progress>` needs its `value` attribute kept in step, and
 * `aria-valuetext` is deliberately absent because nothing updates it — a stale one would override a
 * correct number with a wrong sentence.
 *
 * This is a completion meter, not a score. A lesson is done or it is not; there is nothing here about
 * how many were answered correctly, by rule.
 */
export function CourseProgressMeter({ course }: CourseProgressMeterProps) {
  const total = totalLessons(course);
  const labelId = `course-progress-${course.id}`;

  return (
    <div
      data-course-meter={course.id}
      data-total-lessons={total}
      className="print-flat mt-8 rounded-lg border border-line bg-surface p-4"
    >
      <p
        id={labelId}
        data-meter-label
        className="text-sm font-medium text-ink-muted"
      >{`${String(total)} lessons`}</p>

      <div
        data-meter-track
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={0}
        className="mt-2.5 h-2 overflow-hidden rounded-full border border-line bg-canvas"
      >
        {/*
         * `inline-size`, not `width`, because that is the property the enhancer writes — and the logical
         * one, which is what the rest of the site uses. Zero to start with, so the served HTML and the
         * enhanced DOM describe the same state.
         *
         * Set as an arbitrary-property utility rather than a `style` attribute for one blunt reason: the
         * W3C Nu checker CI gates on ships a CSS validator that predates `inline-size` and rejects it in
         * a `style` attribute. In the stylesheet it is never seen, and the enhancer's inline
         * `style.inlineSize` still wins over it, which is the ordering that matters.
         */}
        <div
          data-meter-fill
          className="h-full rounded-full bg-accent [inline-size:0%] motion-safe:transition-[inline-size] motion-safe:duration-500 motion-safe:ease-(--ease-out-soft)"
        />
      </div>
    </div>
  );
}
