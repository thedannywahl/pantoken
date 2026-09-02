import { existsSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../../vite.config.base.ts";

const generatedDir = join(import.meta.dirname, "generated");

export default extendBase({
  run: {
    tasks: {
      build: {
        command: [
          "node scripts/generate.ts",
          "vp pack",
          "node scripts/post-pack.ts",
          "node scripts/generate-manifest.ts",
        ],
      },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      ...(existsSync(generatedDir) ? { "simple-icons": "generated/simple-icons.css" } : {}),
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
