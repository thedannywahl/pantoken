/**
 * Build the standalone IIFE bundle — a classic `<script src>` drop-in for CDN use. Unlike the ESM
 * `dist/index.mjs` (which externalizes `@pantoken/components` and `@pantoken/icons` as bare imports),
 * this bundles them in, so a single `<script>` tag registers every `<instui-*>` element on load and
 * exposes a `PantokenWebComponents` global (with `register`, `iconSvg`, …). Tokens still come from a
 * token sheet in the document.
 *
 * Runs after `vp pack` in the build task. It calls Vite's `build()` API directly rather than spawning a
 * nested `vp` (vite-plus can't spawn a nested `vp` from inside a run task), and passes `configFile: false`
 * so it doesn't try to load this package's vite-plus config.
 */
import { resolve } from "node:path";
import { build } from "vite";

const root = resolve(import.meta.dirname, "..");

await build({
  configFile: false,
  root,
  logLevel: "warn",
  build: {
    outDir: "dist",
    // Keep the ESM + per-element CSS output that `vp pack` already wrote.
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(root, "src/index.ts"),
      formats: ["iife"],
      name: "PantokenWebComponents",
      fileName: () => "web-components.iife.js",
    },
    rollupOptions: {
      // No externals: bundle @pantoken/components + @pantoken/icons (and their deps) in, so the file is
      // a true drop-in. Larger than the ESM path by design — a convenience target, not the default.
      external: [],
    },
  },
});

console.log("✓ web-components: wrote dist/web-components.iife.js");
