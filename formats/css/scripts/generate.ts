/**
 * Emit the static stylesheets for consumers who want a plain sheet: the typed `style.css`
 * (`@pantoken/css/style.css`) and the declaration-only `style.lean.css` (`@pantoken/css/style.lean.css`,
 * the recommended CDN/embed foundation). Runs before `vp pack`; `@tsdown/css` then validates and
 * finalizes the generated sources into `dist/`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { css, leanCss } from "../src/index.ts";

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });

const write = (name: string, contents: string): void => {
  const out = resolve(dir, name);
  writeFileSync(out, contents);
  console.log(`✓ wrote ${out} (${contents.length} bytes)`);
};

write("style.css", css);
write("style.lean.css", leanCss);
