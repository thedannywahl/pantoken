/**
 * Generate the social card served at https://pantoken.iywahl.com/og.png — the image link
 * scrapers (Slack, iMessage, X, LinkedIn, Discord, Facebook) show when a pantoken docs URL unfurls.
 * Renders a 1200×630 PNG from an inline SVG that reuses the docs theme's home background (the navy
 * field with concentric blue circles bleeding off the bottom-right corner, see
 * `.vitepress/theme/pantoken.css` → `--vp-home-bg-image`) and sets the pantoken wordmark over it.
 *
 * Regenerated on every build as part of `docs:assets` (like the nav logos), so `docs/public/og.png`
 * is git-ignored, not committed. Run `vp run docs:og` to refresh it on its own while iterating on the
 * card design.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const WIDTH = 1200;
const HEIGHT = 630;

// Palette lifted from the docs theme's home background SVG (pantoken.css `--vp-home-bg-image`)
const HEADER = "#7fb4f1";
const NAVY = "#002b4d"; // background field
const RING_1 = "#004880"; // outermost concentric ring
const RING_2 = "#0065b3";
const RING_3 = "#0090ff"; // brightest ring + brand-blue accent
const WHITE = "#ffffff";
const MUTED = "#aab0b5"; // desaturated blue for the supporting line
const URL_FILL = WHITE;

// The theme background anchors three concentric circles at the bottom-right corner of a 374×160 field
// (radii 200/140/80). Scale those radii to the card width so the card reproduces the same look at
// 1200×630, with the corner at (WIDTH, HEIGHT).
const scale = WIDTH / 374;
const ring = (r: number, fill: string): string =>
  `<circle cx="${WIDTH}" cy="${HEIGHT}" r="${Math.round(r * scale)}" fill="${fill}" />`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${NAVY}" />
  ${ring(200, RING_1)}
  ${ring(140, RING_2)}
  ${ring(80, RING_3)}

  <!-- Brand-blue top accent rule. -->
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${RING_3}" />

  <!-- Wordmark. -->
  <text x="96" y="266" font-family="'Atkinson Hyperlegible', system-ui, sans-serif" font-size="132" font-weight="700" letter-spacing="-4" fill="${HEADER}">pantoken</text>

  <!-- Tagline (the home hero line). -->
  <text x="100" y="388" font-family="'Atkinson Hyperlegible', system-ui, sans-serif" font-size="48" font-weight="700" fill="${WHITE}">Instructure design tokens, everywhere</text>

  <!-- Supporting line. -->
  <text x="100" y="444" font-family="'Atkinson Hyperlegible', system-ui, sans-serif" font-size="29" font-weight="500" fill="${MUTED}">One resolved token model, reshaped into stylesheets,</text>
  <text x="100" y="473" font-family="'Atkinson Hyperlegible', system-ui, sans-serif" font-size="29" font-weight="500" fill="${MUTED}">framework bindings, native code, and design-tool payloads.</text>

  <!-- Footer URL. -->
  <text x="100" y="556" font-family="'Atkinson Hyperlegible', system-ui, sans-serif" font-size="24" font-weight="400" fill="${URL_FILL}">pantoken.iywahl.com</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: WIDTH },
  font: { loadSystemFonts: true },
})
  .render()
  .asPng();

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
writeFileSync(out, png);
console.log(
  `✓ wrote social card → docs/public/og.png (${WIDTH}×${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB)`,
);
