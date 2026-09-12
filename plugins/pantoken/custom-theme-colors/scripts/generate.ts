/**
 * Emit `generated/custom-theme-colors.css` — the standalone CSS rules for the custom theme colors plugin.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { customThemeColorsCss } from "../src/index.ts";

const DOC = `/**
 * Custom theme colors plugin output for pantoken.
 */`;

const sheet = `${DOC}\n${customThemeColorsCss()}\n`;

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "custom-theme-colors.css"), sheet);
console.log(`✓ custom-theme-colors: wrote custom-theme-colors.css`);
