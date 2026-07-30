import { renderToStaticMarkup } from "react-dom/server";

import { Document, type AssetManifest } from "@/components/layout/Document";
import type { HeaderSection } from "@/components/layout/SiteHeader";
import { AboutPage } from "@/pages/AboutPage";
import { CoursePage } from "@/pages/CoursePage";
import { CraftIndexPage } from "@/pages/CraftIndexPage";
import { HomePage } from "@/pages/HomePage";
import { LessonPage } from "@/pages/LessonPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrinciplePage } from "@/pages/PrinciplePage";
import { buildMeta } from "@/lib/seo";
import { routes, type Route } from "@/lib/routes";

/**
 * Re-exported so the prerenderer gets the route table from the same bundle it gets the renderer from.
 * Importing the two separately would let them resolve to different module instances and, in principle,
 * disagree about what pages exist.
 */
export { routes };
export { buildSearchIndex } from "@/lib/search-index";

function sectionFor(route: Route): HeaderSection {
  switch (route.kind) {
    case "home":
      return "home";
    case "about":
      return "about";
    case "principle":
      return "principles";
    case "craft-index":
    case "course":
    case "lesson":
      return "craft";
    case "not-found":
      return "none";
  }
}

function bodyFor(route: Route) {
  switch (route.kind) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "not-found":
      return <NotFoundPage />;
    case "craft-index":
      return <CraftIndexPage />;
    case "principle":
      return <PrinciplePage principle={route.principle} />;
    case "course":
      return <CoursePage course={route.course} />;
    case "lesson":
      return <LessonPage course={route.course} lesson={route.lesson} />;
  }
}

/**
 * Index pages show card grids and use the wide measure; reading pages stay narrow.
 *
 * Principle pages are wide for a different reason: they carry a sticky section index in a second column
 * from `lg` up, and that column has to come out of the page's margins rather than out of the prose. The
 * template caps its own reading column at the prose measure, so the line length a reader gets is the same
 * as on any other reading page — the extra width is spent on the index and on nothing else.
 */
function widthFor(route: Route): "prose" | "wide" {
  return route.kind === "home" || route.kind === "craft-index" || route.kind === "principle"
    ? "wide"
    : "prose";
}

/**
 * Renders one route to a complete HTML document.
 *
 * `renderToStaticMarkup` rather than `renderToString`: nothing on the page is hydrated as a whole
 * tree, so hydration markers would be dead weight in every file and noise for the W3C validator.
 * Interactive pieces are attached by the enhancers and islands in `src/client`.
 */
export function render(route: Route, assets: AssetManifest): string {
  const markup = renderToStaticMarkup(
    <Document
      meta={buildMeta(route)}
      assets={assets}
      section={sectionFor(route)}
      activePrincipleSlug={route.kind === "principle" ? route.principle.slug : undefined}
      width={widthFor(route)}
    >
      {bodyFor(route)}
    </Document>,
  );

  return `<!doctype html>\n${markup}\n`;
}
