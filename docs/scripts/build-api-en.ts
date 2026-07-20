/**
 * Build the English TypeDoc API reference: run TypeDoc, then the two post-processors (badge styling +
 * the API overview page). This is the `docs:api:en` chain as a single `node`-invocable script, so the
 * workspace orchestrator can rebuild the API pages on a source edit — it can't run `vp run docs:api:en`
 * (nested `vp` can't spawn under `vpr docs:dev`), and its `build` is a single argv, not a shell `&&`
 * chain. TypeDoc is spawned as a plain `node <bin>` (not `vp`), so the nested-spawn limit doesn't apply.
 *
 * VitePress watches the emitted `docs/api/**\/*.md` under its source tree, so the pages hot-reload on
 * their own once regenerated — no extra HMR wiring.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
// TypeDoc's package `exports` don't expose `./bin/typedoc`, so resolve the package root and join the bin
// path from its `bin` field's location.
const typedocBin = join(dirname(require.resolve("typedoc/package.json")), "bin", "typedoc");

const result = spawnSync(
  process.execPath,
  [typedocBin, "--options", "typedoc.json", "--out", "api"],
  { stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);

// Post-process the generated pages, same order as the original `docs:api:en` chain. Both run their work
// at import (top-level side effects).
await import("./style-api-badges.ts");
await import("./write-api-overview.ts");
