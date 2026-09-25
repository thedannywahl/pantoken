/**
 * Emit the layout CSS artifacts:
 *
 * - `generated/*.css` — raw CSSDoc-bearing layout sheets for the docs parser and model build.
 * - `generated/runtime/*.css` — browser-valid layout sheets packed into the published CSS exports.
 *
 * Run after `scripts/component-styles.ts` (which generates `src/generated/component-styles.ts`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { generateMessageBundles, loadConfig } from "@pantoken/i18n-engine";
import { LOCALES } from "../../../../renderers/web-components/src/lib/locales.ts";
import { runtimeCss } from "../src/lib/runtime-css.ts";
import { wrapperRules } from "../src/layouts/wrapper/wrapper.ts";
import { calloutRules } from "../src/layouts/callout/callout.ts";
import { heroRules } from "../src/layouts/hero/hero.ts";
import { pageLayoutRules } from "../src/layouts/page-layout/page-layout.ts";
import { rubricNoteRules } from "../src/layouts/rubric-note/rubric-note.ts";
import { testimonialRules } from "../src/layouts/testimonial/testimonial.ts";
import { twoColumnRules } from "../src/layouts/two-column/two-column.ts";

const root = resolve(import.meta.dirname, "..");
const outDir = resolve(import.meta.dirname, "../generated");
const runtimeDir = join(outDir, "runtime");
mkdirSync(outDir, { recursive: true });
mkdirSync(runtimeDir, { recursive: true });

const layouts: Array<[string, (prefix?: string) => string]> = [
  ["wrapper", wrapperRules],
  ["callout", calloutRules],
  ["hero", heroRules],
  ["page-layout", pageLayoutRules],
  ["rubric-note", rubricNoteRules],
  ["testimonial", testimonialRules],
  ["two-column", twoColumnRules],
];
const allLayoutsCss = layouts.map(([, rules]) => rules("instui-")).join("\n\n");

writeFileSync(join(outDir, "layouts.css"), `${allLayoutsCss}\n`);
writeFileSync(join(runtimeDir, "layouts.css"), `${runtimeCss(allLayoutsCss)}\n`);
for (const [name, rules] of layouts) {
  const css = rules("instui-");
  writeFileSync(join(outDir, `${name}.css`), `${css}\n`);
  writeFileSync(join(runtimeDir, `${name}.css`), `${runtimeCss(css)}\n`);
}
console.log(
  `✓ layouts: wrote raw + runtime layouts.css and ${layouts.length} per-layout CSS files`,
);

generateMessageBundles(
  loadConfig(resolve(root, "../../../i18n.config.json")),
  resolve(root, "../../.."),
  "layouts.strings",
  Object.keys(LOCALES),
  outDir,
);
console.log(
  `✓ layouts: emitted layouts.strings message bundles for ${Object.keys(LOCALES).length} locales`,
);
