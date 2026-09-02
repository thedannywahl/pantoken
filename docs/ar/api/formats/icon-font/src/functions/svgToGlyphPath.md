[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# دالة: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء مسار الشكل المملوء لأيقونة SVG.

## المعلمات

### svg

`string`

ترميز SVG مضمّن.

## القيم المرجعة

[`GlyphPath`](../interfaces/GlyphPath.md)

المسار المملوء `d` (بإحداثيات viewBox) وحجم viewBox.

## مثال

**تحديد مخطط لأيقونة معتمدة على السكتة (Lucide) وأيقونة معتمدة على التعبئة**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
