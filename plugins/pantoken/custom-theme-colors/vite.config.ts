import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      scale: "src/custom-scale.ts",
      "custom-theme-colors": "generated/custom-theme-colors.css",
      "custom-theme-colors.scoped": "generated/custom-theme-colors.scoped.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
