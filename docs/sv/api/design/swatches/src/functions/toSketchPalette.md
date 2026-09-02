[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funktion: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametrar

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Returnerar

[`SketchPalette`](../interfaces/SketchPalette.md)

## Exempel

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
