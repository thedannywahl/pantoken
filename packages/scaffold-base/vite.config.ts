import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: { exports: true },
  // `templates/cssdoc.json` is a JSONC source file consumed by scripts/generate.ts, not TS source.
  lint: { ignorePatterns: ["**/templates/**"] },
});
