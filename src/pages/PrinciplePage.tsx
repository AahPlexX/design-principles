import { ContentHtml } from "@/components/common/ContentHtml";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { Checklist } from "@/components/principle/Checklist";
import { CoreRule } from "@/components/principle/CoreRule";
import { ExamplePair } from "@/components/principle/ExamplePair";
import { GoDeeper } from "@/components/principle/GoDeeper";
import { MistakeList } from "@/components/principle/MistakeList";
import { PracticeCallout } from "@/components/principle/PracticeCallout";
import { PrincipleNav } from "@/components/principle/PrincipleNav";
import { PrincipleToc, type TocEntry } from "@/components/principle/PrincipleToc";
import { Badge } from "@/components/ui/badge";
import { courseForPrinciple, principles } from "@/content";
import { categoryId } from "@/content/site";
import type { Principle } from "@/content/types";
import { withBase } from "@/lib/base";

/**
 * The five sections, their headings, and their anchor ids.
 *
 * Declared once and shared by the table of contents and the sections themselves, so the two cannot
 * disagree about what the page contains. The ids are readable and stable: they are what a reader gets when
 * they copy the link beside a heading to send someone the checklist rather than the whole page, which
 * makes them part of the same URL contract as the filenames.
 */
const SECTIONS = [
  { id: "why-it-matters", label: "Why it matters" },
  { id: "core-rule", label: "The core rule" },
  { id: "good-vs-bad", label: "Good vs. bad" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "checklist", label: "Checklist" },
] as const satisfies readonly TocEntry[];

const [WHY, RULE, EXAMPLES, MISTAKES, CHECKLIST] = SECTIONS;

interface PrinciplePageProps {
  readonly principle: Principle;
}

/**
 * A principle page.
 *
 * Every one of the seventeen has the same six parts in the same order — the About page tells readers so,
 * and promises that once they know the shape they can skim to the part they need. That promise is why this
 * is one template rather than seventeen documents, and why the section order here is fixed rather than
 * driven by the content module.
 *
 * Renders at build time only. No hooks, no state, no client component: everything on the page is either
 * prose or a link, and the one behaviour it needs — expanding "Go deeper" before printing — is already
 * handled by an enhancer attached to the `<details>` this renders.
 */
export function PrinciplePage({ principle }: PrinciplePageProps) {
  const at = principles.findIndex((item) => item.slug === principle.slug);
  const previous = at > 0 ? principles[at - 1] : undefined;
  const next = at >= 0 && at < principles.length - 1 ? principles[at + 1] : undefined;

  // `practiceCourseId` is the flag; the course itself is looked up by principle so the title comes from
  // the course module rather than being restated here.
  const course =
    principle.practiceCourseId === null ? undefined : courseForPrinciple(principle.slug);

  return (
    /*
     * Two columns from `lg` up: prose in the wide one, the section index in the narrow one. The header,
     * index and body are three siblings placed into named grid cells rather than nested, so the index
     * stays second in source order — after the heading, before the prose — which is where a reader
     * tabbing through the page wants it and where it lands in the single-column stack below `lg`.
     */
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-x-10">
      <PageHeader
        title={principle.title}
        definition={principle.definition}
        eyebrow={
          /*
           * The category is a link to that category's section of the home page index, not to the top of
           * it. A reader following it wants the four or five sibling pages, and the index is long enough
           * that landing at the top means scrolling to find them. The fragment comes from `categoryId`,
           * next to the grouping it names, so this and the section it targets cannot disagree.
           */
          <a
            href={`${withBase("")}#${categoryId(principle.category)}`}
            aria-label={`Back to all ${principle.category} principles`}
            className="inline-block no-underline"
          >
            <Badge variant="accent">{principle.category}</Badge>
          </a>
        }
        className="mb-8 lg:col-start-1 lg:row-start-1"
      />

      <PrincipleToc
        entries={SECTIONS}
        className="lg:sticky lg:top-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
      />

      <div className="max-w-(--container-content) min-w-0 lg:col-start-1 lg:row-start-2 print:max-w-none">
        <Section id={WHY.id} heading={WHY.label} className="mt-0">
          <div className="space-y-4">
            {principle.whyItMatters.map((paragraph) => (
              <ContentHtml key={paragraph} html={paragraph} className="text-ink-muted" />
            ))}
          </div>
        </Section>

        <Section id={RULE.id} heading={RULE.label}>
          <CoreRule paragraphs={principle.coreRule} />
        </Section>

        <Section id={EXAMPLES.id} heading={EXAMPLES.label}>
          <ExamplePair good={principle.goodVsBad.good} bad={principle.goodVsBad.bad} />
        </Section>

        <Section id={MISTAKES.id} heading={MISTAKES.label}>
          <MistakeList mistakes={principle.mistakes} />
        </Section>

        <Section id={CHECKLIST.id} heading={CHECKLIST.label}>
          <Checklist items={principle.checklist} />
        </Section>

        {course ? <PracticeCallout course={course} /> : null}

        <GoDeeper entries={principle.goDeeper} />

        <PrincipleNav previous={previous} next={next} />
      </div>
    </div>
  );
}
