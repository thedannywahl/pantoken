import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: {
      index: "src/index.ts",
      "skins/next-gen/skin": "generated/skins/next-gen/skin.css",
      "skins/next-gen/content": "generated/skins/next-gen/content.css",
      "skins/canvas/skin": "generated/skins/canvas/skin.css",
      "skins/canvas/content": "generated/skins/canvas/content.css",
      "skins/canvas-high-contrast/skin": "generated/skins/canvas-high-contrast/skin.css",
      "skins/canvas-high-contrast/content": "generated/skins/canvas-high-contrast/content.css",
    },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    exports: false,
  },
});
