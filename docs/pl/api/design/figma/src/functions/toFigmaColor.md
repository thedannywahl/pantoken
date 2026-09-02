[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Funkcja: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to a Figma RGBA (0–1), or `undefined` if not a hex colour.

## Parametry

### hex

`string`

## Zwraca

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Przykład

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
