/**
 * Emit the static `global.css` for consumers who want a plain stylesheet
 * (`@pantoken/pendo/global.css`). Runs before `vp pack`; `@tsdown/css` then validates and finalizes
 * the generated source into `dist/global.css`.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildPendoCss } from "../src/index.ts";

const packageJson = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../package.json"), "utf8"),
) as { name: string; version: string };

// Static global.css: flatten @property and mangle --instui-* for maximum size reduction.
const minified = buildPendoCss({ flatten: true, mangle: true });
const css = `/*! ${packageJson.name}@${packageJson.version} */\n${minified}`;
const out = resolve(import.meta.dirname, "../generated/global.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
console.log(`✓ wrote ${out} (${css.length} bytes)`);
