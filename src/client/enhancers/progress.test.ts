/**
 * Tests for the craft progress enhancer.
 *
 * The DOM under test is the real thing: each case renders the actual page component with
 * `renderToStaticMarkup` and drops the result into the document, exactly as the prerenderer does. A
 * hand-written fixture would let the markup and the enhancer drift apart in opposite directions and
 * still pass — which is the specific failure these tests exist to prevent, since the contract between
 * them is a set of `data-*` attributes with no type to check them against.
 *
 * The storage assertions are deliberately literal. The key is `"craft-progress"` and the shape is
 * `{ [courseId]: { [lessonId]: true } }`, with lesson ids in two formats that must both survive.
 * Returning visitors have data under exactly that, and renaming any part of it silently throws their
 * progress away, so these read the raw string rather than going through `readProgress`.
 */
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getCourse } from "@/content";
import type { Lesson } from "@/content/types";
import { findLesson, orderedLessons } from "@/lib/routes";
import { CoursePage } from "@/pages/CoursePage";
import { CraftIndexPage } from "@/pages/CraftIndexPage";
import { LessonPage } from "@/pages/LessonPage";

import { countComplete, enhanceProgress, isComplete, readProgress } from "./progress";

const STORAGE_KEY = "craft-progress";

function mount(element: ReactElement): void {
  document.body.innerHTML = renderToStaticMarkup(element);
}

function lesson(courseId: string, lessonId: string): Lesson {
  const found = findLesson(courseId, lessonId);
  if (!found) throw new Error(`test fixture expects ${courseId}/${lessonId} to exist`);
  return found;
}

/** Renders a lesson page, attaches the enhancer, and hands back the parts of the quiz under test. */
function mountLesson(courseId: string, lessonId: string) {
  const target = lesson(courseId, lessonId);
  mount(createElement(LessonPage, { course: getCourse(courseId), lesson: target }));
  enhanceProgress();

  const quiz = document.querySelector<HTMLElement>("[data-quiz]");
  if (!quiz) throw new Error("the lesson page rendered no [data-quiz] container");

  const options = [...quiz.querySelectorAll<HTMLButtonElement>("[data-quiz-option]")];
  const correct = options.find((option) => option.dataset.correct === "true");
  const wrong = options.find((option) => option.dataset.correct !== "true");
  if (!correct || !wrong) throw new Error("the quiz needs one correct and one wrong option");

  return {
    quiz,
    options,
    correct,
    wrong,
    feedback: quiz.querySelector<HTMLElement>("[data-quiz-feedback]"),
    status: quiz.querySelector<HTMLElement>("[data-quiz-status]"),
  };
}

function storedJson(): unknown {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === null ? null : JSON.parse(raw);
}

function badgeFor(courseId: string): HTMLElement {
  const badge = document.querySelector<HTMLElement>(`[data-course-progress="${courseId}"]`);
  if (!badge) throw new Error(`no progress badge rendered for course "${courseId}"`);
  return badge;
}

describe("answering a quiz", () => {
  it("records the lesson under the exact storage key and shape", () => {
    const { correct } = mountLesson("accessibility", "lesson-1");

    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    correct.click();

    expect(storedJson()).toEqual({ accessibility: { "lesson-1": true } });
    expect(isComplete("accessibility", "lesson-1")).toBe(true);
  });

  it("keeps the levelled lesson-id format rather than normalising it", () => {
    // Two id formats exist and both are live localStorage keys. Flattening `level-2-lesson-3` into
    // `lesson-3` would collide with the flat-course format and discard recorded progress.
    const { correct } = mountLesson("spacing-layout", "level-2-lesson-3");
    correct.click();

    expect(storedJson()).toEqual({ "spacing-layout": { "level-2-lesson-3": true } });
  });

  it("merges into existing progress instead of replacing it", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accessibility: { "lesson-3": true },
        typography: { "lesson-1": true },
      }),
    );

    const { correct } = mountLesson("accessibility", "lesson-1");
    correct.click();

    expect(storedJson()).toEqual({
      accessibility: { "lesson-3": true, "lesson-1": true },
      typography: { "lesson-1": true },
    });
  });

  it("marks the lesson complete even when the answer is wrong", () => {
    const { wrong } = mountLesson("accessibility", "lesson-2");
    wrong.click();

    expect(storedJson()).toEqual({ accessibility: { "lesson-2": true } });
  });

  it("disables every option after one answer", () => {
    const { options, wrong } = mountLesson("accessibility", "lesson-1");

    expect(options).toHaveLength(4);
    expect(options.every((option) => option.disabled)).toBe(false);

    wrong.click();

    for (const option of options) {
      expect(option.disabled).toBe(true);
      expect(option.getAttribute("aria-disabled")).toBe("true");
    }
  });

  it("marks the correct option even when a wrong one was clicked", () => {
    const { options, correct, wrong } = mountLesson("accessibility", "lesson-1");

    wrong.click();

    expect(correct.dataset.state).toBe("correct");
    expect(wrong.dataset.state).toBe("incorrect");

    // The two options that were neither picked nor correct stay unmarked, so the reader is not shown
    // three verdicts for one answer.
    const untouched = options.filter((option) => option !== correct && option !== wrong);
    expect(untouched).toHaveLength(2);
    for (const option of untouched) expect(option.dataset.state).toBeUndefined();
  });

  it("reveals the explanation with the state that matches the answer", () => {
    const right = mountLesson("accessibility", "lesson-1");

    expect(right.feedback?.hidden).toBe(true);
    expect(right.feedback?.dataset.state).toBeUndefined();

    right.correct.click();

    expect(right.feedback?.hidden).toBe(false);
    expect(right.feedback?.dataset.state).toBe("correct");
    expect(right.status?.textContent).toBe("Correct.");

    const wrongAnswer = mountLesson("accessibility", "lesson-2");
    wrongAnswer.wrong.click();

    expect(wrongAnswer.feedback?.hidden).toBe(false);
    expect(wrongAnswer.feedback?.dataset.state).toBe("incorrect");
    expect(wrongAnswer.status?.textContent).toBe("Not quite.");
  });

  it("locks the question after the first answer", () => {
    const { quiz, correct, wrong } = mountLesson("accessibility", "lesson-1");

    wrong.click();
    expect(quiz.dataset.answered).toBe("true");

    // A second click, however it is dispatched, must not turn a wrong answer into a right one.
    correct.click();
    expect(wrong.dataset.state).toBe("incorrect");
    expect(correct.dataset.state).toBe("correct");
  });
});

describe("course progress badges", () => {
  it("stays hidden and empty at zero", () => {
    mount(createElement(CraftIndexPage));
    enhanceProgress();

    const badge = badgeFor("accessibility");
    expect(badge.hidden).toBe(true);
    expect(badge.textContent).toBe("");
    expect(badge.dataset.state).toBeUndefined();
  });

  it("shows the count at partial completion", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accessibility: { "lesson-1": true, "lesson-2": true } }),
    );

    mount(createElement(CraftIndexPage));
    enhanceProgress();

    const badge = badgeFor("accessibility");
    expect(badge.dataset.totalLessons).toBe("3");
    expect(badge.hidden).toBe(false);
    expect(badge.textContent).toBe("2/3 done");
    expect(badge.dataset.state).toBe("partial");
  });

  it('reads "Complete" once every lesson is done', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accessibility: { "lesson-1": true, "lesson-2": true, "lesson-3": true } }),
    );

    mount(createElement(CraftIndexPage));
    enhanceProgress();

    const badge = badgeFor("accessibility");
    expect(badge.hidden).toBe(false);
    expect(badge.textContent).toBe("Complete");
    expect(badge.dataset.state).toBe("complete");
  });

  it("leaves the other courses' badges alone", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accessibility: { "lesson-1": true } }),
    );

    mount(createElement(CraftIndexPage));
    enhanceProgress();

    expect(badgeFor("accessibility").hidden).toBe(false);
    for (const courseId of ["typography", "color-contrast", "dark-patterns-ethics"]) {
      expect(badgeFor(courseId).hidden).toBe(true);
    }
  });

  it("derives the denominator from the course rather than the markup", () => {
    // Every badge's `data-total-lessons` has to agree with the course structure. The pre-migration
    // catalog typed these in by hand and two of them had drifted.
    mount(createElement(CraftIndexPage));

    for (const course of ["visual-hierarchy", "color-contrast", "spacing-layout", "typography"]) {
      expect(badgeFor(course).dataset.totalLessons).toBe(
        String(orderedLessons(getCourse(course)).length),
      );
    }
  });
});

describe("the course page", () => {
  it("ticks the lessons already finished and leaves the rest alone", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "color-contrast": { "level-1-lesson-1": true, "level-3-lesson-2": true } }),
    );

    mount(createElement(CoursePage, { course: getCourse("color-contrast") }));
    enhanceProgress();

    const list = document.querySelector<HTMLElement>(
      '[data-lesson-list][data-course="color-contrast"]',
    );
    expect(list).not.toBeNull();

    const items = [...document.querySelectorAll<HTMLElement>("[data-lesson]")];
    expect(items).toHaveLength(39);

    const complete = items.filter((item) => item.dataset.complete === "true");
    expect(complete.map((item) => item.dataset.lesson)).toEqual([
      "level-1-lesson-1",
      "level-3-lesson-2",
    ]);
  });

  it("fills the meter and updates the value it announces", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accessibility: { "lesson-1": true } }),
    );

    mount(createElement(CoursePage, { course: getCourse("accessibility") }));
    const meter = document.querySelector<HTMLElement>("[data-course-meter]");
    if (!meter) throw new Error("the course page rendered no [data-course-meter]");

    /*
     * The role lives on the track rather than the wrapper on purpose: `progressbar` makes its subtree
     * presentational, so a label nested inside it is dropped from the accessibility tree entirely. With
     * the role on the track, the visible count is announced as text *and* the bar still reports a
     * number — and the label is referenced by `aria-labelledby` so the bar is named by the same string
     * a sighted reader sees.
     */
    const track = meter.querySelector<HTMLElement>("[data-meter-track]");
    if (!track) throw new Error("the course page rendered no [data-meter-track]");
    const label = meter.querySelector<HTMLElement>("[data-meter-label]");

    expect(meter.getAttribute("role")).toBeNull();
    expect(track.getAttribute("role")).toBe("progressbar");
    expect(track.getAttribute("aria-labelledby")).toBe(label?.id);
    expect(label?.id).toBeTruthy();

    // The served HTML has to describe zero progress, because it is one file for every reader.
    expect(track.getAttribute("aria-valuenow")).toBe("0");
    expect(track.getAttribute("aria-valuemin")).toBe("0");
    expect(track.getAttribute("aria-valuemax")).toBe("3");
    expect(label?.textContent).toBe("3 lessons");

    enhanceProgress();

    expect(track.getAttribute("aria-valuenow")).toBe("1");
    expect(label?.textContent).toBe("1 of 3 lessons done");
    expect(meter.querySelector<HTMLElement>("[data-meter-fill]")?.style.inlineSize).toBe("33%");
  });

  it("counts progress per course", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accessibility: { "lesson-1": true, "lesson-2": true },
        typography: { "lesson-1": true },
      }),
    );

    expect(countComplete("accessibility")).toBe(2);
    expect(countComplete("typography")).toBe(1);
    expect(countComplete("forms-inputs")).toBe(0);
  });

  it("ticks a lesson in an on-page list the moment its quiz is answered", () => {
    /*
     * No shipped page puts a course's lesson list and one of its quizzes in the same document, so this
     * composes them. The selector `markLessonInLists` uses is coupled to both components' markup, and
     * this is the only place that pairing gets exercised.
     */
    const course = getCourse("accessibility");
    const target = lesson("accessibility", "lesson-2");
    document.body.innerHTML =
      renderToStaticMarkup(createElement(CoursePage, { course })) +
      renderToStaticMarkup(createElement(LessonPage, { course, lesson: target }));
    enhanceProgress();

    const item = document.querySelector<HTMLElement>('[data-lesson="lesson-2"]');
    expect(item?.dataset.complete).toBeUndefined();

    document.querySelector<HTMLButtonElement>("[data-quiz-option]")?.click();

    expect(item?.dataset.complete).toBe("true");
  });
});

describe("unusable storage", () => {
  it("degrades to empty progress when the stored value is not JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");

    expect(() => readProgress()).not.toThrow();
    expect(readProgress()).toEqual({});
    expect(countComplete("accessibility")).toBe(0);

    mount(createElement(CraftIndexPage));
    expect(() => {
      enhanceProgress();
    }).not.toThrow();
    expect(badgeFor("accessibility").hidden).toBe(true);
  });

  it("degrades to empty progress when the stored JSON is not an object", () => {
    for (const value of ["null", "42", '"lesson-1"']) {
      window.localStorage.setItem(STORAGE_KEY, value);
      expect(readProgress()).toEqual({});
    }
  });

  it("still lets the reader answer, and records the answer, over a corrupt value", () => {
    window.localStorage.setItem(STORAGE_KEY, "]]not json[[");

    const { correct, feedback } = mountLesson("accessibility", "lesson-1");
    correct.click();

    expect(feedback?.hidden).toBe(false);
    expect(storedJson()).toEqual({ accessibility: { "lesson-1": true } });
  });

  /*
   * An array is the one corrupt value that a `typeof x === "object"` guard lets through, and the failure
   * it used to cause was invisible: reads returned zero, answering looked like it worked, and
   * `JSON.stringify` dropped the named property set on the array — so progress was never written, for
   * good. Reading zero from a bad value is acceptable; failing to record from then on is not.
   */
  it("recovers from an array, which passes a typeof object check but cannot store progress", () => {
    for (const value of ["[]", "[1,2,3]"]) {
      window.localStorage.clear();
      window.localStorage.setItem(STORAGE_KEY, value);

      expect(readProgress()).toEqual({});

      const { correct } = mountLesson("accessibility", "lesson-1");
      correct.click();

      expect(storedJson()).toEqual({ accessibility: { "lesson-1": true } });
      expect(countComplete("accessibility")).toBe(1);
    }
  });
});
