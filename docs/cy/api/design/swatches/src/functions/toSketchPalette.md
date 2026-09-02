[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Swyddogaeth: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Paramedrau

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Yn dychwelyd

[`SketchPalette`](../interfaces/SketchPalette.md)

## Enghraifft

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
