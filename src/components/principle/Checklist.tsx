import { ContentHtml } from "@/components/common/ContentHtml";
import type { HtmlString } from "@/content/types";

interface ChecklistProps {
  readonly items: readonly HtmlString[];
}

/**
 * The run-this-against-your-own-work list.
 *
 * The boxes are drawn, not real checkboxes. An `<input type="checkbox">` here would promise something the
 * page cannot deliver: there is nothing to submit, no form, and no state to keep — and inventing
 * somewhere to keep it is out of scope for this site by rule, not by preference. A row of controls that
 * forget every tick on reload is worse than a printed list, and it would put five focus stops in front of
 * a keyboard user for no gain.
 *
 * Drawn as an inline SVG rather than a `::before` square so the outline survives printing: it is stroked
 * in `currentColor`, and the print stylesheet forces text to black.
 */
export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-[0.35em] size-[1.05em] shrink-0 text-accent"
          >
            <rect
              x="1.5"
              y="1.5"
              width="17"
              height="17"
              rx="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          </svg>
          <ContentHtml html={item} className="text-ink" />
        </li>
      ))}
    </ul>
  );
}
