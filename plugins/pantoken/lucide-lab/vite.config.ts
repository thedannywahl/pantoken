import { existsSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../../vite.config.base.ts";

const generatedDir = join(import.meta.dirname, "generated");

export default extendBase({
  run: {
    tasks: {
      build: { command: ["node scripts/generate.ts", "vp pack", "node scripts/post-pack.ts"] },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      ...(existsSync(generatedDir) ? { "lucide-lab": "generated/lucide-lab.css" } : {}),
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
