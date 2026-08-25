import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      components: "generated/components.css",
      "scaffold-preset": "src/scaffold-preset.ts",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static ./components.css export survives.
    exports: false,
  },
});
