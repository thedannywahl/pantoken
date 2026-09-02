/**
 * Emit `dist/manifest.json` — a plain array of every Simple Icons slug this package publishes
 * per-icon CSS for (`dist/icons/<slug>.css`). Lets a consumer (e.g. `@pantoken/tinymce`'s icons
 * picker) enumerate available brand icons without depending on the full `simple-icons` npm
 * package, which carries full SVG path data per icon.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultRegistry } from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../dist");
mkdirSync(outDir, { recursive: true });

/** Build the sorted list of published icon slugs. */
export async function buildManifest(): Promise<string[]> {
  const registry = await defaultRegistry();
  const entries = Object.values(registry) as Array<{ slug?: string }>;
  return entries
    .map((e) => e.slug)
    .filter((slug): slug is string => typeof slug === "string")
    .sort();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const manifest = await buildManifest();
  writeFileSync(resolve(outDir, "manifest.json"), JSON.stringify(manifest));
  console.log(`✓ simple-icons: wrote manifest.json (${manifest.length} icon slugs)`);
}
