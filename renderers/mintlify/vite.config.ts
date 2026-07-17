import { defineConfig } from "vite-plus";

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: ["vp pack", "vp run generate"],
        // node_modules/.modules.yaml is rewritten by every CI reinstall; excluding it keeps
        // vp pack a cache hit across jobs instead of re-packing on every run.
        input: [{ auto: true }, { pattern: "!node_modules/.modules.yaml", base: "workspace" }],
      },
    },
  },
  pack: {
    dts: true,
    // Exports are hand-managed so the static `./docs.json` (written after pack) survives.
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
