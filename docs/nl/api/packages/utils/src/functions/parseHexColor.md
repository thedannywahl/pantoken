[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / parseHexColor

# Function: parseHexColor()

> **parseHexColor**(`hex`): [`Rgba`](../interfaces/Rgba.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to [Rgba](../interfaces/Rgba.md); returns `undefined` otherwise.

## Parameters

### hex

`string`

## Returns

[`Rgba`](../interfaces/Rgba.md) \| `undefined`

## Example

```ts
import { parseHexColor } from "@pantoken/utils";

parseHexColor("#fff"); // → { r: 255, g: 255, b: 255, a: 1 }
parseHexColor("#0374B5"); // → { r: 3, g: 116, b: 181, a: 1 }
parseHexColor("#00000080"); // → { r: 0, g: 0, b: 0, a: 0.5019… }
parseHexColor("nope"); // → undefined
```
