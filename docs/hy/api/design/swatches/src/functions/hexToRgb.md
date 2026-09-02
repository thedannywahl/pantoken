[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Ֆունկցիա: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Վերլուծել `#rgb`/`#rrggbb`/`#rrggbbaa`-ը 0–255 ալիքներին կամ `undefined`-ի, եթե ոչ թե hex գույն։

## Պարամետրեր

### hex

`string`

## Վերադարձվող արժեք

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Օրինակ

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
