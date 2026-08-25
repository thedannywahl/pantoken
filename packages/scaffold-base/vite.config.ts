import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: { exports: true },
  // `templates/cssdoc.jsonc` is a JSONC source file consumed by scripts/generate.ts, not TS source —
  // and its `//` comments would otherwise get stripped by a strict-JSON formatter/linter.
  lint: { ignorePatterns: ["**/templates/**"] },
  fmt: { ignorePatterns: ["**/templates/**"] },
});
