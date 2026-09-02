[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Ֆունկցիա: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Արտադրել լցված գլիֆ ճանապարհ պատկերային SVG-ի համար:

## Պարամետրեր

### svg

`string`

Ներկառուցյալ SVG նշում:

## Վերադարձվող արժեք

[`GlyphPath`](../interfaces/GlyphPath.md)

Լցված ճանապարհ `d` (viewBox կոորդինատներում) և viewBox չափը:

## Օրինակ

**Ուրվագծել հարվածի վրա հիմնված (Lucide) պատկեր և լցված պատկեր**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
