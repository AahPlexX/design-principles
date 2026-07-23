#!/usr/bin/env python3
"""Verify docs/: balanced HTML, resolvable internal links, required page sections.

Zero dependencies (stdlib only), so it runs anywhere Python 3 runs. See
CLAUDE.md's "Engineering standards" and "Page skeleton" sections for the
rules this enforces.
"""

import sys
from html.parser import HTMLParser
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"
LINK_PREFIX = "/design-principles/"

VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "source", "track", "wbr",
}

REQUIRED_H2_SECTIONS = [
    "Why it matters",
    "The core rule",
    "Good vs. bad",
    "Common mistakes",
    "Checklist",
]


class PageParser(HTMLParser):
    """Collects tag-balance errors, internal hrefs, and heading text in one pass."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.hrefs = []
        self.h1_count = 0
        self.h2_texts = []
        self._capturing = None
        self._buffer = ""

    def handle_starttag(self, tag, attrs):
        if tag in ("h1", "h2"):
            self._capturing = tag
            self._buffer = ""
        if tag == "a":
            href = dict(attrs).get("href", "")
            if href.startswith(LINK_PREFIX):
                self.hrefs.append(href)
        if tag not in VOID_ELEMENTS:
            self.stack.append(tag)

    def handle_data(self, data):
        if self._capturing:
            self._buffer += data

    def handle_endtag(self, tag):
        if tag == self._capturing:
            if tag == "h1":
                self.h1_count += 1
            else:
                self.h2_texts.append(self._buffer.strip())
            self._capturing = None

        if not self.stack:
            self.errors.append(f"unexpected closing </{tag}> with empty stack")
            return
        if self.stack[-1] == tag:
            self.stack.pop()
            return
        self.errors.append(f"mismatched tag: expected </{self.stack[-1]}>, got </{tag}>")
        if tag in self.stack:
            while self.stack and self.stack[-1] != tag:
                self.stack.pop()
            if self.stack:
                self.stack.pop()


def href_target_path(href: str) -> Path:
    """Map a /design-principles/... href to the file it should resolve to."""
    relative = href[len(LINK_PREFIX):] or "index.html"
    if relative.endswith("/"):
        relative += "index.html"
    return DOCS / relative


def check_page(path: Path, all_ok: list) -> None:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))

    rel = path.relative_to(DOCS)
    problems = []

    if parser.errors or parser.stack:
        problems += parser.errors
        if parser.stack:
            problems.append(f"unclosed tag(s) at end of file: {parser.stack}")

    for href in parser.hrefs:
        target = href_target_path(href)
        if not target.is_file():
            problems.append(f"broken link {href!r} -> expected file at {target}")

    if path.parent.name == "principles":
        if parser.h1_count != 1:
            problems.append(f"expected exactly one <h1>, found {parser.h1_count}")
        missing = [s for s in REQUIRED_H2_SECTIONS if s not in parser.h2_texts]
        if missing:
            problems.append(f"missing required section(s): {missing}")

    if problems:
        all_ok.append(False)
        print(f"FAIL {rel}")
        for p in problems:
            print(f"  - {p}")
    else:
        print(f"ok   {rel}")


def check_css_braces(all_ok: list) -> None:
    for css_path in sorted(DOCS.glob("assets/*.css")):
        text = css_path.read_text(encoding="utf-8")
        opens, closes = text.count("{"), text.count("}")
        rel = css_path.relative_to(DOCS)
        if opens != closes:
            all_ok.append(False)
            print(f"FAIL {rel}\n  - unbalanced braces: {opens} '{{' vs {closes} '}}'")
        else:
            print(f"ok   {rel}")


def main() -> int:
    all_ok = []
    for html_path in sorted(DOCS.rglob("*.html")):
        check_page(html_path, all_ok)
    check_css_braces(all_ok)

    if False in all_ok:
        print("\nverify-site: FAILED")
        return 1
    print("\nverify-site: all checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
