/** Emit per-icon CSS files and the full Lucide Lab CSS barrel. */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defaultRegistry, svgOf, toKebab, type LucideLabNode } from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
const iconsDir = join(outDir, "icons");
mkdirSync(iconsDir, { recursive: true });

function isIconNode(value: unknown): value is LucideLabNode[] {
  return (
    Array.isArray(value) &&
    value.every(
      (node) =>
        Array.isArray(node) &&
        node.length === 2 &&
        typeof node[0] === "string" &&
        !!node[1] &&
        typeof node[1] === "object" &&
        !Array.isArray(node[1]),
    )
  );
}

const registry = await defaultRegistry();
const entries = Object.entries(registry)
  .filter((entry): entry is [string, LucideLabNode[]] => isIconNode(entry[1]))
  .map(([name, nodes]) => ({ name: toKebab(name), nodes }))
  .sort((a, b) => a.name.localeCompare(b.name));

const barrel: string[] = [];
for (const icon of entries) {
  const dataUri = `url('data:image/svg+xml;utf8,${encodeURIComponent(svgOf(icon.nodes))}')`;
  const css = `:root{--instui-icon-${icon.name}:${dataUri}}.-icon-${icon.name}{--pantoken-glyph:var(--instui-icon-${icon.name})}\n`;
  writeFileSync(join(iconsDir, `${icon.name}.css`), css);
  barrel.push(css);
}

writeFileSync(join(outDir, "lucide-lab.css"), barrel.join(""));
console.log(`✓ lucide-lab: wrote ${entries.length} per-icon CSS files + lucide-lab.css barrel`);
