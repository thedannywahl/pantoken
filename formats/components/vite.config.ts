import { defineConfig } from "vite-plus";
import { COMPONENTS } from "./src/components/index.ts";

const componentEntries = Object.fromEntries(
  COMPONENTS.filter((d) => d.kind === "component").map((d) => [d.name, `generated/${d.name}.css`]),
);

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
