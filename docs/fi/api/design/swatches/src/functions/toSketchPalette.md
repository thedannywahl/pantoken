[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funktio: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametrit

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Palauttaa

[`SketchPalette`](../interfaces/SketchPalette.md)

## Esimerkki

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
