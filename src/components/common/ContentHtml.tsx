import type { ElementType } from "react";

import type { HtmlString } from "@/content/types";
import { cn } from "@/lib/utils";

interface ContentHtmlProps {
  readonly html: HtmlString;
  readonly as?: ElementType;
  readonly className?: string;
}

/**
 * Renders a content fragment's inline markup.
 *
 * The single place `dangerouslySetInnerHTML` is used for content. Values are `HtmlString`, which is a
 * branded type only `html()` can produce, and `html()` rejects anything outside a fixed inline tag
 * set — so a call site cannot pass an arbitrary string here, and the allowed markup is enforced in one
 * place rather than trusted per component.
 *
 * The link styling lives here because these fragments contain anchors that no parent selector would
 * otherwise reach.
 */
export function ContentHtml({ html, as: Tag = "p", className }: ContentHtmlProps) {
  return (
    <Tag
      className={cn(
        "[&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 [&_a]:hover:decoration-accent",
        "[&_code]:rounded [&_code]:border [&_code]:border-line [&_code]:bg-surface [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.875em]",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
