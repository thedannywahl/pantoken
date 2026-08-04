/**
 * Build the standalone IIFE bundles — classic `<script src>` drop-ins for CDN use.
 *
 * Two kinds of output:
 * - `dist/web-components.iife.js` — everything, one file. Unlike the ESM `dist/index.mjs` (which
 *   externalizes `@pantoken/components` and `@pantoken/icons` as bare imports), this bundles them in,
 *   so a single `<script>` tag registers every `<instui-*>` element on load and exposes a
 *   `PantokenWebComponents` global (with `register`, `iconSvg`, …).
 * - `dist/<name>.iife.js` per element in `ELEMENTS` — the same idea, scoped to one element, for a
 *   consumer who only wants `<instui-alert>` and doesn't want to pay for the other 29. Rollup can't
 *   code-split `iife`/`umd` output, so each of these is a genuinely separate `build()` call, not one
 *   multi-entry build. Most stay small; the five in `ICON_ELEMENTS` (plus whichever of them a
 *   dependency chain pulls in) still bundle `@pantoken/icons`/`@pantoken/tokens`, since they call
 *   `iconSvg` for real — see `buildRegisterContext`'s doc comment in `src/lib/register-context.ts` for
 *   why that can't be avoided for those five specifically. Multi-element consumers combine several of these files
 *   (e.g. via jsDelivr's `/combine/`) rather than getting one bundle with everything they asked for;
 *   nested-dependency elements (`date-input`, `date-time-input`) aren't self-contained here — a
 *   consumer needs their dependencies' files too, loaded first.
 *
 * Tokens still come from a token sheet in the document, for either kind of output.
 *
 * Runs after `vp pack` in the build task. It calls Vite's `build()` API directly rather than spawning a
 * nested `vp` (vite-plus can't spawn a nested `vp` from inside a run task), and passes `configFile: false`
 * so it doesn't try to load this package's vite-plus config.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";
// From the metadata leaf module specifically, not "../src/index.ts" — that (transitively, via the
// element definitions) imports raw `.css` files for Vite/esbuild to process, which plain Node can't.
import { ELEMENTS, ICON_ELEMENTS } from "../src/lib/elements-meta.ts";

const root = resolve(import.meta.dirname, "..");

await build({
  configFile: false,
  root,
  logLevel: "warn",
  build: {
    outDir: "dist",
    // Keep the ESM + per-element CSS output that `vp pack` already wrote.
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(root, "src/index.ts"),
      formats: ["iife"],
      name: "PantokenWebComponents",
      fileName: () => "web-components.iife.js",
    },
    rollupOptions: {
      // No externals: bundle @pantoken/components + @pantoken/icons (and their deps) in, so the file is
      // a true drop-in. Larger than the ESM path by design — a convenience target, not the default.
      external: [],
    },
  },
});

console.log("✓ web-components: wrote dist/web-components.iife.js");

// ── Per-element bundles ──────────────────────────────────────────────────────────────────────────

/** `progress-circle` → `progressCircle` — matches this package's export naming exactly (verified
 * against every entry in `src/index.ts`'s re-export list). */
function toCamel(name: string): string {
  return name.replace(/-([a-z0-9])/gu, (_, c: string) => c.toUpperCase());
}

const entriesDir = resolve(root, "generated/iife-entries");
mkdirSync(entriesDir, { recursive: true });

const iconElementNames: readonly string[] = ICON_ELEMENTS;

for (const name of ELEMENTS) {
  const exportName = toCamel(name);
  const needsIcons = iconElementNames.includes(name);
  const resolver = needsIcons ? "iconSvg" : "noopIconSvg";

  const entryPath = resolve(entriesDir, `${name}.ts`);
  writeFileSync(
    entryPath,
    // Import from lib/register-context.ts, NOT "../src/index.ts" — that module auto-invokes
    // register() at the top level on import, which unconditionally reaches the real `iconSvg` and
    // would drag @pantoken/icons/@pantoken/tokens into every one of these files regardless of
    // `resolver`, defeating the entire point of building them separately.
    `import { buildRegisterContext, ${resolver} } from ${JSON.stringify(resolve(root, "src/lib/register-context.ts"))};
import { ${exportName} } from ${JSON.stringify(resolve(root, "src/elements", `${name}.ts`))};

if (typeof HTMLElement !== "undefined") {
  ${exportName}.define(buildRegisterContext({}, globalThis.customElements, ${resolver}));
}
`,
  );

  await build({
    configFile: false,
    root,
    logLevel: "warn",
    build: {
      outDir: "dist",
      emptyOutDir: false,
      minify: true,
      lib: {
        entry: entryPath,
        formats: ["iife"],
        name: "PantokenWebComponents",
        fileName: () => `${name}.iife.js`,
      },
      rollupOptions: {
        external: [],
      },
    },
  });
}

rmSync(entriesDir, { recursive: true, force: true });

console.log(`✓ web-components: wrote ${ELEMENTS.length} per-element dist/*.iife.js files`);
