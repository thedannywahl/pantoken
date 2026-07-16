/**
 * Emit the static `global.css` for consumers who want a plain stylesheet
 * (`@pantoken/pendo/global.css`). Runs before `vp pack`; `@tsdown/css` then validates and finalizes
 * the generated source into `dist/global.css`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pendoCss } from "../src/index.ts";

const out = resolve(import.meta.dirname, "../generated/global.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pendoCss);
console.log(`✓ wrote ${out} (${pendoCss.length} bytes)`);
