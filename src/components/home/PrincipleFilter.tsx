import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * The id the field has had since the first version of this page.
 *
 * The header's search affordance is a link to `#principle-search` before JavaScript upgrades it into the
 * command palette trigger, so this is the fallback destination for search on every one of the 173 pages.
 * Renaming it would break that link, and it is also what the 404 page points readers at.
 */
export const SEARCH_INPUT_ID = "principle-search";

const HINT_ID = "principle-search-hint";

/**
 * The home page's filter box.
 *
 * This renders the markup `enhanceSearch` attaches to, and the attribute names are the contract between
 * the two: `[data-search-input]` is the field, `[data-search-clear]` the reset, `[data-search-status]`
 * the live region the match count is written into. The cards and their group sections carry the other
 * half of it — see `PrincipleCard` and `PrincipleGroupSection`.
 *
 * Three things the pre-migration box did not have:
 *
 *  - a result count that is announced. The old box filtered silently, so a screen reader user typing into
 *    it got no indication that anything had happened, or how much was left.
 *  - a clear button. Emptying the field by hand is more work than it needs to be, and Escape is not
 *    discoverable. It ships `hidden` and the enhancer reveals it once there is something to clear, so it
 *    never appears as a control that does nothing.
 *  - a real hint about what is matched. The field searches a keyword blob, not only the visible titles,
 *    which is how "i18n" finds Internationalization & Localization — worth saying, since nothing on
 *    screen suggests it.
 *
 * Without JavaScript the field does nothing, which is what the original did too. What it must not do is
 * look broken: it is a labelled, focusable `type="search"` input either way, and the two controls that
 * only make sense once filtering works — the clear button and the status line — start out empty or
 * hidden rather than inert.
 *
 * The label is visible. A placeholder is not a label: it disappears the moment someone types, it is not
 * reliably announced, and its contrast is deliberately low. The placeholder is kept as an example of what
 * to type, which is the one thing it is good for.
 */
export function PrincipleFilter() {
  return (
    /*
     * Out of the print output, along with the header's search box and the theme toggle. A filter field on
     * paper is a control a reader cannot use, and the printed page already lists everything it filters.
     */
    <div role="search" className="rounded-lg border border-line bg-surface p-4 sm:p-5 print:hidden">
      <label htmlFor={SEARCH_INPUT_ID} className="block font-medium text-ink">
        Filter principles
      </label>
      <p id={HINT_ID} className="mt-1 text-step--1 text-ink-muted">
        Matches titles and the terms each page covers — try “contrast”, “keyboard”, or “i18n”.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3 size-4 text-ink-subtle"
          />
          <input
            type="search"
            id={SEARCH_INPUT_ID}
            data-search-input
            aria-describedby={HINT_ID}
            autoComplete="off"
            placeholder="e.g. contrast, forms, icons"
            className="w-full min-w-0 rounded-md border border-line-strong bg-canvas py-2 ps-9 pe-3 text-ink transition-colors placeholder:text-ink-subtle hover:border-accent/60"
          />
        </div>

        <Button data-search-clear hidden variant="outline">
          Clear
        </Button>
      </div>

      {/*
       * The count. A live region so it is announced as the reader types, and empty in the served HTML
       * because no filter has been applied yet — the enhancer writes and clears it. `min-h-6` holds its
       * line so the cards below do not jump when the first result count arrives.
       */}
      <p
        data-search-status
        role="status"
        aria-live="polite"
        className="mt-2 min-h-6 text-step--1 text-ink-muted"
      />
    </div>
  );
}
