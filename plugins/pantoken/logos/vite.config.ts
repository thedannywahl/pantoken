import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../../vite.config.base.ts";

// Resolve against the config's own dir (not cwd) so it finds generated/ whether vite loads the config
// from the package or the workspace root.
const generatedDir = join(import.meta.dirname, "generated");

// `logos` (the combined sheet) is a named entry point below; everything else in generated/ is a
// per-product or per-individual-logo file emitted by scripts/generate.ts.
const logoEntries = existsSync(generatedDir)
  ? Object.fromEntries(
      readdirSync(generatedDir)
        .filter((f) => f.endsWith(".css") && f !== "logos.css")
        .map((f) => f.replace(/\.css$/u, ""))
        .map((name) => [name, `generated/${name}.css`]),
    )
  : {};

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      logos: "generated/logos.css",
      ...logoEntries,
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static `./logos.css` export survives.
    exports: false,
  },
});
