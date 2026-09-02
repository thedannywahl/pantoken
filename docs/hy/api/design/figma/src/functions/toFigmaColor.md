[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Ֆունկցիա: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Վերլուծել `#rgb`/`#rrggbb`/`#rrggbbaa`-ը Figma RGBA-ի (0–1) կամ `undefined`-ի, եթե ոչ թե hex գույն։

## Պարամետրեր

### hex

`string`

## Վերադարձվող արժեք

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Օրինակ

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
