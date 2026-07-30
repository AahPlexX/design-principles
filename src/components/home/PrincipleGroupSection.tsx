import { Badge } from "@/components/ui/badge";
import { findPrinciple } from "@/content";
import { categoryId } from "@/content/site";
import type { PrincipleCategory } from "@/content/types";
import { cn } from "@/lib/utils";

import { PrincipleCard } from "./PrincipleCard";

/**
 * One entry of `HOME_GROUPS`, described structurally.
 *
 * The content module declares the array's shape inline, so this states what the component needs rather
 * than reaching into `typeof HOME_GROUPS` — which would make the component's contract depend on the
 * literal contents of the content file.
 */
interface HomeGroup {
  readonly category: PrincipleCategory;
  readonly summary: string;
  readonly slugs: readonly string[];
}

interface PrincipleGroupSectionProps {
  readonly group: HomeGroup;
  /** Position in the index, shown as a decorative numeral. */
  readonly ordinal: number;
}

/**
 * One category of the home page index.
 *
 * The `<section>` itself carries `data-search-group`, so when the filter empties a category the heading
 * and its summary go with the cards. The pre-migration page hid only the grid, which left a heading
 * announcing a section with nothing under it.
 *
 * Three things distinguish a group from the next one, and each of them is information the original page
 * had and did not print:
 *
 *  - the `summary` from the content, which is the editorial reason the grouping exists at all;
 *  - the count, so "Ethics" is visibly one principle rather than looking like a category that lost four;
 *  - the grid, which collapses to a single full-width card when a category holds one principle, instead
 *    of leaving two empty cells beside it.
 *
 * Not built on `Section`. That component's heading is a single string with a copy-link affordance and no
 * room for the count or the summary line, and this heading block is a different shape rather than a
 * variant of the same one. The `scroll-mt-24` and the id-on-the-heading convention are kept, because
 * these ids are where every principle page's category eyebrow lands.
 */
export function PrincipleGroupSection({ group, ordinal }: PrincipleGroupSectionProps) {
  const id = categoryId(group.category);
  const principles = group.slugs.flatMap((slug) => {
    const principle = findPrinciple(slug);
    return principle ? [principle] : [];
  });
  const single = principles.length === 1;

  return (
    <section data-search-group aria-labelledby={id} className="scroll-mt-24">
      <div className="border-s-2 border-s-accent/50 ps-4 sm:ps-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          {/*
           * Decorative, and hidden from assistive tech: the number is a visual anchor that gives the four
           * groups a rhythm down the page, and reading "zero one" before "Foundations" would add nothing.
           */}
          <span aria-hidden="true" className="text-sm font-semibold text-ink-subtle tabular-nums">
            {String(ordinal).padStart(2, "0")}
          </span>
          <h2 id={id} className="text-step-2 font-semibold">
            {group.category}
          </h2>
          <Badge>
            {principles.length} {principles.length === 1 ? "principle" : "principles"}
          </Badge>
        </div>
        <p className="mt-2 max-w-(--container-prose) text-ink-muted">{group.summary}</p>
      </div>

      <ul
        className={cn(
          "mt-5 grid list-none gap-4",
          !single && "sm:grid-cols-2 lg:grid-cols-3",
          "ps-4 sm:ps-5",
        )}
      >
        {principles.map((principle) => (
          <PrincipleCard key={principle.slug} principle={principle} wide={single} />
        ))}
      </ul>
    </section>
  );
}
