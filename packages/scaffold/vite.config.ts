import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: {
      build: { command: ["node scripts/scan-presets.ts", "vp run generate", "vp pack"] },
      // Live HMR preview of a materialized scaffold — see scripts/scaffold-dev.ts. Not cacheable
      // (long-running dev server), so `cache: false`.
      "scaffold:dev": { command: "node scripts/scaffold-dev.ts", cache: false },
    },
  },
  pack: { entry: { index: "src/index.ts", cli: "src/cli.ts" }, exports: true },
  // Scaffold template files are their own standalone TS projects (for the scaffolded app), not
  // part of this package's own source — never lint/type-check them here. `.dev/` is the untracked,
  // materialized `scaffold:dev` output — same reasoning.
  lint: { ignorePatterns: ["**/templates/**", ".dev/**"] },
});
