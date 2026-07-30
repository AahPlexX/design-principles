import "@testing-library/jest-dom/vitest";

import { afterEach, beforeEach } from "vitest";

/**
 * Storage is shared state across tests and the code under test reads it on import in places, so it is
 * cleared around every test rather than trusted to be empty.
 */
beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

afterEach(() => {
  window.localStorage.clear();
  document.body.innerHTML = "";
});
