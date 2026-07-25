import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: ["src/index.ts", "src/raw.ts", "src/meta.ts"],
    exports: true,
  },
});
