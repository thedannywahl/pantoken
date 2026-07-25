import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run embed", "vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      global: "generated/global.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the static `./global.css` export survives.
    exports: false,
  },
});
