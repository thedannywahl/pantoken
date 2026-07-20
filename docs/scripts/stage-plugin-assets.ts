/**
 * Copy the plugin decoration sheets the site `<head>` links and the `/play` runner load into
 * `public/demos-assets/`, sourced from each plugin's `generated/<name>.css` — NOT the plugin `dist`
 * function (which `demos.ts` used to call via `toCss([], { plugins: [transition()] })`).
 *
 * Each `plugins/pantoken/<pkg>/generated/<name>.css` is written from source by that plugin's plain
 * `node scripts/generate.ts` (no `vp pack`), so copying from there keeps the sheets live during
 * `docs:dev`: the orchestrator runs the plugin generate on a `src` edit, then cascades here. It's also
 * the exact sheet the CSS-API `@example` pages document, so the demo previews and the docs stay in sync.
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on plugin edits during `docs:dev` (the config's
 * workspace orchestrator invokes this as the `@pantoken/docs#plugin-assets` node). Writing into
 * `public/` triggers a Vite full reload, so the `<head>`-linked chrome and the `/play` iframes refetch.
 *
 * @module
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const pluginsDir = join(repoRoot, "plugins", "pantoken");
const assetsDir = join(docsRoot, "public", "demos-assets");

/** demos-asset sheet name → the plugin package directory that generates it (sheet basenames match). */
const PLUGIN_SHEETS = ["transition", "stacking", "visual-debug"] as const;

/** Copy each plugin's `generated/<name>.css` into `public/demos-assets/<name>.css`. Returns the paths. */
export function stagePluginAssets(): string[] {
  mkdirSync(assetsDir, { recursive: true });
  return PLUGIN_SHEETS.map((name) => {
    const out = join(assetsDir, `${name}.css`);
    copyFileSync(join(pluginsDir, name, "generated", `${name}.css`), out);
    return out;
  });
}

// Run when invoked directly (`node scripts/stage-plugin-assets.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  const written = stagePluginAssets();
  console.log(`✓ plugin-assets: staged ${String(written.length)} sheet(s) to public/demos-assets/`);
}
