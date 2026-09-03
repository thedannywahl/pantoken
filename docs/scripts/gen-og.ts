/**
 * Generate the social cards served at https://pantoken.app/og.png (and og-<locale>.png) — the image
 * link scrapers (Slack, iMessage, X, LinkedIn, Discord, Facebook) show when a pantoken docs URL
 * unfurls. Renders a 1200×630 PNG from an inline SVG that reuses the docs theme's home background (the
 * navy field with concentric blue circles bleeding off the bottom-right corner, see
 * `.vitepress/theme/pantoken.css` → `--vp-home-bg-image`) and sets the pantoken wordmark over it.
 *
 * The headline and supporting line are read straight from each locale's `docs/{locale}/index.md`
 * `hero.text`/`hero.tagline` frontmatter — the same "docs.home" strings the home page itself renders
 * (see `docs/scripts/check-locale-drift.ts`), so the card always matches what a visitor sees.
 *
 * The card text renders in Atkinson Hyperlegible Next — the same face the docs theme uses
 * (`--vp-font-family-base`). The faces are bundled (converted to TTF from the vendored `.woff2` under
 * `formats/components/assets/fonts`, since resvg reads TTF/OTF, not WOFF2) and loaded explicitly with
 * `loadSystemFonts` OFF, so the card renders identically on CI's `ubuntu-latest`, which ships none of
 * the fonts a `loadSystemFonts` build would otherwise fall back to. That bundled face only covers Latin
 * script, so locales in `NON_LATIN_LOCALES` (which already ship a purpose-drawn, non-Latin wordmark —
 * see `i18n.ts`) are skipped here and fall back to the root English card at `og.png`.
 *
 * Regenerated on every build as part of `docs:assets`, so `docs/public/og*.png` are git-ignored, not
 * committed. Run `vp run docs:og` to refresh them on their own while iterating on the card design.
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { type DocsLocale, NON_LATIN_LOCALES, NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const WIDTH = 1200;
const HEIGHT = 630;

// The bundled type family and its faces. resvg matches the SVG's `font-family` against the name in
// each loaded file, then picks the face by `font-weight`; the card uses 400/500/600/700.
const FONT = "Atkinson Hyperlegible Next";
const fontFile = (weight: string): string =>
  fileURLToPath(
    new URL(
      `../assets/fonts/AtkinsonHyperlegibleNext/AtkinsonHyperlegibleNext-${weight}.ttf`,
      import.meta.url,
    ),
  );
const FONT_FILES = ["Regular", "Medium", "SemiBold", "Bold"].map(fontFile);
const LOGO_SVG = readFileSync(new URL("../public/logo-dark.svg", import.meta.url), "utf8");

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

// Text layout. Headline and tagline share a left margin; the tagline wraps to fit, and the footer
// URL slides down to clear however many tagline lines that produced.
const MARGIN_X = 100;
const MAX_TEXT_WIDTH = WIDTH - MARGIN_X * 2 - 100; // leaves room clear of the bottom-right rings
const HEADLINE_FONT_SIZE = 48;
const TAGLINE_FONT_SIZE = 29;
const TAGLINE_START_Y = 444;
const TAGLINE_LINE_HEIGHT = 29;
const TAGLINE_MAX_LINES = 3;
const FOOTER_GAP_AFTER_LAST_LINE = 83; // matches the original fixed 2-line layout (444+29+83=556)

const escapeXml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// No real text-metrics engine is available at generation time, so estimate glyph width as a fraction
// of the font size — tuned per weight (bold runs wider than medium) — to decide wrap points and
// whether a line still overflows once wrapped.
const estimateWidth = (text: string, fontSize: number, avgCharWidth: number): number =>
  text.length * fontSize * avgCharWidth;

/** Greedy word-wrap `text` into lines no wider than `maxWidth` (estimated). */
function wrapText(
  text: string,
  fontSize: number,
  avgCharWidth: number,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && estimateWidth(candidate, fontSize, avgCharWidth) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Render `text` as an SVG `<text>`, compressing it with `textLength` if it still overflows `maxWidth`. */
function textLine(params: {
  text: string;
  y: number;
  fontSize: number;
  fontWeight: number;
  fill: string;
  avgCharWidth: number;
  maxWidth: number;
}): string {
  const overflow =
    estimateWidth(params.text, params.fontSize, params.avgCharWidth) > params.maxWidth;
  const lengthAttrs = overflow
    ? ` textLength="${params.maxWidth}" lengthAdjust="spacingAndGlyphs"`
    : "";
  return `<text x="${MARGIN_X}" y="${params.y}" font-family="${FONT}" font-size="${params.fontSize}" font-weight="${params.fontWeight}" fill="${params.fill}"${lengthAttrs}>${escapeXml(params.text)}</text>`;
}

/** Path to a locale's home page source, `root` being the undecorated top-level `index.md`. */
const heroIndexPath = (localeKey: DocsLocale): string =>
  fileURLToPath(
    new URL(localeKey === "root" ? "../index.md" : `../${localeKey}/index.md`, import.meta.url),
  );

function readHero(localeKey: DocsLocale): { headline: string; tagline: string } {
  const source = readFileSync(heroIndexPath(localeKey), "utf8");
  const frontmatter = source.split(/^---$/m)[1];
  if (!frontmatter) throw new Error(`gen-og: ${heroIndexPath(localeKey)} has no frontmatter`);
  const field = (key: string): string => {
    const match = frontmatter.match(new RegExp(`^ {2}${key}:\\s*(.+)$`, "m"));
    if (!match) throw new Error(`gen-og: ${heroIndexPath(localeKey)} is missing hero.${key}`);
    return match[1].trim();
  };
  return { headline: field("text"), tagline: field("tagline") };
}

function renderCard(hero: { headline: string; tagline: string }): Buffer {
  const taglineLines = wrapText(hero.tagline, TAGLINE_FONT_SIZE, 0.52, MAX_TEXT_WIDTH).reduce<
    string[]
  >((lines, line, index, all) => {
    // Keep at most TAGLINE_MAX_LINES: fold any overflow words into the last line (which then gets
    // compressed to fit by `textLine`'s `textLength` fallback) rather than growing the card taller.
    if (index < TAGLINE_MAX_LINES - 1 || all.length <= TAGLINE_MAX_LINES) {
      lines.push(line);
    } else if (index === TAGLINE_MAX_LINES - 1) {
      lines.push(all.slice(TAGLINE_MAX_LINES - 1).join(" "));
    }
    return lines;
  }, []);
  const footerY =
    TAGLINE_START_Y + (taglineLines.length - 1) * TAGLINE_LINE_HEIGHT + FOOTER_GAP_AFTER_LAST_LINE;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${NAVY}" />
  ${ring(200, RING_1)}
  ${ring(140, RING_2)}
  ${ring(80, RING_3)}

  <!-- Brand-blue top accent rule. -->
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${RING_3}" />

  <!-- Wordmark. -->
  ${LOGO_SVG.replace("<svg ", '<svg x="96" y="180" transform="translate(19.2 26) scale(0.8)" ')}

  <!-- Headline (the home hero text). -->
  ${textLine({
    text: hero.headline,
    y: 388,
    fontSize: HEADLINE_FONT_SIZE,
    fontWeight: 700,
    fill: HEADER,
    avgCharWidth: 0.62,
    maxWidth: MAX_TEXT_WIDTH,
  })}

  <!-- Supporting line (the home hero tagline, word-wrapped). -->
  ${taglineLines
    .map((line, index) =>
      textLine({
        text: line,
        y: TAGLINE_START_Y + index * TAGLINE_LINE_HEIGHT,
        fontSize: TAGLINE_FONT_SIZE,
        fontWeight: 500,
        fill: MUTED,
        avgCharWidth: 0.52,
        maxWidth: MAX_TEXT_WIDTH,
      }),
    )
    .join("\n  ")}

  <!-- Footer URL. -->
  <text x="${MARGIN_X}" y="${footerY}" font-family="${FONT}" font-size="24" font-weight="400" fill="${URL_FILL}">pantoken.app</text>
</svg>`;

  return new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: { loadSystemFonts: false, fontFiles: FONT_FILES, defaultFontFamily: FONT },
  })
    .render()
    .asPng();
}

// One card per Latin-script locale (root + every non-root locale not in `NON_LATIN_LOCALES`); the
// rest reuse the root English card. `root` writes the original `og.png` filename other assets already
// reference; every other locale writes `og-<locale>.png`.
const cardLocales: DocsLocale[] = [
  "root",
  ...NON_ROOT_LOCALES.filter((locale) => !NON_LATIN_LOCALES[locale]),
];

for (const locale of cardLocales) {
  const png = renderCard(readHero(locale));
  const filename = locale === "root" ? "og.png" : `og-${locale}.png`;
  const out = fileURLToPath(new URL(`../public/${filename}`, import.meta.url));
  writeFileSync(out, png);
  console.log(
    `✓ wrote social card → docs/public/${filename} (${WIDTH}×${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB)`,
  );
}
