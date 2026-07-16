import { defineConfig } from "vite-plus";
import { readdirSync } from "node:fs";

const cssEntries = Object.fromEntries(
  ["src/elements", "src/lib"]
    .flatMap((dir) =>
      readdirSync(dir)
        .filter((name) => name.endsWith(".css"))
        .map((name) => name.replace(/\.css$/u, "")),
    )
    .sort()
    .map((name) => [name, `generated/${name}.css`]),
);

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      components: "generated/components.css",
      ...cssEntries,
    },
    dts: true,
    css: {
      splitting: true,
      target: false,
      minify: true,
      modules: false,
      inject: false,
    },
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
