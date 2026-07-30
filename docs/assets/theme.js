(function () {
  "use strict";

  var STORAGE_KEY = "theme";

  function storedTheme() {
    try {
      var t = window.localStorage.getItem(STORAGE_KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function effectiveTheme() {
    return storedTheme() || systemTheme();
  }

  function updateButton(theme) {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var next = theme === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* localStorage unavailable (private browsing, disabled storage) -- degrade silently */
      }
    }
    updateButton(theme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(effectiveTheme(), false);

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || effectiveTheme();
        applyTheme(current === "dark" ? "light" : "dark", true);
      });
    }
  });
})();
