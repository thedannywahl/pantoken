[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Funció: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Analitzar `#rgb`/`#rrggbb`/`#rrggbbaa` a un Figma RGBA (0–1), o `undefined` si no és un color hexadecimal.

## Paràmetres

### hex

`string`

## Retorna

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Exemple

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
