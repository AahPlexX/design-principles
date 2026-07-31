interface Crumb {
  readonly label: string;
  readonly href: string;
}

interface BreadcrumbProps {
  readonly items: readonly Crumb[];
  /**
   * The page the reader is already on.
   *
   * Rendered as text carrying `aria-current="page"` rather than as a link to itself. A self-link is
   * the conventional shortcut here and it is worse twice over: it gives a keyboard user a focus stop
   * that does nothing, and it makes the orphan half of `gate:links` pass for free, since every page
   * would then link to itself no matter how broken its real navigation was.
   */
  readonly current?: string;
}

/**
 * Trail back up the hierarchy.
 *
 * A real `<nav>` with an ordered list, because the order carries the meaning — this is a hierarchy, not
 * a set of links. The separators are decorative and `aria-hidden`, so a screen reader reads
 * "Craft, Contrast You Can Prove" rather than "Craft slash Contrast You Can Prove".
 *
 * The original pages used a bare "← Course name" paragraph, which told a reader one level up and
 * nothing about where that sat.
 */
export function Breadcrumb({ items, current }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="print:hidden">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 ? <Separator /> : null}
            <a href={item.href} className="no-underline transition-colors hover:text-ink">
              {item.label}
            </a>
          </li>
        ))}

        {current === undefined ? null : (
          <li className="flex items-center gap-1.5">
            {items.length > 0 ? <Separator /> : null}
            <span aria-current="page" className="text-ink-muted">
              {current}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}

function Separator() {
  return (
    <span aria-hidden="true" className="text-line-strong select-none">
      /
    </span>
  );
}
