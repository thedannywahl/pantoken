/**
 * Emit `generated/layouts.css` — the wrapper layout CSS with the `pfx-` sentinel replaced by `instui-`.
 * The cssdoc `@layout wrapper` doc comment ships as part of `src/layouts/wrapper/wrapper.css`; `wrapperRules("instui-")`
 * produces the full sheet (comment + rules) ready for the docs parser and the published stylesheet.
 *
 * Run after `scripts/component-styles.ts` (which generates `src/generated/component-styles.ts`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { wrapperRules } from "../src/layouts/wrapper/wrapper.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "layouts.css"), `${wrapperRules("instui-")}\n`);
console.log(`✓ layouts: wrote layouts.css`);
