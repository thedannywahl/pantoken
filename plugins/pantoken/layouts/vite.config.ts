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
      layouts: "generated/layouts.css",
      wrapper: "generated/wrapper.css",
      callout: "generated/callout.css",
      hero: "generated/hero.css",
      "page-layout": "generated/page-layout.css",
      "rubric-note": "generated/rubric-note.css",
      testimonial: "generated/testimonial.css",
      "two-column": "generated/two-column.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
