/**
 * Tests for the home page filter box.
 *
 * The DOM under test is the real page: every case renders `HomePage` with `renderToStaticMarkup` and
 * drops the result into the document, exactly as the prerenderer does. The contract between the template
 * and this enhancer is a set of `data-*` attributes with no type to check them against, so a hand-written
 * fixture would let the two drift apart in opposite directions and keep passing — which is the specific
 * failure these tests exist to prevent. Rename an attribute in either place and these break.
 *
 * `principle.searchKeywords` is the haystack, and it is deliberately wider than the visible text: it
 * carries synonyms and abbreviations the card does not show, which is why "i18n" has to find
 * Internationalization & Localization even though those four characters appear nowhere on screen.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { principles } from "@/content";
import { categoryId, PRINCIPLE_CATEGORIES } from "@/content/site";
import type { PrincipleCategory } from "@/content/types";
import { HomePage } from "@/pages/HomePage";

import { enhanceSearch } from "./search";

interface Box {
  readonly input: HTMLInputElement;
  readonly cards: readonly HTMLElement[];
  readonly groups: readonly HTMLElement[];
  readonly empty: HTMLElement;
  readonly status: HTMLElement;
  readonly clear: HTMLButtonElement;
}

/** Renders the home page, reads the filter box's parts out of it, and requires all of them to exist. */
function render(): Box {
  document.body.innerHTML = renderToStaticMarkup(createElement(HomePage));

  const input = document.querySelector<HTMLInputElement>("[data-search-input]");
  const empty = document.querySelector<HTMLElement>("[data-search-empty]");
  const status = document.querySelector<HTMLElement>("[data-search-status]");
  const clear = document.querySelector<HTMLButtonElement>("[data-search-clear]");
  if (!input || !empty || !status || !clear) {
    throw new Error("HomePage no longer renders the markup the search enhancer attaches to");
  }

  return {
    input,
    empty,
    status,
    clear,
    cards: [...document.querySelectorAll<HTMLElement>("[data-search-card]")],
    groups: [...document.querySelectorAll<HTMLElement>("[data-search-group]")],
  };
}

/** Renders and attaches the enhancer, which is the state a reader with JavaScript arrives in. */
function enhanced(): Box {
  const box = render();
  enhanceSearch();
  return box;
}

function type(box: Box, value: string): void {
  box.input.value = value;
  box.input.dispatchEvent(new Event("input", { bubbles: true }));
}

function press(box: Box, key: string): void {
  box.input.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

function visible(box: Box): string[] {
  return box.cards.filter((card) => !card.hidden).map((card) => cardTitle(card));
}

function cardTitle(card: HTMLElement): string {
  return card.querySelector("h3")?.textContent.trim() ?? "";
}

function group(box: Box, category: PrincipleCategory): HTMLElement {
  const id = categoryId(category);
  const found = box.groups.find((section) => section.getAttribute("aria-labelledby") === id);
  if (!found) throw new Error(`no group section for "${category}" (expected id "${id}")`);
  return found;
}

describe("the markup contract", () => {
  it("renders one card per principle, keyed to a lowercase haystack", () => {
    const box = render();

    expect(box.cards).toHaveLength(principles.length);
    for (const card of box.cards) {
      const haystack = card.dataset.searchCard ?? "";
      expect(haystack).not.toBe("");
      // The enhancer lowercases the query and does nothing to the haystack, so a capital letter in the
      // content would make that card unfindable by the word it contains.
      expect(haystack).toBe(haystack.toLowerCase());
    }
  });

  it("renders one group per category, each holding its own cards", () => {
    const box = render();

    expect(box.groups).toHaveLength(PRINCIPLE_CATEGORIES.length);
    for (const category of PRINCIPLE_CATEGORIES) {
      expect(group(box, category).querySelectorAll("[data-search-card]").length).toBeGreaterThan(0);
    }
  });

  it("gives the field a real label and a search type", () => {
    const box = render();

    expect(box.input.type).toBe("search");
    // `labels` is populated only by a <label for> or an ancestor <label>; a placeholder does not count.
    expect(box.input.labels?.length).toBe(1);
    expect(box.input.labels?.[0]?.textContent.trim()).toBe("Filter principles");
  });

  it("announces the count from a live region", () => {
    const box = render();

    expect(box.status.getAttribute("aria-live")).toBe("polite");
    expect(box.status.getAttribute("role")).toBe("status");
    expect(box.status.textContent).toBe("");
  });

  it("ships the empty state and the clear button hidden, before any script runs", () => {
    const box = render();

    expect(box.empty.hidden).toBe(true);
    expect(box.clear.hidden).toBe(true);
    // Nothing is filtered in the served HTML: it is one file for every reader, including readers whose
    // JavaScript never arrives.
    expect(box.cards.every((card) => !card.hidden)).toBe(true);
    expect(box.groups.every((section) => !section.hidden)).toBe(true);
  });

  it("leaves the page untouched until the reader types", () => {
    const box = enhanced();

    expect(visible(box)).toHaveLength(principles.length);
    expect(box.empty.hidden).toBe(true);
    expect(box.clear.hidden).toBe(true);
    expect(box.status.textContent).toBe("");
  });
});

describe("filtering", () => {
  it("hides the cards that do not match", () => {
    const box = enhanced();

    type(box, "contrast");

    const shown = visible(box);
    expect(shown).toContain("Color & Contrast");
    expect(shown).not.toContain("Typography");
    expect(shown.length).toBeLessThan(principles.length);
    expect(box.empty.hidden).toBe(true);
  });

  it("matches regardless of case", () => {
    const box = enhanced();

    type(box, "contrast");
    const lower = visible(box);

    type(box, "CONTRAST");
    expect(visible(box)).toEqual(lower);

    type(box, "CoNtRaSt");
    expect(visible(box)).toEqual(lower);
  });

  it("ignores surrounding whitespace", () => {
    const box = enhanced();

    type(box, "typography");
    const trimmed = visible(box);

    type(box, "   typography  ");
    expect(visible(box)).toEqual(trimmed);
  });

  it("matches a synonym in the haystack that is not on the card", () => {
    const box = enhanced();

    type(box, "i18n");

    expect(visible(box)).toEqual(["Internationalization & Localization"]);

    // "i18n" is in that principle's keywords and nowhere on its card. A filter that read only the
    // rendered text would find nothing here, which is the whole reason the keyword blob exists.
    const card = box.cards.find((item) => !item.hidden);
    expect(card?.textContent).not.toContain("i18n");
  });

  it("restores every card when the field is emptied by hand", () => {
    const box = enhanced();

    type(box, "i18n");
    expect(visible(box)).toHaveLength(1);

    type(box, "");

    expect(visible(box)).toHaveLength(principles.length);
    expect(box.groups.every((section) => !section.hidden)).toBe(true);
    expect(box.status.textContent).toBe("");
    expect(box.clear.hidden).toBe(true);
  });
});

describe("group sections", () => {
  it("hides a group once every card under it is filtered out, and brings it back", () => {
    const box = enhanced();
    const ethics = group(box, "Ethics");
    const foundations = group(box, "Foundations");

    type(box, "i18n");
    expect(ethics.hidden).toBe(true);
    expect(foundations.hidden).toBe(true);
    expect(group(box, "Inclusive by Default").hidden).toBe(false);

    type(box, "dark patterns");
    expect(ethics.hidden).toBe(false);
    expect(foundations.hidden).toBe(true);

    type(box, "");
    expect(ethics.hidden).toBe(false);
    expect(foundations.hidden).toBe(false);
  });

  it("keeps a group when only some of its cards match", () => {
    const box = enhanced();

    type(box, "typography");

    const foundations = group(box, "Foundations");
    expect(foundations.hidden).toBe(false);
    const shownInGroup = [
      ...foundations.querySelectorAll<HTMLElement>("[data-search-card]"),
    ].filter((card) => !card.hidden);
    expect(shownInGroup.map((card) => cardTitle(card))).toContain("Typography");
    expect(shownInGroup.length).toBeLessThan(5);
  });
});

describe("the empty state", () => {
  it("appears only when nothing matches", () => {
    const box = enhanced();

    type(box, "contrast");
    expect(box.empty.hidden).toBe(true);

    type(box, "kubernetes");
    expect(box.empty.hidden).toBe(false);
    expect(visible(box)).toEqual([]);
    expect(box.groups.every((section) => section.hidden)).toBe(true);

    type(box, "contrast");
    expect(box.empty.hidden).toBe(true);

    type(box, "");
    expect(box.empty.hidden).toBe(true);
  });
});

describe("the status region", () => {
  it("counts the matches, in the singular for one", () => {
    const box = enhanced();

    type(box, "i18n");

    expect(visible(box)).toHaveLength(1);
    expect(box.status.textContent).toBe("1 principle matches.");
  });

  it("counts the matches, in the plural for several", () => {
    const box = enhanced();

    type(box, "design");

    const count = visible(box).length;
    expect(count).toBeGreaterThan(1);
    expect(box.status.textContent).toBe(`${String(count)} principles match.`);
  });

  it("names the query when nothing matches", () => {
    const box = enhanced();

    type(box, "  kubernetes ");

    expect(box.status.textContent).toBe("No principles match “kubernetes”.");
  });

  it("goes quiet again when the field is emptied", () => {
    const box = enhanced();

    type(box, "kubernetes");
    expect(box.status.textContent).not.toBe("");

    type(box, "");
    expect(box.status.textContent).toBe("");
  });
});

describe("clearing", () => {
  it("appears once there is a query and goes away with it", () => {
    const box = enhanced();

    expect(box.clear.hidden).toBe(true);

    type(box, "forms");
    expect(box.clear.hidden).toBe(false);

    type(box, "");
    expect(box.clear.hidden).toBe(true);
  });

  it("resets the field, restores every card, and puts focus back in the field", () => {
    const box = enhanced();

    type(box, "i18n");
    expect(visible(box)).toHaveLength(1);

    box.clear.click();

    expect(box.input.value).toBe("");
    expect(visible(box)).toHaveLength(principles.length);
    expect(box.groups.every((section) => !section.hidden)).toBe(true);
    expect(box.empty.hidden).toBe(true);
    expect(box.status.textContent).toBe("");
    expect(box.clear.hidden).toBe(true);
    // Focus has to go back to the field rather than being left on a button that has just hidden itself,
    // which would drop a keyboard user's place in the page entirely.
    expect(document.activeElement).toBe(box.input);
  });

  it("clears the field on Escape", () => {
    const box = enhanced();

    type(box, "kubernetes");
    expect(box.empty.hidden).toBe(false);

    press(box, "Escape");

    expect(box.input.value).toBe("");
    expect(visible(box)).toHaveLength(principles.length);
    expect(box.empty.hidden).toBe(true);
    expect(box.status.textContent).toBe("");
  });

  it("leaves other keys alone", () => {
    const box = enhanced();

    type(box, "forms");
    press(box, "Enter");
    press(box, "a");

    expect(box.input.value).toBe("forms");
  });
});

describe("returning to the page", () => {
  it("filters on attach when the browser has already refilled the field", () => {
    // Back-navigation restores the field's value without firing an `input` event, so a page that only
    // listened would show every card under a query that says otherwise.
    const box = render();
    box.input.value = "i18n";

    enhanceSearch();

    expect(visible(box)).toEqual(["Internationalization & Localization"]);
    expect(box.clear.hidden).toBe(false);
    expect(box.status.textContent).toBe("1 principle matches.");
  });

  it("does nothing at all on a page with no filter box", () => {
    document.body.innerHTML = "<p>a page that is not the home page</p>";

    expect(() => {
      enhanceSearch();
    }).not.toThrow();
  });
});
