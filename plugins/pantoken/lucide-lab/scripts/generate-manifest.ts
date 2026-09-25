/**
 * Emit `dist/manifest.json` — a plain array of every Lucide Lab icon name this package publishes
 * per-icon CSS for (`dist/icons/<name>.css`). Lets a consumer (e.g. `@pantoken/tinymce`'s icons
 * picker) enumerate available glyphs without depending on the full `@lucide/lab` npm package.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultRegistry, toKebab } from "../src/index.ts";
import type { LucideLabNode } from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../dist");
mkdirSync(outDir, { recursive: true });

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

/** Build the sorted list of published icon names. */
export async function buildManifest(): Promise<string[]> {
  const registry = await defaultRegistry();
  return Object.entries(registry)
    .filter((entry): entry is [string, LucideLabNode[]] => isIconNode(entry[1]))
    .map(([name]) => toKebab(name))
    .sort();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const manifest = await buildManifest();
  writeFileSync(resolve(outDir, "manifest.json"), JSON.stringify(manifest));
  console.log(`✓ lucide-lab: wrote manifest.json (${manifest.length} icon names)`);
}
