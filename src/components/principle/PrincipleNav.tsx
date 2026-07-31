import { ArrowLeft, ArrowRight } from "lucide-react";

import { CardLink } from "@/components/ui/card";
import type { Principle } from "@/content/types";
import { withBase } from "@/lib/base";
import { principlePath } from "@/lib/routes";

interface PrincipleNavProps {
  /** Undefined at the start of the navigation order; that side is then not rendered. */
  readonly previous: Principle | undefined;
  readonly next: Principle | undefined;
}

/**
 * Previous and next principle, in the site's navigation order.
 *
 * The card carries the destination's title, not "Previous" alone, so the link makes sense read on its own.
 * At either end of the order the missing side is omitted rather than rendered disabled, and the remaining
 * card stays on its own side of the row — `col-start-2` keeps "Next" at the end edge with nothing before
 * it, which is the shape a reader expects when there is no previous page.
 *
 * `print:hidden`: navigation between documents is meaningless on paper.
 */
export function PrincipleNav({ previous, next }: PrincipleNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More principles"
      className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 print:hidden"
    >
      {previous ? (
        <CardLink
          href={withBase(principlePath(previous.slug))}
          rel="prev"
          className="sm:col-start-1"
        >
          <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
            <ArrowLeft aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
            Previous
          </span>
          <span className="font-semibold text-ink transition-colors group-hover:text-accent">
            {previous.title}
          </span>
        </CardLink>
      ) : null}

      {next ? (
        <CardLink
          href={withBase(principlePath(next.slug))}
          rel="next"
          className="sm:col-start-2 sm:items-end sm:text-end"
        >
          <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
            Next
            <ArrowRight aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
          </span>
          <span className="font-semibold text-ink transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </CardLink>
      ) : null}
    </nav>
  );
}
