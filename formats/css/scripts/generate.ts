/**
 * Emit the static `style.css` for consumers who want a plain stylesheet
 * (`@pantoken/css/style.css`). Runs before `vp pack`; `@tsdown/css` then validates and finalizes
 * the generated source into `dist/style.css`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { css } from "../src/index.ts";

const out = resolve(import.meta.dirname, "../generated/style.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
console.log(`✓ wrote ${out} (${css.length} bytes)`);
