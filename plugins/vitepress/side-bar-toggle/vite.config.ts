import { extendBase } from "../../../vite.config.base.ts";

export default extendBase({
  run: {
    tasks: {
      // The .vue SFC ships as raw source — the consumer's own Vue/Vite toolchain compiles it, so it
      // never goes through this package's own (Vue-plugin-free) pack pipeline. Its two relative
      // imports (inline-script.ts, useSidebarVisibility.ts) ship alongside it as raw source too, so
      // the SFC's relative imports keep resolving once copied into dist.
      build: {
        command: [
          "vp pack",
          "cp src/SidebarToggle.vue src/inline-script.ts src/useSidebarVisibility.ts dist/",
        ],
      },
    },
  },
  pack: {
    entry: { index: "src/index.ts", style: "src/style.css" },
    css: { splitting: true, target: false, minify: true, modules: false, inject: false },
    // Exports are hand-managed so the copied .vue SFC and static style.css survive.
    exports: false,
  },
});
