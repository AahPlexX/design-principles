import { ContentHtml } from "@/components/common/ContentHtml";
import type { Mistake } from "@/content/types";

interface MistakeListProps {
  readonly mistakes: readonly Mistake[];
}

/**
 * The named failure modes.
 *
 * Each `name` is a standalone phrase that summarises the paragraph under it, so it is an `<h3>` rather
 * than a bolded first clause. On the pre-migration pages it was `<strong>` inside an `<li>`, which looks
 * identical and is not: a reader listing the page's headings, or skimming with a screen reader's rotor,
 * got five list items reading "Using gray-on-gray for de-emphasized text…" as one run of prose instead
 * of five named mistakes they could jump between.
 *
 * The leading rule uses `border-s-*` and the corners `rounded-e-*`, so the marker stays on the
 * reading-start edge in a right-to-left locale, matching what the original stylesheet did with
 * `border-inline-start`.
 */
export function MistakeList({ mistakes }: MistakeListProps) {
  return (
    <ul className="space-y-3">
      {mistakes.map((mistake) => (
        <li
          key={mistake.name}
          className="print-flat rounded-e-md border-s-4 border-s-bad bg-surface py-3 ps-4 pe-4"
        >
          <h3 className="text-[1.0625rem] leading-snug font-semibold text-bad">{mistake.name}</h3>
          <ContentHtml html={mistake.body} className="mt-1 text-ink-muted" />
        </li>
      ))}
    </ul>
  );
}
