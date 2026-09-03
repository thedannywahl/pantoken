/**
 * Generate the social cards served at https://pantoken.app/og.png (and og-<locale>.png) — the image
 * link scrapers (Slack, iMessage, X, LinkedIn, Discord, Facebook) show when a pantoken docs URL
 * unfurls. Renders a 1200×630 PNG from an inline SVG that reuses the docs theme's home background (the
 * navy field with concentric blue circles bleeding off a corner, see
 * `.vitepress/theme/pantoken.css` → `--vp-home-bg-image`) and sets the pantoken wordmark over it.
 *
 * Every locale gets its own card. The wordmark comes from `@pantoken/plugin-logos`' vendored asset set
 * (`horizontal-reversed`, plus the purpose-drawn non-Latin variants), so a locale whose script has its
 * own wordmark gets that one rather than the Latin lockup. RTL locales (`ar`, `fa`, `he`) mirror the
 * whole card: the ring field moves to the bottom-left corner and the wordmark and text anchor right.
 *
 * The headline and supporting line are read straight from each locale's `docs/{locale}/index.md`
 * `hero.text`/`hero.tagline` frontmatter — the same "docs.home" strings the home page itself renders
 * (see `docs/scripts/check-locale-drift.ts`), so the card always matches what a visitor sees.
 *
 * Latin text renders in Atkinson Hyperlegible Next — the same face the docs theme uses
 * (`--vp-font-family-base`). The faces are bundled (converted to TTF from the vendored `.woff2` under
 * `formats/components/assets/fonts`, since resvg reads TTF/OTF, not WOFF2) and loaded explicitly with
 * `loadSystemFonts` OFF, so the card renders identically on CI's `ubuntu-latest`, which ships none of
 * the fonts a `loadSystemFonts` build would otherwise fall back to. Non-Latin scripts layer a cached
 * Noto face on top of it — see `lib/og-fonts.ts`. If a script font can't be resolved, that locale's
 * card is still written, with the English text, so no `og-<locale>.png` ever 404s.
 *
 * Regenerated on every build as part of `docs:assets`, so `docs/public/og*.png` are git-ignored, not
 * committed. Run `vp run docs:og` to refresh them on their own while iterating on the card design.
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import {
  type DocsLocale,
  LOCALE_THEMES,
  NON_LATIN_LOCALES,
  NON_ROOT_LOCALES,
} from "../.vitepress/i18n.ts";
import { type LocaleFonts, localeFonts } from "./lib/og-fonts.ts";

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

// Palette lifted from the docs theme's home background SVG (pantoken.css `--vp-home-bg-image`)
const HEADER = "#7fb4f1";
const NAVY = "#002b4d"; // background field
const RING_1 = "#004880"; // outermost concentric ring
const RING_2 = "#0065b3";
const RING_3 = "#0090ff"; // brightest ring + brand-blue accent
const WHITE = "#ffffff";
const MUTED = "#aab0b5"; // desaturated blue for the supporting line
const URL_FILL = WHITE;

// The theme background anchors three concentric circles at a corner of a 374×160 field (radii
// 200/140/80). Scale those radii to the card width so the card reproduces the same look at 1200×630.
// The corner is bottom-right for LTR and bottom-left for RTL — always opposite the text.
const scale = WIDTH / 374;
const ring = (r: number, fill: string, cx: number): string =>
  `<circle cx="${cx}" cy="${HEIGHT}" r="${Math.round(r * scale)}" fill="${fill}" />`;

// Text layout. Wordmark, headline, and tagline share a margin on the text side; the tagline wraps to
// fit, and the footer URL slides down to clear however many tagline lines that produced.
const MARGIN_X = 100;
const MAX_TEXT_WIDTH = WIDTH - MARGIN_X * 2 - 100; // leaves room clear of the ring corner
const LOGO_Y = 200;
const LOGO_HEIGHT = 99;
const HEADLINE_FONT_SIZE = 48;
const TAGLINE_FONT_SIZE = 29;
const TAGLINE_START_Y = 444;
const TAGLINE_LINE_HEIGHT = 29;
const TAGLINE_MAX_LINES = 3;
const FOOTER_GAP_AFTER_LAST_LINE = 83; // matches the original fixed 2-line layout (444+29+83=556)

const escapeXml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// No real text-metrics engine is available at generation time, so estimate glyph width as a fraction
// of the font size — tuned per weight (bold runs wider than medium), and one full em for ideographs —
// to decide wrap points and whether a line still overflows once wrapped. Combining marks (Devanagari
// matras, Arabic and Hebrew points, Thai vowel signs) carry no advance, so they don't count.
const HEADLINE_ADVANCE = 0.62;
const TAGLINE_ADVANCE = 0.52;
const IDEOGRAPH_ADVANCE = 1;

const advanceCount = (text: string): number => text.replace(/\p{M}/gu, "").length;

const estimateWidth = (text: string, fontSize: number, avgCharWidth: number): number =>
  advanceCount(text) * fontSize * avgCharWidth;

const graphemes = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/**
 * Greedy-wrap `text` into lines no wider than `maxWidth` (estimated). Han and kana write without
 * spaces, so they break between grapheme clusters instead of between words.
 */
function wrapText(
  text: string,
  fontSize: number,
  avgCharWidth: number,
  maxWidth: number,
  byCharacter: boolean,
): string[] {
  const units = byCharacter
    ? [...graphemes.segment(text)].map((segment) => segment.segment)
    : text.split(/\s+/).filter(Boolean);
  const join = byCharacter ? "" : " ";
  const lines: string[] = [];
  let current = "";
  for (const unit of units) {
    const candidate = current ? `${current}${join}${unit}` : unit;
    if (current && estimateWidth(candidate, fontSize, avgCharWidth) > maxWidth) {
      lines.push(current);
      current = unit;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Where a card's text and wordmark sit, and which way they run. */
interface Layout {
  rtl: boolean;
  /** The x the text anchors from — the left margin for LTR, the right margin for RTL. */
  anchorX: number;
  ringCx: number;
}

const layoutFor = (locale: DocsLocale): Layout => {
  const rtl = LOCALE_THEMES[locale].dir === "rtl";
  return { rtl, anchorX: rtl ? WIDTH - MARGIN_X : MARGIN_X, ringCx: rtl ? 0 : WIDTH };
};

/** Render `text` as an SVG `<text>`, compressing it with `textLength` if it still overflows `maxWidth`. */
function textLine(params: {
  text: string;
  y: number;
  fontSize: number;
  fontWeight: number;
  fill: string;
  avgCharWidth: number;
  maxWidth: number;
  fontFamily: string;
  layout: Layout;
  syntheticBold: boolean;
}): string {
  const overflow =
    estimateWidth(params.text, params.fontSize, params.avgCharWidth) > params.maxWidth;
  const lengthAttrs = overflow
    ? ` textLength="${params.maxWidth}" lengthAdjust="spacingAndGlyphs"`
    : "";
  const directionAttrs = params.layout.rtl ? ` text-anchor="end" direction="rtl"` : "";
  // Stroking in the fill colour thickens the glyph rather than outlining it; the headline carries a
  // heavier stroke than the supporting line so the two stay as distinct as their Latin counterparts.
  const strokeAttrs = params.syntheticBold
    ? ` stroke="${params.fill}" stroke-width="${(params.fontSize * (params.fontWeight >= 700 ? 0.08 : 0.05)).toFixed(2)}"`
    : "";
  return `<text x="${params.layout.anchorX}" y="${params.y}" font-family="${params.fontFamily}" font-size="${params.fontSize}" font-weight="${params.fontWeight}" fill="${params.fill}"${directionAttrs}${strokeAttrs}${lengthAttrs}>${escapeXml(params.text)}</text>`;
}

/** Path to the vendored pantoken wordmark for a script; no `lang` means the Latin lockup. */
const wordmarkPath = (lang: string | undefined): string =>
  fileURLToPath(
    new URL(
      `../../plugins/pantoken/logos/assets/logos/pantoken/horizontal-reversed${lang ? `-${lang}` : ""}.svg`,
      import.meta.url,
    ),
  );

/**
 * Place a wordmark SVG on the card as a nested `<svg>`, scaled to {@link LOGO_HEIGHT} and anchored to
 * the text margin. Each localized wordmark has its own viewBox, so read the aspect ratio off the file
 * rather than assuming the Latin lockup's.
 */
function wordmark(locale: DocsLocale, layout: Layout): string {
  const path = wordmarkPath(NON_LATIN_LOCALES[locale]);
  const source = readFileSync(path, "utf8");
  const viewBox = source.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`gen-og: ${path} has no viewBox`);
  const [, , boxWidth, boxHeight] = viewBox.split(/[\s,]+/).map(Number);

  const height = Math.min(LOGO_HEIGHT, (MAX_TEXT_WIDTH * boxHeight) / boxWidth);
  const width = (height * boxWidth) / boxHeight;
  const x = layout.rtl ? layout.anchorX - width : layout.anchorX;
  const inner = source.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return `<svg x="${x}" y="${LOGO_Y + (LOGO_HEIGHT - height) / 2}" width="${width}" height="${height}" viewBox="${viewBox}">${inner}</svg>`;
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

function renderCard(
  locale: DocsLocale,
  hero: { headline: string; tagline: string },
  fonts: LocaleFonts,
): Buffer {
  const layout = layoutFor(locale);
  const headlineAdvance = fonts.ideographic ? IDEOGRAPH_ADVANCE : HEADLINE_ADVANCE;
  const taglineAdvance = fonts.ideographic ? IDEOGRAPH_ADVANCE : TAGLINE_ADVANCE;

  const taglineLines = wrapText(
    hero.tagline,
    TAGLINE_FONT_SIZE,
    taglineAdvance,
    MAX_TEXT_WIDTH,
    fonts.wrapByCharacter,
  ).reduce<string[]>((lines, line, index, all) => {
    // Keep at most TAGLINE_MAX_LINES: fold any overflow words into the last line (which then gets
    // compressed to fit by `textLine`'s `textLength` fallback) rather than growing the card taller.
    if (index < TAGLINE_MAX_LINES - 1 || all.length <= TAGLINE_MAX_LINES) {
      lines.push(line);
    } else if (index === TAGLINE_MAX_LINES - 1) {
      lines.push(all.slice(TAGLINE_MAX_LINES - 1).join(fonts.wrapByCharacter ? "" : " "));
    }
    return lines;
  }, []);
  const footerY =
    TAGLINE_START_Y + (taglineLines.length - 1) * TAGLINE_LINE_HEIGHT + FOOTER_GAP_AFTER_LAST_LINE;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${NAVY}" />
  ${ring(200, RING_1, layout.ringCx)}
  ${ring(140, RING_2, layout.ringCx)}
  ${ring(80, RING_3, layout.ringCx)}

  <!-- Brand-blue top accent rule. -->
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${RING_3}" />

  <!-- Wordmark. -->
  ${wordmark(locale, layout)}

  <!-- Headline (the home hero text). -->
  ${textLine({
    text: hero.headline,
    y: 388,
    fontSize: HEADLINE_FONT_SIZE,
    fontWeight: 700,
    fill: HEADER,
    avgCharWidth: headlineAdvance,
    maxWidth: MAX_TEXT_WIDTH,
    fontFamily: fonts.family,
    layout,
    syntheticBold: fonts.syntheticBold,
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
        avgCharWidth: taglineAdvance,
        maxWidth: MAX_TEXT_WIDTH,
        fontFamily: fonts.family,
        layout,
        syntheticBold: fonts.syntheticBold,
      }),
    )
    .join("\n  ")}

  <!-- Footer URL. The address is Latin everywhere, so it keeps the brand face and its own flow. -->
  <text x="${layout.anchorX}" y="${footerY}" font-family="${FONT}" font-size="24" font-weight="400" fill="${URL_FILL}"${layout.rtl ? ' text-anchor="end"' : ""}>pantoken.app</text>
</svg>`;

  return new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: { loadSystemFonts: false, fontFiles: fonts.files, defaultFontFamily: FONT },
  })
    .render()
    .asPng();
}

// One card per locale. `root` writes the original `og.png` filename other assets already reference;
// every other locale writes `og-<locale>.png`.
const cardLocales: DocsLocale[] = ["root", ...NON_ROOT_LOCALES];

for (const locale of cardLocales) {
  const fonts = await localeFonts(locale, FONT, FONT_FILES);
  // Without the locale's script font its own text would render as tofu, so fall back to the English
  // text on an otherwise-localized card — the file still exists, so `og:image` never points at a 404.
  const hero = readHero(fonts.localized ? locale : "root");
  const png = renderCard(locale, hero, fonts);
  const filename = locale === "root" ? "og.png" : `og-${locale}.png`;
  const out = fileURLToPath(new URL(`../public/${filename}`, import.meta.url));
  writeFileSync(out, png);
  console.log(
    `✓ wrote social card → docs/public/${filename} (${WIDTH}×${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB)`,
  );
}
