/**
 * Emit the docs-only multi-theme component stylesheet to two consumers:
 *
 * - `.vitepress/theme/generated/components.css` — imported by the docs theme (`theme/index.ts`), so the
 *   MAIN document (and thus the inline CSS-API `@example` previews) carries every theme's component
 *   rules, not just rebrand.
 * - `public/demos-assets/components.css` — loaded by the `/play` runner iframes (see `demos.ts`'s
 *   `cssUrls` list).
 *
 * The shipped `@pantoken/components/components.css` is lowered to ONE theme (rebrand): `themeCustomMedia`
 * prunes each `@media (--theme-*)` branch at build time, so the reader's runtime theme switch (which
 * toggles `data-pantoken-theme`) could never bring the canvas/canvasHighContrast rules back. A rule that
 * changes which TOKEN a property references (e.g. billboard's `-clickable:hover` border-color:
 * `--instui-color-text-base` → `--instui-component-link-text-color`) can't be recovered by re-scoping
 * token VALUES alone. `scopedComponentsCss` emits the rebrand rules unscoped, then the other themes'
 * rules scoped under `:root[data-pantoken-theme="…"]` so the same attribute toggle activates them.
 * Mirrors how `site-themes.ts` handles token values, but for component rules. See `lib/scope-components.ts`.
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on component edits during `docs:dev`: the config's
 * workspace orchestrator cascades to this script (as the `@pantoken/docs#components-sheet` node) after
 * the components recompile + `generate`. Kept as its own runnable so the watch path can regenerate the
 * sheet without re-staging the whole `public/` demo tree.
 *
 * @module
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { scopedComponentsCss } from "./lib/scope-components.ts";

const docsRoot = join(import.meta.dirname, "..");

/** Write `theme/generated/components.css` and copy it into `public/demos-assets/`. Returns both paths. */
export function writeComponentsSheet(): { themeOut: string; assetsOut: string } {
  const themeOut = join(docsRoot, ".vitepress", "theme", "generated", "components.css");
  const assetsOut = join(docsRoot, "public", "demos-assets", "components.css");
  mkdirSync(dirname(themeOut), { recursive: true });
  writeFileSync(themeOut, scopedComponentsCss("instui"));
  // Best-effort mirror into demos-assets; on the watch path public/ already exists (docs:assets ran at
  // startup), and mkdirSync keeps a clean-tree run from failing.
  mkdirSync(dirname(assetsOut), { recursive: true });
  copyFileSync(themeOut, assetsOut);
  return { themeOut, assetsOut };
}

// Run when invoked directly (`node scripts/components-sheet.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  writeComponentsSheet();
  console.log(
    "✓ components-sheet: wrote theme/generated/components.css + demos-assets/components.css",
  );
}
