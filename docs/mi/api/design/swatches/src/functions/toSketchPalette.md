[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Mahi: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Ngā Tawhā

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Whakahokia

[`SketchPalette`](../interfaces/SketchPalette.md)

## Tauira

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
