/**
 * Build standalone IIFE bundles for `@pantoken/interactions`.
 *
 * Generates:
 * - `dist/interactions.iife.js` — the manual API (from `src/index.ts`) plus every component's
 *   auto-init side effect, so a single `<script>` wires up every `.instui-*` component on the page
 * - `dist/<name>.iife.js` per component — individual component interactions for CDN use
 *
 * Runs after `vp pack` in the build task.
 */

import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";

// All components that will have per-component IIFE bundles
const ALL_COMPONENTS = [
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "close-button",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
  "tabs",
];

function toCamelCase(name: string): string {
  return name.replace(/-([a-z0-9])/gu, (_, c: string) => c.toUpperCase());
}

const root = resolve(import.meta.dirname, "..");
const entriesDir = resolve(root, "generated/iife-entries");
mkdirSync(entriesDir, { recursive: true });

// ── Full interactions bundle ────────────────────────────────────────────────────────────────
// Re-exports the manual API and imports every component's auto-init side effect, so this single
// bundle both exposes `initTabs`/etc. and wires up every `.instui-*` component on its own.

const combinedEntryPath = resolve(entriesDir, "interactions.ts");
writeFileSync(
  combinedEntryPath,
  [
    `export * from ${JSON.stringify(resolve(root, "src/index.ts"))};`,
    ...ALL_COMPONENTS.map(
      (name) => `import ${JSON.stringify(resolve(root, "src/components", `${name}.ts`))};`,
    ),
  ].join("\n") + "\n",
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
      entry: combinedEntryPath,
      formats: ["iife"],
      name: "PantokenInteractions",
      fileName: () => "interactions.iife.js",
    },
    rollupOptions: {
      external: [],
      // Each component import exists for its document-level initialization side effect; don't let
      // tree-shaking erase it because nothing references its (nonexistent) exports.
      treeshake: false,
    },
  },
});

console.log("✓ interactions: wrote dist/interactions.iife.js");

// ── Per-component bundles ───────────────────────────────────────────────────────────────────

for (const name of ALL_COMPONENTS) {
  const entryPath = resolve(entriesDir, `${name}.ts`);
  writeFileSync(
    entryPath,
    `import ${JSON.stringify(resolve(root, "src/components", `${name}.ts`))};
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
        name: `PantokenInteractions${toCamelCase(name)}`,
        fileName: () => `${name}.iife.js`,
      },
      rollupOptions: {
        external: [],
        // Each entry exists for its document-level initialization side effects. The package's
        // sideEffects metadata is consumer-facing; don't let it erase the entry during this build.
        treeshake: false,
      },
    },
  });

  const outputPath = resolve(root, "dist", `${name}.iife.js`);
  if (statSync(outputPath).size === 0) {
    throw new Error(`interactions: generated an empty ${name}.iife.js bundle`);
  }
}

console.log(`✓ interactions: wrote ${ALL_COMPONENTS.length} per-component .iife.js bundles`);
