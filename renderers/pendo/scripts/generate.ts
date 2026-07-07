/**
 * Emit the static `global.css` for consumers who want a plain stylesheet
 * (`@pantoken/pendo/global.css`). Runs after `vp pack`, importing the built output.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pendoCss } from "../dist/index.mjs";

const out = resolve(import.meta.dirname, "../generated/global.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pendoCss);
console.log(`✓ wrote ${out} (${pendoCss.length} bytes)`);
