import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  readonly heading: string;
  /**
   * Anchor id. Every section on a principle page is linkable, so a reader can send someone the
   * checklist rather than the page.
   */
  readonly id: string;
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * A titled content section with a linkable heading.
 *
 * The anchor link is revealed on hover or keyboard focus rather than shown permanently — it is useful
 * often enough to keep and not often enough to earn space in the reading flow. It stays reachable by
 * keyboard because it is a real focusable link, not a hover-only affordance.
 */
export function Section({ heading, id, children, className }: SectionProps) {
  return (
    <section aria-labelledby={id} className={cn("mt-12 scroll-mt-24", className)}>
      <h2 id={id} className="group relative text-step-2 font-semibold">
        <a
          href={`#${id}`}
          aria-label={`Link to “${heading}”`}
          className="text-ink no-underline before:absolute before:-inset-y-1 before:-start-4 before:w-4 before:content-['']"
        >
          {heading}
          <span
            aria-hidden="true"
            className="absolute -start-4 text-ink-subtle opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 print:hidden"
          >
            #
          </span>
        </a>
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
