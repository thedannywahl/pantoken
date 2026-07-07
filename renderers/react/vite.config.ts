import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.tsx"],
    dts: true,
    // Exports are hand-managed so the static ./components.css export survives.
    exports: false,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
