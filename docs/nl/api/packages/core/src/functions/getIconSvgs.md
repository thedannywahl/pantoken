[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Functie: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Parameters

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Retourneert

`Map`\<`string`, `string`\>

## Voorbeeld

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
