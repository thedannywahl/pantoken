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
import { copyFileSync, cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build } from "vite";
import { scaffoldProject } from "../../packages/scaffold/src/index.ts";
import { configureCanvasRcePwa } from "./canvas-rce-pwa.ts";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
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

// This render dir is never `npm install`ed, so the icon pickers' "None"/local CDN mode (which reads
// `import.meta.glob("/node_modules/@pantoken/*/dist/...")`) would otherwise find nothing and always
// fall back to a remote CDN fetch — 404ing for a package (like plugin-lucide-lab) not yet published.
// Vendoring the real, already-built dist output here is enough; Vite's glob just reads the
// filesystem, no package.json/module resolution involved.
const localIconPackages: Record<string, string> = {
  "@pantoken/components": join(repoRoot, "formats/components"),
  "@pantoken/plugin-custom-icons": join(repoRoot, "plugins/pantoken/custom-icons"),
  "@pantoken/plugin-simple-icons": join(repoRoot, "plugins/pantoken/simple-icons"),
  "@pantoken/plugin-lucide-lab": join(repoRoot, "plugins/pantoken/lucide-lab"),
};
for (const [name, packageDir] of Object.entries(localIconPackages)) {
  const dest = join(renderDir, "node_modules", name, "dist");
  mkdirSync(dest, { recursive: true });
  cpSync(join(packageDir, "dist"), dest, { recursive: true });
}

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

configureCanvasRcePwa(
  renderDir,
  join(repoRoot, "plugins", "pantoken", "logos", "assets", "logos", "pantoken", "icon-color.svg"),
  join(
    repoRoot,
    "plugins",
    "pantoken",
    "logos",
    "assets",
    "logos",
    "pantoken",
    "icon-reversed.svg",
  ),
);

await build({
  root: renderDir,
  base: "/tools/canvas-rce/",
  logLevel: "warn",
  resolve: {
    alias: {
      "@pantoken/interactions/interactions.iife.js": join(
        docsRoot,
        "..",
        "formats",
        "interactions",
        "dist",
        "interactions.iife.js",
      ),
    },
  },
  build: { outDir, emptyOutDir: true },
});
