import { readdirSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../vite.config.base.ts";

// Resolve against the config's own dir (not cwd) so the config loads correctly whether vite reads it
// from the package or from the workspace root (e.g. the coverage run).
const cssEntries = Object.fromEntries(
  ["src/elements", "src/lib"]
    .flatMap((dir) =>
      readdirSync(join(import.meta.dirname, dir))
        .filter((name) => name.endsWith(".css"))
        .map((name) => name.replace(/\.css$/u, "")),
    )
    .sort()
    .map((name) => [name, `generated/${name}.css`]),
);

export default extendBase({
  run: {
    tasks: {
      build: {
        command: [
          "node scripts/generate.ts",
          "node scripts/build-entries.ts",
          "vp pack",
          "node scripts/build-iife.ts",
        ],
      },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      components: "generated/components.css",
      ...cssEntries,
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static ./components.css export survives.
    exports: false,
  },
});
