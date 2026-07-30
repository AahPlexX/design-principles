/**
 * Expands every collapsed section before printing, and restores it afterwards.
 *
 * A port of `docs/assets/print-details.js`. Printing a page whose "Go deeper" section is collapsed
 * silently drops that content from the paper, which is the kind of quiet failure the reader only
 * discovers after the fact.
 *
 * This is also why the collapsibles are native `<details>` rather than a JavaScript disclosure
 * component: `<details open>` is the only form CSS and the print pipeline both understand, so the page
 * still prints completely if this script never runs.
 */
export function enhancePrint(): void {
  let restore: { element: HTMLDetailsElement; wasOpen: boolean }[] = [];

  window.addEventListener("beforeprint", () => {
    restore = [...document.querySelectorAll<HTMLDetailsElement>("details")].map((element) => ({
      element,
      wasOpen: element.open,
    }));
    for (const { element } of restore) element.open = true;
  });

  window.addEventListener("afterprint", () => {
    // Restoring from a captured list rather than by index, so a DOM change between the two events
    // cannot mismatch elements and leave the page in a state the reader did not choose.
    for (const { element, wasOpen } of restore) element.open = wasOpen;
    restore = [];
  });
}
