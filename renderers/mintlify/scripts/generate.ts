/**
 * Emit the Mintlify `docs.json` theming fragment (colors + background) for the `rebrand` theme. Runs
 * after `vp pack`. Merge the keys into your own `docs.json`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { docsJson } from "../dist/index.mjs";

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });
const out = join(dir, "docs.json");
writeFileSync(out, `${JSON.stringify(docsJson, null, 2)}\n`);
console.log(`✓ wrote ${out}`);
