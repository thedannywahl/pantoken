import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: { build: { command: ["node scripts/scan-presets.ts", "vp run generate", "vp pack"] } },
  },
  pack: { entry: { index: "src/index.ts", cli: "src/cli.ts" }, exports: true },
  // Scaffold template files are their own standalone TS projects (for the scaffolded app), not
  // part of this package's own source — never lint/type-check them here.
  lint: { ignorePatterns: ["**/templates/**"] },
});
