// The benchmark-only config, kept separate from the root `vite.config.ts` so the `bench/**` include
// never touches the ordinary `vp test` / `vp check` passes. Run it explicitly:
// `vp test --run --config vite.bench.config.ts` (CI wraps that in the CodSpeed action).
// TODO: When https://github.com/CodSpeedHQ/codspeed-node/pull/86 ships, swap the temporary
// Tinybench bridge back to @codspeed/vitest-plugin and Vitest-native benchmark registration.
// The benchmarks import package sources directly, exactly as the unit tests do, but the `@pantoken/*`
// specifiers those sources use resolve to built `dist/`, so `vp run -r build` must run first.
import { defineConfig } from "vite-plus";

const codSpeedExecArgv = process.env.CODSPEED_ENV
  ? [
      "--interpreted-frames-native-stack",
      "--allow-natives-syntax",
      "--hash-seed=1",
      "--random-seed=1",
      "--no-opt",
      "--predictable",
      "--predictable-gc-schedule",
      "--expose-gc",
      "--no-concurrent-sweeping",
      "--max-old-space-size=4096",
    ]
  : [];

export default defineConfig({
  test: {
    // CodSpeed injects profiler arguments into the parent process. Vitest replaces them when
    // forwarding `execArgv` to forks, so retain them before adding our deterministic flags.
    execArgv: [...process.execArgv, ...codSpeedExecArgv],
    include: ["bench/*.bench.ts"],
    pool: "forks",
    // One fork, one file at a time. CodSpeed's instrument-hooks talk to the runner over a single
    // FIFO with no per-process framing, so parallel bench forks interleave commands on it — that
    // desync ("Failed to deserialize FIFO command", "StopProfiler before StartProfiler") can leave
    // the runner blocked on a response it never gets, hanging the job. Serial runs also keep
    // walltime numbers from being noise off CPU contention between forks.
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 120_000,
    hookTimeout: 120_000,
    teardownTimeout: 30_000,
  },
});
