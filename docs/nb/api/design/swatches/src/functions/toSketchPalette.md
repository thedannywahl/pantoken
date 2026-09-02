[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funksjon: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametere

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Returnerer

[`SketchPalette`](../interfaces/SketchPalette.md)

## Eksempel

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
