import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    // Exports are hand-managed so the static `./components.css` and `./prose.css` export survives.
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
