/**
 * Emit the aggregate stylesheet for `@pantoken/web-components` (`generated/components.css`).
 *
 * Per-record CSS files (`generated/<record>.css`) are emitted separately by
 * `scripts/build-entries.ts` which only runs as part of `build`, not `generate`.
 * This keeps the generate step from writing multiple files on every hot-reload
 * and triggering a workspace-observer re-render loop.
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

const aggregate = cssSources
  .map((source) => {
    const css = readFileSync(source.path, "utf8").trim();
    return `/* ${source.name} */\n${css}`;
  })
  .join("\n\n");

const out = join(dir, "components.css");
writeFileSync(out, `${aggregate}\n`);
console.log(`✓ wrote ${out}`);
