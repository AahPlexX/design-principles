import { CodeBlock } from "@/components/common/CodeBlock";
import { ContentHtml } from "@/components/common/ContentHtml";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { Panel } from "@/components/ui/card";
import { ABOUT_PAGE } from "@/content/site";
import { slugify } from "@/lib/slug";

/**
 * The About page.
 *
 * Its shape comes from the content module rather than from this file: `sections`, then `exports`, then
 * `contributing`. Section ids are derived from the headings with `slugify`, so every heading here is a
 * copyable deep link — `about.html#using-the-exports` — without a table of ids that has to be kept in
 * step with the prose.
 *
 * The "How to read a page" list is an ordered list because the order is the point: the page is promising
 * that all seventeen principle pages have those six parts in that sequence, which is the promise
 * `PrinciplePage` keeps by being one template rather than seventeen documents.
 */
export function AboutPage() {
  return (
    <>
      <PageHeader title={ABOUT_PAGE.title} definition={ABOUT_PAGE.definition} />

      {ABOUT_PAGE.sections.map((section, index) => (
        <Section
          key={section.heading}
          id={slugify(section.heading)}
          heading={section.heading}
          className={index === 0 ? "mt-0" : ""}
        >
          <div className="space-y-4">
            {section.body.map((paragraph) => (
              <ContentHtml key={paragraph} html={paragraph} className="text-ink-muted" />
            ))}
          </div>

          {"steps" in section ? (
            <ol className="mt-5 list-decimal space-y-2.5 ps-6 marker:text-ink-subtle">
              {section.steps.map((step) => (
                <li key={step.term} className="ps-1">
                  <strong className="font-semibold text-ink">{step.term}</strong>
                  {" — "}
                  <ContentHtml as="span" html={step.detail} className="text-ink-muted" />
                </li>
              ))}
            </ol>
          ) : null}
        </Section>
      ))}

      <Section id={slugify(ABOUT_PAGE.exports.heading)} heading={ABOUT_PAGE.exports.heading}>
        <ContentHtml html={ABOUT_PAGE.exports.intro} className="text-ink-muted" />

        <div className="mt-5 space-y-4">
          {ABOUT_PAGE.exports.items.map((item) => (
            <Panel key={item.heading}>
              <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink">
                {item.heading}
              </h3>
              <ContentHtml html={item.body} className="mt-1.5 text-ink-muted" />
              {/*
               * `code` is null for the prompts export, which has nothing to run. Rendered through
               * `CodeBlock` so the sample is a focusable scroll container rather than a `<pre>` a keyboard
               * user cannot reach the end of.
               */}
              {item.code === null ? null : <CodeBlock code={item.code} className="mt-3" />}
            </Panel>
          ))}
        </div>
      </Section>

      <Section
        id={slugify(ABOUT_PAGE.contributing.heading)}
        heading={ABOUT_PAGE.contributing.heading}
      >
        <ContentHtml html={ABOUT_PAGE.contributing.body} className="text-ink-muted" />
      </Section>
    </>
  );
}
