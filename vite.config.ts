import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

import { BASE_PATH } from "./src/lib/base.ts";

/**
 * Serves the prerendered pages during `vite dev`.
 *
 * The production build renders every route ahead of time, so there is no server to run locally.
 * This middleware fills that gap: it resolves the request path against the same route table the
 * build uses, renders it through the same `entry-server` module, and lets Vite transform the result
 * so HMR and the module graph work as usual.
 *
 * Because it shares the route table and the renderer with the build, a route that 404s here will
 * also be missing from `dist`, which makes dev a real check on URL parity rather than a separate
 * code path that can drift.
 */
function devSsrPlugin(): Plugin {
  return {
    name: "design-principles:dev-ssr",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      // Returned function runs after Vite's own middlewares, so real files under public/ win.
      return () => {
        /*
         * connect invokes the handler and ignores its return value; failures are forwarded through
         * next() rather than surfacing as an unhandled rejection.
         */
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        server.middlewares.use(async (req, res, next) => {
          const rawUrl = req.originalUrl ?? req.url ?? "/";
          const [pathOnly] = rawUrl.split("?");
          if (!pathOnly || pathOnly.startsWith("/@") || pathOnly.startsWith("/node_modules")) {
            next();
            return;
          }

          try {
            const [{ render }, { findRouteByRequestPath }] = await Promise.all([
              server.ssrLoadModule("/src/entry-server.tsx") as Promise<
                typeof import("./src/entry-server")
              >,
              server.ssrLoadModule("/src/lib/routes.ts") as Promise<
                typeof import("./src/lib/routes")
              >,
            ]);

            const route = findRouteByRequestPath(pathOnly);
            if (!route) {
              next();
              return;
            }

            const html = render(route, {
              // In dev the stylesheet arrives through the client entry's module graph, so linking a
              // built CSS file here would 404. Only the module script is needed.
              scripts: [`${BASE_PATH}src/client/main.ts`],
              stylesheets: [],
              modulePreloads: [],
            });

            res.statusCode = route.id === "not-found" ? 404 : 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(await server.transformIndexHtml(pathOnly, html));
          } catch (error) {
            if (error instanceof Error) server.ssrFixStacktrace(error);
            next(error);
          }
        });
      };
    },
  };
}

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), tailwindcss(), devSsrPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // The prerenderer needs the hashed filenames to inject into each document's <head>.
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: fileURLToPath(new URL("./src/client/main.ts", import.meta.url)),
    },
  },
});
