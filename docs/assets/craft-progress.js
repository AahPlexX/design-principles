(function () {
  "use strict";

  var STORAGE_KEY = "craft-progress";

  function readProgress() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function markComplete(courseId, lessonId) {
    var progress = readProgress();
    progress[courseId] = progress[courseId] || {};
    progress[courseId][lessonId] = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      /* localStorage unavailable (private browsing, disabled storage) -- degrade silently */
    }
  }

  function isComplete(courseId, lessonId) {
    var progress = readProgress();
    return !!(progress[courseId] && progress[courseId][lessonId]);
  }

  function countComplete(courseId) {
    var progress = readProgress();
    var course = progress[courseId];
    if (!course) return 0;
    var n = 0;
    for (var key in course) {
      if (course[key]) n++;
    }
    return n;
  }

  function initQuizzes() {
    var quizzes = Array.prototype.slice.call(document.querySelectorAll("[data-quiz]"));
    quizzes.forEach(function (quiz) {
      var courseId = quiz.getAttribute("data-course");
      var lessonId = quiz.getAttribute("data-lesson");
      var options = Array.prototype.slice.call(quiz.querySelectorAll(".quiz-option"));
      var feedback = quiz.querySelector(".quiz-feedback");

      options.forEach(function (option) {
        option.addEventListener("click", function () {
          var wasCorrect = option.getAttribute("data-correct") === "true";

          options.forEach(function (opt) {
            opt.disabled = true;
            if (opt.getAttribute("data-correct") === "true") {
              opt.classList.add("is-correct");
            } else if (opt === option) {
              opt.classList.add("is-incorrect");
            }
          });

          if (feedback) {
            feedback.hidden = false;
            feedback.setAttribute("data-state", wasCorrect ? "correct" : "incorrect");
          }

          if (courseId && lessonId) {
            markComplete(courseId, lessonId);
          }
        });
      });
    });
  }

  function renderLessonProgress() {
    var lists = Array.prototype.slice.call(document.querySelectorAll(".lesson-progress-list[data-course]"));
    lists.forEach(function (list) {
      var courseId = list.getAttribute("data-course");
      var items = Array.prototype.slice.call(list.querySelectorAll("li[data-lesson]"));
      items.forEach(function (item) {
        var lessonId = item.getAttribute("data-lesson");
        if (isComplete(courseId, lessonId)) {
          item.setAttribute("data-complete", "true");
        }
      });
    });
  }

  function renderCourseBadges() {
    var badges = Array.prototype.slice.call(document.querySelectorAll("[data-course-progress]"));
    badges.forEach(function (badge) {
      var courseId = badge.getAttribute("data-course-progress");
      var total = parseInt(badge.getAttribute("data-total-lessons"), 10) || 0;
      var done = countComplete(courseId);
      if (done <= 0) return;
      badge.hidden = false;
      badge.textContent = done >= total ? "✓ Complete" : done + "/" + total + " complete";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initQuizzes();
    renderLessonProgress();
    renderCourseBadges();
  });
})();
