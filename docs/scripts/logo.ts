/**
 * Write the Instructure nav logos and favicon into `docs/public/` from `@pantoken/plugin-logos`, so
 * VitePress's `themeConfig.logo` and the `<link rel="icon">` in `.vitepress/config.ts` can reference
 * them. Runs first in `docs:assets`, before the VitePress build. The `light` variant is the full-color
 * logo (for the light theme's light background); the `dark` variant is the reversed logo (for the dark
 * theme's dark background). The favicon is the three-dot Instructure mark on its dark tile, rasterized
 * to PNG so browsers that don't take SVG icons still get one.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getLogoSvg } from "@pantoken/plugin-logos";
import { Resvg } from "@resvg/resvg-js";

const publicDir = fileURLToPath(new URL("../public", import.meta.url));
mkdirSync(publicDir, { recursive: true });

const variants: { file: string; svg: string | undefined }[] = [
  { file: "logo-light.svg", svg: getLogoSvg("instructure", "horizontal", "full-color") },
  { file: "logo-dark.svg", svg: getLogoSvg("instructure", "horizontal", "reversed") },
];

for (const { file, svg } of variants) {
  if (svg === undefined) throw new Error(`logo missing for ${file}`);
  writeFileSync(join(publicDir, file), svg);
}

// Favicon: the three-dot Instructure mark on its dark tile (`full-color-bg` carries the background
// rect and the red/green/blue dots with the white bar). Rasterize the square SVG to a 512×512 PNG.
const FAVICON_SIZE = 512;
const faviconSvg = getLogoSvg("instructure", "icon-three-dot", "full-color-bg");
if (faviconSvg === undefined) throw new Error("favicon mark missing");
const faviconPng = new Resvg(faviconSvg, {
  fitTo: { mode: "width", value: FAVICON_SIZE },
})
  .render()
  .asPng();
writeFileSync(join(publicDir, "favicon.png"), faviconPng);

console.log(`✓ wrote ${variants.length} nav logos + favicon to docs/public`);
