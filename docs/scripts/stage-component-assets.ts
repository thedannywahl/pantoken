/**
 * Copy the single-theme component stylesheets the `/play` runner loads into `public/demos-assets/`,
 * sourced from `formats/components/generated/*.css` — NOT the shipped `@pantoken/components/*.css`
 * (which resolves to `dist`).
 *
 * During `vpr docs:dev` the components `dist` is only rebuilt by `vp pack`, which can't run nested under
 * vitepress, so a `dist` copy would go stale on every source edit. The `generated/*.css` sheets are
 * written from source by `formats/components/scripts/generate.ts` on every orchestrator cascade, so
 * copying from there keeps the demo assets live. These sheets carry no `@media (--theme-*)` rules, so a
 * plain single-theme copy is correct (unlike `components.css`, which needs the multi-theme scoping in
 * `components-sheet.ts`).
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on component edits during `docs:dev`: the config's
 * workspace orchestrator cascades to this script (as the `@pantoken/docs#component-assets` node) after
 * the components recompile + `generate`. Writing into `public/` triggers a Vite full reload, so the
 * embedded `/play` iframes refetch the updated CSS.
 *
 * @module
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
// Source import (build-time docs script, never shipped to the browser) so the focus-outline sheet
// tracks focus.ts edits live via the components cascade. focus.ts lives under formats/components/src,
// so the `#styles → generate → component-assets` cascade reruns this on a focus edit.
import { focusOutlineCss } from "../../formats/components/src/declarations/focus.ts";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const generatedDir = join(repoRoot, "formats", "components", "generated");
const assetsDir = join(docsRoot, "public", "demos-assets");

/** The single-theme component sheets the `/play` runner injects (components.css is handled separately). */
const SHEETS = ["base", "prose", "icons", "select", "utilities"] as const;

/**
 * Copy each `generated/<name>.css` into `public/demos-assets/`, and write `focus-outline.css` from the
 * source `focusOutlineCss()` (the standalone ring the site `<head>` links and the `/play` runner load;
 * it isn't a shipped file, only inlined into base.css). Returns the written paths.
 */
export function stageComponentAssets(): string[] {
  mkdirSync(assetsDir, { recursive: true });
  const copied = SHEETS.map((name) => {
    const out = join(assetsDir, `${name}.css`);
    copyFileSync(join(generatedDir, `${name}.css`), out);
    return out;
  });
  const focusOut = join(assetsDir, "focus-outline.css");
  writeFileSync(focusOut, focusOutlineCss());
  return [...copied, focusOut];
}

// Run when invoked directly (`node scripts/stage-component-assets.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  const written = stageComponentAssets();
  console.log(
    `✓ component-assets: staged ${String(written.length)} sheet(s) to public/demos-assets/`,
  );
}
