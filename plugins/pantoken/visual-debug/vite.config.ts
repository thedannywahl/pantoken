import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      "visual-debug": "generated/visual-debug.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static `./visual-debug.css` export survives.
    exports: false,
  },
});
