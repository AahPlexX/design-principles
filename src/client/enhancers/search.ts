/**
 * Home page filter box.
 *
 * A port of the original inline script, with two fixes: the result count is announced to screen
 * readers, and a group heading is hidden when every card under it is filtered out — previously the
 * heading stayed while its grid emptied, which read as a section with no content.
 */
export function enhanceSearch(): void {
  const found = document.querySelector<HTMLInputElement>("[data-search-input]");
  if (!found) return;
  // Bound to a const so the closures below keep the narrowed, non-null type.
  const input = found;

  const cards = [...document.querySelectorAll<HTMLElement>("[data-search-card]")];
  const groups = [...document.querySelectorAll<HTMLElement>("[data-search-group]")];
  const empty = document.querySelector<HTMLElement>("[data-search-empty]");
  const status = document.querySelector<HTMLElement>("[data-search-status]");
  const clear = document.querySelector<HTMLButtonElement>("[data-search-clear]");

  function apply(): void {
    const query = input.value.trim().toLowerCase();
    let matches = 0;

    for (const card of cards) {
      const haystack = card.dataset.searchCard ?? "";
      const hit = query === "" || haystack.includes(query);
      card.hidden = !hit;
      if (hit) matches += 1;
    }

    for (const group of groups) {
      const anyVisible = [...group.querySelectorAll<HTMLElement>("[data-search-card]")].some(
        (card) => !card.hidden,
      );
      group.hidden = !anyVisible;
    }

    if (empty) empty.hidden = matches > 0;
    if (clear) clear.hidden = query === "";

    if (status) {
      status.textContent =
        query === ""
          ? ""
          : matches === 0
            ? `No principles match “${input.value.trim()}”.`
            : `${String(matches)} ${matches === 1 ? "principle matches" : "principles match"}.`;
    }
  }

  input.addEventListener("input", apply);

  clear?.addEventListener("click", () => {
    input.value = "";
    apply();
    input.focus();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && input.value !== "") {
      input.value = "";
      apply();
    }
  });

  // Restore state on back-navigation, where the browser repopulates the field but fires no event.
  if (input.value !== "") apply();
}
