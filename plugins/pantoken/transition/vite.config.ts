import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      progress: "src/progress.ts",
      "progress-circle": "src/progress-circle.ts",
      transition: "generated/transition.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static `./transition.css` export survives.
    exports: false,
  },
});
