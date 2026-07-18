/**
 * Compile the `.css`-authored component records (`src/components/*.css`, `src/utilities/*.css`,
 * `src/rules/*.css`) into a single generated TS module of string constants
 * (`src/generated/component-styles.ts`). The `.css` files
 * are the authoring source of truth (real CSS — native stylelint/cssdoc/editor support); each carries the
 * `PFX-` class-prefix sentinel. The thin record wrappers import these consts and do
 * `raw.replaceAll(SENTINEL, p)` inside their `css: (p) => …` builder, so the prefix is applied at build
 * time exactly where `${p}` used to interpolate.
 *
 * Unlike the web-components `scripts/styles.ts` this module models, the cssdoc `/** … *\/` doc comments
 * are RETAINED — here they are load-bearing (they flow into `generated/components.css`, which
 * `docs/scripts/build-css-api.ts` parses for the CSS-API pages). Content is emitted verbatim; the runtime
 * pipeline (`define.ts`) normalizes leading/trailing whitespace, so byte-identity of the emitted sheets
 * is preserved.
 *
 * `vp pack` (rolldown) doesn't resolve Vite's `?raw` query, so a generated `.ts` module is the portable
 * way to get the CSS text into the published bundle. Run before `vp pack` / `generate` / `check` / `test`.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import postcss from "postcss";
import { themeCustomMedia } from "@pantoken/plugin-theme-custom-media";

const srcDir = resolve(import.meta.dirname, "../src");
const sources = [join(srcDir, "components"), join(srcDir, "utilities"), join(srcDir, "rules")];
const THEMES = ["rebrand", "canvas", "canvasHighContrast"] as const;

/** `screen-reader-content.css` → `screenReaderContent`. */
const toIdentifier = (file: string): string =>
  file.replace(/\.css$/u, "").replace(/-([a-z0-9])/gu, (_m, c: string) => c.toUpperCase());

const entries: string[] = [];
for (const dir of sources) {
  for (const file of readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .sort()) {
    const css = readFileSync(join(dir, file), "utf8");
    const id = toIdentifier(file);
    const byTheme: Record<(typeof THEMES)[number], string> = {
      rebrand: css,
      canvas: css,
      canvasHighContrast: css,
    };
    for (const theme of THEMES) {
      byTheme[theme] = postcss([themeCustomMedia({ theme })]).process(css, { from: undefined }).css;
    }
    entries.push(`export const ${id}ByTheme = ${JSON.stringify(byTheme)} as const;`);
    entries.push(`export const ${id} = ${id}ByTheme.rebrand;`);
  }
}

const outDir = join(srcDir, "generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "component-styles.ts"),
  `// AUTO-GENERATED from src/{components,utilities}/*.css by scripts/component-styles.ts — do not edit.\n${entries.join(
    "\n",
  )}\n`,
);
console.log(
  `✓ components: wrote src/generated/component-styles.ts (${String(entries.length)} stylesheets)`,
);
