[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Функция: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Produce a filled glyph path for an icon SVG.

## Параметры

### svg

`string`

Inline SVG markup.

## Возвращаемое значение

[`GlyphPath`](../interfaces/GlyphPath.md)

The filled path `d` (in viewBox coordinates) and the viewBox size.

## Пример

**Outline a stroke-based (Lucide) icon and a fill-based icon**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
