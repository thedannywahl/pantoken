// The benchmark-only config, kept separate from the root `vite.config.ts` so the CodSpeed plugin and
// the `bench/**` include never touch the ordinary `vp test` / `vp check` passes. Run it explicitly:
// `vp exec vitest bench --run --config vite.bench.config.ts` (CI wraps that in the CodSpeed action).
// The benchmarks import package sources directly, exactly as the unit tests do, but the `@pantoken/*`
// specifiers those sources use resolve to built `dist/`, so `vp run -r build` must run first.
import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    include: ["bench/**/*.bench.ts"],
    benchmark: {
      include: ["bench/**/*.bench.ts"],
    },
  },
});
