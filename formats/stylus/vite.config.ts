import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp pack", "vp run generate"] } } },
  pack: {
    // Exports are hand-managed so the static `./tokens.styl` (written after pack) survives.
    exports: false,
  },
});
