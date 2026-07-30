import { Menu, Search } from "lucide-react";

import { principles } from "@/content";
import { HOME_GROUPS } from "@/content/site";
import { SITE_NAME, withBase } from "@/lib/base";
import { principlePath } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./ThemeToggle";

/**
 * What a header entry is "current" for.
 *
 * Principle pages mark the Principles entry, every Craft page marks Craft. This mirrors what the
 * hand-written pages did with `aria-current="page"`, except the value is derived once here instead of
 * being typed into 173 files.
 */
export type HeaderSection = "home" | "principles" | "craft" | "about" | "none";

interface SiteHeaderProps {
  readonly section: HeaderSection;
  /** Slug of the principle being read, so the mobile menu can mark it. */
  readonly activePrincipleSlug?: string | undefined;
}

const linkClass =
  "text-ink-muted hover:text-ink rounded-md px-2.5 py-1.5 text-[0.9375rem] font-medium no-underline transition-colors aria-[current]:text-ink aria-[current]:bg-surface";

export function SiteHeader({ section, activePrincipleSlug }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-14 max-w-(--container-wide) items-center gap-2 px-4 sm:px-6">
        <a
          href={withBase("")}
          className="me-auto shrink-0 text-[0.9375rem] font-semibold tracking-tight text-ink no-underline"
          aria-current={section === "home" ? "page" : undefined}
        >
          {SITE_NAME}
        </a>

        {/*
          Desktop navigation.

          The original header listed all seventeen principles plus Craft and About on every page,
          which overflowed into a horizontal scroller on anything narrower than a laptop and buried
          the two links people actually wanted. The full index lives on the home page and in the
          command palette; the header keeps the three destinations.
        */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <a
            href={withBase("")}
            className={linkClass}
            aria-current={section === "principles" ? "true" : undefined}
          >
            Principles
          </a>
          <a
            href={withBase("craft/")}
            className={linkClass}
            aria-current={section === "craft" ? "true" : undefined}
          >
            Craft
          </a>
          <a
            href={withBase("about.html")}
            className={linkClass}
            aria-current={section === "about" ? "page" : undefined}
          >
            About
          </a>
        </nav>

        {/*
          Search.

          Server-rendered as a real link to the home page's filter box, which is where search worked
          before any of this. The enhancer upgrades it into a command palette trigger when JavaScript
          is available, so it is useful either way rather than being an inert button.
        */}
        <a
          href={`${withBase("")}#principle-search`}
          data-enhance="command-trigger"
          className="ms-1 hidden items-center gap-2 rounded-md border border-line bg-surface py-1.5 ps-2.5 pe-2 text-sm text-ink-subtle no-underline transition-colors hover:border-line-strong hover:text-ink sm:flex"
        >
          <Search aria-hidden="true" className="size-3.5" />
          <span>Search</span>
          <kbd className="ms-2 hidden rounded border border-line bg-canvas px-1.5 py-0.5 font-sans text-[0.6875rem] font-medium text-ink-subtle lg:inline-block">
            &#8984;K
          </kbd>
        </a>

        <ThemeToggle />

        {/*
          Mobile menu as a native <details> disclosure.

          A JavaScript-driven sheet would leave the navigation unreachable on a page whose script
          failed, on a site whose whole subject is not doing that. `<details>` opens without
          JavaScript, is keyboard operable for free, and animates with CSS.
        */}
        <details
          data-enhance="mobile-nav"
          className="group relative md:hidden [&[open]>summary>svg]:rotate-180"
        >
          <summary
            aria-label="Navigation menu"
            className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden"
          >
            <Menu aria-hidden="true" className="size-4 transition-transform" />
          </summary>

          <div className="absolute end-0 top-11 max-h-[min(70vh,32rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-line bg-canvas p-2 shadow-lifted motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1">
            <nav aria-label="All pages">
              <a
                href={withBase("craft/")}
                className="block rounded-md px-3 py-2 text-sm font-medium text-ink no-underline hover:bg-surface"
              >
                Craft courses
              </a>
              <a
                href={withBase("about.html")}
                className="block rounded-md px-3 py-2 text-sm font-medium text-ink no-underline hover:bg-surface"
              >
                About
              </a>

              {HOME_GROUPS.map((group) => (
                <div key={group.category} className="mt-1">
                  <p className="px-3 pt-3 pb-1 text-[0.6875rem] font-semibold tracking-wider text-ink-subtle uppercase">
                    {group.category}
                  </p>
                  {group.slugs.map((slug) => {
                    const principle = principles.find((item) => item.slug === slug);
                    if (!principle) return null;
                    return (
                      <a
                        key={slug}
                        href={withBase(principlePath(slug))}
                        aria-current={slug === activePrincipleSlug ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm text-ink-muted no-underline hover:bg-surface hover:text-ink",
                          slug === activePrincipleSlug && "bg-surface font-medium text-ink",
                        )}
                      >
                        {principle.title}
                      </a>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
