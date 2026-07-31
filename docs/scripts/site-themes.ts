/**
 * Emit `.vitepress/theme/generated/site-themes.css` — the whole-site theme sheet the docs theme
 * imports.
 *
 * `toCss` registers concrete tokens as global `@property` initial-values and emits only contextual
 * (`light-dark()`/`var()`) tokens as scoped declarations, so a plain `toCss({ scope })` per theme
 * would not switch the concrete tokens (their `@property` registrations would collide). Instead we
 * emit the default theme (rebrand) in full — `@property` registrations + `:root` defaults — then, for
 * each other theme, a `:root[data-pantoken-theme="…"]` block that re-declares only the tokens whose
 * value DIFFERS from the default (the shared majority falls through to the base). Toggling the
 * attribute on `<html>` swaps the `--instui-*` set, which the `@pantoken/vitepress` bridge maps onto
 * `--vp-*`, re-theming the whole site. Runs in `docs:assets`, before `vitepress dev`/`build`.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
// Import from SOURCE (build-time docs script, never shipped to the browser), not the `@pantoken/css` /
// `@pantoken/tokens` package specifiers (which resolve to `dist`, only rebuilt by the nested-forbidden
// `vp pack`). The token IR lives in `formats/tokens/generated/*.json` (which the src barrel reads), so a
// token-value edit — or a `toCss` emitter change — re-themes every preview live once this reruns.
import { toCss } from "../../formats/css/src/index.ts";
import { foundationPlugin } from "../../formats/css/src/foundation.ts";
import { byTheme, themes } from "../../formats/tokens/src/index.ts";

type ThemeKey = keyof typeof themes;
const DEFAULT_THEME: ThemeKey = "rebrand";

/** Build the docs-only multi-theme token sheet, including the component foundation variables. */
export function siteThemesCss(): string {
  // The default theme: @property registrations (concrete tokens) + :root declarations (contextual).
  // The normal @pantoken/css sheets add their elevation/focus foundation through the same plugin;
  // this custom sheet must do so too, because it replaces those ready-made sheets in the docs.
  const base = toCss(byTheme(DEFAULT_THEME), { plugins: [foundationPlugin] });

  // Every other theme: only the tokens whose value differs from the default, scoped to the attribute.
  const baseValue = new Map(byTheme(DEFAULT_THEME).map((t) => [t.name, t.value]));
  const overrides = (Object.keys(themes) as ThemeKey[])
    .filter((theme) => theme !== DEFAULT_THEME)
    .map((theme) => {
      const decls = byTheme(theme)
        .filter((t) => baseValue.get(t.name) !== t.value)
        .map((t) => `  ${t.name}: ${t.value};`)
        .join("\n");
      return `:root[data-pantoken-theme="${theme}"] {\n${decls}\n}`;
    });

  return [base, ...overrides].join("\n\n");
}

/** Write the theme sheet imported by VitePress and mirror it for the isolated demo runner. */
export function writeSiteThemes(): string {
  const docsRoot = join(import.meta.dirname, "..");
  const out = join(docsRoot, ".vitepress", "theme", "generated", "site-themes.css");
  mkdirSync(dirname(out), { recursive: true });
  const css = siteThemesCss();
  writeFileSync(out, css);

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
