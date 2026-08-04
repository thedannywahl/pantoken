/**
 * Emit the static stylesheets for consumers who want a plain sheet: the typed `style.css`
 * (`@pantoken/css/style.css`) and the declaration-only `style.lean.css` (`@pantoken/css/style.lean.css`,
 * the recommended CDN/embed foundation). Runs before `vp pack`; `@tsdown/css` then validates and
 * finalizes the generated sources into `dist/`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { applyMinify } from "@pantoken/plugin-props-minify";
import { foundationPlugin } from "../src/foundation.ts";
import { themedTokens } from "../src/theme-variants.ts";
import { css, leanCss, toCss } from "../src/index.ts";
import type { Theme } from "@pantoken/model";

function themedCss(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean },
): string {
  return toCss(themedTokens(theme, options), { plugins: [foundationPlugin] });
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
