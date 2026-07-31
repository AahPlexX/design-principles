import { FOOTER_TEXT } from "@/content/site";
import { withBase } from "@/lib/base";

/**
 * The attribution line has been on every page since the first commit and the MIT licence requires it,
 * so it is rendered from a single constant rather than retyped per page.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line print:hidden">
      <div className="mx-auto flex max-w-(--container-wide) flex-col gap-3 px-4 py-8 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p
          className="[&_a]:text-ink-muted [&_a]:underline [&_a]:decoration-line-strong [&_a]:hover:text-accent"
          dangerouslySetInnerHTML={{ __html: FOOTER_TEXT }}
        />
        <nav aria-label="Footer" className="flex gap-4">
          <a href={withBase("")} className="no-underline hover:text-ink">
            Principles
          </a>
          <a href={withBase("craft/")} className="no-underline hover:text-ink">
            Craft
          </a>
          <a href={withBase("about.html")} className="no-underline hover:text-ink">
            About
          </a>
        </nav>
      </div>
    </footer>
  );
}
