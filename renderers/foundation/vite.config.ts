import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    // Exports are hand-managed so the static CSS/SCSS (written after pack) survive.
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
