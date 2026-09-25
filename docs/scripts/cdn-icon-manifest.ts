/**
 * Emit two icon picker manifests for the `<IconPicker />` docs component:
 *   - `cdn-icon-manifest-instui.json`: every icon name from `@pantoken/icons`
 *   - `cdn-icon-manifest-lucide-lab.json`: every Lucide Lab icon export
 *   - `cdn-icon-manifest-simple.json`: every brand slug from `simple-icons` (~4.7 MB raw, ~1.8 MB gzip)
 *
 * The InstUI manifest carries only `name`/`source` — the picker renders each icon via the
 * `-icon-<name>` glyph class already shipped in `formats/components/generated/icons.css` (loaded
 * globally by the docs theme), not by re-deriving SVG markup here. Wired into `docs:assets`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { icons } from "../../formats/icons/src/index.ts";
import {
  defaultRegistry as defaultLucideLabRegistry,
  toKebab,
  type LucideLabNode,
} from "../../plugins/pantoken/lucide-lab/src/index.ts";
import { defaultRegistry } from "../../plugins/pantoken/simple-icons/src/index.ts";

const outDir = resolve(import.meta.dirname, "../.vitepress/theme/generated");
mkdirSync(outDir, { recursive: true });

// ── InstUI manifest ──────────────────────────────────────────────────────────
const instui = icons.map((icon) => ({
  name: icon.name,
  source: icon.source ?? "lucide",
}));
const instuiOut = resolve(outDir, "cdn-icon-manifest-instui.json");
writeFileSync(instuiOut, `${JSON.stringify(instui, null, 2)}\n`);
console.log(`✓ docs: wrote cdn-icon-manifest-instui.json (${instui.length} icons)`);

// ── Lucide Lab manifest ─────────────────────────────────────────────────────
const lucideLabRegistry = await defaultLucideLabRegistry();
const lucideLab = Object.entries(lucideLabRegistry)
  .filter(
    (entry): entry is [string, LucideLabNode[]] =>
      Array.isArray(entry[1]) &&
      entry[1].every(
        (node) =>
          Array.isArray(node) &&
          node.length === 2 &&
          typeof node[0] === "string" &&
          !!node[1] &&
          typeof node[1] === "object" &&
          !Array.isArray(node[1]),
      ),
  )
  .map(([name]) => ({ name: toKebab(name) }))
  .sort((a, b) => a.name.localeCompare(b.name));
const lucideLabOut = resolve(outDir, "cdn-icon-manifest-lucide-lab.json");
writeFileSync(lucideLabOut, `${JSON.stringify(lucideLab, null, 2)}\n`);
console.log(`✓ docs: wrote cdn-icon-manifest-lucide-lab.json (${lucideLab.length} icons)`);

// ── Simple Icons manifest ────────────────────────────────────────────────────
// Slug + title only (no path data) — icons are previewed via a jsDelivr CDN img src in the picker.
const registry = await defaultRegistry();
const simpleIcons = Object.values(registry)
  .filter(
    (v): v is { title: string; slug: string } =>
      !!v &&
      typeof (v as { slug?: unknown }).slug === "string" &&
      typeof (v as { title?: unknown }).title === "string",
  )
  .map((v) => ({ slug: v.slug, title: v.title }))
  .sort((a, b) => a.slug.localeCompare(b.slug));
const simpleOut = resolve(outDir, "cdn-icon-manifest-simple.json");
writeFileSync(simpleOut, `${JSON.stringify(simpleIcons, null, 2)}\n`);
console.log(`✓ docs: wrote cdn-icon-manifest-simple.json (${simpleIcons.length} icons)`);
