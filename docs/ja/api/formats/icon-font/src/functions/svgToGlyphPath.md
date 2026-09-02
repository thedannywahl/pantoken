[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# 関数: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Produce a filled glyph path for an icon SVG.

## パラメーター

### svg

`string`

Inline SVG markup.

## 戻り値

[`GlyphPath`](../interfaces/GlyphPath.md)

The filled path `d` (in viewBox coordinates) and the viewBox size.

## 例

**Outline a stroke-based (Lucide) icon and a fill-based icon**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
