/**
 * Emit one stylesheet per component for the per-component CSS subpath exports
 * (`@import "@pantoken/components/alert.css"`), plus one per individually-exported utility (under
 * `generated/utilities/`, for the `./<name>.css` subpaths that resolve to `dist/utilities/<name>.css` —
 * see `package.json`'s `exports` map and `vite.config.ts`'s utility pack entries).
 *
 * Runs between `generate.ts` and `vp pack` as part of `build`, NOT as part of
 * the `generate` step that docs:dev invokes. Writing 46+ files on every
 * hot-reload would trigger the workspace observer on each write and create a
 * re-render loop. Keeping this step build-only avoids that entirely.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { COMPONENTS } from "../src/components/index.ts";
import {
  cursorUtilitiesCss,
  gapCss,
  iconCss,
  layoutUtilitiesCss,
  maskUtilityCss,
  overflowUtilitiesCss,
  positionUtilitiesCss,
  responsiveUtilitiesCss,
  screenReaderContentCss,
  spacingUtilitiesCss,
  stackingUtilityCss,
  transitionCss,
} from "../src/index.ts";

const opts = { prefix: "instui" } as const;
const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const component of COMPONENTS) {
  if (component.kind !== "component") continue;
  writeFileSync(join(outDir, `${component.name}.css`), component.css(opts));
  count++;
}
console.log(`✓ components: wrote ${count} per-component CSS files`);

// The public export filename doesn't always match the utility's internal registry name (e.g. the
// `mask` global-utility export is `maskUtilityCss`, whose own record is named `maskglobal`, to avoid
// colliding with the real `mask` component's own `mask.css`).
const UTILITY_ENTRIES: Record<string, (options: typeof opts) => string> = {
  spacing: spacingUtilitiesCss,
  gap: gapCss,
  layout: layoutUtilitiesCss,
  position: positionUtilitiesCss,
  overflow: overflowUtilitiesCss,
  cursor: cursorUtilitiesCss,
  stacking: stackingUtilityCss,
  mask: maskUtilityCss,
  icon: iconCss,
  "screen-reader-content": screenReaderContentCss,
  transition: transitionCss,
  responsive: responsiveUtilitiesCss,
};

const utilitiesOutDir = join(outDir, "utilities");
mkdirSync(utilitiesOutDir, { recursive: true });
let utilityCount = 0;
for (const [name, css] of Object.entries(UTILITY_ENTRIES)) {
  writeFileSync(join(utilitiesOutDir, `${name}.css`), css(opts));
  utilityCount++;
}
console.log(`✓ components: wrote ${String(utilityCount)} per-utility CSS files`);
