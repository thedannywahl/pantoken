import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: {
      // the .vue SFC ships as raw source — the consumer's own Vue/Vite toolchain compiles it, so it
      // never goes through this package's own (Vue-plugin-free) pack pipeline
      build: { command: ["vp pack", "cp src/SidebarToggle.vue dist/SidebarToggle.vue"] },
    },
  },
  pack: {
    entry: { index: "src/index.ts", style: "src/style.css" },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the copied .vue SFC and static style.css survive.
    exports: false,
  },
});
