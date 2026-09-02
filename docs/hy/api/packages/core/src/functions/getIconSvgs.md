[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Ֆունկցիա: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Map յուրաքանչյուր icon token իր decoded SVG-ի հետ (բանալու անվամբ առանց `--instui-icon-` prefix-ի):

## Պարամետրեր

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Վերադարձվող արժեք

`Map`\<`string`, `string`\>

## Օրինակ

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
