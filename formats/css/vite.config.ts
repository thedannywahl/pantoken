import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      inject: "src/inject.ts",
      style: "generated/style.css",
    },
    dts: true,
    css: {
      splitting: true,
      target: false,
      minify: true,
      modules: false,
      inject: false,
    },
    // Exports are hand-managed so the static `./style.css` export survives.
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
