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
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { toCss } = require("@pantoken/css") as typeof import("@pantoken/css");
const { byTheme, themes } = require("@pantoken/tokens") as typeof import("@pantoken/tokens");

type ThemeKey = keyof typeof themes;
const DEFAULT_THEME: ThemeKey = "rebrand";

const out = join(import.meta.dirname, "..", ".vitepress", "theme", "generated", "site-themes.css");
mkdirSync(dirname(out), { recursive: true });

// The default theme: @property registrations (concrete tokens) + :root declarations (contextual).
const base = toCss(byTheme(DEFAULT_THEME));

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

const css = [base, ...overrides].join("\n\n");
writeFileSync(out, css);
console.log(
  `✓ site-themes: wrote site-themes.css (${Object.keys(themes).length} themes, ${Math.round(css.length / 1024)}kb)`,
);
