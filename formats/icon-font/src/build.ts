/**
 * Build a full Instructure icon font. Stroke glyphs are outlined (see {@link svgToGlyphPath}), then
 * the glyph set is streamed through `svgicons2svgfont` → `svg2ttf` → `ttf2woff2`, with a matching
 * `icons.css` and `codepoints.json`. Codepoints start at the Unicode Private Use Area (U+E000).
 *
 * @module
 */
import { Readable } from "node:stream";
import { getIconSvgs } from "@pantoken/core";
import { byTheme } from "@pantoken/tokens";
import { SVGIcons2SVGFontStream } from "svgicons2svgfont";
import svg2ttf from "svg2ttf";
import ttf2woff2 from "ttf2woff2";
import { svgToGlyphPath } from "./outline.ts";
import type { Theme } from "@pantoken/model";

/** The generated font artifacts. */
export interface IconFontResult {
  /** The TrueType font bytes. */
  ttf: Uint8Array;
  /** The WOFF2 font bytes. */
  woff2: Uint8Array;
  /** The `@font-face` + `.instui-icon-<name>` stylesheet. */
  css: string;
  /** Icon name → hex codepoint (e.g. `"e001"`). */
  codepoints: Record<string, string>;
}

/** Options for {@link buildIconFont}. */
export interface BuildIconFontOptions {
  /** Icon names to include (default: the whole set). */
  icons?: string[];
  /** The font family name (default `"PanTokens"`). */
  fontName?: string;
  /** The theme to source glyphs from (default `"rebrand"`). */
  theme?: Theme;
}

function css(fontName: string, codepoints: Record<string, string>): string {
  const face = [
    "@font-face {",
    `  font-family: "${fontName}";`,
    `  src: url("./${fontName}.woff2") format("woff2"), url("./${fontName}.ttf") format("truetype");`,
    "  font-weight: normal;",
    "  font-style: normal;",
    "  font-display: block;",
    "}",
  ].join("\n");
  const base = `.instui-icon { font-family: "${fontName}"; font-style: normal; font-weight: normal; line-height: 1; -webkit-font-smoothing: antialiased; }`;
  const rules = Object.entries(codepoints)
    .map(([name, hex]) => `.instui-icon-${name}::before { content: "\\${hex}"; }`)
    .join("\n");
  return `${[face, base, rules].join("\n\n")}\n`;
}

/**
 * Build the icon font.
 *
 * @param options - {@link BuildIconFontOptions}.
 * @returns The {@link IconFontResult}.
 *
 * @example Build the full font and write the artifacts
 * ```ts
 * import { buildIconFont } from "@pantoken/icon-font";
 * import { writeFileSync } from "node:fs";
 *
 * const font = await buildIconFont();
 * writeFileSync("PanTokens.woff2", font.woff2);
 * writeFileSync("PanTokens.ttf", font.ttf);
 * writeFileSync("icons.css", font.css);
 * ```
 *
 * @example A custom font name and a subset of icons from another theme
 * ```ts
 * import { buildIconFont } from "@pantoken/icon-font";
 *
 * const font = await buildIconFont({
 *   fontName: "Instructure",
 *   icons: ["arrow-left", "check-mark"],
 *   theme: "canvas",
 * });
 * font.codepoints; // { "arrow-left": "e000", "check-mark": "e001" }
 * ```
 */
export async function buildIconFont(options: BuildIconFontOptions = {}): Promise<IconFontResult> {
  const fontName = options.fontName ?? "PanTokens";
  const svgs = getIconSvgs(byTheme(options.theme ?? "rebrand"));
  const names = (options.icons?.length ? options.icons : [...svgs.keys()])
    .filter((n) => svgs.has(n))
    .sort();

  const stream = new SVGIcons2SVGFontStream({
    fontName,
    fontHeight: 1000,
    normalize: true,
  });
  let svgFont = "";
  stream.on("data", (chunk: Buffer) => {
    svgFont += chunk.toString();
  });
  const done = new Promise<void>((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });

  const codepoints: Record<string, string> = {};
  let codepoint = 0xe000;
  for (const name of names) {
    const svg = svgs.get(name);
    if (!svg) continue;
    const { d, width, height } = svgToGlyphPath(svg);
    if (!d) continue;
    const code = codepoint++;
    codepoints[name] = code.toString(16);
    const glyph = Readable.from([
      `<svg viewBox="0 0 ${width} ${height}"><path d="${d}"/></svg>`,
    ]) as Readable & { metadata: { unicode: string[]; name: string } };
    glyph.metadata = { unicode: [String.fromCodePoint(code)], name };
    stream.write(glyph);
  }
  stream.end();
  await done;

  const ttf = new Uint8Array(
    svg2ttf(svgFont, { description: "Instructure icons (pantoken)" }).buffer,
  );
  const woff2 = new Uint8Array(ttf2woff2(ttf));
  return { ttf, woff2, css: css(fontName, codepoints), codepoints };
}
