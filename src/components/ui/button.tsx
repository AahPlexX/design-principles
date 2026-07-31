import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared button styling.
 *
 * Exposed as both `Button` and `ButtonLink` rather than a single polymorphic component with an `as`
 * prop. Navigation is an anchor and an action is a button — collapsing the two into one component is
 * how sites end up with `<div role="button">` navigation that a middle-click cannot open.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 no-underline",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
        outline: "border-line-strong text-ink hover:bg-surface border",
        ghost: "text-ink-muted hover:text-ink hover:bg-surface",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonStyleProps = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<"a"> & ButtonStyleProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
}

export { buttonVariants };
