/**
 * Emit one stylesheet per web-component record for the per-record CSS subpath
 * exports (`@import "@pantoken/web-components/tooltip.css"`).
 *
 * Runs between `generate.ts` and `vp pack` as part of `build`, NOT as part of
 * the `generate` step. Writing 8+ files on every hot-reload would trigger the
 * workspace observer on each write and create a re-render loop.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const cssSources = ["src/elements", "src/lib"]
  .flatMap((dir) => {
    const abs = resolve(import.meta.dirname, "..", dir);
    return readdirSync(abs)
      .filter((name) => name.endsWith(".css"))
      .sort()
      .map((name) => ({ name, path: join(abs, name) }));
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });

for (const source of cssSources) {
  const css = readFileSync(source.path, "utf8").trim();
  writeFileSync(join(dir, source.name), `${css}\n`);
}
console.log(`✓ web-components: wrote ${cssSources.length} per-record CSS files`);
