[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / parseHexColor

# Fušla: parseHexColor()

> **parseHexColor**(`hex`): [`Rgba`](../interfaces/Rgba.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to [Rgba](../interfaces/Rgba.md); returns `undefined` otherwise.

## Parametera

### hex

`string`

## Gullii / Gávdnat

[`Rgba`](../interfaces/Rgba.md) \| `undefined`

## Exempel

```ts
import { parseHexColor } from "@pantoken/utils";

parseHexColor("#fff");      // → { r: 255, g: 255, b: 255, a: 1 }
parseHexColor("#0374B5");   // → { r: 3, g: 116, b: 181, a: 1 }
parseHexColor("#00000080"); // → { r: 0, g: 0, b: 0, a: 0.5019… }
parseHexColor("nope");      // → undefined
```
