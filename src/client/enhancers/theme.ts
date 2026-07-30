/**
 * Theme switching.
 *
 * A port of the original `docs/assets/theme.js`. The storage key and its two accepted values are
 * unchanged, because visitors already have this value set and rewriting it would reset their choice.
 */

const STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * The stored preference, or null when the reader has never chosen.
 *
 * Anything other than the two known literals is treated as absent rather than repaired: a junk value
 * means something else wrote to this key, and guessing what it meant is worse than falling back to the
 * system preference.
 */
export function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Storage can throw outright in private browsing or with storage disabled.
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function effectiveTheme(): Theme {
  return storedTheme() ?? systemTheme();
}

function updateToggle(theme: Theme): void {
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const next: Theme = theme === "dark" ? "light" : "dark";
  button.setAttribute("aria-label", `Switch to ${next} theme`);
  button.setAttribute("aria-pressed", String(theme === "dark"));
}

export function applyTheme(theme: Theme, persist: boolean): void {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Degrade silently: the theme still applies for this page view, it just will not be remembered.
    }
  }
  updateToggle(theme);
}

export function enhanceTheme(): void {
  // The inline <head> script has already set the attribute when a preference was stored. This call
  // covers the no-preference case and, either way, corrects the toggle's labelling — the prerendered
  // HTML is one file for all readers, so it ships with the light-mode labels.
  applyTheme(effectiveTheme(), false);

  const button = document.querySelector<HTMLButtonElement>('[data-enhance="theme-toggle"]');
  button?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const theme: Theme =
      current === "dark" ? "dark" : current === "light" ? "light" : effectiveTheme();
    applyTheme(theme === "dark" ? "light" : "dark", true);
  });

  // The original never did this, so changing the OS theme mid-session had no effect until reload.
  // Only readers who have not made an explicit choice are followed, so this cannot override a choice.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (storedTheme() === null) applyTheme(event.matches ? "dark" : "light", false);
  });
}
