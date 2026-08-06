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
  definition: html("Performance is how fast a page becomes usable to a real person — not just how fast the files finish downloading, but how fast something readable appears and stops moving around once it does."),
  whyItMatters: [
    html("Picture someone checking a restaurant's menu on their phone on the subway, signal flickering between one bar and none. The page renders its text first — hours, a phone number, today's specials — and they start reading. Then the hero photo above the specials finishes downloading, and the whole page lurches down half a screen right as they go to tap \"Call to reserve.\" Their thumb lands three lines lower, on \"View full menu\" instead. Nothing crashed and nothing errored — the connection was just slow, and the layout wasn't built to survive that."),
    html("That lurch is called <strong>layout shift</strong> — content moving after it's already visible — and it's one reason a page that finishes loading quickly can still feel broken. More than half of mobile visitors abandon a page that takes longer than three seconds to load, and a page that keeps rearranging itself makes that worse even when it's technically fast: the reader never gets a moment where the page holds still long enough to trust that a tap will land where they expect. Performance gets filed under \"backend\" or \"infrastructure\" on a lot of teams, but both failures above — a paragraph left blank while a font downloads, an image with no reserved height — are layout decisions made in HTML and CSS, not server code."),
    html("The people who feel this hardest aren't a small slice of any audience either: a mid-range Android phone, a rural broadband connection, a metered data plan, an older laptop that takes longer to decode a bloated image — these are ordinary, common conditions, not edge cases, and none of them show up if the only person who ever opens the page is a designer on office wifi with a new phone. Performance is inclusive design measured in milliseconds instead of contrast ratios: the underlying question is the same one — does this work for the person who isn't using your setup?"),
  ],
  coreRule: [
    html("Optimize for how fast the page feels stable and usable, not just for how fast its files finish downloading. A page that shows real, readable content immediately — even while non-critical parts are still loading — and then holds still once it does, feels faster than one that stays blank until absolutely everything has arrived, even when the second page technically finishes sooner. Speed measured in kilobytes is not the same thing as speed a person can feel."),
  ],
  examples: [
    {
      context: "A product photo with no reserved dimensions",
      good: {
        label: "Good — height reserved before the file loads",
        code: "<img\n  src=\"sneaker.webp\"\n  width=\"800\"\n  height=\"800\"\n  alt=\"White leather sneaker, side profile\"\n>",
        note: html("The <code>width</code>/<code>height</code> pair tells the browser the image's shape before a single byte of the file arrives, so it reserves an 800×800 box immediately. The price and \"Add to cart\" button beneath it never move once the photo finishes loading."),
      },
      bad: {
        label: "Bad — the box collapses to 0px until it loads",
        code: "<img\n  src=\"sneaker.png\"\n  alt=\"White leather sneaker, side profile\"\n>",
        note: html("With no dimensions and no CSS <code>aspect-ratio</code>, the browser has nothing to reserve space with, so the image starts at zero height. Everything below it — including whatever someone was about to tap — jumps downward the instant the file finishes."),
      },
    },
    {
      context: "A custom web font on a slow connection",
      good: {
        label: "Good — text is visible immediately",
        code: "@font-face {\n  font-family: \"Inter\";\n  src: url(\"inter.woff2\") format(\"woff2\");\n  font-display: swap;\n}",
        note: html("<code>font-display: swap</code> tells the browser to paint the paragraph in a system fallback font right away and swap in Inter the moment it finishes downloading. The reader is reading real words within milliseconds, not staring at a blank paragraph."),
      },
      bad: {
        label: "Bad — text is invisible for up to 3 seconds",
        code: "@font-face {\n  font-family: \"Inter\";\n  src: url(\"inter.woff2\") format(\"woff2\");\n  /* no font-display set */\n}",
        note: html("Left at its default, most browsers hide text for up to three seconds waiting on the custom font — a \"flash of invisible text\" — before giving up and showing a fallback. On a slow connection, that's several seconds of a page that looks blank even though the words were ready to show the whole time."),
      },
    },
    {
      context: "Below-the-fold thumbnails on a product page",
      good: {
        label: "Good — only what's on screen loads first",
        code: "<img src=\"hero-banner.webp\" width=\"1600\" height=\"500\"\n     alt=\"Summer sale, up to 40% off\">\n\n<img src=\"thumbnail-01.webp\" width=\"300\" height=\"300\"\n     loading=\"lazy\" alt=\"Blue cotton shirt\">\n<!-- 36 more thumbnails, same pattern -->",
        note: html("\"Below the fold\" means not visible without scrolling — a term carried over from a folded newspaper's front page. The hero banner is the first thing visible, so it loads eagerly. The 37 thumbnails further down the page carry <code>loading=\"lazy\"</code>, so the browser holds off requesting them until someone actually scrolls close — full bandwidth stays available for the banner they can already see."),
      },
      bad: {
        label: "Bad — 38 images compete for the same connection",
        code: "<img src=\"hero-banner.webp\" width=\"1600\" height=\"500\"\n     alt=\"Summer sale, up to 40% off\">\n\n<img src=\"thumbnail-01.webp\" width=\"300\" height=\"300\"\n     alt=\"Blue cotton shirt\">\n<!-- 36 more thumbnails, same pattern -->",
        note: html("Every thumbnail on the page — including the ones two thousand pixels below the fold — starts downloading immediately alongside the hero banner. The banner, which is the largest thing visible on load, now has to share the connection with three dozen images nobody has scrolled to yet."),
      },
    },
    {
      context: "One photo, served to every screen size",
      good: {
        label: "Good — each screen downloads only what it needs",
        code: "<img\n  src=\"team-photo-800.webp\"\n  srcset=\"team-photo-400.webp 400w,\n          team-photo-800.webp 800w,\n          team-photo-1600.webp 1600w\"\n  sizes=\"(min-width: 1000px) 800px, 100vw\"\n  width=\"800\" height=\"533\"\n  alt=\"The five-person design team around a table\"\n>",
        note: html("<code>srcset</code> gives the browser a menu of files at different widths and <code>sizes</code> tells it how the image will actually be displayed at each screen size, so a phone downloads the 400w file and a laptop the 800w one — nobody downloads more pixels than their screen can show."),
      },
      bad: {
        label: "Bad — every screen downloads the same 1600px file",
        code: "<img\n  src=\"team-photo-1600.webp\"\n  width=\"800\" height=\"533\"\n  alt=\"The five-person design team around a table\"\n>",
        note: html("A phone with a 400px-wide screen downloads the exact file a 27-inch monitor would need, decodes four times more pixel data than it will ever display, and spends that time and battery not loading anything else on the page."),
      },
    },
  ],
  mistakes: [
    { name: "Images with no reserved dimensions", body: html("Without a <code>width</code>/<code>height</code> attribute or a CSS <code>aspect-ratio</code>, an image has zero height until the file arrives, so everything below it shifts down the instant it loads. This is the single most common cause of a page that \"jumps\" while someone is reading it — see the product-photo example above.") },
    { name: "Custom fonts with no font-display strategy", body: html("Left at the browser default, a custom font can hide real, already-written text for up to three seconds while it downloads. <code>font-display: swap</code> shows a fallback font immediately and swaps in the custom one when it's ready, so the page is never sitting there with nothing visible to read.") },
    { name: "Serving one image size to every screen", body: html("A single 1600px-wide file shipped to a 375px-wide phone forces that phone to download and decode roughly 18 times more pixel data than it will ever render — the file is over four times wider, and pixel count grows with the square of that, not in step with it. <code>srcset</code> and <code>sizes</code> — or an image CDN (a content delivery network: a service that serves resized, optimized versions of an image from servers near the reader) that generates them automatically — let the browser choose the file that actually matches the screen.") },
    { name: "Letting decoration outrank content for load priority", body: html("An autoplaying background video, a heavy hero animation, and a handful of tracking scripts loading at once all compete for the same limited connection as the headline and the primary button — the two things someone actually opened the page for. Decide what has to appear first, and make everything else wait. A <code>&lt;script&gt;</code> tag with neither <code>async</code> nor <code>defer</code> makes this worse by blocking HTML parsing outright until it finishes downloading and running; <code>defer</code> (runs after parsing completes, in document order) or <code>async</code> (runs the moment it arrives, whenever that is) let the browser keep parsing the rest of the page instead of stalling on it.") },
    { name: "Treating performance as a backend-only concern", body: html("Server response time is one input among several. Unsized images, invisible-until-loaded fonts, and unlazied offscreen content are frontend layout decisions, and they're just as responsible for a slow-feeling page — no amount of server tuning fixes a page that visibly jumps around after it arrives.") },
    { name: "Testing only on office wifi and a new phone", body: html("A page that feels instant on a fast connection and a current-year flagship can be genuinely hard to use on the mid-range phones and patchy mobile networks a large share of real visitors are actually on. Throttle the network and CPU in dev tools, or test on an actual low-end device, before calling a page fast.") },
  ],
  checklist: [
    html("Every image has explicit <code>width</code>/<code>height</code> attributes or a CSS <code>aspect-ratio</code>, so its space is reserved before the file loads."),
    html("Below-the-fold images and iframes use <code>loading=\"lazy\"</code>; above-the-fold images don't, so the first thing visible loads immediately."),
    html("Custom fonts use <code>font-display: swap</code>, so text is never invisible while a font downloads — a fallback font shows immediately and swaps in the custom one once it's ready. <code>&lt;link rel=\"preload\" as=\"font\"&gt;</code> is a separate, additional optimization on top of that: it tells the browser to fetch a critical font immediately instead of waiting to discover it later in the page, so the swap happens sooner, but preloading alone doesn't change whether text is visible while it waits — that's <code>font-display</code>'s job."),
    html("Images are served at multiple sizes via <code>srcset</code>/<code>sizes</code> or an image CDN, not shipped at one fixed resolution for every screen."),
    html("Nothing decorative — autoplaying video, a hero animation, tracking scripts — outranks the page's actual headline and primary action for load priority."),
    html("Performance was checked on a throttled connection and a mid-range device, not only on office wifi and the newest phone."),
    html("Critical cross-origin resources — a font host, an image CDN — get a <code>&lt;link rel=\"preconnect\"&gt;</code>, so the browser opens that connection before it actually needs to fetch anything from it. For a font host specifically, that tag needs a <code>crossorigin</code> attribute too, since fonts are always fetched in CORS mode (Cross-Origin Resource Sharing — the browser's rule for how a page is allowed to request resources from a different domain) — without it, the browser only does the DNS lookup and skips the rest of the handshake, and the preconnect ends up not helping the actual font request at all."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Core Web Vitals", body: html("Google's three headline metrics turn the ideas above into precise, testable numbers. Largest Contentful Paint (how fast the biggest visible element appears) is \"good\" at 2.5 seconds or less, \"poor\" past 4. Cumulative Layout Shift (how much content moves unexpectedly) is \"good\" at a score of 0.1 or less, \"poor\" past 0.25. Interaction to Next Paint (how fast the page visibly responds after a click or tap) is \"good\" at 200 milliseconds or less, \"poor\" past 500 — Google set that boundary from real-world Chrome usage data on what's actually achievable, not an arbitrary round number, though it also happens to land close to the <strong>Doherty Threshold</strong>, a 1982 finding that a system responding in under roughly 400 milliseconds keeps a person's attention and sense of flow, while anything slower lets it drift. Google scores a page at the 75th percentile of real visits, meaning three out of four real page loads need to land in \"good\" — not just your fastest test run. Interaction to Next Paint replaced an older metric called First Input Delay as the third Core Web Vital in 2024, because First Input Delay only measured a page's very first interaction, not the ones later in a session that actually cause frustration.") },
    { lead: "Modern image formats", body: html("WebP and AVIF produce meaningfully smaller files than JPEG or PNG at equivalent visual quality, with AVIF generally compressing further than WebP on photographic images at the cost of slower encoding. Pairing either with <code>&lt;picture&gt;</code>, or with <code>srcset</code> and <code>sizes</code> on a plain <code>&lt;img&gt;</code>, lets the browser pick the smallest file that still looks right at the reader's actual screen size, rather than forcing you to pick one format and one resolution for every visitor.") },
    { lead: "Perceived vs. actual performance", body: html("A skeleton loading state — a gray placeholder shaped like the content that's coming — can make a page feel faster than an identical page left blank for the same duration, because it gives the reader a signal that something is happening and roughly what shape to expect. The related CSS property <code>content-visibility: auto</code> goes a step further for long pages, telling the browser to skip rendering work for sections far off-screen until the reader actually scrolls near them.") },
  ],
  datePublished: "2026-07-23",
};
