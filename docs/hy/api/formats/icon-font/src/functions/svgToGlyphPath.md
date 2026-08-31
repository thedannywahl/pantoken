[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / svgToGlyphPath

# Function: svgToGlyphPath()

> **svgToGlyphPath**(`svg`): [`GlyphPath`](../interfaces/GlyphPath.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Արտադրել լցված գլիֆ ճանապարհ պատկերային SVG-ի համար:

## Parameters

### svg

`string`

Ներկառուցյալ SVG նշում:

## Returns

[`GlyphPath`](../interfaces/GlyphPath.md)

Լցված ճանապարհ `d` (viewBox կոորդինատներում) և viewBox չափը:

## Example

**Ուրվագծել հարվածի վրա հիմնված (Lucide) պատկեր և լցված պատկեր**

```ts
import { svgToGlyphPath } from "@pantoken/icon-font";
import { getIcon } from "@pantoken/icons";

const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
// d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
```
