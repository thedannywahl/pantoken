[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Функція: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Параметри

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Повертає

[`SketchPalette`](../interfaces/SketchPalette.md)

## Приклад

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
