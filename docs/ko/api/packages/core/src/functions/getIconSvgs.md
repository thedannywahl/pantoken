[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# 함수: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## 매개변수

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## 반환값

`Map`\<`string`, `string`\>

## 예제

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
