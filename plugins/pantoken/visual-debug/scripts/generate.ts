/**
 * Emit `generated/visual-debug.css` — the authored cssdoc `@utility` record and the `-with-visual-debug`
 * outline rules. There are no `:root` token declarations (the outline colour is an inline-fallback custom
 * property), so the doc comment leads the sheet, immediately before the class rules (cssdoc attaches a
 * comment to the next rule). The sheet feeds the stylelint/eslint cssdoc lint and the docs CSS-API pages.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { VISUAL_DEBUG_RULES } from "../src/index.ts";

const DOC = `/**
 * @utility visual-debug
 * @class .-with-visual-debug
 * @group Plugins
 * @summary A layout-debugging outline: compound \`.-with-visual-debug\` onto any element to outline the box and its immediate children, so a layout's structure is visible at a glance.
 * @cssproperty --pantoken-visual-debug-color — The outline colour (default a bright magenta); retint it to change every debug outline.
 * @example
 * <div class="instui-view -with-visual-debug">
 *   <span>Outlined child.</span>
 * </div>
 */`;

const sheet = `${DOC}\n${VISUAL_DEBUG_RULES}\n`;

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "visual-debug.css"), sheet);
console.log(`✓ visual-debug: wrote visual-debug.css`);
