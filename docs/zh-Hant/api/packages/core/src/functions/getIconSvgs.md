[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# 函式: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## 參數

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## 回傳

`Map`\<`string`, `string`\>

## 範例

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
