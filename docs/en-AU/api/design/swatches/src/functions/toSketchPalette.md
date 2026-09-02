[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Function: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Returns

[`SketchPalette`](../interfaces/SketchPalette.md)

## Example

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
