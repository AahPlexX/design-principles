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
    html("A brand-new user signs up for a project-management tool and lands on a dashboard with thirty visible options: custom-field settings, integration panels, three empty charts, and a settings menu with a dozen sub-tabs — all before they've created a single task. None of it is wrong in isolation; someone six months into using the product will reach for most of it eventually. But none of it means anything yet either, because there's nothing on the account this person has actually done. It reads as noise, not features, and nothing on the screen signals which one button, out of thirty, is the one that gets them started."),
    html("This isn't a matter of the interface being \"too much\" for careless or impatient people. Every option on a screen is something a person has to at least notice and mentally dismiss before deciding what to do next — the mental effort of doing that for everything currently visible is what researchers call cognitive load, and it adds up fast, before anyone has gotten anything done. That's as true for the most technically confident person in the room as for anyone else: an expert evaluating an unfamiliar tool for the first time is, for those first few minutes, exactly as new to it as a novice. Progressive disclosure isn't a concession to beginners specifically — it's a concession to how attention works for everyone at the moment of first contact with something new."),
    html("The cost isn't a support ticket, either — it's quieter than that. Someone who can't tell what to do first doesn't usually write in to complain about having too many options; they close the tab, or they click something at random and get a result they didn't want, or they decide the product is \"too complicated for what I need\" and never come back to find out otherwise. Onboarding failures rarely look like errors. They look like a product nobody ever gave a fair try."),
  ],
  coreRule: [
    html("Show the smallest interface that lets someone complete one meaningful first action, and hold every other feature back until they've reached the point where they'd actually reach for it. Before adding anything to a first-run screen, ask who benefits from seeing it right now — if the honest answer is \"someone who has already succeeded once,\" it belongs one step later, not on step one."),
  ],
  examples: [
    {
      context: "A brand-new dashboard, before any project exists",
      good: {
        label: "Good — one action, everything else deferred",
        code: "<div class=\"empty-state\">\n  <h2>Create your first project</h2>\n  <button>New project</button>\n</div>\n<!-- custom fields, integrations, and\n     account settings are one click\n     away, on their own settings page -->",
        note: html("One thing to do, sized to what a brand-new account can actually act on. Custom fields, integrations, and account settings aren't gone — they're a click away on a settings page — they're just not competing for attention before there's a project to configure."),
      },
      bad: {
        label: "Bad — every feature visible at once",
        code: "<div class=\"dashboard\">\n  <!-- 30 widgets, 3 empty charts, and\n       a full settings panel, all shown\n       on an account with zero projects -->\n</div>",
        note: html("Nothing here is broken — every widget works exactly as built. But nothing is relevant yet either, and there's no way to tell which one of thirty things is the one to do first."),
      },
    },
    {
      context: "A settings panel with basic and advanced options",
      good: {
        label: "Good — advanced options tucked behind a toggle",
        code: "<section>\n  <label><input type=\"checkbox\" checked /> Email notifications</label>\n  <label><input type=\"checkbox\" /> Weekly summary</label>\n  <button aria-expanded=\"false\" aria-controls=\"advanced-panel\">\n    Advanced settings ▾\n  </button>\n  <div id=\"advanced-panel\" hidden>\n    <!-- webhook URL, API key, and rate-limit\n         override render here once expanded -->\n  </div>\n</section>",
        note: html("<code>aria-expanded=\"false\"</code> on the toggle tells assistive technology the advanced panel is currently collapsed — it flips to <code>\"true\"</code> once opened — so a screen reader user knows the panel's state without needing to see it. <code>aria-controls=\"advanced-panel\"</code> ties the button to the exact panel it operates, rather than leaving that relationship implied by the two elements just sitting next to each other in the markup. The two settings most people actually touch stay visible. The ones most people never touch are one labeled click away — findable the moment someone needs them, invisible until then."),
      },
      bad: {
        label: "Bad — every setting shown flat",
        code: "<section>\n  <label><input type=\"checkbox\" checked /> Email notifications</label>\n  <label><input type=\"checkbox\" /> Weekly summary</label>\n  <label>Webhook URL: <input type=\"text\" /></label>\n  <label>API key: <input type=\"text\" /></label>\n  <label>Rate limit override: <input type=\"number\" /></label>\n</section>",
        note: html("Someone who wants to turn on email notifications has to read past a webhook URL and a rate-limit override to find the checkbox they actually came for."),
      },
    },
    {
      context: "A signup form collecting account details",
      good: {
        label: "Good — asks only what's needed to start",
        code: "<form>\n  <label for=\"email\">Email</label>\n  <input id=\"email\" type=\"email\" />\n  <label for=\"password\">Password</label>\n  <input id=\"password\" type=\"password\" />\n  <button>Create account</button>\n</form>\n<!-- name, company size, and phone number\n     are asked for later, inside the\n     product, when each is actually\n     needed for something specific -->",
        note: html("Two fields are the minimum required to create something to sign back into. Everything else is deferred to the moment it's needed — a phone number when two-factor login is turned on, a company size when a plan limit is reached."),
      },
      bad: {
        label: "Bad — front-loads every field the product will ever want",
        code: "<form>\n  <input placeholder=\"First name\" />\n  <input placeholder=\"Last name\" />\n  <input type=\"email\" placeholder=\"Email\" />\n  <input type=\"password\" placeholder=\"Password\" />\n  <input placeholder=\"Company name\" />\n  <input placeholder=\"Company size\" />\n  <input placeholder=\"Role\" />\n  <input placeholder=\"Phone number\" />\n  <button>Create account</button>\n</form>",
        note: html("Eight fields stand between a new visitor and the first screen of the actual product. The more of them there are, the more people quietly close the tab instead of finishing."),
      },
    },
    {
      context: "A first-run product tour",
      good: {
        label: "Good — a hint shown at the moment it's useful",
        code: "<!-- tooltip fires once, the first\n     time someone opens the Filters\n     panel -->\n<div class=\"tooltip\" data-trigger=\"filters-panel-first-open\">\n  Save this filter combination as a\n  view you can jump back to later.\n</div>",
        note: html("This is a <strong>coach mark</strong> — a single, dismissible pointer highlighting one specific piece of the interface at the moment it becomes relevant — not a multi-step guided tour that walks through several features in sequence regardless of what the reader has actually touched. This tip about saved views appears right after someone has used filters enough to plausibly want to save one. It's dismissible, shown once, and never blocks the panel it's explaining."),
      },
      bad: {
        label: "Bad — a mandatory tour with no way out",
        code: "<div class=\"tour-modal\" data-step=\"1\" data-total-steps=\"10\">\n  <h3>Welcome! Let's take a quick tour.</h3>\n  <p>Step 1 of 10: this is your sidebar…</p>\n  <!-- \"Next\" is the only button;\n       there is no Skip or close -->\n</div>",
        note: html("Ten screens of information land before the account holds a single project. Most of it — the sidebar, the filters panel, the export menu — won't be needed for weeks, so it's forgotten well before it's relevant, and there's no way to skip to the one thing that mattered today."),
      },
    },
    {
      context: "A setup checklist tracking onboarding progress",
      good: {
        label: "Good — optional, skippable, and it remembers where you left off",
        code: "<aside class=\"setup-checklist\">\n  <h2>2 of 5 steps complete</h2>\n  <ul>\n    <li data-done=\"true\">Verify your email</li>\n    <li data-done=\"true\">Set a password</li>\n    <li>Invite your team</li>\n    <li>Connect your calendar</li>\n    <li>Create your first project</li>\n  </ul>\n  <button aria-label=\"Hide checklist for now\">Hide</button>\n</aside>\n<!-- reachable again later from\n     Settings → Getting started -->",
        note: html("A visible, optional checklist works because of two effects: the <strong>Zeigarnik Effect</strong>, where an unfinished task is remembered and felt as unresolved far more strongly than a finished one, and the <strong>Goal-Gradient Effect</strong>, where motivation to finish rises the closer the goal feels — \"2 of 5\" pulls less than \"4 of 5\" will once the reader actually gets there. Hiding the checklist doesn't delete it; it's still reachable later, on the reader's own schedule."),
      },
      bad: {
        label: "Bad — mandatory, and it won't stop asking",
        code: "<div class=\"setup-modal\" role=\"dialog\" aria-modal=\"true\">\n  <h2>Complete your setup: 2 of 5</h2>\n  <p>Finish every step before you can\n     use the dashboard.</p>\n  <!-- reopens on every login until all\n       5 steps are checked off; there\n       is no close button -->\n</div>",
        note: html("Blocking the dashboard until every step is checked off, or reopening the same modal every login with no way to close it, turns the exact psychology that makes an optional checklist motivating into pressure the reader never asked for — the open loop that pulls someone back voluntarily starts to feel like a gate the moment it's forced."),
      },
    },
  ],
  mistakes: [
    { name: "Mandatory tours instead of just-in-time teaching", body: html("A ten-step walkthrough that has to be sat through before anything is usable front-loads information nobody can act on yet, and most of it will be forgotten before it's relevant. A hint that surfaces the moment its feature becomes available teaches at the one time the lesson can actually be used.") },
    { name: "Tours with no skip or exit", body: html("Forcing every new user through the identical fixed sequence, with no way to skip ahead or dismiss it, punishes the person who already understands the product, or who'd rather explore and ask questions later. A tour that can't be escaped stops feeling like help and starts feeling like a gate between the visitor and the product they signed up for.") },
    { name: "Surfacing admin or advanced settings before the basic task is done", body: html("Custom fields, API keys, and integration settings shown on day one compete for attention with the one thing a new user actually came to do, on equal visual footing — nothing on the screen signals that most of it can be safely ignored for now.") },
    { name: "Hiding functionality with no way back to it", body: html("Progressive disclosure defers visibility — it never removes access. If the panel an advanced feature is tucked behind is itself hard to find later, that feature has been hidden, not progressively disclosed, and a returning user who needs it has no more of a path to it than a first-time visitor did.") },
    { name: "Treating onboarding as a one-time popup sequence", body: html("A single tour shown once at signup can't cover capability nobody will need for weeks — by the time someone is ready to use a feature explained in minute six of a tour they sat through on day one, the explanation is long gone. Contextual hints that appear when a related feature becomes relevant reach someone at the moment they can use the information, however far into their use of the product that moment falls.") },
    { name: "Gating features by calendar time instead of demonstrated readiness", body: html("Waiting until \"day 7\" to reveal a feature, regardless of what the account has actually done, discloses on a schedule instead of in response to need — someone who created five projects on day one is kept waiting on the same clock as someone who hasn't opened the app since signing up. Reveal capability because someone reached the point where they'd use it, such as hitting a limit or finishing a first project, not because a fixed amount of time passed.") },
  ],
  checklist: [
    html("A new user can complete one meaningful first action without configuring anything else first."),
    html("Advanced, rarely-used, or admin-only settings sit behind a clearly labeled toggle, menu, or settings page — not visible by default."),
    html("Any tour or walkthrough can be skipped, dismissed, and revisited later; nothing forces a start-to-finish sit-through."),
    html("Contextual hints appear at the moment a feature becomes relevant, not all at once at signup."),
    html("Anything tucked behind an \"Advanced\" toggle stays reachable from a place a returning user would think to look."),
    html("A feature unlocks because someone reached the point where they'd use it, not because a fixed number of days passed."),
  ],
  practiceCourseId: null,
  goDeeper: [
    { lead: "Where the term comes from", body: html("Jakob Nielsen, co-founder of the Nielsen Norman Group, named \"progressive disclosure\" in 1995 as a way to cut error rates in complex desktop software: defer a program's advanced features to a secondary screen, and the primary screen gets simpler and harder to get wrong at the same time. The onboarding sense of the term used on this page is a direct descendant of that original meaning, not a newer, unrelated use of the same words.") },
    { lead: "Time-to-value", body: html("Product teams often track onboarding by how quickly a new user reaches their first genuine \"aha\" moment — the point where a product's value becomes obvious from direct experience rather than from being told about it, sometimes shortened to <em>time-to-value</em>. Progressive disclosure is largely in service of shortening that path: every screen between signup and that first real result is a screen that has to earn the delay it adds.") },
    { lead: "This is not the same as a dark pattern", body: html("See <a href=\"/design-principles/principles/dark-patterns-ethics.html\">Dark Patterns &amp; Ethics</a> — progressive disclosure delays complexity for the reader's own benefit, and the hidden functionality remains fully reachable. A dark pattern instead hides information the reader needs to make a fair decision, or makes something they'd want artificially hard to find. The test is who benefits from what's currently out of view.") },
    { lead: "First-run empty states are a specific case of this", body: html("See <a href=\"/design-principles/principles/empty-error-states.html\">Empty &amp; Error States</a> for how the very first screen someone sees — with zero data in it yet — should be designed as its own deliberate moment, not a placeholder.") },
    { lead: "Feature flags are progressive disclosure at the release-engineering level", body: html("The same principle operates below the interface, too: a feature flag lets a team release a new capability to a small percentage of users first, then widen the rollout as confidence grows, instead of turning it on for everyone at once — \"reveal capability incrementally\" applied to a release rather than a screen. Most teams pair a staged rollout with a kill switch: a way to turn the feature back off for everyone within seconds if it misbehaves in production, without needing a code rollback.") },
  ],
  datePublished: "2026-07-27",
};
