import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * A card that is entirely a link.
 *
 * The whole card is the anchor rather than only its heading, because a card that looks clickable but
 * only responds on its title is a target-size failure — and the site's own responsive-design pages say
 * so. `print-flat` strips the tint and shadow when printed.
 */
export function CardLink({ className, children, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group relative flex flex-col gap-1.5 rounded-lg border border-line bg-surface-raised p-4 no-underline shadow-raised transition-[color,background-color,border-color,box-shadow,transform] hover:border-accent/50 hover:shadow-lifted motion-safe:hover:-translate-y-0.5",
        "print-flat",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function CardTitle({ className, children, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-[1.0625rem] leading-snug font-semibold text-ink transition-colors group-hover:text-accent",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardBody({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm leading-relaxed text-ink-muted", className)} {...props} />;
}

export function CardMeta({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-auto pt-2 text-xs text-ink-subtle", className)} {...props} />;
}

/** A non-interactive panel, for content that is grouped but not navigable. */
export function Panel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-line bg-surface p-5", "print-flat", className)}
      {...props}
    />
  );
}
