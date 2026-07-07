/**
 * Emit the static `tokens.styl` for consumers who want a plain Stylus file
 * (`@pantoken/stylus/tokens.styl`). Runs after `vp pack`, importing the built output.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { stylus } from "../dist/index.mjs";

const out = resolve(import.meta.dirname, "../generated/tokens.styl");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, stylus);
console.log(`✓ wrote ${out} (${stylus.length} bytes)`);
