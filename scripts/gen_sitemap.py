"""Regenerates docs/sitemap.xml from the real HTML files on disk, using each
file's actual last-commit date (via git log) as its lastmod value rather
than a hand-maintained/fabricated date. Excludes docs/404.html, which is a
GitHub Pages special-case error page that's deliberately never linked from
normal navigation and isn't a page a crawler should index.

Run from the repo root: python3 scripts/gen_sitemap.py
"""
import pathlib
import subprocess

BASE = "https://aahplexx.github.io/design-principles"
DOCS = pathlib.Path("docs")


def git_lastmod(path):
    out = subprocess.run(
        ["git", "log", "-1", "--format=%ad", "--date=short", "--", str(path)],
        capture_output=True, text=True, check=False,
    ).stdout.strip()
    return out or None


def priority_and_freq(rel_path):
    if rel_path == "index.html":
        return "1.0", "weekly"
    if rel_path == "about.html":
        return "0.5", "monthly"
    if rel_path.startswith("principles/"):
        return "0.8", "monthly"
    if rel_path == "craft/index.html":
        return "0.9", "weekly"
    parts = rel_path.split("/")
    if rel_path.startswith("craft/") and parts[-1] == "index.html":
        return "0.7", "monthly"
    if rel_path.startswith("craft/"):
        return "0.5", "monthly"
    return "0.3", "monthly"


def url_for(rel_path):
    if rel_path == "index.html":
        return BASE + "/"
    if rel_path.endswith("/index.html"):
        return f"{BASE}/{rel_path[: -len('index.html')]}"
    return f"{BASE}/{rel_path}"


files = sorted(DOCS.rglob("*.html"))
files = [f for f in files if f.name != "404.html"]

entries = []
for f in files:
    rel = str(f.relative_to(DOCS))
    lastmod = git_lastmod(f) or "2026-07-30"
    priority, changefreq = priority_and_freq(rel)
    entries.append({
        "loc": url_for(rel),
        "lastmod": lastmod,
        "changefreq": changefreq,
        "priority": priority,
    })

lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
for e in entries:
    lines.append("  <url>")
    lines.append(f"    <loc>{e['loc']}</loc>")
    lines.append(f"    <lastmod>{e['lastmod']}</lastmod>")
    lines.append(f"    <changefreq>{e['changefreq']}</changefreq>")
    lines.append(f"    <priority>{e['priority']}</priority>")
    lines.append("  </url>")
lines.append("</urlset>")
lines.append("")

(DOCS / "sitemap.xml").write_text("\n".join(lines))
print(f"wrote docs/sitemap.xml with {len(entries)} entries")
