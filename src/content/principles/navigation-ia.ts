// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const navigationIa: Principle = {
  slug: "navigation-ia",
  title: "Navigation & IA",
  category: "Task-Specific",
  blurb: "How a site's structure and labels either help someone find things or leave them stuck using the back button.",
  searchKeywords: "navigation ia information architecture how a site's structure and labels either help someone find things or leave them stuck",
  definition: html("Navigation is how someone moves around a site. Information architecture (IA, for short) is the plan behind it — how the content is organized into groups and what those groups are called — so that moving around actually makes sense."),
  whyItMatters: [
    html("Picture someone whose order confirmation email links to a dead page, so they land on the homepage instead, trying to find where to request a refund. The top navigation reads \"Solutions,\" \"Enterprise,\" \"Platform\" — team names carried straight over from the org chart, without a single word about billing, refunds, or support. They click \"Solutions,\" find nothing, go back, click \"Enterprise,\" find nothing, go back again, and after the third dead end they give up on the site's own navigation and type \"site:example.com refund policy\" into a search engine instead."),
    html("This isn't a rare failure caused by one badly chosen label. It's the default outcome whenever a site's structure quietly tracks who owns each section internally rather than what a visitor came to do — a team gets renamed in a reorg, and the nav label changes with it, even though nobody outside the building has ever heard the new name. The same breakdown happens one layer down, with no jargon involved at all: a reader who lands on a documentation page from a search result, three folders deep, with no breadcrumb and no highlighted nav item, has no way to tell whether they're in the right section, whether a simpler overview page exists one level up, or how to get back to where they started besides repeatedly hitting the browser's back button."),
    html("None of this shows up as an error message anywhere in your analytics. It shows up as a support ticket asking a question some page on the site already answers, a checkout abandoned one confused click from the end, or a bounce rate with no obvious cause attached to it. A reader who gets lost doesn't file a complaint about your information architecture — they just leave, and the page that would have helped them never gets credit for existing."),
  ],
  coreRule: [
    html("Group and label content by what the reader is trying to accomplish, not by which internal team owns it — nobody arrives at your site already knowing your org chart, and they never will. Every page should answer three things at a glance: where am I, where can I go from here, and how do I get back to where I started. And no page that matters should have exactly one path leading to it — a menu item, a link from a related page, and a working site search each count as a separate route, so a single broken link, a renamed menu item, or one mis-remembered click doesn't strand someone for good."),
  ],
  examples: [
    {
      context: "Primary navigation labels",
      good: {
        label: "Good — labels match what a visitor is looking for",
        code: "<nav aria-label=\"Primary\">\n  <a href=\"/pricing\">Pricing</a>\n  <a href=\"/docs\">Docs</a>\n  <a href=\"/support\">Support</a>\n</nav>",
        note: html("Each label names a thing a visitor is looking for — pricing, documentation, help — regardless of which internal team happens to maintain that page."),
      },
      bad: {
        label: "Bad — labels match the org chart",
        code: "<nav aria-label=\"Primary\">\n  <a href=\"/solutions-group\">Solutions Group</a>\n  <a href=\"/enterprise-vertical\">Enterprise Vertical</a>\n  <a href=\"/platform-division\">Platform Division</a>\n</nav>",
        note: html("These are internal division names. A visitor would have to already know the company's reporting structure to guess which one might contain pricing or support — almost none will, and none should have to."),
      },
    },
    {
      context: "Marking the current page",
      good: {
        label: "Good — the breadcrumb names the current page for every reader",
        code: "<nav aria-label=\"Breadcrumb\">\n  <ol>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/docs/\">Docs</a></li>\n    <li><a aria-current=\"page\">Getting Started</a></li>\n  </ol>\n</nav>",
        note: html("<code>aria-label=\"Breadcrumb\"</code> names this landmark for a screen-reader user jumping between regions of the page, and <code>aria-current=\"page\"</code> marks which crumb is the page they're already on — a sighted reader gets the same fact from its position at the end of the trail and its different styling."),
      },
      bad: {
        label: "Bad — every crumb looks and reads exactly the same",
        code: "<div class=\"crumbs\">\n  <a href=\"/\">Home</a> &gt;\n  <a href=\"/docs/\">Docs</a> &gt;\n  <a href=\"/docs/start/\">Getting Started</a>\n</div>",
        note: html("Nothing marks the last link as the current page, visually or in the markup — a screen reader announces it as just another clickable link, and a sighted reader can't tell at a glance whether clicking it would do anything at all."),
      },
    },
    {
      context: "A dropdown menu on a touchscreen",
      good: {
        label: "Good — the same control opens on tap or click",
        code: "<button aria-expanded=\"false\" aria-controls=\"products-menu\">\n  Products\n</button>\n<ul id=\"products-menu\" hidden>\n  <li><a href=\"/products/a\">Product A</a></li>\n  <li><a href=\"/products/b\">Product B</a></li>\n</ul>",
        note: html("A real <code>&lt;button&gt;</code> toggles <code>aria-expanded</code> and the menu's <code>hidden</code> attribute on click or tap alike — nothing here depends on a mouse cursor parking over a specific pixel."),
      },
      bad: {
        label: "Bad — the menu only opens under a hovering mouse",
        code: "<div class=\"nav-item\">\n  Products\n  <div class=\"dropdown\">…</div>\n</div>\n\n/* .dropdown { display: none; }\n   .nav-item:hover .dropdown { display: block; } */",
        note: html("Touchscreens have no hover state, so tapping \"Products\" does nothing — there's no click handler anywhere, only a <code>:hover</code> rule, and the entire submenu becomes unreachable."),
      },
    },
    {
      context: "A search with zero results",
      good: {
        label: "Good — the dead end offers a next step",
        code: "<p>No results for \"retun policy.\"</p>\n<p>Did you mean\n  <a href=\"/search?q=return+policy\">return policy</a>?\n</p>\n<p>Or browse the <a href=\"/help\">Help Center</a>.</p>",
        note: html("Repeats the query back so the reader knows what was searched, offers a likely correction, and gives a fallback path that doesn't depend on getting the spelling right on a second try."),
      },
      bad: {
        label: "Bad — a dead end with nowhere to go",
        code: "<p>No results found.</p>",
        note: html("Confirms the search failed and stops there. Nielsen Norman Group's research on \"no results\" pages found that most people don't retype a better query after a failed search — they leave the site instead."),
      },
    },
  ],
  mistakes: [
    { name: "Labeling navigation with internal jargon", body: html("Department names, product code names, or internal project terms mean nothing to someone who's never worked at the company — label sections by the task or topic a visitor came looking for instead. See the primary-navigation example above for what that looks like in practice.") },
    { name: "No indication of current location", body: html("Without a highlighted nav item, a breadcrumb, or <code>aria-current=\"page\"</code> on the active link, a reader who arrives from search or a shared link has no way to tell where they landed relative to the rest of the site.") },
    { name: "Giving an important page exactly one way to reach it", body: html("WCAG's Multiple Ways guideline (success criterion 2.4.5, a Level AA requirement) calls for at least two distinct routes to any page that isn't a forced step in a process — a nav menu plus a working search, for example, or a nav menu plus a sitemap. Relying on a single link means a broken link, a renamed menu item, or one mis-remembered click strands someone for good.") },
    { name: "Burying content behind many nested clicks with no shortcuts", body: html("If reaching a commonly-needed page takes four or five clicks through nested menus, most readers give up before they get there — flatten the structure for the pages people actually want, or add a direct link to them from higher up.") },
    { name: "Site search that fails silently", body: html("Returning \"no results\" with no suggested correction or fallback, or returning results that don't match what the query's words actually meant, teaches people to stop using search at all. See the zero-results example above for a page that gives the reader somewhere to go instead.") },
    { name: "Navigation that only works with a precise mouse hover", body: html("A dropdown menu that opens only when a mouse hovers an exact pixel region has no equivalent for a tap, a keyboard, or a screen reader. See the touchscreen example above for a version that works for all three.") },
  ],
  checklist: [
    html("Navigation labels describe visitor goals, not internal org structure."),
    html("The current page's location is visually indicated and marked with <code>aria-current=\"page\"</code> (a highlighted nav item or a breadcrumb)."),
    html("Every important page has at least two distinct routes to it — for example a nav menu and a working site search."),
    html("Deep content has a direct shortcut, not just nested menus to click through."),
    html("Site search offers a correction or a fallback link when it finds nothing, instead of a dead end."),
    html("Dropdown and mega menus work by tap and keyboard, not only by mouse hover."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Card sorting and tree testing", body: html("Card sorting asks real users to group content into categories that make sense to them, revealing a mental model before you commit to a structure. Tree testing does the reverse — given a proposed structure, can people actually find things in it? Both are cheap, low-tech ways to validate IA before writing any code.") },
    { lead: "Breadcrumb markup", body: html("Marking up a breadcrumb trail with <code>schema.org</code>'s <code>BreadcrumbList</code> structured data lets search engines display the hierarchy directly in search results, which is a small, low-effort addition once the breadcrumb itself exists.") },
    { lead: "The \"three clicks\" myth", body: html("The popular claim that users abandon a site if content is more than three clicks away isn't well supported by research — what actually matters is whether each click gives confident forward progress, not the raw click count. A deep structure with clear, confident steps beats a shallow one full of ambiguous choices.") },
    { lead: "Hover-triggered menus and WCAG's Content on Hover or Focus rule", body: html("When a menu or tooltip appears on mouse hover or keyboard focus, WCAG's Content on Hover or Focus criterion (1.4.13, Level AA) requires it to be dismissible without moving the pointer (typically with Escape), hoverable (the pointer can move onto the revealed content without it disappearing), and persistent (it stays open until the reader dismisses it or moves away, not on a timer). A mega menu that vanishes the instant the cursor crosses the gap on its way to a submenu link fails this even though it technically \"works\" with a mouse.") },
  ],
  datePublished: "2026-07-31",
};
