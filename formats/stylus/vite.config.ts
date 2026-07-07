import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    // Exports are hand-managed so the static `./tokens.styl` (written after pack) survives.
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
