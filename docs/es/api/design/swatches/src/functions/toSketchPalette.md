[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Función: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parámetros

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Devuelve

[`SketchPalette`](../interfaces/SketchPalette.md)

## Ejemplo

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
