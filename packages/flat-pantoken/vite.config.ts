import { readdirSync } from "node:fs";
import { join } from "node:path";
import { extendBase } from "../../vite.config.base.ts";

const srcDir = join(import.meta.dirname, "src");
const entry = readdirSync(srcDir)
  .filter((f) => f.endsWith(".ts"))
  .map((f) => `src/${f}`);

export default extendBase({
  run: {
    tasks: {
      build: {
        command: ["node scripts/sync-exports.ts", "vp pack"],
      },
    },
  },
  pack: {
    entry: entry.length > 0 ? entry : ["src/index.ts"],
    exports: false,
  },
});
