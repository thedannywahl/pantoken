[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Feidhm: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Produce a filled glyph path for an icon SVG.

## Paraiméadair

### svg

`string`

Inline SVG markup.

## Tuairisceáin

[`GlyphPath`](../interfaces/GlyphPath.md)

The filled path `d` (in viewBox coordinates) and the viewBox size.

## Sampla

**Outline a stroke-based (Lucide) icon and a fill-based icon**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
