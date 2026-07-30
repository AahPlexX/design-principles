import { Callout } from "@/components/common/Callout";
import { ContentHtml } from "@/components/common/ContentHtml";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SEARCH_INPUT_ID } from "@/components/home/PrincipleFilter";
import { ButtonLink } from "@/components/ui/button";
import { principles } from "@/content";
import { NOT_FOUND_PAGE } from "@/content/site";
import { withBase } from "@/lib/base";

const kbd =
  "rounded border border-line bg-surface px-1.5 py-0.5 font-sans text-[0.8125em] text-ink";

/**
 * The site's error page.
 *
 * GitHub Pages serves this one file for every path it cannot find, which is the constraint that shapes
 * the whole page: **every link on it has to be absolute.** A relative href here is resolved against
 * whatever directory the missing URL happened to be in, so `href="craft/"` on a 404 served at
 * `/design-principles/craft/color-contrast/typo.html` points at
 * `/design-principles/craft/color-contrast/craft/` — a second 404, from the page whose job is to end
 * the first one. Every href below goes through `withBase`.
 *
 * `NOT_FOUND_PAGE.body`'s own link is absolute for the same reason — see the note beside it in the
 * content module.
 *
 * Beyond the content, this page gives a reader three ways on rather than one, because a reader who has
 * landed here has already failed to find something: the index, the courses, and search — including the
 * keyboard shortcut, which works on this page as it does on every other.
 */
export function NotFoundPage() {
  return (
    <>
      <PageHeader title={NOT_FOUND_PAGE.title} definition={NOT_FOUND_PAGE.definition} />

      <Section id="what-to-do-next" heading={NOT_FOUND_PAGE.heading} className="mt-0">
        <ContentHtml html={NOT_FOUND_PAGE.body} className="text-ink-muted" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href={withBase("")}>
            {`All ${String(principles.length)} principles`}
          </ButtonLink>
          <ButtonLink href={withBase("craft/")} variant="outline">
            Craft courses
          </ButtonLink>
          <ButtonLink href={withBase("about.html")} variant="ghost">
            About this site
          </ButtonLink>
        </div>

        <p className="mt-6 text-ink-muted">
          To search from here, press <kbd className={kbd}>&#8984;K</kbd> — or{" "}
          <kbd className={kbd}>Ctrl K</kbd> — and start typing. The{" "}
          <a
            href={`${withBase("")}#${SEARCH_INPUT_ID}`}
            className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
          >
            filter box on the home page
          </a>{" "}
          matches the same titles and topics, without the shortcut.
        </p>
      </Section>

      <Callout className="mt-10">
        <ContentHtml html={NOT_FOUND_PAGE.note} className="text-ink" />
      </Callout>
    </>
  );
}
