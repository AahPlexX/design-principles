import { Check, X } from "lucide-react";

import { CodeBlock } from "@/components/common/CodeBlock";
import { ContentHtml } from "@/components/common/ContentHtml";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import type { ExampleSide } from "@/content/types";
import { cn } from "@/lib/utils";

interface ExamplePairProps {
  readonly good: ExampleSide;
  readonly bad: ExampleSide;
}

/**
 * The good/bad comparison, side by side where there is room and stacked where there is not.
 *
 * Two columns from `sm` up, one below it — a code sample squeezed into half of a phone's width wraps
 * into noise, and the comparison survives being read one after the other.
 */
export function ExamplePair({ good, bad }: ExamplePairProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Example side={good} verdict="good" />
      <Example side={bad} verdict="bad" />
    </div>
  );
}

interface ExampleProps {
  readonly side: ExampleSide;
  readonly verdict: "good" | "bad";
}

/**
 * One side of the comparison.
 *
 * The verdict is carried three ways: the label text already reads "Good"/"Bad", a tick or cross sits
 * beside it, and the panel is tinted. Colour is the last of the three on purpose — this is the page that
 * tells readers not to let colour carry meaning on its own, and the tint disappears entirely when the
 * page is printed, where `print-flat` flattens every panel to black on white.
 *
 * The label is a real `<h3>` rather than styled text so the two sides show up when a screen-reader user
 * navigates the page by heading, which is how "Good — 7.7:1" and "Bad — 2.4:1" become the summary of the
 * section rather than decoration inside it.
 */
function Example({ side, verdict }: ExampleProps) {
  const Icon = verdict === "good" ? Check : X;

  return (
    <Panel
      className={cn(
        "flex flex-col gap-3 p-4",
        verdict === "good" ? "border-good-line bg-good-soft" : "border-bad-line bg-bad-soft",
      )}
    >
      <h3>
        <Badge variant={verdict}>
          <Icon aria-hidden="true" className="size-3.5" />
          {side.label}
        </Badge>
      </h3>
      <CodeBlock code={side.code} className="bg-canvas" />
      <ContentHtml html={side.note} className="text-sm leading-relaxed text-ink" />
    </Panel>
  );
}
