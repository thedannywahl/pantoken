[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Function: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Codificar mostres com a un objecte de paleta Sketch (serialitzar amb `JSON.stringify`).

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta.

## Returns

[`SketchPalette`](../interfaces/SketchPalette.md)

## Example

**Escriure un .sketchpalette de Sketch**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
