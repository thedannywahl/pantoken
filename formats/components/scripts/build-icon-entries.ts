/**
 * Emit one self-contained stylesheet per icon for selective CDN delivery.
 *
 * Unlike `icons.css` (which only ships the glyph class and relies on the full token sheet for
 * the data-URI), each `generated/icons/<name>.css` declares both the `--instui-icon-<name>`
 * custom property value AND the `.-icon-<name>` glyph modifier, so it works alongside the lean
 * token sheet (`style.lean.css`) without loading the entire icon set.
 *
 * Output is intentionally minimal (no `@property` registration, no comments) to keep each file
 * small for combine-URL delivery. The `.instui-icon` painter utility still needs to be loaded
 * separately (e.g. from `components.css` or `component-icons.css`).
 *
 * Runs between `generate.ts` and `vp pack` as part of `build`, NOT during the `generate`
 * step used by docs:dev — writing 1800+ files on every hot-reload would trigger the workspace
 * observer and cause a re-render loop.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { icons } from "@pantoken/icons";

const outDir = resolve(import.meta.dirname, "../generated/icons");
mkdirSync(outDir, { recursive: true });

for (const icon of icons) {
  // Minified: token value + glyph class, no wrapper or @property (relies on lean token sheet).
  const css = `:root{--instui-icon-${icon.name}:${icon.dataUri}}.-icon-${icon.name}{--pantoken-glyph:var(--instui-icon-${icon.name})}\n`;
  writeFileSync(join(outDir, `${icon.name}.css`), css);
}
console.log(`✓ components: wrote ${icons.length} per-icon CSS files to generated/icons/`);
