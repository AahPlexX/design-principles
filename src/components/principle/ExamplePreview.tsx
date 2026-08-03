import { cn } from "@/lib/utils";

interface ExamplePreviewProps {
  readonly html: string;
  readonly title: string;
  readonly className?: string;
}

/**
 * A live-rendered demonstration of an example side, sandboxed in its own document.
 *
 * `srcDoc` is a self-contained HTML document the content module wrote — full `<style>`, real demo
 * markup — not a fragment sharing the page's own CSS. That keeps a "bad" example's deliberately poor
 * styling (cramped line-height, oversized line length) from ever touching the site's own stylesheet.
 *
 * `sandbox=""` (present, empty) is the strictest sandbox setting: no scripts, no same-origin access, no
 * forms, no top-level navigation. The demo documents this renders are static markup and CSS only, so
 * every one of those restrictions costs nothing and the setting still holds even if a future preview is
 * written carelessly.
 *
 * jsdom, which `gate:a11y` runs axe-core inside, does not execute `srcdoc` as a nested browsing
 * context — so a "bad" example's intentionally poor contrast or tiny text inside this iframe is never
 * seen by that gate, exactly as intended: the violation being demonstrated is the lesson, not a defect
 * in this page.
 */
export function ExamplePreview({ html, title, className }: ExamplePreviewProps) {
  return (
    <iframe
      srcDoc={html}
      title={title}
      sandbox=""
      className={cn("h-48 w-full rounded-md border border-line bg-white print:hidden", className)}
    />
  );
}
