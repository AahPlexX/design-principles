import { cn } from "@/lib/utils";

interface CodeBlockProps {
  readonly code: string;
  readonly className?: string;
}

/**
 * A preformatted code sample.
 *
 * `tabIndex={0}` on the scroll container is deliberate: a `<pre>` that scrolls horizontally is
 * unreachable by keyboard unless it is focusable, which is a WCAG 2.1.1 failure. The samples here are
 * short, so this rarely engages — but "rarely" is not "never", and the fix costs one attribute.
 *
 * Not syntax-highlighted. Highlighting would mean shipping a tokeniser and colour scheme that would
 * itself need contrast-checking, to decorate samples that are two or three lines of CSS.
 */
export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <pre
      /*
       * A horizontally scrolling region has to be reachable by keyboard or its overflowed content is
       * unreachable without a mouse (WCAG 2.1.1). The rule flags tabIndex on non-interactive elements,
       * which is the right default and the wrong call for a scroll container.
       */
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={cn(
        "overflow-x-auto rounded-md border border-line bg-surface p-3 text-[0.8125rem] leading-relaxed text-ink",
        "print-flat",
        className,
      )}
    >
      <code>{code}</code>
    </pre>
  );
}
