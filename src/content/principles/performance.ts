// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const performance: Principle = {
  slug: "performance",
  title: "Performance",
  category: "Inclusive by Default",
  blurb: "How fast a page feels to use, and the handful of design decisions that control it.",
  searchKeywords: "performance how fast a page feels to use and the handful of design decisions that control it",
  definition: html("Performance is how fast a page becomes usable to a real person — not just how fast the files finish downloading, but how fast something useful appears and stops moving around once it does."),
  whyItMatters: [
    html("Most people give up on a slow page within a few seconds, and mobile networks make \"slow\" the default unless you design against it. Performance problems aren't only about raw speed either: a page that loads fast but keeps shifting content around as images and ads pop in (a large, sudden jump right as someone goes to tap something) causes mis-taps and feels worse than a page that was honest about taking a moment to load."),
  ],
  coreRule: [
    html("Optimize for how fast the page feels stable and useful, not just for total file size. A page that shows real, readable content immediately — even while some non-critical parts are still loading — feels faster than one that stays blank until everything is ready, even if the second one technically finishes sooner."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<img src=\"hero.webp\" width=\"1200\"\n     height=\"600\" alt=\"...\">\n<img src=\"chart.webp\" loading=\"lazy\"\n     width=\"800\" height=\"400\" alt=\"...\">",
      note: html("Explicit width and height reserve the image's space before it loads, so nothing jumps when it appears, and the below-fold image is lazy-loaded so it doesn't compete with content the reader sees first."),
    },
    bad: {
      label: "Bad",
      code: "<img src=\"hero.png\" alt=\"...\">\n<img src=\"chart.png\" alt=\"...\">",
      note: html("No dimensions means the browser doesn't know how much space to reserve, so the layout jumps as each image loads in — and both images load immediately whether or not they're visible yet."),
    },
  },
  mistakes: [
    { name: "Images with no reserved dimensions", body: html("Without a <code>width</code>/ <code>height</code> or <code>aspect-ratio</code>, the browser collapses the space until the image loads, then shoves everything below it down — this is what causes the \"page jumped right as I was about to tap\" experience.") },
    { name: "Web fonts that block text from appearing", body: html("By default, a browser may hide text entirely until a custom font finishes loading. Setting <code>font-display: swap</code> shows a fallback font immediately and swaps in the custom one when it's ready, instead of showing nothing.") },
    { name: "Loading every image at full resolution immediately", body: html("A phone doesn't need a 4000px-wide image; serving one wastes bandwidth and delays everything else on the page that's actually competing for that same connection.") },
    { name: "Everything above the fold competing for load priority", body: html("An autoplaying background video behind a headline delays the text and the primary action button from becoming usable, for a decorative element that isn't the reason anyone came to the page.") },
    { name: "Treating performance as a backend-only concern", body: html("Layout decisions — unsized images, render-blocking fonts, heavy above-the-fold media — are just as responsible for a slow-feeling page as server response time.") },
  ],
  checklist: [
    html("Every image has explicit dimensions or an <code>aspect-ratio</code>, so nothing shifts on load."),
    html("Below-the-fold images use <code>loading=\"lazy\"</code>."),
    html("Custom fonts use <code>font-display: swap</code> (or an equivalent) instead of hiding text."),
    html("Images are compressed and sized appropriately for where they're displayed, not shipped at source resolution."),
    html("Nothing above the fold competes with the page's actual primary content for load priority."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Core Web Vitals", body: html("Google's three headline performance metrics map directly to the ideas above — Largest Contentful Paint (how fast the biggest visible element appears), Cumulative Layout Shift (how much content jumps around unexpectedly), and Interaction to Next Paint (how fast the page responds once someone actually clicks or taps something).") },
    { lead: "Modern image formats", body: html("WebP and AVIF produce meaningfully smaller files than JPEG or PNG at equivalent visual quality; pairing them with <code>&lt;picture&gt;</code> and <code>srcset</code> lets the browser pick the smallest file that still looks right at the reader's actual screen size.") },
    { lead: "Perceived vs. actual performance", body: html("a skeleton loading state (a gray placeholder shaped like the content that's coming) can make a page feel faster than an identical page with a blank white screen for the same duration, because it gives the reader a signal that something is happening and roughly what shape to expect.") },
  ],
  datePublished: "2026-07-23",
};
