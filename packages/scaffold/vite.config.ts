import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: { exports: true },
  // Scaffold template files are their own standalone TS projects (for the scaffolded app), not
  // part of this package's own source — never lint/type-check them here.
  lint: { ignorePatterns: ["**/templates/**"] },
});
