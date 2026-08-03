/**
 * Emit the Simple Icons CSS output: per-icon stylesheets and a full barrel.
 *
 * Each `generated/icons/<slug>.css` is self-contained — it declares the `--instui-icon-<slug>`
 * custom property value (as a data-URI) and the `.-icon-<slug>` glyph modifier. Users who want
 * only specific brand icons can load individual files via a jsDelivr combine URL alongside the
 * lean pantoken token sheet and the `icon` utility from `@pantoken/components`.
 *
 * `generated/simple-icons.css` is the full barrel (all slugs concatenated) for consumers who
 * want every brand glyph in one request.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defaultRegistry } from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
const iconsDir = join(outDir, "icons");
mkdirSync(iconsDir, { recursive: true });

const registry = await defaultRegistry();
const entries = Object.values(registry) as Array<{
  title: string;
  slug: string;
  path: string;
  hex?: string;
}>;

const validEntries = entries.filter(
  (e) => e && typeof e.slug === "string" && typeof e.path === "string",
);

const barrel: string[] = [];
let count = 0;

for (const icon of validEntries) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><path d="${icon.path}"/></svg>`;
  const dataUri = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
  const css = `:root{--instui-icon-${icon.slug}:${dataUri}}.-icon-${icon.slug}{--pantoken-glyph:var(--instui-icon-${icon.slug})}\n`;
  writeFileSync(join(iconsDir, `${icon.slug}.css`), css);
  barrel.push(css);
  count++;
}

writeFileSync(join(outDir, "simple-icons.css"), barrel.join(""));
console.log(`✓ simple-icons: wrote ${count} per-icon CSS files + simple-icons.css barrel`);
