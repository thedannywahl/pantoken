import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: "vp pack" } } },
  pack: {
    entry: ["src/index.ts", "src/mdx.tsx"],
    exports: true,
  },
});
