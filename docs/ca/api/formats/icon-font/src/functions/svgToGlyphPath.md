[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Function: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Produeix un camí de glifo ple per a un SVG d'icona.

## Parameters

### svg

`string`

Marcat SVG en línia.

## Returns

[`GlyphPath`](../interfaces/GlyphPath.md)

El camí ple `d` (en coordenades viewBox) i la mida viewBox.

## Example

**Contorneja una icona basada en traç (Lucide) i una icona basada en farciment**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
