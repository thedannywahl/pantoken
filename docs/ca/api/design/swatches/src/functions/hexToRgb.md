[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Funció: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Analitzar `#rgb`/`#rrggbb`/`#rrggbbaa` a canals 0–255, o `undefined` si no és un color hexadecimal.

## Paràmetres

### hex

`string`

## Retorna

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Exemple

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
