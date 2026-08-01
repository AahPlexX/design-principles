// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const responsiveDesign: Principle = {
  slug: "responsive-design",
  title: "Responsive Design",
  category: "Inclusive by Default",
  blurb: "Making one layout hold up on a phone, a tablet, and a 32-inch monitor.",
  searchKeywords: "responsive design making one layout hold up on a phone a tablet and a 32-inch monitor",
  definition: html("Responsive design means one layout adapts to fit whatever screen it's shown on — a phone, a tablet, a laptop, a 32-inch monitor — rather than a separate design being built for each."),
  whyItMatters: [
    html("Picture a landing page approved in a design review on a 27-inch monitor: three product columns, generous white space, a hero image spanning the full width. It looks confident and finished. Open that same page on a phone and one of two things happens — the three columns cram themselves into slivers too narrow to read anything in, or the page keeps its full 1200-pixel layout and forces a visitor to scroll sideways just to read a headline. Nothing about the content changed. Only the number of pixels available to show it did, and the layout had no way to adjust."),
    html("That's not a narrow slice of visitors to design around. Mobile devices now account for roughly two-thirds of visits to the average website worldwide, a share that has kept climbing for years rather than leveling off — and that's before counting tablets, small laptops, foldables, and the ultra-wide monitors at the other end of the range. There is no single \"normal\" screen width left to design for. Screen width today is a continuous spectrum running from around 320px to well over 2560px, and a layout that only holds up at one point on that spectrum is wrong for most of it."),
    html("The cost shows up as lost business, not a support ticket. A checkout button that sits past the right edge of the screen because the layout didn't reflow doesn't get reported — the visitor just abandons the cart, assuming the site is broken or the store stopped bothering with mobile shoppers. Having to pinch-zoom just to read body text reads as neglect, even when the design underneath it was carefully made. A layout failure looks exactly like a code bug to the person hitting it, whether or not any code actually broke."),
  ],
  coreRule: [
    html("Design the layout to respond to the <em>content</em> running out of room within the <strong>viewport</strong> — the visible area of a page inside the browser window, which varies by device — not to a fixed list of device widths. A <strong>breakpoint</strong> — the point where a layout switches to a different arrangement — belongs wherever your specific content starts to look cramped or oddly sparse, not at a guessed number like \"iPhone width\" or \"iPad width.\" Reach for flexible units — percentages, <code>fr</code> (a CSS Grid unit meaning \"a fraction of the remaining space\"), <code>ch</code> (a CSS length equal to the width of the font's \"0\" character), <code>rem</code>, <code>clamp()</code> — and let CSS Grid or Flexbox reflow the content first; add a breakpoint only once flexible units alone can't hold the layout together anymore."),
  ],
  examples: [
    {
      context: "A card grid built for a fixed canvas",
      good: {
        label: "Good — no breakpoint needed",
        code: ".cards {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit, minmax(15rem, 1fr));\n  gap: 1rem;\n}",
        note: html("The grid fits as many 15rem-minimum columns as the available width allows — three on a wide monitor, one on a phone — without a single <code>@media</code> query."),
      },
      bad: {
        label: "Bad — correct at exactly one width",
        code: ".cards { width: 1200px; }\n.card { width: 380px; float: left; }",
        note: html("This layout is only right at exactly 1200px wide. Any narrower, the floated cards overflow their container and force horizontal scrolling — there's no rule telling them to rearrange."),
      },
    },
    {
      context: "A hero image inside a narrowing container",
      good: {
        label: "Good — image shrinks with its container",
        code: "img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}",
        note: html("The image can never render wider than whatever contains it, so it shrinks along with the viewport instead of pushing past its edge."),
      },
      bad: {
        label: "Bad — image holds its native width",
        code: "<img src=\"hero.jpg\" width=\"1600\" height=\"900\" alt=\"Team photo\">",
        note: html("With no CSS telling it otherwise, the image renders at its full 1600px source width even inside a 375px-wide phone screen, forcing the whole page to scroll sideways to see the rest of it."),
      },
    },
    {
      context: "A close button sized for a mouse cursor",
      good: {
        label: "Good — 44×44px tap target",
        code: ".close-button {\n  width: 44px;\n  height: 44px;\n  padding: 12px;\n}",
        note: html("Comfortably clears WCAG 2.2's actual 24×24px minimum (Success Criterion 2.5.8) with room to spare for an imprecise thumb, not just a precise mouse pointer."),
      },
      bad: {
        label: "Bad — 18×18px tap target",
        code: ".close-button {\n  width: 18px;\n  height: 18px;\n  padding: 0;\n}",
        note: html("Below WCAG's 24×24px floor outright — this is the exact icon-button size that's effortless to click with a cursor and genuinely hard to tap accurately with a finger."),
      },
    },
    {
      context: "A page missing the viewport meta tag",
      good: {
        label: "Good — renders at the phone's real width",
        code: "<meta name=\"viewport\"\n      content=\"width=device-width, initial-scale=1\">",
        note: html("Tells the phone's browser to lay the page out at its actual screen width, so the flexible CSS underneath it can take effect at all. Leave zoom itself alone — adding <code>user-scalable=no</code> or <code>maximum-scale=1</code> here blocks pinch-zoom outright and fails WCAG 1.4.4 (Resize Text), which requires that a reader can zoom to at least 200% without losing content or function."),
      },
      bad: {
        label: "Bad — no viewport tag at all",
        code: "<head>\n  <title>Example</title>\n  <!-- no viewport meta tag -->\n</head>",
        note: html("Without it, mobile browsers assume the page was built for a 980px-wide desktop layout, render it at that width, then zoom the whole thing out to fit the screen — flexible CSS included. Everything looks tiny, and the visitor has to pinch-zoom to read any of it."),
      },
    },
  ],
  mistakes: [
    { name: "Designing only for one width, then \"making it responsive\" afterward", body: html("Retrofitting flexibility onto a layout that was built fixed usually means patching each element as it breaks — one <code>@media</code> override at a time — instead of a layout that never assumed a fixed width to begin with. Starting fluid from the first line of CSS avoids most of that work entirely.") },
    { name: "Breakpoints chosen by device name instead of by content", body: html("\"iPhone, iPad, desktop\" was never a complete list, and screen widths have only gotten more continuous since — foldables, ultra-wide monitors, and every phone size between 320px and 480px all exist at once. Add a breakpoint at the exact width where your specific layout starts to look bad, not at a device name someone guessed.") },
    { name: "Text that doesn't reflow, only shrinks", body: html("Squeezing a fixed-width column onto a phone by shrinking the font size, rather than letting the column narrow and the text wrap onto more lines, trades one problem (too wide) for a worse one (too small to read comfortably).") },
    { name: "Touch targets sized for a mouse pointer", body: html("A link or icon button under WCAG 2.2's 24×24px minimum (Success Criterion 2.5.8) is hard to tap accurately with a finger, even though it's effortless to click with a precise mouse cursor. That's <strong>Fitts's Law</strong> at work: the time it takes to accurately tap or click a target is a function of the target's size and the distance to it, so a bigger target closer to where the pointer already is gets hit faster and more reliably, whether that pointer is a mouse or a fingertip. 44×44px — the higher, AAA-level target size (Success Criterion 2.5.5) — is a more comfortable size to design to; treat 24×24px as the legal floor, not the goal. (WCAG conformance runs in three increasingly strict tiers — A, AA, then AAA — and AA is the common baseline most accessibility laws and audits require; 24×24px is the AA number, 44×44px is the stricter AAA one.)") },
    { name: "Hiding content on mobile instead of re-prioritizing it", body: html("\"Just hide it below 600px\" often removes something a mobile visitor specifically needed — a phone number, an address, a price — rather than re-arranging the layout so it still fits. If it matters enough to show a desktop visitor, it needs a place in the phone layout too, even if that place is further down the page.") },
    { name: "Shipping the same image file to every screen", body: html("A 2000px-wide photo displayed at 400px on a phone still downloads at its full file size unless the markup says otherwise. It looks correct — the CSS scaled it down visually — while quietly costing a mobile visitor, often on a slower connection, several extra seconds of load time for pixels they never actually see. <code>srcset</code> and <code>sizes</code> let the browser choose a file sized for the screen it's rendering on, instead of the largest one on the server.") },
  ],
  checklist: [
    html("No horizontal scrolling at any viewport width, from a 320px phone up to a wide desktop monitor."),
    html("Containers use flexible units and CSS Grid/Flexbox wrapping, not fixed pixel widths."),
    html("Breakpoints sit where the specific layout breaks, not at guessed device widths."),
    html("Images and other media scale within their container (<code>max-width: 100%</code>) instead of overflowing it, and larger ones use <code>srcset</code>/<code>sizes</code> so phones aren't downloading desktop-sized files."),
    html("Text reflows into a narrower column instead of just shrinking in size."),
    html("Tap targets are at least 24×24px (WCAG 2.2's AA minimum), and ideally 44×44px for comfortable use."),
    html("The page includes <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code>."),
  ],
  practiceCourseId: "responsive-design",
  goDeeper: [
    { lead: "Container queries", body: html("Media queries respond to the browser viewport's size; container queries (<code>@container</code>) let a component respond to the size of its own containing element instead. That matters once the same component — a card, a sidebar widget — can appear in differently-sized contexts on the same page and needs to look right in both, without knowing in advance which one it's in.") },
    { lead: "Mobile-first CSS", body: html("Writing base styles for the smallest screen and layering on complexity with <code>min-width</code> media queries as space increases tends to produce simpler, more resilient CSS than starting from a desktop layout and subtracting for mobile with <code>max-width</code> queries — mobile-first CSS rarely has to un-set a rule it already wrote, since each query only adds.") },
    { lead: "clamp() for fluid values", body: html("<code>clamp(min, preferred, max)</code> lets a size — font size, padding, a heading's width — scale smoothly with the viewport between a floor and a ceiling, often calculated with a formula like <code>clamp(1rem, 0.5rem + 2vw, 2rem)</code>. It frequently removes the need for a breakpoint entirely for that one property, since the value adjusts continuously instead of jumping at a fixed width.") },
    { lead: "Progressive enhancement", body: html("Build a working baseline first — semantic HTML with core content and functionality that survives even if CSS or JavaScript fails to load or isn't supported — then layer on richer layout, animation, and interactivity for the browsers and conditions that can handle it. That's the philosophy underneath \"don't assume every device has the same capability\": a dropped connection, a failed script, or an older browser degrades to something still usable instead of breaking outright.") },
    { lead: "Dynamic viewport units (dvh, svh, lvh)", body: html("<code>100vh</code> is sized to the viewport's largest possible height, as if a mobile browser's address bar and toolbar were already hidden. Since they're visible most of the time, until someone scrolls, anything sized or positioned against <code>100vh</code> — a full-screen hero, a button pinned to its bottom edge — can render partly off-screen. <code>100dvh</code> (dynamic viewport height) tracks the real, currently-visible viewport as browser chrome shows and hides; <code>svh</code> and <code>lvh</code> give the small and large ends of that range for cases that need a stable value instead of one that shifts while scrolling.") },
    { lead: "The exact WCAG numbers", body: html("WCAG 2.2's Success Criterion 2.5.8 (Target Size Minimum, Level AA) actually requires only 24×24 CSS pixels, with exceptions for inline text links, small targets with enough spacing around them, and a few other cases. The widely-cited 44×44px figure is a different, higher criterion — SC 2.5.5 (Target Size Enhanced), a Level AAA bar carried over from WCAG 2.1. Designing to 44×44px clears both comfortably; treating it as the only acceptable size overstates what's strictly required.") },
  ],
  datePublished: "2026-07-23",
};
