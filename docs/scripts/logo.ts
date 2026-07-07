/**
 * Write the Instructure nav logos into `docs/public/` from `@pantoken/plugin-logos`, so
 * VitePress's `themeConfig.logo` can reference them. Runs before the VitePress build. The `light`
 * variant is the full-color logo (for the light theme's light background); the `dark` variant is
 * the reversed logo (for the dark theme's dark background).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getLogoSvg } from "@pantoken/plugin-logos";

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

console.log(`✓ wrote ${variants.length} nav logos to docs/public`);
