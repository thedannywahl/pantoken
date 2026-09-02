[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Função: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## Parâmetros

### hex

`string`

## Retorna

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Exemplo

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
