[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Feidhm: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Paraiméadair

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Tuairisceáin

[`SketchPalette`](../interfaces/SketchPalette.md)

## Sampla

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
