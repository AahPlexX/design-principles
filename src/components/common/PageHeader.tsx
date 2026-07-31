import type { ReactNode } from "react";

import type { HtmlString } from "@/content/types";
import { cn } from "@/lib/utils";

import { ContentHtml } from "./ContentHtml";

interface PageHeaderProps {
  readonly title: string;
  /** The one-sentence plain-English definition that opens every page. */
  readonly definition: HtmlString;
  /** Breadcrumb or back-link, above the heading. */
  readonly eyebrow?: ReactNode;
  /** Supporting paragraph below the definition. */
  readonly intro?: HtmlString | undefined;
  readonly className?: string;
}

/**
 * The opening of every page: optional breadcrumb, the heading, and the definition.
 *
 * The definition is set larger than body text and in a lighter weight. It is the one sentence a reader
 * who bounces will read, so it gets the typographic prominence rather than being another paragraph.
 */
export function PageHeader({ title, definition, eyebrow, intro, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-10", className)}>
      {eyebrow}
      <h1 className="mt-2 text-step-3 font-semibold tracking-tight">{title}</h1>
      <ContentHtml
        html={definition}
        className="mt-4 max-w-(--container-prose) text-step-1 leading-relaxed font-normal text-ink-muted"
      />
      {intro ? (
        <ContentHtml html={intro} className="mt-4 max-w-(--container-prose) text-ink-muted" />
      ) : null}
    </header>
  );
}
