import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CalloutProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * An aside set off from the reading flow by a leading accent rule.
 *
 * `border-s-*` rather than `border-l-*` so the rule stays on the reading-start edge in a
 * right-to-left locale. The original stylesheet used logical properties throughout for the same
 * reason, which is consistent with the site having an internationalization page.
 */
export function Callout({ children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-e-md border-s-4 border-s-accent bg-accent-soft/45 py-3 ps-4 pe-4 text-ink",
        "print-flat",
        className,
      )}
    >
      {children}
    </div>
  );
}
