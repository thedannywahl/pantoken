/**
 * Parsed VitePress → Instructure token mappings from `vitepress-vars.css`.
 *
 * @internal
 * @module
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, "vitepress-vars.css");

/** Raw VitePress CSS variables and documentation. */
export const VITEPRESS_VARS_CSS = readFileSync(cssPath, "utf-8");

/**
 * Parse the VitePress variables CSS and extract the mappings into a Record.
 *
 * @internal
 * @returns A mapping of `--vp-*` to `--instui-*` tokens.
 */
function parseCssToMapping(): Readonly<Record<string, string>> {
  const mappings: Record<string, string> = {};
  // Extract CSS custom property assignments from the raw CSS
  // Match patterns like: --vp-c-text-1: var(--instui-color-text-base);
  const varAssignmentRegex = /--vp-([a-z0-9-]+):\s*var\((--instui-[a-z0-9-]+)\)/g;

  for (const match of VITEPRESS_VARS_CSS.matchAll(varAssignmentRegex)) {
    mappings[`--vp-${match[1]}`] = match[2];
  }

  return Object.freeze(mappings);
}

/** VitePress CSS variable → the Instructure token it resolves to. */
export const VITEPRESS_TO_INSTUI: Readonly<Record<string, string>> = parseCssToMapping();
