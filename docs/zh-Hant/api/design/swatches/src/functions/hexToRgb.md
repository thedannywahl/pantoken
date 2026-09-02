[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# 函式: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## 參數

### hex

`string`

## 回傳

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## 範例

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
