import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: "vp pack" } } },
  pack: {
    entry: {
      index: "src/index.ts",
      html: "src/inline-html.ts",
      cli: "src/cli.ts",
    },
    exports: false,
  },
});
