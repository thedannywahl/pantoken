/**
 * Stage the self-hosted demo assets into `public/` so the site can serve them:
 *
 * - the built `@pantoken/demo` runner app → `public/play/`
 * - the token + component stylesheets the runner injects → `public/demos-assets/`
 * - the committed demo snippets in `docs/demos/*.html` → `public/demos/`
 *
 * `public/` is a build artifact (gitignored), so this runs before `vitepress dev`/`build`.
 */
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const docsRoot = join(import.meta.dirname, "..");
const publicDir = join(docsRoot, "public");

const play = join(publicDir, "play");
mkdirSync(play, { recursive: true });
const demoPkgDir = dirname(require.resolve("@pantoken/demo/package.json"));
const runnerDist = join(demoPkgDir, "dist/runner");
if (existsSync(runnerDist)) {
  cpSync(runnerDist, play, { recursive: true });
} else {
  console.warn(
    "⚠ @pantoken/demo runner is not built (run `vp run @pantoken/demo#build`); demos won't render.",
  );
}

const assets = join(publicDir, "demos-assets");
mkdirSync(assets, { recursive: true });

// The component + prose sheets are theme-independent (they only reference --instui-* tokens). Prose
// styles bare demo markup (headings, paragraphs, tables) with the InstUI look; it's scoped to
// .pantoken-prose, so it stays inert until the runner tags the result body with that class.
copyFileSync(
  require.resolve("@pantoken/components/components.css"),
  join(assets, "components.css"),
);
copyFileSync(require.resolve("@pantoken/components/prose.css"), join(assets, "prose.css"));
// The opt-in base/reset: the runner's result iframe is a pantoken-owned page, so it loads base too
// (page surface, box-sizing, base text) — this is also what the `base` demo showcases.
copyFileSync(require.resolve("@pantoken/components/base.css"), join(assets, "base.css"));
// The icon glyph classes (.instui-icon-<name>), so demos can render InstUI glyphs with no inline SVG.
copyFileSync(require.resolve("@pantoken/components/icons.css"), join(assets, "icons.css"));
// The cross-cutting utilities (spacing/colour classes + the View primitive), opt-in like the rest.
copyFileSync(require.resolve("@pantoken/components/utilities.css"), join(assets, "utilities.css"));

// One token stylesheet per theme, so the runner's theme switcher can swap them at runtime. Each
// carries the transition state classes and stacking/debug tokens. The focus-outline ring and the
// named elevation shadows are NOT plugins — they ship in @pantoken/components (base.css / components.css),
// which the runner already loads, so they resolve per theme from there.
const { toCss } = require("@pantoken/css") as typeof import("@pantoken/css");
const { byTheme, themes } = require("@pantoken/tokens") as typeof import("@pantoken/tokens");
const { focusOutlineCss } =
  require("@pantoken/components") as typeof import("@pantoken/components");
const { transition } =
  require("@pantoken/plugin-transition") as typeof import("@pantoken/plugin-transition");
const { stacking } =
  require("@pantoken/plugin-stacking") as typeof import("@pantoken/plugin-stacking");
const { visualDebug } =
  require("@pantoken/plugin-visual-debug") as typeof import("@pantoken/plugin-visual-debug");
for (const theme of Object.keys(themes)) {
  writeFileSync(
    join(assets, `tokens-${theme}.css`),
    toCss(byTheme(theme as keyof typeof themes), {
      plugins: [transition(), stacking(), visualDebug()],
    }),
  );
}

// Standalone sheets for the main docs site (its token sheet is @pantoken/css, built without the
// plugins), added via <head> links in the VitePress config. The focus-outline ring comes from
// @pantoken/components (base.css isn't loaded on the prose pages, so ship its ring standalone here).
writeFileSync(join(assets, "focus-outline.css"), focusOutlineCss());
writeFileSync(join(assets, "transition.css"), toCss([], { plugins: [transition()] }));
writeFileSync(join(assets, "stacking.css"), toCss([], { plugins: [stacking()] }));
writeFileSync(join(assets, "visual-debug.css"), toCss([], { plugins: [visualDebug()] }));

// Docs-only demo tweaks — NOT shipped in @pantoken/components. Injected last into the runner result
// (after components.css) so it overrides. `.instui-card` is the demo wrapper only — a View composed
// with a surface, radius, and the resting elevation (it's not an InstUI component, so it doesn't ship
// in the package). Dark mode uses the secondary surface via a nested light-dark().
writeFileSync(
  join(assets, "demo-overrides.css"),
  `/* Docs-only demo overrides (not part of @pantoken/components). */\n` +
    `.instui-card {\n` +
    `  display: block;\n` +
    `  padding: var(--instui-spacing-space-md);\n` +
    `  color: var(--instui-color-text-base);\n` +
    `  border-radius: var(--instui-border-radius-lg);\n` +
    `  box-shadow: var(--instui-elevation-resting);\n` +
    `  background: light-dark(\n` +
    `    var(--instui-component-view-background-primary),\n` +
    `    var(--instui-component-view-background-secondary)\n` +
    `  );\n` +
    `}\n`,
);

const demosSrc = join(docsRoot, "demos");
const demosOut = join(publicDir, "demos");
mkdirSync(demosOut, { recursive: true });
let count = 0;
if (existsSync(demosSrc)) {
  for (const file of readdirSync(demosSrc)) {
    if (!file.endsWith(".html")) continue;
    copyFileSync(join(demosSrc, file), join(demosOut, file));
    count += 1;
  }
}

console.log(
  `✓ staged demo runner, ${Object.keys(themes).length} theme sheets, and ${count} demo(s) to public/`,
);
