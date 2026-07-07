# @pantoken/icon-font

Build an installable Instructure icon font from the Canvas by Instructure icon set. You get a WOFF2 file, a TTF file, a stylesheet, and a codepoint map. Install the font on a device and use the glyphs in design apps, documents, and offline contexts where the web tooling isn't reachable.

## Why a font

The other pantoken icon formats emit inline SVG or per-framework components. Those need a build step and a browser. A font doesn't. Once it's installed, every app that picks a font can use the icons: Figma, Sketch, Google Slides, Keynote, Word, and any native text field.

## What it does

Instructure ships two kinds of glyphs:

- Fill glyphs (the custom Instructure set) already describe filled regions, so they pass straight through.
- Stroke glyphs (the Lucide set) describe a centerline with a stroke width. A font glyph has no stroke, so this package outlines each stroke into a filled shape. It flattens every subpath to points, then offsets that polyline by half the stroke width with round joins and caps.

The result is one filled path per icon, streamed through `svgicons2svgfont`, `svg2ttf`, and `ttf2woff2`.

## Install

```sh
npm i -D @pantoken/icon-font
```

This package isn't part of the unscoped `pantoken` meta package. The font toolchain is heavy, so `npm i pantoken` stays lean. Install this one directly when you need a font.

## CLI

```sh
pantoken generate icon-font --out ./fonts
pantoken generate icon-font --out ./fonts --class Instructure --icons arrow-left,check-mark
```

Flags:

- `--out` is the output directory (default `./pantoken-out`).
- `--class` is the font family name (default `PanTokens`).
- `--icons` is a comma-separated subset (default: every icon).
- `--theme` is the source theme (default `rebrand`).

The command writes four files: `<class>.woff2`, `<class>.ttf`, `icons.css`, and `codepoints.json`.

## API

```ts
import { buildIconFont } from "@pantoken/icon-font";

const font = await buildIconFont({ fontName: "PanTokens", icons: ["arrow-left"] });
// font.woff2  → Uint8Array
// font.ttf    → Uint8Array
// font.css    → string (@font-face + .instui-icon-<name> rules)
// font.codepoints → { "arrow-left": "e000", ... }
```

## Use the font on the web

```html
<link rel="stylesheet" href="./icons.css" /> <i class="instui-icon instui-icon-arrow-left"></i>
```

Each glyph lives in the Unicode Private Use Area, starting at U+E000. The `codepoints.json` map records the assignment for every icon, so you can also type a glyph directly once the font is installed.

## License

MIT
