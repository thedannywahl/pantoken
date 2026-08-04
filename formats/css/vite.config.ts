import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      inject: "src/inject.ts",
      style: "generated/style.css",
      "style.lean": "generated/style.lean.css",
      "style.rebrand.light": "generated/style.rebrand.light.css",
      "style.rebrand.light.lean": "generated/style.rebrand.light.lean.css",
      "style.canvas": "generated/style.canvas.css",
      "style.canvas.lean": "generated/style.canvas.lean.css",
      "style.canvas-high-contrast": "generated/style.canvas-high-contrast.css",
      "style.canvas-high-contrast.lean": "generated/style.canvas-high-contrast.lean.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static `./style.css` export survives.
    exports: false,
  },
});
