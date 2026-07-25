import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  run: {
    tasks: {
      // `build` as a task (not a package.json script) so we can drop pnpm's `node_modules/.modules.yaml`
      // from the pack cache fingerprint. Every CI job reinstalls, which rewrites that manifest, and
      // `vp pack`'s auto-tracking would otherwise treat it as a changed input and re-pack on every job.
      build: {
        command: "vp pack",
        input: [{ auto: true }, { pattern: "!node_modules/.modules.yaml", base: "workspace" }],
      },
    },
  },
});
