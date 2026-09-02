[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# 函数: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## 参数

### hex

`string`

## 返回值

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## 示例

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
