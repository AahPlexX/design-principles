import type { Principle } from "@/content/types";

export function PrinciplePage({ principle }: { readonly principle: Principle }) {
  return <h1>{principle.title}</h1>;
}
