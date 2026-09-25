/**
 * Emit `.vitepress/theme/generated/site-themes.css` — the whole-site theme sheet the docs theme
 * imports.
 *
 * Built with `multiScopeCss`, which emits the `@property` registrations once and then keys each
 * theme's tokens to `[data-pantoken-theme="…"]` matching *any* element — not `:root`. That is what
 * lets an embedded preview (the canvas-theme-editor scaffold) run a different theme, and a different
 * color scheme, on the same page as the docs chrome. Tokens that don't vary between themes are
 * emitted once in a shared base block; tokens that do vary are repeated in full in every theme block,
 * because a partial block nested inside another theme's subtree would inherit the outer theme's
 * values for whatever it left out. Runs in `docs:assets`, before `vitepress dev`/`build`.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
// Import from SOURCE (build-time docs script, never shipped to the browser), not the `@pantoken/css` /
// `@pantoken/tokens` package specifiers (which resolve to `dist`, only rebuilt by the nested-forbidden
// `vp pack`). The token IR lives in `formats/tokens/generated/*.json` (which the src barrel reads), so a
// token-value edit — or a `toCss` emitter change — re-themes every preview live once this reruns.
import { multiScopeCss } from "../../formats/css/src/scoped.ts";
import { foundationPlugin } from "../../formats/css/src/foundation.ts";
import {
  customColorReferenceCurve,
  customColorRemapCss,
  customThemeColors,
} from "../../plugins/pantoken/custom-theme-colors/src/index.ts";
import { byTheme, themes } from "../../formats/tokens/src/index.ts";

type ThemeKey = keyof typeof themes;
const DEFAULT_THEME: ThemeKey = "rebrand";

const COLOR_KEYS = [
  "navy",
  "blue",
  "green",
  "red",
  "orange",
  "grey",
  "plum",
  "violet",
  "stone",
  "sky",
  "honey",
  "sea",
  "aurora",
] as const;

/** Build the docs-only multi-theme token sheet, including the component foundation variables. */
export function siteThemesCss(): string {
  // The ready-made @pantoken/css sheets add their elevation/focus foundation through the same
  // plugin; this custom sheet must do so too, because it replaces those sheets in the docs.
  const base = multiScopeCss({
    themes: Object.keys(themes) as ThemeKey[],
    defaultTheme: DEFAULT_THEME,
    plugins: [foundationPlugin, customThemeColors()],
  });

  const baseValue = new Map(byTheme(DEFAULT_THEME).map((t) => [t.name, t.value]));

  // Base logo dot color default.
  const defaultLogoDot = `:root {\n  --pantoken-logo-dot-color: light-dark(var(--instui-primitive-color-navy-navy120), var(--instui-primitive-color-navy-navy50));\n}`;

  // Pantoken docs-site specific hero rules for each color choice
  const heroSiteRules = COLOR_KEYS.map((c) => {
    const scale = c;

    function getHex(step: number): string {
      const tokenName = `--instui-primitive-color-${scale}-${scale}${step}`;
      return baseValue.get(tokenName) ?? "#1D354F";
    }

    function makeHeroSvgUrl(): string {
      const c1 = encodeURIComponent(getHex(200));
      const c2 = encodeURIComponent(getHex(160));
      const c3 = encodeURIComponent(getHex(120));
      const c4 = encodeURIComponent(getHex(80));
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 160'><rect width='374' height='160' fill='${c1}'/><circle cx='374' cy='160' r='200' fill='${c2}'/><circle cx='374' cy='160' r='140' fill='${c3}'/><circle cx='374' cy='160' r='80' fill='${c4}'/></svg>`;
      return `url("data:image/svg+xml,${svg}")`;
    }

    return `:root[data-pantoken-color="${c}"] {
  --pantoken-logo-dot-color: light-dark(var(--instui-primitive-color-${scale}-${scale}120), var(--instui-primitive-color-${scale}-${scale}50));
  --vp-home-bg-image: ${makeHeroSvgUrl()};
  --vp-home-bg-color: ${getHex(200)};
  --vp-home-hero-name-color: var(--instui-primitive-color-${scale}-${scale}50);
  --vp-home-hero-name-background: linear-gradient(135deg, var(--instui-primitive-color-${scale}-${scale}30), var(--instui-primitive-color-${scale}-${scale}60));
  --vp-button-brand-bg: var(--instui-primitive-color-${scale}-${scale}40);
  --vp-button-brand-hover-bg: var(--instui-primitive-color-${scale}-${scale}30);
  --vp-button-brand-active-bg: var(--instui-primitive-color-${scale}-${scale}30);
  --vp-button-brand-text: var(--instui-primitive-color-${scale}-${scale}190);
  --vp-button-brand-hover-text: var(--instui-primitive-color-${scale}-${scale}190);
  --vp-button-brand-active-text: var(--instui-primitive-color-${scale}-${scale}190);
  --vp-button-brand-border: var(--instui-primitive-color-${scale}-${scale}40);
  --vp-button-brand-hover-border: var(--instui-primitive-color-${scale}-${scale}30);
  --vp-button-brand-active-border: var(--instui-primitive-color-${scale}-${scale}30);
}`;
  }).join("\n\n");

  // The custom scale's primitives and hero image are set at runtime from the reader's hex (see
  // theme/custom-color.ts); everything else can reference the primitives statically.
  const customRules = `${customColorRemapCss()}

:root[data-pantoken-color="custom"] {
  --pantoken-logo-dot-color: light-dark(var(--instui-primitive-color-custom-custom120), var(--instui-primitive-color-custom-custom50));
  --vp-home-bg-color: var(--instui-primitive-color-custom-custom200);
  --vp-home-hero-name-color: var(--instui-primitive-color-custom-custom50);
  --vp-home-hero-name-background: linear-gradient(135deg, var(--instui-primitive-color-custom-custom30), var(--instui-primitive-color-custom-custom60));
  --vp-button-brand-bg: var(--instui-primitive-color-custom-custom40);
  --vp-button-brand-hover-bg: var(--instui-primitive-color-custom-custom30);
  --vp-button-brand-active-bg: var(--instui-primitive-color-custom-custom30);
  --vp-button-brand-text: var(--instui-primitive-color-custom-custom190);
  --vp-button-brand-hover-text: var(--instui-primitive-color-custom-custom190);
  --vp-button-brand-active-text: var(--instui-primitive-color-custom-custom190);
  --vp-button-brand-border: var(--instui-primitive-color-custom-custom40);
  --vp-button-brand-hover-border: var(--instui-primitive-color-custom-custom30);
  --vp-button-brand-active-border: var(--instui-primitive-color-custom-custom30);
}`;

  return [base, defaultLogoDot, heroSiteRules, customRules].join("\n\n");
}

/** Write the theme sheet imported by VitePress and mirror it for the isolated demo runner. */
export function writeSiteThemes(): string {
  const docsRoot = join(import.meta.dirname, "..");
  const out = join(docsRoot, ".vitepress", "theme", "generated", "site-themes.css");
  mkdirSync(dirname(out), { recursive: true });
  const css = siteThemesCss();
  writeFileSync(out, css);
  writeFileSync(
    join(dirname(out), "custom-color-curve.json"),
    `${JSON.stringify(customColorReferenceCurve(byTheme(DEFAULT_THEME)))}\n`,
  );

  // Mirror into demos-assets so the `/play` runner loads the same token sheet. The theme imports `out`
  // directly (module-graph HMR); this copy is what the iframes fetch by URL. mkdirSync keeps a clean-tree
  // run (site-themes runs before demos.ts stages public/) from failing.
  const assetsCopy = join(docsRoot, "public", "demos-assets", "site-themes.css");
  mkdirSync(dirname(assetsCopy), { recursive: true });
  copyFileSync(out, assetsCopy);
  return css;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const css = writeSiteThemes();
  console.log(
    `✓ site-themes: wrote site-themes.css (${Object.keys(themes).length} themes, ${Math.round(css.length / 1024)}kb)`,
  );
}
