import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class lists, letting a caller's utility win over a component's default for the same property. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
