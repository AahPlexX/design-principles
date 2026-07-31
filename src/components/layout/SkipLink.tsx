/**
 * The first focusable thing on every page.
 *
 * Positioned off-screen rather than hidden with `display: none`, because a hidden element is not
 * focusable and the link would be useless to the keyboard users it exists for.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute start-2 top-2 z-50 -translate-y-[200%] rounded-md bg-accent px-4 py-2 font-medium text-accent-contrast no-underline transition-transform focus-visible:translate-y-0 focus-visible:ring-accent print:hidden"
    >
      Skip to content
    </a>
  );
}
