// Generated from the pre-migration HTML by scripts/extract/legacy-extract.ts.
// Reviewed and now maintained by hand — edit this file directly, do not re-run the extractor over it.

import type { Principle } from "@/content/types";
import { html } from "@/lib/html";

export const darkPatternsEthics: Principle = {
  slug: "dark-patterns-ethics",
  title: "Dark Patterns & Ethics",
  category: "Ethics",
  blurb: "Recognizing interfaces designed to trick people, and the test for whether yours is one of them.",
  searchKeywords: "dark patterns ethics recognizing interfaces designed to trick people and the test for whether yours is one of them",
  definition: html("A dark pattern is an interface deliberately designed to trick someone into doing something they wouldn't choose if the choice were presented plainly — subscribing, sharing data, or paying for more than they meant to."),
  whyItMatters: [
    html("Dark patterns can lift a short-term metric — more signups, more items in the cart — but they spend down trust every time someone notices the trick, and a lot of people notice. The cost shows up as support complaints, chargebacks, public callouts, and increasingly as real legal exposure: regulators in the US, EU, and elsewhere have begun fining companies specifically for dark-pattern practices, not just for the outcomes those patterns produced."),
  ],
  coreRule: [
    html("If you had to explain the interaction to the person going through it, and they'd feel tricked by what you described, redesign it. The test for a dark pattern is whether the design depends on the reader <em>not</em> noticing what's actually happening."),
  ],
  goodVsBad: {
    good: {
      label: "Good",
      code: "<label>\n  <input type=\"checkbox\">\n  Email me product updates\n</label>\n<!-- unchecked by default -->",
      note: html("Consent is an active choice the reader makes, not a default they have to notice and undo."),
    },
    bad: {
      label: "Bad",
      code: "<label>\n  <input type=\"checkbox\" checked>\n  Uncheck to opt out of updates,\n  offers, and partner emails\n</label>",
      note: html("Pre-checked and worded so skimming eyes miss it — the design is relying on the reader not reading closely enough to notice they're being opted in."),
    },
  },
  mistakes: [
    { name: "Pre-checked opt-ins", body: html("Marketing emails, data sharing, or add-on purchases defaulted to \"on\" put the burden of noticing and opting out on the reader, instead of asking for a genuine yes.") },
    { name: "Confirmshaming", body: html("Wording a decline option to guilt the reader (\"No thanks, I don't want to save money\") instead of a neutral \"No thanks\" turns a simple choice into an emotional one.") },
    { name: "The \"roach motel\" pattern", body: html("Making it one click to sign up and a phone call, a hidden menu, or multiple confirmation screens to cancel — easy in, hard out.") },
    { name: "Fabricated urgency or scarcity", body: html("A countdown timer that resets on refresh, or an \"only 2 left!\" label that doesn't reflect real inventory, manufactures pressure that isn't real.") },
    { name: "Drip pricing", body: html("Revealing mandatory fees only at the final checkout step, after the reader has already invested time choosing items, instead of showing the full cost upfront.") },
  ],
  checklist: [
    html("No pre-checked boxes for anything that isn't strictly required to use the product."),
    html("Declining an offer uses neutral wording, not guilt or shame."),
    html("Canceling or unsubscribing takes the same or fewer steps than signing up did."),
    html("Any urgency or scarcity claim shown is real, not fabricated."),
    html("All costs are shown before the final confirmation step, not added afterward."),
  ],
  practiceCourseId: "dark-patterns-ethics",
  goDeeper: [
    { lead: "Where the terminology comes from", body: html("UX researcher Harry Brignull coined \"dark pattern\" in 2010 and cataloged recurring types — the roach motel, confirmshaming, and others named above are his terms, now in common industry use. Brignull himself has since moved to calling them \"deceptive patterns\" instead, renaming his own site to deceptive.design on the advice of the World Wide Web Foundation's Tech Policy Design Lab, which flagged that \"dark\" can carry unintended racial connotations. Both terms describe the same thing; this page uses \"dark patterns\" because it remains the more widely recognized term, not because the shift isn't worth knowing about.") },
    { lead: "Regulatory enforcement", body: html("The FTC in the US and regulators under the EU's Digital Services Act and Digital Markets Act have both taken enforcement action specifically citing dark-pattern design, treating manipulative interface design as a compliance issue distinct from the underlying business practice. In December 2025, the European Commission fined X (formerly Twitter) €120 million — the DSA's first formal non-compliance decision — citing, among other breaches, a \"verified\" blue-checkmark badge the Commission found deceptive: it kept implying identity verification even though anyone could get it by paying, with no identity check at all.") },
    { lead: "Compliance theater vs. genuine consent", body: html("A cookie banner that makes \"Reject all\" three clicks deeper than \"Accept all,\" while technically offering a choice, is itself a dark pattern — the presence of an opt-out doesn't make a design ethical if the opt-out is deliberately harder to find or use.") },
  ],
  datePublished: "2026-07-27",
};
