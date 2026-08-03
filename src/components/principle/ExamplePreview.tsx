import type { ExampleSide } from "@/content/types";
import { cn } from "@/lib/utils";

/** Maps a content-authored size token to a fixed height, since nothing here can measure content at runtime. */
const HEIGHT: Record<NonNullable<ExampleSide["previewSize"]>, string> = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

interface ExamplePreviewProps {
  readonly html: string;
  readonly title: string;
  readonly size?: ExampleSide["previewSize"];
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
 *
 * `loading="lazy"` is not an option here and was tried and removed: the W3C Nu checker rejects it on an
 * `<iframe>` with no `src` — there's nothing to defer-fetch when the document is already inline as
 * `srcdoc`. `content-visibility: auto` is the spec-valid equivalent for this case: the browser skips
 * layout and paint work for an off-screen preview until the reader scrolls near it, with no fetch to
 * defer and nothing for a validator to object to.
 */
export function ExamplePreview({ html, title, size = "md", className }: ExamplePreviewProps) {
  return (
    <iframe
      srcDoc={html}
      title={title}
      sandbox=""
      className={cn(
        HEIGHT[size],
        "w-full rounded-md border border-line bg-white [content-visibility:auto] print:hidden",
        className,
      )}
    />
  );
}
