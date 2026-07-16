/**
 * Emit the published stylesheets for `@pantoken/web-components` from the authored shadow CSS sources:
 *
 * - `generated/components.css` — aggregate of every web-component CSS record.
 * - `generated/<record>.css` — one exported per-record stylesheet.
 *
 * Runs before `vp pack`; `@tsdown/css` then finalizes these files for publication.
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

const aggregate = cssSources
  .map((source) => {
    const css = readFileSync(source.path, "utf8").trim();
    return `/* ${source.name} */\n${css}`;
  })
  .join("\n\n");

const out = join(dir, "components.css");
writeFileSync(out, `${aggregate}\n`);
console.log(`✓ wrote ${out} + ${cssSources.length} per-record stylesheets`);
