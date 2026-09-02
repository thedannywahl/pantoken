[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# 関数: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## パラメーター

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## 戻り値

`Map`\<`string`, `string`\>

## 例

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
