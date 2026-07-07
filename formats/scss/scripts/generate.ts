/**
 * Emit the static `tokens.scss` for consumers who want a plain SCSS file
 * (`@pantoken/scss/tokens.scss`). Runs after `vp pack`, importing the built output.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { scss } from "../dist/index.mjs";

const out = resolve(import.meta.dirname, "../generated/tokens.scss");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, scss);
console.log(`✓ wrote ${out} (${scss.length} bytes)`);
