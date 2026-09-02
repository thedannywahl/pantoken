[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# 函式: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to a Figma RGBA (0–1), or `undefined` if not a hex colour.

## 參數

### hex

`string`

## 回傳

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## 範例

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
