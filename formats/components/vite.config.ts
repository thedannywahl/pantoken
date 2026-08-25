import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../vite.config.base.ts";

// Resolve against the config's own dir (not cwd) so it finds generated/ whether vite loads the config
// from the package or the workspace root.
const generatedDir = join(import.meta.dirname, "generated");

// Aggregate sheets that ship as named entry points — everything else in generated/ is a per-component
// file emitted by scripts/build-entries.ts (runs only during `build`, not `generate`).
const AGGREGATE_SHEETS = new Set([
  "base",
  "components",
  "component-icons",
  "fonts",
  "prose",
  "select",
  "icons",
  "utilities",
]);
const componentEntries = existsSync(generatedDir)
  ? Object.fromEntries(
      readdirSync(generatedDir)
        .filter((f) => f.endsWith(".css"))
        .map((f) => f.replace(/\.css$/u, ""))
        .filter((name) => !AGGREGATE_SHEETS.has(name))
        .map((name) => [name, `generated/${name}.css`]),
    )
  : {};

// The individually-exported utilities (`./spacing.css`, `./mask.css`, …) — written by
// `scripts/build-entries.ts` into `generated/utilities/`, packed under a `utilities/` entry key so
// they land at `dist/utilities/<name>.css`, matching `package.json`'s `exports` map.
const utilitiesDir = join(generatedDir, "utilities");
const utilityEntries = existsSync(utilitiesDir)
  ? Object.fromEntries(
      readdirSync(utilitiesDir)
        .filter((f) => f.endsWith(".css"))
        .map((f) => f.replace(/\.css$/u, ""))
        .map((name) => [`utilities/${name}`, `generated/utilities/${name}.css`]),
    )
  : {};

export default extendBase({
  pack: {
    entry: {
      index: "src/index.ts",
      "scaffold-preset": "src/scaffold-preset.ts",
      base: "generated/base.css",
      components: "generated/components.css",
      "component-icons": "generated/component-icons.css",
      ...componentEntries,
      ...utilityEntries,
      fonts: "generated/fonts.css",
      prose: "generated/prose.css",
      select: "generated/select.css",
      icons: "generated/icons.css",
      utilities: "generated/utilities.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static stylesheet exports survive.
    exports: false,
  },
  run: {
    tasks: {
      build: {
        command: [
          "vp run @pantoken/plugin-theme-custom-media#build",
          "node scripts/component-styles.ts",
          "node scripts/generate.ts",
          "node scripts/build-entries.ts",
          "node scripts/build-icon-entries.ts",
          "vp pack",
          "node scripts/post-pack.ts",
        ],
      },
      // The stylesheet generator as a first-class task: run the `.css`→consts codegen, then emit every
      // sheet (incl. `src/generated/_records.css`, the cssdoc source-lint provider). Depends on its
      // workspace deps' `build` so the barrel it imports (`@pantoken/tokens`/`icons`/`utils`/
      // `plugin-colors`) is present, making a standalone `vp run generate` self-sufficient. Inputs and
      // outputs are auto-tracked, so it's cached and only reruns when a source `.css`/`.ts`, a script, or
      // a dependency changes. The root `lint:css`/`lint:js` tasks depend on this.
      generate: {
        command: "node scripts/component-styles.ts && node scripts/generate.ts",
        dependsOn: [{ task: "build", from: ["dependencies", "devDependencies"] }],
      },
    },
  },
});
