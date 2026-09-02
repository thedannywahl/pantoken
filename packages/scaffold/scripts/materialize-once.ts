/**
 * Materializes one scaffold platform into a target directory. Run as a fresh `node` invocation
 * (never imported) so `../generated/{scaffolds,preset-ledger}.ts` — ESM-cached modules regenerated
 * by `scripts/scan-presets.ts` + `scripts/generate.ts` just before this runs — are read fresh.
 *
 * Usage: `node scripts/materialize-once.ts <platform> <dir>`
 */
import { resolve } from "node:path";
import { scaffoldProject } from "../src/index.ts";

const [, , platform, dir] = process.argv;
if (!platform || !dir) {
  console.error("Usage: node scripts/materialize-once.ts <platform> <dir>");
  process.exit(1);
}

await scaffoldProject(platform, resolve(dir));
