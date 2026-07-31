import { Panel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TocEntry {
  readonly id: string;
  readonly label: string;
}

interface PrincipleTocProps {
  readonly entries: readonly TocEntry[];
  readonly className?: string;
}

/**
 * Section index for a principle page.
 *
 * One element, two shapes. Below `lg` it sits inline in the reading flow as a compact wrapping row, so
 * it costs a couple of lines of height rather than squeezing the measure; from `lg` up the page becomes
 * two columns and this is placed in the narrow one, sticky. Rendering a separate mobile copy would have
 * been easier to style and would have put two nav landmarks with the same links in every document,
 * which a screen reader reads twice.
 *
 * No scroll-spy. Marking the section you are currently in needs a scroll listener, and this template
 * ships no client JavaScript at all; five anchors are legible without one.
 *
 * `print:hidden` because paper has no anchors to follow.
 */
export function PrincipleToc({ entries, className }: PrincipleTocProps) {
  return (
    <Panel className={cn("mb-10 p-4 lg:mb-0", "print:hidden", className)}>
      <nav aria-labelledby="toc-label">
        <p
          id="toc-label"
          className="text-[0.6875rem] font-semibold tracking-wider text-ink-subtle uppercase"
        >
          On this page
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm lg:mt-3 lg:flex-col lg:gap-y-2">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className="text-ink-muted no-underline transition-colors hover:text-accent"
              >
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Panel>
  );
}
