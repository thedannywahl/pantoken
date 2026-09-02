[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Funktion: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Fortolk `#rgb`/`#rrggbb`/`#rrggbbaa` til en Figma RGBA (0–1), eller `undefined` hvis ikke en hexfarve.

## Parametre

### hex

`string`

## Returnerer

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Eksempel

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
