/** Stage the source-built Pendo stylesheet used by the semantic guide demo. */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildPendoCss } from "../../renderers/pendo/src/index.ts";

const docsRoot = join(import.meta.dirname, "..");
const assetsDir = join(docsRoot, "public", "demos-assets");

/** Write the production Pendo stylesheet and return its output path. */
export function stagePendoAsset(): string {
  mkdirSync(assetsDir, { recursive: true });
  const out = join(assetsDir, "pendo.css");
  writeFileSync(out, buildPendoCss());
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  stagePendoAsset();
  console.log("✓ pendo-asset: staged public/demos-assets/pendo.css");
}
