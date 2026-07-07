/**
 * Emit the static `style.css` for consumers who want a plain stylesheet
 * (`@pantoken/css/style.css`). Runs after `vp pack`, importing the built output.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { css } from "../dist/index.mjs";

const out = resolve(import.meta.dirname, "../generated/style.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
console.log(`✓ wrote ${out} (${css.length} bytes)`);
