import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: "vp pack" } } },
  pack: {
    entry: { index: "src/index.ts", sandbox: "src/sandbox.ts" },
    // Exports are hand-managed so the Node-only sandbox entry (node:child_process,
    // node:worker_threads) stays out of the main barrel's dist file — bundling it there would pull
    // those built-ins into every browser-facing consumer of the barrel (see src/index.ts).
    exports: false,
  },
});
