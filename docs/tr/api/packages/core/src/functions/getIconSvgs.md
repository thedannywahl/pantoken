[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Fonksiyon: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Parametreler

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Döndürür

`Map`\<`string`, `string`\>

## Örnek

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
