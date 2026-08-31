[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Function: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կոդավորել նմուշները որպես Sketch գունապնակի օբյեկտ (հաջորդականացնել `JSON.stringify`-ով)։

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը։

## Returns

[`SketchPalette`](../interfaces/SketchPalette.md)

## Example

**Գրել Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
