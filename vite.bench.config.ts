// The benchmark-only config, kept separate from the root `vite.config.ts` so the `bench/**` include
// never touches the ordinary `vp test` / `vp check` passes. Run it explicitly:
// `vp test --run --config vite.bench.config.ts` (CI wraps that in the CodSpeed action).
// TODO: When https://github.com/CodSpeedHQ/codspeed-node/pull/86 ships, swap the temporary
// Tinybench bridge back to @codspeed/vitest-plugin and Vitest-native benchmark registration.
// The benchmarks import package sources directly, exactly as the unit tests do, but the `@pantoken/*`
// specifiers those sources use resolve to built `dist/`, so `vp run -r build` must run first.
import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: ["bench/*.bench.ts"],
    testTimeout: 120_000,
  },
});
