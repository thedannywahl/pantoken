[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Функция: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Параметры

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Возвращаемое значение

[`SketchPalette`](../interfaces/SketchPalette.md)

## Пример

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
