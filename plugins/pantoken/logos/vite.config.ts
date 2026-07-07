import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    // Exports are hand-managed so the static `./logos.css` export survives.
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
