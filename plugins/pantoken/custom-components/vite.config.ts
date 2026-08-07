import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: {
      build: {
        command: [
          "node scripts/component-styles.ts",
          "vp run generate",
          "node scripts/build-entries.ts",
          "vp pack",
        ],
      },
      generate: { command: "node scripts/component-styles.ts && node scripts/generate.ts" },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      "custom-components": "generated/custom-components.css",
      card: "generated/card.css",
      "agent-shell": "generated/agent-shell.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
