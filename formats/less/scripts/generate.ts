/**
 * Emit the static `tokens.less` for consumers who want a plain Less file
 * (`@pantoken/less/tokens.less`). Runs after `vp pack`, importing the built output.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { less } from "../dist/index.mjs";

const out = resolve(import.meta.dirname, "../generated/tokens.less");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, less);
console.log(`✓ wrote ${out} (${less.length} bytes)`);
