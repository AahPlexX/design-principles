import { GraduationCap } from "lucide-react";

import { CardBody, CardLink, CardMeta, CardTitle } from "@/components/ui/card";
import { courseForPrinciple } from "@/content";
import type { Principle } from "@/content/types";
import { withBase } from "@/lib/base";
import { principlePath } from "@/lib/routes";

interface PrincipleCardProps {
  readonly principle: Principle;
  /** Given one card a row to itself, so the layout does not read as a row that failed to fill. */
  readonly wide?: boolean;
}

/**
 * One principle on the home page index.
 *
 * The `<li>` carries `data-search-card`, not the anchor inside it. The filter enhancer hides whatever
 * holds that attribute, and hiding the anchor would leave its list item behind as an empty cell in the
 * grid — so the element that is a grid item has to be the element that disappears. `[hidden]` beats the
 * `flex` on it, because Tailwind's preflight declares that rule `!important`. Its value is the
 * principle's `searchKeywords`, which is the lowercase haystack the enhancer matches against and the
 * same blob the command palette searches, so the two cannot disagree about what a page is about.
 *
 * The paired Craft course is named on the card. It was previously visible only from the principle page
 * itself, which meant the practice existed and the index never said so. `practiceCourseId` is the flag
 * and `courseForPrinciple` supplies the title, so the title is not copied into a second place.
 */
export function PrincipleCard({ principle, wide = false }: PrincipleCardProps) {
  const course =
    principle.practiceCourseId === null ? undefined : courseForPrinciple(principle.slug);

  return (
    <li data-search-card={principle.searchKeywords} className="flex">
      <CardLink
        href={withBase(principlePath(principle.slug))}
        className={wide ? "w-full p-5 sm:p-6" : "w-full"}
      >
        <CardTitle>{principle.title}</CardTitle>
        <CardBody>{principle.blurb}</CardBody>

        {course ? (
          <CardMeta className="flex items-center gap-1.5 text-accent">
            <GraduationCap aria-hidden="true" className="size-3.5 shrink-0" />
            Craft course: {course.title}
          </CardMeta>
        ) : null}
      </CardLink>
    </li>
  );
}
