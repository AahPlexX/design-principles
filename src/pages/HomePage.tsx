import { ArrowRight } from "lucide-react";

import { ContentHtml } from "@/components/common/ContentHtml";
import { Section } from "@/components/common/Section";
import { PrincipleFilter } from "@/components/home/PrincipleFilter";
import { PrincipleGroupSection } from "@/components/home/PrincipleGroupSection";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { courses, lessons, principles } from "@/content";
import { HOME_GROUPS, HOME_PAGE } from "@/content/site";
import { withBase } from "@/lib/base";

/** The anchor the hero's primary call to action lands on: the filter box and the four categories. */
const INDEX_ID = "principle-index";

/**
 * The home page.
 *
 * It is the front door and it is also the index: readers arrive here from search or from the header on
 * every other page, and this is the only place all seventeen principles are listed. The pre-migration
 * version treated those two jobs as one, opening with a heading, a filter box and four undifferentiated
 * grids of identical grey cards — so a first-time reader got no reason to read on, and a returning one
 * got no help choosing.
 *
 * The three parts of this page are those jobs, separated:
 *
 *  - a hero that says what the site is and offers the two things a reader can do — read a principle, or
 *    practise one in Craft;
 *  - the index, filterable, with each category carrying the editorial summary that explains why the
 *    grouping exists;
 *  - a closing pointer to the exports, which existed from the start and were mentioned nowhere obvious.
 *
 * The counts in the hero are derived from the content registry rather than written down. The old page
 * hand-typed its numbers, which is how a site ends up advertising sixteen principles.
 *
 * Renders at build time only. The filtering is an enhancer attached to the markup below, so this file has
 * no state, no hooks and no island.
 */
export function HomePage() {
  return (
    <>
      {/*
       * The hero is written out here rather than going through `PageHeader`. Every other page opens with
       * the same title-plus-definition block and should keep doing so; this one opens with a heading a step
       * larger, a pair of calls to action and the site's scale, which is a different component that happens
       * to start with a heading — not a variant of that one.
       */}
      <header className="print-flat overflow-hidden rounded-lg border border-line bg-linear-to-b from-accent-soft/60 to-canvas px-5 py-10 sm:px-8 sm:py-14">
        <p className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{principles.length} principles</Badge>
          <Badge>{courses.length} Craft courses</Badge>
          <Badge>{lessons.length} practice lessons</Badge>
        </p>

        <h1 className="mt-5 max-w-(--container-prose) text-step-4 font-semibold tracking-tight">
          {HOME_PAGE.heading}
        </h1>

        <ContentHtml
          html={HOME_PAGE.definition}
          className="mt-5 max-w-(--container-prose) text-step-1 leading-relaxed font-normal text-ink-muted"
        />
        <ContentHtml
          html={HOME_PAGE.intro}
          className="mt-4 max-w-(--container-prose) text-ink-muted"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
          <ButtonLink href={`#${INDEX_ID}`}>
            {`Browse all ${String(principles.length)} principles`}
          </ButtonLink>
          <ButtonLink href={withBase("craft/")} variant="outline">
            Practise with Craft
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </ButtonLink>
        </div>
      </header>

      {/*
       * The index. A plain wrapper rather than a landmark or a titled section: the four category headings
       * are the page's structure, and putting a fifth heading above them would push every category down a
       * level and every card title with it.
       */}
      <div id={INDEX_ID} className="mt-14 scroll-mt-24">
        <PrincipleFilter />

        <div className="mt-10 space-y-12">
          {HOME_GROUPS.map((group, index) => (
            <PrincipleGroupSection key={group.category} group={group} ordinal={index + 1} />
          ))}
        </div>

        {/*
         * The no-results message. Server-rendered `hidden` — nothing is filtered until someone types —
         * and outside every group, so the enhancer's group-hiding pass cannot take it down with them.
         */}
        <p
          data-search-empty
          hidden
          className="rounded-lg border border-dashed border-line bg-surface px-4 py-6 text-center text-ink-muted"
        >
          No principles match that filter. Try a shorter word, or clear the filter to see all{" "}
          {principles.length}.
        </p>
      </div>

      {/*
        The prose here is the original page's, carried across unchanged. It was rewritten during the
        redesign and restored: this migration replaces the presentation layer, and a reworded paragraph
        is a content change wearing a redesign's clothes.
      */}
      <Section id="beyond-the-site" heading={HOME_PAGE.beyond.heading}>
        <ContentHtml
          html={HOME_PAGE.beyond.body}
          className="max-w-(--container-prose) text-ink-muted"
        />
      </Section>
    </>
  );
}
