[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# 関数: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## パラメーター

### hex

`string`

## 戻り値

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## 例

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
