import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DisclosureProps {
  readonly summary: string;
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * A collapsed section, built on native `<details>`.
 *
 * Deliberately not shadcn's Collapsible or Accordion. Three reasons, all of which apply here:
 *
 *  - It opens without JavaScript, so the expert-nuance content is never unreachable.
 *  - The print enhancer expands `<details>` before printing, so a printed page includes it. A
 *    JavaScript disclosure renders nothing for the print pipeline to find.
 *  - Browser in-page find (⌘F) searches inside a closed `<details>` and opens it on a hit. A
 *    JavaScript disclosure that unmounts its content cannot be found at all.
 *
 * The marker is drawn with CSS from a rotating chevron rather than the platform triangle, which is not
 * stylable consistently across browsers.
 */
export function Disclosure({ summary, children, className }: DisclosureProps) {
  return (
    <details
      className={cn(
        "group mt-12 rounded-lg border border-line bg-surface",
        "print-flat",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-4 py-3 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0 text-ink-subtle transition-transform group-open:rotate-90 rtl:-scale-x-100"
        >
          <path
            d="M5 3l6 5-6 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {summary}
      </summary>
      <div className="space-y-4 border-t border-line px-4 py-4">{children}</div>
    </details>
  );
}
