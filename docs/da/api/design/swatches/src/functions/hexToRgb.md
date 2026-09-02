[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Funktion: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Fortolk `#rgb`/`#rrggbb`/`#rrggbbaa` til 0–255-kanaler, eller `undefined` hvis ikke en hexfarve.

## Parametre

### hex

`string`

## Returnerer

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Eksempel

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
