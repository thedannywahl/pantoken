import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    // Exports are hand-managed so the static `./fonts.css` export survives.
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
