[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# 함수: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## 매개변수

### hex

`string`

## 반환값

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## 예제

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
