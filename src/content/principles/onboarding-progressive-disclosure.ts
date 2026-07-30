// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const onboardingProgressiveDisclosure: Principle = {
  slug: "onboarding-progressive-disclosure",
  title: "Onboarding & Progressive Disclosure",
  category: "Task-Specific",
  blurb: "Introducing a new user to a product's complexity gradually, showing only what's needed for the very next step instead of everything at once.",
  searchKeywords: "onboarding progressive disclosure introducing a new user to a product's complexity gradually",
  definition: html("Onboarding is how someone gets from \"just arrived\" to their first real success in a product. Progressive disclosure is the technique that makes good onboarding possible: showing only what's needed right now, and revealing more capability only once someone's ready to use it."),
  whyItMatters: [
    html("A brand-new user opens a project-management tool and lands on a dashboard with thirty visible options, custom-field settings, integration panels, and empty charts — before they've created a single task. None of it is wrong on its own, but none of it means anything yet either, so it reads as noise. Some people push through; a lot of people quietly leave before finding the one button that would have gotten them started at all."),
  ],
  coreRule: [
    html("Show the smallest interface that lets someone complete one meaningful first action, and reveal additional capability only once they've reached the point where they'd actually use it. Never surface a feature before the person in front of it has a reason to care."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<div class=\"empty-state\">\n  <h2>Create your first project</h2>\n  <button>New project</button>\n</div>\n<!-- advanced settings live behind\n     a separate \"Settings\" page -->",
      note: html("One clear action for a first-time visitor, with everything else (custom fields, integrations, advanced settings) deliberately out of view until there's an actual project to configure."),
    },
    bad: {
      label: "Bad",
      code: "<div class=\"dashboard\">\n  <!-- 30 widgets, settings panels,\n       and empty charts, all visible\n       on a brand-new account -->\n</div>",
      note: html("Every feature the product has is visible immediately, regardless of whether the person looking at it has done anything yet — there's no signal about what actually matters first."),
    },
  },
  mistakes: [
    { name: "Mandatory tours instead of just-in-time teaching", body: html("A ten-step walkthrough that must be sat through before anything is usable front-loads information the person can't act on yet — most of it will be forgotten before it's relevant. A hint that appears exactly when the related feature becomes available teaches at the moment it can actually be used.") },
    { name: "Tours with no skip or exit", body: html("Forcing every new user through the same fixed sequence, with no way to skip ahead or dismiss it, punishes someone who already understands the product or just wants to explore on their own.") },
    { name: "Surfacing admin/advanced settings before the basic task is done", body: html("Custom fields, API keys, and integration settings shown on day one compete with the one thing a new user actually needs to find.") },
    { name: "Hiding functionality with no way back to it", body: html("Progressive disclosure means deferring visibility, not removing access — if the \"advanced\" panel a feature is tucked behind is itself hard to find later, the feature has effectively been hidden, not progressively disclosed.") },
    { name: "Treating onboarding as a one-time popup sequence", body: html("A single tour shown once at signup can't cover capability a user won't need for weeks — contextual hints that appear when a related feature becomes relevant reach the person at a moment they can actually use the information.") },
  ],
  checklist: [
    html("A new user can complete one meaningful first action without configuring anything else first."),
    html("Advanced or rarely-used options are tucked behind a clear, findable disclosure (a toggle, a menu, a settings page), not shown by default."),
    html("Any tour or walkthrough can be skipped and revisited later, never forced start-to-finish."),
    html("Contextual help appears at the moment a feature becomes relevant, not all at once upfront."),
    html("Hidden functionality stays reachable — disclosure hides visually, it never removes access."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Time-to-value", body: html("Product-growth teams often measure onboarding by how quickly a new user reaches their first genuine \"aha\" moment — the point where the product's value becomes obvious from direct experience rather than from being told about it. Progressive disclosure is largely in service of shortening that path.") },
    { lead: "This is not the same as a dark pattern", body: html("See <a href=\"/design-principles/principles/dark-patterns-ethics.html\">Dark Patterns &amp; Ethics</a> — progressive disclosure delays complexity for the reader's own benefit, and the hidden functionality remains fully reachable. A dark pattern instead hides information the reader needs to make a fair decision, or makes something they'd want artificially hard to find. The test is who benefits from what's currently out of view.") },
    { lead: "First-run empty states are a specific case of this", body: html("See <a href=\"/design-principles/principles/empty-error-states.html\">Empty &amp; Error States</a> for how the very first screen someone sees — with zero data in it yet — should be designed as its own deliberate moment, not a placeholder.") },
  ],
  datePublished: "2026-07-27",
};
