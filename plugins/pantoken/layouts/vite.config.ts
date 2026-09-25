import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: {
      build: {
        command: [
          "node scripts/component-styles.ts",
          "vp run generate",
          "vp pack",
          "node scripts/generate-model.ts",
        ],
      },
      generate: { command: "node scripts/component-styles.ts && node scripts/generate.ts" },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      layouts: "generated/runtime/layouts.css",
      wrapper: "generated/runtime/wrapper.css",
      callout: "generated/runtime/callout.css",
      hero: "generated/runtime/hero.css",
      "page-layout": "generated/runtime/page-layout.css",
      "rubric-note": "generated/runtime/rubric-note.css",
      testimonial: "generated/runtime/testimonial.css",
      "two-column": "generated/runtime/two-column.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
