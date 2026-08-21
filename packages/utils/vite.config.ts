import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: "vp pack" } } },
  pack: {
    entry: { index: "src/index.ts", "token-syntax": "src/token-syntax.ts" },
    // Exports are hand-managed so the css-tree-backed token-syntax entry stays out of the main
    // barrel's dist file — bundling it there would pull css-tree's runtime JSON require into every
    // browser-facing consumer of the barrel (see src/index.ts).
    exports: false,
  },
});
