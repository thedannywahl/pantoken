/**
 * Emit the static stylesheets for consumers who want a plain sheet: the typed `style.css`
 * (`@pantoken/css/style.css`) and the declaration-only `style.lean.css` (`@pantoken/css/style.lean.css`,
 * the recommended CDN/embed foundation). Runs before `vp pack`; `@tsdown/css` then validates and
 * finalizes the generated sources into `dist/`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { applyMinify } from "@pantoken/plugin-props-minify";
import { byTheme } from "@pantoken/tokens";
import { foundationPlugin } from "../src/foundation.ts";
import { css, leanCss, toCss } from "../src/index.ts";
import type { Theme, Token } from "@pantoken/model";

const ICON_TOKEN_PREFIX = "--instui-icon-";

function withoutIcons(tokens: readonly Token[]): Token[] {
  return tokens.filter((t) => !t.name.startsWith(ICON_TOKEN_PREFIX));
}

function lightBranch(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("light-dark(") || !trimmed.endsWith(")")) return null;
  const inner = trimmed.slice("light-dark(".length, -1);
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner[i];
    if (char === "(") depth += 1;
    else if (char === ")") depth = Math.max(0, depth - 1);
    else if (char === "," && depth === 0) return inner.slice(0, i).trim();
  }
  return null;
}

function rebrandLightOnly(tokens: readonly Token[]): Token[] {
  return tokens.map((token) => {
    const light = lightBranch(token.value);
    if (!light) return token;
    return { ...token, value: light, themed: false };
  });
}

function themedCss(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean },
): string {
  const { includeIcons = true, lightOnly = false } = options ?? {};
  const themeTokens = byTheme(theme);
  const modeTokens = lightOnly ? rebrandLightOnly(themeTokens) : themeTokens;
  const baseTokens = includeIcons ? modeTokens : withoutIcons(modeTokens);
  return toCss(baseTokens, { plugins: [foundationPlugin] });
}

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });

const write = (name: string, contents: string): void => {
  const out = resolve(dir, name);
  writeFileSync(out, contents);
  console.log(`✓ wrote ${out} (${contents.length} bytes)`);
};

write("style.css", applyMinify(css, { flatten: true }));
write("style.lean.css", applyMinify(leanCss, { flatten: true }));
write(
  "style.rebrand.light.css",
  applyMinify(themedCss("rebrand", { lightOnly: true }), { flatten: true }),
);
write(
  "style.rebrand.light.lean.css",
  applyMinify(themedCss("rebrand", { includeIcons: false, lightOnly: true }), { flatten: true }),
);
write("style.canvas.css", applyMinify(themedCss("canvas"), { flatten: true }));
write(
  "style.canvas.lean.css",
  applyMinify(themedCss("canvas", { includeIcons: false }), { flatten: true }),
);
write(
  "style.canvas-high-contrast.css",
  applyMinify(themedCss("canvasHighContrast"), { flatten: true }),
);
write(
  "style.canvas-high-contrast.lean.css",
  applyMinify(themedCss("canvasHighContrast", { includeIcons: false }), { flatten: true }),
);
