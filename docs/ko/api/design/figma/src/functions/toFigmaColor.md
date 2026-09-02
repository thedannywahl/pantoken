[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# 함수: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to a Figma RGBA (0–1), or `undefined` if not a hex colour.

## 매개변수

### hex

`string`

## 반환값

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## 예제

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
