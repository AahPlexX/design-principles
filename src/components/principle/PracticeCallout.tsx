import { ArrowRight } from "lucide-react";

import { Callout } from "@/components/common/Callout";
import type { Course } from "@/content/types";
import { canonicalPath, withBase } from "@/lib/base";
import { coursePath } from "@/lib/routes";

interface PracticeCalloutProps {
  readonly course: Course;
}

/**
 * The pointer to the Craft course that pairs with this principle.
 *
 * The link names the course rather than saying "practice this" and leaving the destination to a tooltip,
 * so it still says where it goes when it is read out of context in a list of links.
 *
 * `canonicalPath` is applied to the course path deliberately: `coursePath` returns
 * `craft/<id>/index.html`, and the directory form is the URL the course page declares as its own
 * canonical and the one already in the sitemap and in inbound links. Linking to the file would point
 * readers and crawlers at a second URL for the same page.
 */
export function PracticeCallout({ course }: PracticeCalloutProps) {
  return (
    <Callout className="mt-10">
      <p className="text-ink">
        <a
          href={withBase(canonicalPath(coursePath(course.id)))}
          className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          Practice this: {course.title}
          <ArrowRight aria-hidden="true" className="ms-1 inline-block size-4 rtl:-scale-x-100" />
        </a>{" "}
        — a short, hands-on Craft course that pairs with this page.
      </p>
    </Callout>
  );
}
