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
    html("Picture someone signing up for a \"free\" seven-day trial of a fitness app. The signup screen never states plainly what happens after day seven — that detail lives inside a settings menu they never open, in a sentence below the fold, set a shade lighter than the text around it. On day eight their card is charged the full annual price. They didn't forget to cancel; the flow never gave them a clear moment to notice there was anything to cancel. Now they're on hold with support, disputing the charge with their bank, and telling three friends not to bother with the app — a chargeback the company will likely lose, plus a story that outlives the trial by years."),
    html("That trade rarely announces itself as a trade while it's happening. A pre-checked box or a confusing cancel flow lifts a metric someone is watching — trial-to-paid conversion, mailing-list size, average cart value — in the same reporting period it does the damage, while the cost lands later and scattered: support tickets, refund requests, one-star reviews, a churn rate that creeps up without anyone tracing it back to the signup screen. By the time the pattern shows up in numbers anyone reviews, the team that shipped it has usually moved on to the next feature.") ,
    html("The exposure isn't only reputational anymore, either. Regulators in the US, EU, and elsewhere have begun treating manipulative interface design as a violation in its own right, separate from whatever product or service sits behind it — a company can be legally allowed to sell something and still be fined for how the interface talked someone into buying it. See \"Go deeper\" below for a live example of exactly that."),
  ],
  coreRule: [
    html("If you had to explain the interaction to the person going through it, and they'd feel tricked by what you described, redesign it. The test for a dark pattern is whether the design depends on the reader <em>not</em> noticing what's actually happening."),
  ],
  examples: [
    {
      context: "A newsletter signup checkbox",
      good: {
        label: "Good — unchecked by default",
        code: "<label>\n  <input type=\"checkbox\">\n  Email me product updates\n</label>\n<!-- unchecked by default -->",
        note: html("Consent is an active choice the reader makes, not a default they have to notice and undo. Leaving it unchecked costs the company some signups — the ones it collects are real."),
      },
      bad: {
        label: "Bad — pre-checked and worded to slip past",
        code: "<label>\n  <input type=\"checkbox\" checked>\n  Uncheck to opt out of updates,\n  offers, and partner emails\n</label>",
        note: html("Pre-checked and worded so a skimming reader misses it — the design depends on the reader not reading closely enough to notice they've just been opted into three separate things."),
      },
    },
    {
      context: "Declining a discount offer",
      good: {
        label: "Good — neutral decline",
        code: "<button>Yes, sign me up</button>\n<button>No thanks</button>",
        note: html("Declining costs the reader nothing but a click. Neither option is written to make the other feel like a mistake."),
      },
      bad: {
        label: "Bad — the decline is written to shame",
        code: "<button>Yes, I want to save 20%</button>\n<button>No thanks, I like paying full price</button>",
        note: html("Confirmshaming: the decline button puts words in the reader's mouth to make the sensible choice sound foolish, so agreeing starts to feel easier than reading closely enough to object."),
      },
    },
    {
      context: "Canceling a subscription",
      good: {
        label: "Good — cancel matches signup",
        code: "Account > Subscription\n[Cancel plan]\n→ Confirm → Done.\nNo phone call, no hold music.",
        note: html("Whatever it took to sign up — a couple of clicks — is what it takes to leave. The reader trusted the company with a recurring charge; the company doesn't punish them for changing their mind."),
      },
      bad: {
        label: "Bad — the \"roach motel\"",
        code: "Account > Subscription\n\"To cancel, please call\n1-800-555-0199,\nMon–Fri 9am–5pm ET.\"",
        note: html("Signing up took one click and no wait. Canceling requires finding a phone number, calling during narrow business hours, and holding — an asymmetry that only exists to make leaving cost more effort than the reader is willing to spend."),
      },
    },
    {
      context: "The final step of checkout",
      good: {
        label: "Good — full price shown upfront",
        code: "Item price:        $42.00\nShipping:            $6.00\nService fee:         $3.50\n---------------------------\nTotal:              $51.50",
        note: html("The reader knows the true cost before they type in a card number. Nothing changes their mind for them at the last possible step."),
      },
      bad: {
        label: "Bad — drip pricing",
        code: "Item price:        $42.00\n  (the only number shown until now)\n\nStep 4 of 4 — Review\n+ Service fee:       $3.50\n+ \"Convenience\" fee: $4.99\n+ Processing fee:    $2.10\n---------------------------\nTotal:              $52.59",
        note: html("Each fee may be legitimate, but none of them appeared until the reader had already spent several minutes choosing a size, a color, and a shipping method — exactly the point in the flow where they're least willing to start over."),
      },
    },
  ],
  mistakes: [
    { name: "Pre-checked opt-ins", body: html("Marketing emails, data sharing, or add-on purchases defaulted to \"on\" put the burden of noticing and opting out on the reader, instead of asking for a genuine yes.") },
    { name: "Confirmshaming", body: html("Wording a decline option to guilt the reader (\"No thanks, I don't want to save money\") instead of a neutral \"No thanks\" turns a simple choice into an emotional one.") },
    { name: "The \"roach motel\" pattern", body: html("Making it one click to sign up and a phone call, a hidden menu, or multiple confirmation screens to cancel — easy in, hard out.") },
    { name: "Fabricated urgency or scarcity", body: html("A countdown timer that resets on refresh, or an \"only 2 left!\" label that doesn't reflect real inventory, manufactures pressure that isn't real.") },
    { name: "Drip pricing", body: html("Revealing mandatory fees only at the final checkout step, after the reader has already invested time choosing items, instead of showing the full cost upfront.") },
    { name: "Misdirection", body: html("Designing one option to visually dominate the screen — bright color, larger button, default focus — while the option the reader actually wants is small, gray, or easy to miss. Both choices are technically available; only one of them was designed to be found.") },
  ],
  checklist: [
    html("No box is pre-checked for anything beyond what's strictly required to use the product."),
    html("A decline or \"no\" option uses neutral wording — no guilt, no invented downside, no double negative to parse."),
    html("Canceling, unsubscribing, or deleting an account takes the same number of steps as signing up did, or fewer."),
    html("Every fee and mandatory cost is visible before the reader enters payment details, not revealed at the final step."),
    html("Any urgency or scarcity claim shown on the page is real, and would still be true if a reader fact-checked it."),
    html("You'd be comfortable narrating this flow out loud, in plain words, to the person going through it, before they click — and they wouldn't feel tricked by what you described."),
  ],
  practiceCourseId: "dark-patterns-ethics",
  goDeeper: [
    { lead: "Where the terminology comes from", body: html("UX researcher Harry Brignull coined \"dark pattern\" in 2010 and cataloged recurring types — the roach motel, confirmshaming, and others named above are his terms, now in common industry use. Brignull himself has since moved to calling them \"deceptive patterns\" instead, renaming his own site to deceptive.design on the advice of the World Wide Web Foundation's Tech Policy Design Lab, which flagged that \"dark\" can carry unintended racial connotations. Both terms describe the same thing; this page uses \"dark patterns\" because it remains the more widely recognized term, not because the shift isn't worth knowing about.") },
    { lead: "Regulatory enforcement", body: html("The FTC in the US and regulators under the EU's Digital Services Act and Digital Markets Act have both taken enforcement action specifically citing dark-pattern design, treating manipulative interface design as a compliance issue distinct from the underlying business practice. In December 2025, the European Commission fined X (formerly Twitter) €120 million — the DSA's first formal non-compliance decision — citing, among other breaches, a \"verified\" blue-checkmark badge the Commission found deceptive: it kept implying identity verification even though anyone could get it by paying, with no identity check at all.") },
    { lead: "Compliance theater vs. genuine consent", body: html("A cookie banner that makes \"Reject all\" three clicks deeper than \"Accept all,\" while technically offering a choice, is itself a dark pattern — the presence of an opt-out doesn't make a design ethical if the opt-out is deliberately harder to find or use.") },
  ],
  datePublished: "2026-07-27",
};
