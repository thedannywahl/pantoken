[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Funktion: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Producér en fyldt glyph-sti til en ikon SVG.

## Parametre

### svg

`string`

Inline SVG-markup.

## Returnerer

[`GlyphPath`](../interfaces/GlyphPath.md)

Den fyldte sti `d` (i viewBox-koordinater) og viewBox-størrelsen.

## Eksempel

**Skitsér en stroke-baseret (Lucide) ikon og en fill-baseret ikon**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
