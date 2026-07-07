/**
 * Build-time generator for `@pantoken/tokens`. Resolves the IR for every theme and vendors it —
 * plus the raw Tokens Studio JSON and upstream provenance — as static JSON under `generated`.
 * This is what lets the published package ship with no dependency on the (GitHub-only) upstream.
 */
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { buildTokens } from "@pantoken/core";
import { themeTokens } from "@instructure/instructure-design-tokens";
import type { Theme } from "@pantoken/model";

const require = createRequire(import.meta.url);
const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

const THEMES: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

for (const theme of THEMES) {
  const tokens = buildTokens({ theme });
  writeFileSync(join(outDir, `${theme}.json`), `${JSON.stringify(tokens)}\n`);
  console.log(`✓ ${theme}: ${tokens.length} tokens`);
}

// Raw Tokens Studio JSON, re-published verbatim (npm + semver access without GitHub pinning).
writeFileSync(join(outDir, "raw.json"), `${JSON.stringify(themeTokens)}\n`);

// Provenance: the exact upstream version this build was vendored from.
let upstreamVersion = "unknown";
try {
  const main = require.resolve("@instructure/instructure-design-tokens");
  const pkg = JSON.parse(readFileSync(join(dirname(main), "..", "package.json"), "utf8"));
  upstreamVersion = pkg.version ?? "unknown";
} catch {
  // Provenance is best-effort.
}
writeFileSync(
  join(outDir, "meta.json"),
  `${JSON.stringify({ upstream: "@instructure/instructure-design-tokens", upstreamVersion })}\n`,
);
console.log(`✓ raw.json + meta.json (upstream ${upstreamVersion})`);
