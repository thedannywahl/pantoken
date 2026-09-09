import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: "vp pack" } } },
  pack: {
    entry: { index: "src/index.ts", build: "src/build.ts" },
    // Exports are hand-managed so `buildTokens` (the only export needing the GitHub-only, exotic
    // `@instructure/instructure-design-tokens`) stays out of the main barrel's dist file — bundling it
    // there would make every consumer of the main entry (e.g. platform emitters) pull that exotic
    // dependency in transitively, which pnpm's blockExoticSubdeps rejects for non-direct consumers.
    exports: false,
  },
});
