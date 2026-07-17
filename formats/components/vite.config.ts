import { existsSync, readdirSync } from "node:fs";
import { defineConfig } from "vite-plus";

// Aggregate sheets that ship as named entry points — everything else in generated/ is a per-component
// file emitted by scripts/build-entries.ts (runs only during `build`, not `generate`).
const AGGREGATE_SHEETS = new Set([
  "base",
  "components",
  "fonts",
  "prose",
  "select",
  "icons",
  "utilities",
]);
const componentEntries = existsSync("generated")
  ? Object.fromEntries(
      readdirSync("generated")
        .filter((f) => f.endsWith(".css"))
        .map((f) => f.replace(/\.css$/u, ""))
        .filter((name) => !AGGREGATE_SHEETS.has(name))
        .map((name) => [name, `generated/${name}.css`]),
    )
  : {};

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      base: "generated/base.css",
      components: "generated/components.css",
      ...componentEntries,
      fonts: "generated/fonts.css",
      prose: "generated/prose.css",
      select: "generated/select.css",
      icons: "generated/icons.css",
      utilities: "generated/utilities.css",
    },
    dts: true,
    css: {
      splitting: true,
      target: false,
      minify: true,
      modules: false,
      inject: false,
    },
    // Exports are hand-managed so the static stylesheet exports survive.
    exports: false,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  run: {
    tasks: {
      build: {
        command: [
          "vp run @pantoken/plugin-theme-custom-media#build",
          "node scripts/component-styles.ts",
          "node scripts/generate.ts",
          "node scripts/build-entries.ts",
          "vp pack",
        ],
        // node_modules/.modules.yaml is rewritten by every CI reinstall; excluding it keeps
        // vp pack a cache hit across jobs instead of re-packing on every run.
        input: [{ auto: true }, { pattern: "!node_modules/.modules.yaml", base: "workspace" }],
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
