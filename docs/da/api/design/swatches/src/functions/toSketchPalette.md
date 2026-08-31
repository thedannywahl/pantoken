[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Function: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Kodér prøver som et Sketch-palet-objekt (serialiser med `JSON.stringify`).

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

## Returns

[`SketchPalette`](../interfaces/SketchPalette.md)

## Example

**Skriv en Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
