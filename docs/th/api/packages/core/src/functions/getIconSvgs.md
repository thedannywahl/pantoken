[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# ฟังก์ชัน: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## พารามิเตอร์

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## คืนค่า

`Map`\<`string`, `string`\>

## ตัวอย่าง

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
