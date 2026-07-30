import type { ReactNode } from "react";

import { SITE_NAME } from "@/lib/base";
import type { PageMeta } from "@/lib/seo";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader, type HeaderSection } from "./SiteHeader";
import { SkipLink } from "./SkipLink";

/**
 * Pre-paint theme bootstrap.
 *
 * Must stay inline and must stay ahead of the stylesheet. The prerendered HTML is one static file for
 * every reader, so it cannot be built with a particular theme baked in — this runs before first paint
 * and sets the attribute the CSS keys off, which is what stops a reader in dark mode seeing a white
 * flash on every navigation.
 *
 * Deliberately terse and dependency-free: it blocks rendering, and it must not throw where storage is
 * unavailable (private browsing, storage disabled).
 */
const THEME_BOOTSTRAP = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export interface AssetManifest {
  readonly stylesheets: readonly string[];
  readonly scripts: readonly string[];
  readonly modulePreloads: readonly string[];
}

interface DocumentProps {
  readonly meta: PageMeta;
  readonly assets: AssetManifest;
  readonly section: HeaderSection;
  readonly activePrincipleSlug?: string | undefined;
  /** Constrains the main column. Wide is used by the index pages that show card grids. */
  readonly width?: "prose" | "wide";
  readonly children: ReactNode;
}

export function Document({
  meta,
  assets,
  section,
  activePrincipleSlug,
  width = "prose",
  children,
}: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />

        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />

        {assets.stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {assets.modulePreloads.map((href) => (
          <link key={href} rel="modulepreload" href={href} />
        ))}

        {meta.structuredData.map((node, index) => (
          <script
            // Index is a stable identity here: the array is built once per page at build time.
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
          />
        ))}
      </head>

      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <SiteHeader section={section} activePrincipleSlug={activePrincipleSlug} />

        <main id="main" className="flex-1">
          <div
            className={
              width === "wide"
                ? "mx-auto w-full max-w-(--container-wide) px-4 py-10 sm:px-6 sm:py-14"
                : "mx-auto w-full max-w-(--container-content) px-4 py-10 sm:px-6 sm:py-14"
            }
          >
            {children}
          </div>
        </main>

        <SiteFooter />

        {assets.scripts.map((src) => (
          <script key={src} type="module" src={src} />
        ))}
      </body>
    </html>
  );
}
