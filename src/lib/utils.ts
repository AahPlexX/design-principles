import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `twMerge`, taught about this project's custom scales.
 *
 * tailwind-merge resolves conflicts by knowing which utilities belong to the same group, and it only
 * knows the default scales. The fluid type scale here is named `text-step-0` … `text-step-4`, which
 * tailwind-merge guessed was a *colour* — so `cn("text-step-1", "text-ink-muted")` silently dropped the
 * size and every principle page's definition rendered at body size instead of one step up.
 *
 * That class of bug is invisible in review: the class is present in the source, absent from the output.
 * Declaring the group is what makes the merge correct rather than plausible.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["step--1", "step-0", "step-1", "step-2", "step-3", "step-4"] }],
    },
  },
});

/** Merges class lists, letting a caller's utility win over a component's default for the same property. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
