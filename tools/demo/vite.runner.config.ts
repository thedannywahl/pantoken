import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// The runner is a tiny bundled app (Shiki source highlighting + the demo UI), separate from the library pack in
// vite.config.ts. `vp build -c vite.runner.config.ts` emits it to assets/runner/ with relative asset
// URLs (base "./") so it works when served from any path (e.g. /pantoken/play/).
export default defineConfig({
  root: fileURLToPath(new URL("./runner", import.meta.url)),
  base: "./",
  build: {
    // Emit to dist/ (gitignored, not linted, still shipped via `files`), not the source assets/.
    outDir: fileURLToPath(new URL("./dist/runner", import.meta.url)),
    emptyOutDir: true,
  },
});
