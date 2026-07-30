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
    html("A page can be well designed in isolation and still fail if nobody can find it, or find their way back afterward. When the organization doesn't match how a reader thinks about the content, they stop trusting the navigation and start relying on the browser's back button and a search engine to route around it — which means your own site's structure has stopped being useful to the people it was built for."),
  ],
  coreRule: [
    html("Organize content around what the reader is trying to do, not around how your organization happens to be structured internally. Every page should make three things obvious at a glance: where am I, where can I go from here, and how do I get back."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<nav>Pricing · Docs · Support</nav>\n<p class=\"breadcrumb\">\n  Home > Docs > Getting Started\n</p>",
      note: html("Labels describe what a visitor is looking for, and the breadcrumb shows exactly where the current page sits in the site — both without requiring any prior knowledge of the company's internal structure."),
    },
    bad: {
      label: "Bad",
      code: "<nav>Solutions Group ·\n  Enterprise Vertical ·\n  Platform Division</nav>",
      note: html("These labels reflect an internal org chart, not a visitor's goals — nobody arrives at a site already knowing which internal division owns the answer they need."),
    },
  },
  mistakes: [
    { name: "Labeling navigation with internal jargon", body: html("Department names, product code names, or internal project terms mean nothing to someone who's never worked at the company — label sections by the task or topic a visitor is looking for instead.") },
    { name: "No indication of current location", body: html("Without a highlighted nav item or a breadcrumb, a reader who arrives from search or a shared link has no idea where they are relative to everything else on the site.") },
    { name: "Burying content more than a few levels deep", body: html("If reaching common content takes four or five clicks through nested menus, most readers give up before they get there — flatten the structure or add direct paths to the pages people actually want.") },
    { name: "Site search that fails silently", body: html("Returning \"no results\" with no suggested alternative, or returning results that don't match the query's intent, teaches people to stop using search at all.") },
    { name: "Navigation that only works with a precise mouse hover", body: html("A dropdown mega-menu that requires hovering an exact pixel region breaks the moment someone's on a touchscreen, with no tap-based fallback.") },
  ],
  checklist: [
    html("Navigation labels describe visitor goals, not internal org structure."),
    html("The current page's location is visually indicated (<code>aria-current=\"page\"</code>, a highlighted nav item, or a breadcrumb)."),
    html("Primary content is reachable within about three levels of navigation."),
    html("Site search returns helpful results, or a clear next step when it can't."),
    html("Navigation works by tap as well as by mouse hover."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Card sorting and tree testing", body: html("Card sorting asks real users to group content into categories that make sense to them, revealing a mental model before you commit to a structure. Tree testing does the reverse — given a proposed structure, can people actually find things in it? Both are cheap, low-tech ways to validate IA before writing any code.") },
    { lead: "Breadcrumb markup", body: html("Marking up a breadcrumb trail with <code>schema.org</code>'s <code>BreadcrumbList</code> structured data lets search engines display the hierarchy directly in search results, which is a small, low-effort addition once the breadcrumb itself exists.") },
    { lead: "The \"three clicks\" myth", body: html("The popular claim that users abandon a site if content is more than three clicks away isn't well supported by research — what actually matters is whether each click gives confident forward progress, not the raw click count. A deep structure with clear, confident steps beats a shallow one full of ambiguous choices.") },
  ],
  datePublished: "2026-07-27",
};
