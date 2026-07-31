import { ContentHtml } from "@/components/common/ContentHtml";
import { Panel } from "@/components/ui/card";
import type { HtmlString } from "@/content/types";
import { cn } from "@/lib/utils";

interface CoreRuleProps {
  readonly paragraphs: readonly HtmlString[];
}

/**
 * The one thing to remember from the page, set apart from the prose around it.
 *
 * On the pre-migration pages this was an ordinary paragraph under an ordinary heading, which made the
 * single most quotable sentence on the page look exactly like the four paragraphs of context beside it.
 * It gets a tinted panel, a heavier border and a step up in type size here — deliberately a different
 * treatment from `Callout`, which is used further down for the practice link, so the two do not read as
 * the same kind of aside.
 *
 * The tint is the full `accent-soft` token rather than a translucent tint of it, because that exact
 * foreground/background pair is one of the combinations `gate:contrast` measures in both themes.
 */
export function CoreRule({ paragraphs }: CoreRuleProps) {
  return (
    <Panel className="border-2 border-accent/40 bg-accent-soft p-5 sm:p-6">
      {paragraphs.map((paragraph, index) => (
        <ContentHtml
          key={paragraph}
          html={paragraph}
          className={cn("text-step-1 leading-relaxed text-ink", index > 0 && "mt-3")}
        />
      ))}
    </Panel>
  );
}
