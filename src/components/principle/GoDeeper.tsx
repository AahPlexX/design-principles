import { ContentHtml } from "@/components/common/ContentHtml";
import { Disclosure } from "@/components/common/Disclosure";
import type { DeepDive } from "@/content/types";

interface GoDeeperProps {
  readonly entries: readonly DeepDive[];
}

/**
 * Expert nuance, collapsed, at the end of the same page.
 *
 * Built on `Disclosure`, which is native `<details>` — see its own comment for the three reasons that
 * matters here: it opens without JavaScript, the print enhancer can expand it before printing, and
 * in-page find can search inside it while it is closed.
 *
 * Each entry is a bolded lead-in followed by its paragraph, which is the shape the pre-migration pages
 * used. The lead is stored without trailing punctuation, so the separating colon is added here — the only
 * character this template contributes to the sentence.
 */
export function GoDeeper({ entries }: GoDeeperProps) {
  return (
    <Disclosure summary="Go deeper">
      {entries.map((entry) => (
        <p key={entry.lead} className="text-ink-muted">
          <strong className="font-semibold text-ink">{entry.lead}:</strong>{" "}
          <ContentHtml as="span" html={entry.body} />
        </p>
      ))}
    </Disclosure>
  );
}
