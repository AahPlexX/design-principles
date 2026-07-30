/**
 * Craft progress: quiz answering, lesson checkmarks, and course badges.
 *
 * A port of the original `docs/assets/craft-progress.js`. The storage key, the stored shape
 * (`{ courseId: { lessonId: true } }`) and the two lesson-id formats (`lesson-3`,
 * `level-2-lesson-3`) are all unchanged — real visitors have progress recorded under them, and any
 * change here silently discards it.
 *
 * Progress is per-browser by design. No accounts, no server, and no points, streaks or leaderboards.
 */

const STORAGE_KEY = "craft-progress";

export type Progress = Record<string, Record<string, boolean>>;

export function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    // Guard the shape rather than trusting it: this value has been written by earlier versions of the
    // site and can be edited by hand.
    return typeof parsed === "object" && parsed !== null ? (parsed as Progress) : {};
  } catch {
    return {};
  }
}

export function markComplete(courseId: string, lessonId: string): void {
  const progress = readProgress();
  progress[courseId] = { ...progress[courseId], [lessonId]: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Degrade silently — the lesson still shows its feedback, it just will not be remembered.
  }
}

export function isComplete(courseId: string, lessonId: string): boolean {
  return readProgress()[courseId]?.[lessonId] === true;
}

export function countComplete(courseId: string): number {
  const course = readProgress()[courseId];
  return course ? Object.values(course).filter(Boolean).length : 0;
}

/**
 * Quiz answering.
 *
 * One shot: the first click locks the question. All options are disabled, the correct one is marked,
 * a wrong pick is marked as wrong, and the explanation is revealed. The lesson counts as complete
 * either way — the original behaved this way, and the point is reading the explanation, not scoring.
 */
function enhanceQuiz(quiz: HTMLElement): void {
  const courseId = quiz.dataset.course;
  const lessonId = quiz.dataset.lesson;
  const options = [...quiz.querySelectorAll<HTMLButtonElement>("[data-quiz-option]")];
  const feedback = quiz.querySelector<HTMLElement>("[data-quiz-feedback]");
  const status = quiz.querySelector<HTMLElement>("[data-quiz-status]");

  for (const option of options) {
    option.addEventListener("click", () => {
      if (quiz.dataset.answered === "true") return;
      quiz.dataset.answered = "true";

      const wasCorrect = option.dataset.correct === "true";

      for (const other of options) {
        other.disabled = true;
        other.setAttribute("aria-disabled", "true");
        if (other.dataset.correct === "true") other.dataset.state = "correct";
        else if (other === option) other.dataset.state = "incorrect";
      }

      if (feedback) {
        feedback.hidden = false;
        feedback.dataset.state = wasCorrect ? "correct" : "incorrect";
      }

      // Announced politely so a screen reader hears the verdict without the focus being moved.
      if (status) status.textContent = wasCorrect ? "Correct." : "Not quite.";

      if (courseId && lessonId) {
        markComplete(courseId, lessonId);
        markLessonInLists(courseId, lessonId);
      }
    });
  }
}

/** Ticks a lesson in any on-page lesson list, so answering updates the list without a reload. */
function markLessonInLists(courseId: string, lessonId: string): void {
  const selector = `[data-lesson-list][data-course="${courseId}"] [data-lesson="${lessonId}"]`;
  for (const item of document.querySelectorAll<HTMLElement>(selector)) {
    item.dataset.complete = "true";
  }
}

function renderLessonLists(): void {
  for (const list of document.querySelectorAll<HTMLElement>("[data-lesson-list][data-course]")) {
    const courseId = list.dataset.course;
    if (!courseId) continue;
    for (const item of list.querySelectorAll<HTMLElement>("[data-lesson]")) {
      const lessonId = item.dataset.lesson;
      if (lessonId && isComplete(courseId, lessonId)) item.dataset.complete = "true";
    }
  }
}

/**
 * Course progress badges.
 *
 * Hidden at zero rather than showing "0/39", which reads as a scolding on a course nobody has started.
 */
function renderCourseBadges(): void {
  for (const badge of document.querySelectorAll<HTMLElement>("[data-course-progress]")) {
    const courseId = badge.dataset.courseProgress;
    if (!courseId) continue;
    const total = Number(badge.dataset.totalLessons ?? "0");
    const done = countComplete(courseId);
    if (done <= 0) continue;
    badge.hidden = false;
    badge.textContent = done >= total ? "Complete" : `${String(done)}/${String(total)} done`;
    badge.dataset.state = done >= total ? "complete" : "partial";
  }
}

/** Fills in a course page's overall progress meter, when the page has one. */
function renderCourseMeter(): void {
  for (const meter of document.querySelectorAll<HTMLElement>("[data-course-meter]")) {
    const courseId = meter.dataset.courseMeter;
    if (!courseId) continue;
    const total = Number(meter.dataset.totalLessons ?? "0");
    const done = Math.min(countComplete(courseId), total);
    const label = meter.querySelector<HTMLElement>("[data-meter-label]");
    const fill = meter.querySelector<HTMLElement>("[data-meter-fill]");
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    meter.setAttribute("aria-valuenow", String(done));
    if (fill) fill.style.inlineSize = `${String(percent)}%`;
    if (label) {
      label.textContent =
        done === 0
          ? `${String(total)} lessons`
          : `${String(done)} of ${String(total)} lessons done`;
    }
  }
}

export function enhanceProgress(): void {
  for (const quiz of document.querySelectorAll<HTMLElement>("[data-quiz]")) {
    enhanceQuiz(quiz);
  }
  renderLessonLists();
  renderCourseBadges();
  renderCourseMeter();
}
