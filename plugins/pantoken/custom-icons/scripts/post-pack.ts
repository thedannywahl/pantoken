/**
 * Copy the per-icon CSS files from `generated/icons/` into `dist/icons/` after `vp pack`.
 * The barrel `custom-icons.css` is a tsdown entry; the per-icon files are pre-built and copied.
 */
import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const from = resolve(import.meta.dirname, "../generated/icons");
const to = resolve(import.meta.dirname, "../dist/icons");
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log(`✓ custom-icons: copied per-icon CSS files to dist/icons/`);
