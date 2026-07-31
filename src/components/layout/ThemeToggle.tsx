import { Moon, Sun } from "lucide-react";

/**
 * Theme switch.
 *
 * Server-rendered with the *light* labelling, then corrected by the theme enhancer on load. That
 * ordering matters: the prerendered HTML is a single static file served to everyone, so it cannot know
 * which theme a given reader has stored. The inline script in `<head>` sets `data-theme` before first
 * paint so there is no visual flash, and the enhancer fixes `aria-label` and `aria-pressed` as soon
 * as it runs.
 *
 * Both icons are rendered and swapped with CSS rather than by JavaScript, so the correct one is
 * showing on the very first frame.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      id="theme-toggle"
      data-enhance="theme-toggle"
      aria-label="Switch to dark theme"
      aria-pressed="false"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink print:hidden"
    >
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
    </button>
  );
}
