/**
 * Compile the co-located shadow-DOM CSS (`src/elements/*.css`, `src/lib/*.css`) into a single generated
 * TypeScript module of string constants (`src/generated/styles.ts`). The `.css` files are the
 * lint/format/docs source of truth (stylelint + cssdoc own them); the elements import the generated
 * string consts and inline them into their shadow `<style>`. The cssdoc `/** … *\/` doc comments are
 * stripped here so they don't ship as dead bytes in every shadow root (plain `/* … *\/` notes stay).
 *
 * `vp pack` (rolldown) doesn't resolve Vite's `?raw` query, so a plain generated `.ts` module is the
 * portable way to get the CSS text into the bundle. Run before `vp pack` / `vp check` / `vp test`.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const srcDir = join(import.meta.dirname, "..", "src");
const sources = [join(srcDir, "elements"), join(srcDir, "lib")];

/** `drawer-layout.css` → `drawerLayout`. */
const toIdentifier = (file: string): string =>
  file.replace(/\.css$/u, "").replace(/-([a-z0-9])/gu, (_, c: string) => c.toUpperCase());

const entries: string[] = [];
for (const dir of sources) {
  for (const file of readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .sort()) {
    // Strip cssdoc doc comments (`/** … */`) from the shipped shadow CSS; keep plain `/* … */` notes.
    const css = readFileSync(join(dir, file), "utf8")
      .replace(/\/\*\*[\s\S]*?\*\//gu, "")
      .trim();
    entries.push(`export const ${toIdentifier(file)} = ${JSON.stringify(css)};`);
  }
}

const outDir = join(srcDir, "generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "styles.ts"),
  `// AUTO-GENERATED from src/**/*.css by scripts/styles.ts — do not edit.\n${entries.join("\n")}\n`,
);
console.log(
  `✓ web-components: wrote src/generated/styles.ts (${String(entries.length)} stylesheets)`,
);
