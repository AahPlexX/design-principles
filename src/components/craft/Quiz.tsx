import { Check, X } from "lucide-react";

import { CodeBlock } from "@/components/common/CodeBlock";
import { ContentHtml } from "@/components/common/ContentHtml";
import type { Lesson } from "@/content/types";

/** The id the prompt is published under, so the option group can borrow it as its accessible name. */
const PROMPT_ID = "quiz-prompt";

interface QuizProps {
  readonly lesson: Lesson;
}

/**
 * The lesson's one practice question.
 *
 * Answered by an enhancer, not by React. The question, its four options and the explanation are all in
 * the HTML already; hydrating them through a component would ship every word of that a second time as
 * JSON props on 144 pages, to add behaviour that amounts to four attribute writes. So this renders the
 * markup `enhanceProgress` expects and nothing else: `[data-quiz]` with the course and lesson ids,
 * `[data-quiz-option]` buttons carrying `data-correct`, a hidden `[data-quiz-feedback]`, and a live
 * `[data-quiz-status]`.
 *
 * Every state the enhancer can produce is styled here through `data-*` variants, because the enhancer
 * only ever sets attributes — it never adds elements. That is why the tick and the cross are rendered
 * up front and revealed by CSS rather than inserted on answer.
 *
 * One shot, and answering at all marks the lesson complete whether the answer was right or wrong. That
 * is the original behaviour and it is deliberate: what the lesson is for is the explanation underneath,
 * not the guess. There is no score anywhere in here, by rule.
 */
export function Quiz({ lesson }: QuizProps) {
  return (
    <div
      data-quiz
      data-course={lesson.courseId}
      data-lesson={lesson.lessonId}
      className="print-flat rounded-lg border border-line bg-surface p-4 sm:p-5"
    >
      {/*
       * The prompt is a short sequence of blocks, not one paragraph: seven lessons put a code sample
       * between two paragraphs, so this maps over whatever the content gives it rather than assuming a
       * shape. Its container carries the id the option group is named by.
       */}
      <div id={PROMPT_ID} className="space-y-3">
        {lesson.quiz.prompt.map((block, index) =>
          block.kind === "text" ? (
            <ContentHtml key={block.html} html={block.html} className="text-ink" />
          ) : (
            <CodeBlock
              // A code sample has no natural key and two could in principle be identical, so position is
              // the identity. The array is built once at build time and never reorders.
              key={`code-${String(index)}`}
              code={block.code}
              className="bg-canvas"
            />
          ),
        )}
      </div>

      {/*
       * The options are a set of alternatives, so they are grouped and the group is named by the
       * question — a reader arriving on the first button hears what it is answering rather than four
       * unrelated sentences. `role="group"` rather than a `<fieldset>`: these are buttons, not form
       * controls, and a `<legend>` cannot hold the code sample that seven of these questions contain.
       */}
      <div role="group" aria-labelledby={PROMPT_ID} className="mt-4 flex flex-col gap-2">
        {lesson.quiz.options.map((option) => (
          <button
            key={option.text}
            type="button"
            data-quiz-option
            data-correct={option.correct ? "true" : "false"}
            className={[
              "group flex w-full items-start gap-2.5 rounded-md border border-line-strong bg-surface-raised px-3.5 py-2.5",
              "text-start text-[0.9375rem] leading-relaxed text-ink transition-colors",
              // Scoped to `enabled` so the hover tint cannot repaint over the verdict once the question
              // is locked and every option is disabled.
              "enabled:hover:border-accent enabled:hover:bg-accent-soft/40 disabled:cursor-default",
              "data-[state=correct]:border-good data-[state=correct]:bg-good-soft",
              "data-[state=incorrect]:border-bad data-[state=incorrect]:bg-bad-soft",
              "print-flat",
            ].join(" ")}
          >
            <VerdictMark />
            <ContentHtml as="span" html={option.text} className="min-w-0 flex-1" />
            {/*
             * The verdict in words, after the option so it reads as a suffix to it rather than a prefix.
             * Toggled with `display`, which is what takes it out of the accessibility tree as well as
             * off the screen — an unfinished question must not announce a verdict it does not have.
             */}
            <span className="sr-only hidden group-data-[state=correct]:inline">
              Correct answer.
            </span>
            <span className="sr-only hidden group-data-[state=incorrect]:inline">
              Your answer. Incorrect.
            </span>
          </button>
        ))}
      </div>

      {/*
       * The explanation. Identical either way — why the answer is what it is does not depend on what was
       * guessed — so only the accent and the verdict word differ. Hidden until answered; the enhancer
       * unhides it and sets `data-state`.
       */}
      <div
        data-quiz-feedback
        hidden
        className="print-flat group mt-4 rounded-e-md border-s-4 border-s-line bg-canvas py-3 ps-4 pe-4 data-[state=correct]:border-s-good data-[state=incorrect]:border-s-bad"
      >
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          <Check
            aria-hidden="true"
            className="hidden size-4 shrink-0 text-good group-data-[state=correct]:block"
          />
          <X
            aria-hidden="true"
            className="hidden size-4 shrink-0 text-bad group-data-[state=incorrect]:block"
          />
          <span className="hidden text-good group-data-[state=correct]:inline">Correct</span>
          <span className="hidden text-bad group-data-[state=incorrect]:inline">Not quite</span>
        </p>
        <ContentHtml html={lesson.quiz.feedback} className="mt-1 text-ink-muted" />
      </div>

      {/*
       * The verdict, announced rather than shown. Politely, and without moving focus: the reader is
       * about to read the explanation, and yanking them to it is worse than telling them it arrived.
       * Visually hidden because the same verdict is already printed above the explanation.
       */}
      <p data-quiz-status aria-live="polite" aria-atomic="true" className="sr-only" />
    </div>
  );
}

/**
 * The mark on an option once the question is answered.
 *
 * A ring at rest, a tick or a cross after. Both marks are always in the DOM and revealed by their
 * button's `data-state`, and the shapes differ as well as the colours — this is the site that tells
 * readers not to let colour carry meaning alone, and the marks survive `print-flat` flattening every
 * tint to black on white.
 *
 * Reserving the ring's space at rest is what stops the row of options shifting sideways when one of them
 * gains a mark.
 */
function VerdictMark() {
  return (
    <span aria-hidden="true" className="mt-[0.3em] block size-[1.05em] shrink-0">
      <span className="block size-full rounded-full border-2 border-line-strong group-data-[state=correct]:hidden group-data-[state=incorrect]:hidden" />
      <Check className="hidden size-full text-good group-data-[state=correct]:block" />
      <X className="hidden size-full text-bad group-data-[state=incorrect]:block" />
    </span>
  );
}
