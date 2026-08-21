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

/** Utility metadata we can derive from the leading cssdoc block. */
interface UtilityDocMeta {
  utilityName: string;
  baseName: string;
}

/** Parse `@utility` and `@selector` from the leading cssdoc block in a utility stylesheet. */
// fallow-ignore-next-line complexity
const parseUtilityDocMeta = (css: string): UtilityDocMeta | null => {
  const firstDoc = css.match(/\/\*\*[\s\S]*?\*\//u)?.[0];
  if (!firstDoc) return null;

  const utilityName = firstDoc.match(/@utility\s+([a-z0-9-]+)/u)?.[1];
  if (!utilityName) return null;

  const selectorSample = firstDoc.match(/@selector\s+([^\n*]+)/u)?.[1]?.trim();
  const baseFromSelector = selectorSample?.match(/\.instui-([a-z0-9-]+)/u)?.[1];

  return {
    utilityName,
    baseName: baseFromSelector ?? utilityName,
  };
};

/**
 * Auto-emit utility selector variants from canonical selectors in CSS-authored utilities.
 *
 * Canonical forms authored in CSS:
 * - `.pfx-<base>`
 * - `.pfx-<base>.-<modifier>`
 *
 * Emitted variants:
 * - base: canonical + `.-<utility>-<base>` + `.-<base>`
 * - modifier: canonical + `.-<utility>-<modifier>` + bare modifier class
 */
const expandUtilitySelectors = (css: string): string => {
  const meta = parseUtilityDocMeta(css);
  if (!meta) return css;

  const root = postcss.parse(css);
  const baseSelector = `.pfx-${meta.baseName}`;
  const modifierSelectorPattern = new RegExp(`^\\.pfx-${meta.baseName}(\\.-[a-z0-9-]+)$`, "u");

  // fallow-ignore-next-line complexity
  root.walkRules((rule) => {
    const expanded: string[] = [];
    let changed = false;

    for (const selector of rule.selectors) {
      const s = selector.trim();

      if (s === baseSelector) {
        changed = true;
        expanded.push(s);
        // Avoid awkward duplicate long-form aliases like
        // `.-screen-reader-content-screen-reader-content`.
        if (!(meta.utilityName === meta.baseName && meta.baseName.includes("-"))) {
          expanded.push(`.-${meta.utilityName}-${meta.baseName}`);
        }
        expanded.push(`.-${meta.baseName}`);
        continue;
      }

      const modifierMatch = s.match(modifierSelectorPattern);
      if (modifierMatch) {
        changed = true;
        const modifierClass = modifierMatch[1]; // e.g. ".-transition-fade-entering"
        const modifier = modifierClass.slice(1); // e.g. "-transition-fade-entering"
        expanded.push(s);
        expanded.push(`.-${meta.utilityName}${modifier}`);
        expanded.push(`.${modifier}`);
        continue;
      }

      expanded.push(s);
    }

    if (changed) {
      rule.selectors = [...new Set(expanded)];
    }
  });

  return root.toString();
};

/**
 * Find every `<record>/<record>.css` under a bucket directory, one folder per record — and, for
 * `components`, every `<parent>/members/<member>/<member>.css` alongside it. A member's identifier is
 * its parent's, camel-cased, followed by its own name capitalized (`menu` + `item` → `menuItem`).
 */
// fallow-ignore-next-line complexity
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
    const rawCss = readFileSync(path, "utf8");
    const css = path.includes(`${join(srcDir, "utilities")}/`)
      ? expandUtilitySelectors(rawCss)
      : rawCss;
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
