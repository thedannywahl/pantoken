/**
 * Render `@pantoken/scaffold`'s `canvas-theme-editor` starter template — the TinyMCE split-pane RCE
 * live editor/preview — and build it into a static bundle served at `/tools/canvas-rce/`. Embedded via
 * `<iframe>` by the "Canvas RCE" utility page (see `.vitepress/theme/components/CanvasRcePage.vue`)
 * instead of being reimplemented in Vue, so the docs page never drifts from the actual
 * `npx create-pantoken-app canvas-theme-editor` experience.
 *
 * Runs in `docs:assets` and again on edits during `docs:dev` (the workspace orchestrator's
 * `@pantoken/docs#canvas-rce` node). Uses the scaffolder's and Vite's JS APIs directly rather than
 * spawning a subprocess — a nested `vp` spawn from inside `vitepress dev` fails (see config.ts).
 *
 * @module
 */
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build } from "vite";
import { scaffoldProject } from "../../packages/scaffold/src/index.ts";

const docsRoot = join(import.meta.dirname, "..");
// Already-ignored (see .gitignore's `docs/.vitepress/cache/`), so no new ignore rule is needed.
const renderDir = join(docsRoot, ".vitepress", "cache", "canvas-rce-src");
const outDir = join(docsRoot, "public", "tools", "canvas-rce");

rmSync(renderDir, { recursive: true, force: true });
await scaffoldProject("canvas-theme-editor", renderDir, {
  locale: "en",
  cdn: "jsdelivr",
  theme: "rebrand",
  mode: "light",
  packageManager: "npm",
});

// Docs-only iframe auto-sizing: added here, after rendering, so the published starter template has
// no embedding-specific code. Copied into the render project's `public/` so Vite ships it verbatim
// instead of merging it into the app's entry chunk.
const publicDir = join(renderDir, "public");
mkdirSync(publicDir, { recursive: true });
copyFileSync(
  join(import.meta.dirname, "canvas-rce-iframe-height.js"),
  join(publicDir, "iframe-height.js"),
);
const indexHtml = join(renderDir, "index.html");
writeFileSync(
  indexHtml,
  readFileSync(indexHtml, "utf8").replace(
    "</body>",
    `  <script src="/iframe-height.js"></script>\n  </body>`,
  ),
);

await build({
  root: renderDir,
  base: "/tools/canvas-rce/",
  logLevel: "warn",
  build: { outDir, emptyOutDir: true },
});
