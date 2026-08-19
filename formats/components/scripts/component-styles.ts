/**
 * Compile the `.css`-authored component records
 * (`src/components/<name>/<name>.css`, `src/components/<name>/members/<member>/<member>.css`,
 * `src/utilities/<name>/<name>.css`, `src/rules/<name>/<name>.css`) into a single generated TS module
 * of string constants (`src/generated/component-styles.ts`). The `.css` files
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

/** `screen-reader-content` → `screenReaderContent`; a member's name is joined onto its parent first. */
const toIdentifier = (name: string): string =>
  name.replace(/-([a-z0-9])/gu, (_m, c: string) => c.toUpperCase());

/** One discovered `<name>.css` record file plus the identifier its exported consts should use. */
interface CssRecordFile {
  path: string;
  id: string;
}

/**
 * Find every `<record>/<record>.css` under a bucket directory, one folder per record — and, for
 * `components`, every `<parent>/members/<member>/<member>.css` alongside it. A member's identifier is
 * its parent's, camel-cased, followed by its own name capitalized (`menu` + `item` → `menuItem`).
 */
const findCssRecords = (bucketDir: string): CssRecordFile[] => {
  const records: CssRecordFile[] = [];
  for (const name of readdirSync(bucketDir).sort()) {
    const recordDir = join(bucketDir, name);
    const ownCss = join(recordDir, `${name}.css`);
    try {
      readFileSync(ownCss);
      records.push({ path: ownCss, id: toIdentifier(name) });
    } catch {
      continue; // no `.css` for this record (its CSS is authored inline in `index.ts`)
    }
    const membersDir = join(recordDir, "members");
    let memberNames: string[];
    try {
      memberNames = readdirSync(membersDir).sort();
    } catch {
      continue; // no `members/` for this record
    }
    for (const member of memberNames) {
      const memberCss = join(membersDir, member, `${member}.css`);
      const memberId =
        toIdentifier(name) + toIdentifier(member).replace(/^./u, (c) => c.toUpperCase());
      records.push({ path: memberCss, id: memberId });
    }
  }
  return records;
};

const entries: string[] = [];
for (const dir of sources) {
  for (const { path, id } of findCssRecords(dir)) {
    const css = readFileSync(path, "utf8");
    const byTheme: Record<(typeof THEMES)[number], string> = {
      rebrand: css,
      canvas: css,
      canvasHighContrast: css,
    };
    for (const theme of THEMES) {
      byTheme[theme] = postcss([themeCustomMedia({ theme })]).process(css, { from: undefined }).css;
    }
    entries.push(`export const ${id}ByTheme = ${JSON.stringify(byTheme)} as const;`);
    entries.push(`export const ${id}: string = ${id}ByTheme.rebrand;`);
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
