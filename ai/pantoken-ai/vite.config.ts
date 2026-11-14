import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: { index: "src/index.ts", cli: "src/cli.ts" },
    // Keep the manually declared catalog JSON subpath in package.json.
    exports: false,
  },
});
