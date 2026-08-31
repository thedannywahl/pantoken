[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Function: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنتاج مسار حرف رسومي ممتلئ لـ SVG أيقونة.

## Parameters

### svg

`string`

علامات SVG مضمنة.

## Returns

[`GlyphPath`](../interfaces/GlyphPath.md)

مسار الملء `d` (في إحداثيات viewBox) وحجم viewBox.

## Example

**مخطط تفصيلي لأيقونة قائمة على الخط (Lucide) وأيقونة قائمة على الملء**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
