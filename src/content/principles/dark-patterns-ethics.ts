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
    html("Picture someone signing up for a \"free\" seven-day trial of a fitness app. This is <strong>forced continuity</strong>: a trial that quietly converts into a paid subscription unless the reader finds and uses a well-hidden way to stop it first. The signup screen never states plainly what happens after day seven — that detail lives inside a settings menu they never open, in a sentence below the fold (the part of the page you'd only see by scrolling down), set a shade lighter than the text around it. On day eight their card is charged the full annual price. They didn't forget to cancel; the flow never gave them a clear moment to notice there was anything to cancel. Now they're on hold with support, disputing the charge with their bank, and telling three friends not to bother with the app — a chargeback (their bank forcibly reversing the charge back to them, over the company's objection) the company will likely lose, plus a story that outlives the trial by years."),
    html("That trade rarely announces itself as a trade while it's happening. A pre-checked box or a confusing cancel flow lifts a metric someone is watching — trial-to-paid conversion, mailing-list size, average cart value — in the same reporting period it does the damage, while the cost lands later and scattered: support tickets, refund requests, one-star reviews, a churn rate (the share of customers who cancel or stop using the product over a given stretch of time) that creeps up without anyone tracing it back to the signup screen. By the time the pattern shows up in numbers anyone reviews, the team that shipped it has usually moved on to the next feature."),
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
    {
      context: "A notification permission prompt",
      good: {
        label: "Good — declining is treated as an answer",
        code: "// First launch\nshowPrompt(\"Enable notifications?\")\n\n// Reader taps \"Not now\"\n→ Suppressed on this device.\n  Only asked again if the reader\n  taps a feature that needs it\n  (e.g. \"Remind me\").",
        note: html("The reader's \"not now\" is honored. They return to whatever they opened the app to do, without being asked again every time they open it."),
      },
      bad: {
        label: "Bad — nagging on every visit",
        code: "// Every single launch\nshowPrompt(\"Enable notifications?\")\n\n// Reader taps \"Not now\"\n→ Prompt returns next launch,\n  and the one after that,\n  indefinitely.",
        note: html("This is nagging: repeated interruption that redirects the reader from the task they came to do toward a choice they already made once. Each prompt costs a decision the reader has already spent."),
      },
    },
    {
      context: "Finding friends via your contacts",
      good: {
        label: "Good — access is optional, nothing sent without asking",
        code: "Contacts access: [Not now] [Allow]\n→ Core features work either way.\nIf allowed: shows contacts already\non the app. No invite goes out\nunless the reader picks a name and\ntaps \"Invite.\"",
        note: html("Handing over contacts is optional and unbundled from the features the reader actually opened the app to use. Nothing is sent on their behalf without a separate, specific action."),
      },
      bad: {
        label: "Bad — forced action, friend spam, and privacy zuckering",
        code: "Contacts access: [Not now] [Allow]\n→ \"Not now\" locks core features.\nAllowing silently imports every\ncontact and texts each one an\ninvite signed with the reader's\nname.",
        note: html("This is forced action: the reader has to give up data a feature doesn't need just to keep using the product. Two named versions of it: \"friend spam,\" messaging the reader's contacts without their separate, informed consent, and \"privacy zuckering,\" where the default shares more of the reader's data than they'd knowingly choose."),
      },
    },
  ],
  mistakes: [
    { name: "Pre-checked opt-ins", body: html("Marketing emails, data sharing, or add-on purchases defaulted to \"on\" put the burden of noticing and opting out on the reader, instead of asking for a genuine yes.") },
    { name: "Confirmshaming", body: html("Wording a decline option to guilt the reader (\"No thanks, I don't want to save money\") instead of a neutral \"No thanks\" turns a simple choice into an emotional one.") },
    { name: "The \"roach motel\" pattern", body: html("Making it one click to sign up and a phone call, a hidden menu, or multiple confirmation screens to cancel — easy in, hard out.") },
    { name: "Fabricated urgency or scarcity", body: html("A countdown timer that resets on refresh, or an \"only 2 left!\" label that doesn't reflect real inventory, manufactures pressure that isn't real.") },
    { name: "Drip pricing and forced continuity", body: html("Drip pricing reveals mandatory fees only at the final checkout step, after the reader has already invested time choosing items, instead of showing the full cost upfront. Forced continuity is the subscription version of the same trick: a \"free\" trial that quietly converts into a paid plan unless the reader finds and uses a well-hidden way to stop it before it charges them.") },
    { name: "Misdirection", body: html("Designing one option to visually dominate the screen — bright color, larger button, default focus — while the option the reader actually wants is small, gray, or easy to miss. Both choices are technically available; only one of them was designed to be found. A close cousin is <strong>bait and switch</strong>: the reader takes an action expecting one outcome and a different one happens instead, such as a \"Skip\" button that quietly starts a paid trial.") },
  ],
  checklist: [
    html("No box is pre-checked for anything beyond what's strictly required to use the product."),
    html("A decline or \"no\" option uses neutral wording — no guilt, no invented downside, no double negative to parse."),
    html("Canceling, unsubscribing, or deleting an account takes the same number of steps as signing up did, or fewer."),
    html("Every fee and mandatory cost is visible before the reader enters payment details, not revealed at the final step."),
    html("A free trial states plainly, before signup, when it ends and what happens next — and reminds the reader before the first paid charge, not just inside a settings menu they'd have to go looking for."),
    html("Any urgency or scarcity claim shown on the page is real, and would still be true if a reader fact-checked it."),
    html("You'd be comfortable narrating this flow out loud, in plain words, to the person going through it, before they click — and they wouldn't feel tricked by what you described."),
  ],
  practiceCourseId: "dark-patterns-ethics",
  goDeeper: [
    { lead: "Where the terminology comes from", body: html("UX (user experience) researcher Harry Brignull coined \"dark pattern\" in 2010 and cataloged recurring types — the roach motel, confirmshaming, and others named above are his terms, now in common industry use. Brignull himself has since moved to calling them \"deceptive patterns\" instead, renaming his own site to deceptive.design on the advice of the World Wide Web Foundation's Tech Policy Design Lab, which flagged that \"dark\" can carry unintended racial connotations. Both terms describe the same thing; this page uses \"dark patterns\" because it remains the more widely recognized term, not because the shift isn't worth knowing about.") },
    { lead: "Regulatory enforcement", body: html("The FTC (the U.S. Federal Trade Commission) and regulators under the EU's Digital Services Act (DSA) and Digital Markets Act (DMA) have both taken enforcement action specifically citing dark-pattern design, treating manipulative interface design as a compliance issue distinct from the underlying business practice. The FTC's clearest case is its suit against Amazon over Prime: the cancellation flow, internally nicknamed the \"Iliad Flow,\" took six clicks across four screens against a one-click signup, and in September 2025 Amazon agreed to pay $2.5 billion — $1 billion in civil penalties plus $1.5 billion in consumer refunds — the largest civil penalty the FTC has ever obtained for a rule violation. In December 2025, the European Commission fined X (formerly Twitter) €120 million — the DSA's first formal non-compliance decision — citing, among other breaches, a \"verified\" blue-checkmark badge the Commission found deceptive: it kept implying identity verification even though anyone could get it by paying, with no identity check at all.") },
    { lead: "Compliance theater vs. genuine consent", body: html("A cookie banner that makes \"Reject all\" three clicks deeper than \"Accept all,\" while technically offering a choice, is itself a dark pattern — the presence of an opt-out doesn't make a design ethical if the opt-out is deliberately harder to find or use.") },
    { lead: "Five categories, not a random list", body: html("The examples on this page map onto the five categories the most-cited academic taxonomy of dark patterns (Gray, Kou, Battles, Hoggatt &amp; Toombs, presented at CHI 2018) sorts them into: <em>sneaking</em> (drip pricing and forced continuity, above), <em>obstruction</em> (the roach motel), <em>interface interference</em> (misdirection and confirmshaming), <em>nagging</em> (the repeated permission prompt), and <em>forced action</em> (blocking a feature until the reader hands over data it doesn't need).") },
    { lead: "Algorithmic patterns, not just interface ones", body: html("Every example above is a decision inside a single screen. Some of the highest-stakes manipulation now happens at the feed level instead. In July 2026 the European Commission issued preliminary findings that Meta's Facebook and Instagram breach the DSA through addictive-by-design features — infinite scroll, autoplay, and recommendation feeds tuned to keep someone scrolling past the point they meant to stop — with a similar preliminary finding against TikTok in February 2026. Neither feature hides a fact from the reader the way a dark pattern does; both work by removing the natural stopping cues a person would otherwise notice.") },
    { lead: "Beyond avoiding harm: accessibility and active ethical design", body: html("Avoiding dark patterns keeps an interface from working against someone; it doesn't make the interface work for everyone. Locking out people who rely on assistive technology, or shipping markup that fails <a href=\"/design-principles/principles/accessibility.html\">accessibility</a> basics, excludes just as deliberately as a dark pattern deceives — a different ethical failure, but not a lesser one. For a framework aimed at the positive case — designing for a person's attention and wellbeing, not just refraining from abusing it — see the Center for Humane Technology, a nonprofit founded by former tech insiders that researches and advocates for less extractive product design.") },
  ],
  datePublished: "2026-07-27",
};
