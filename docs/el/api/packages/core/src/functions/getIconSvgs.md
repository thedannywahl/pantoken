[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Συνάρτηση: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Παράμετροι

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Επιστρέφει

`Map`\<`string`, `string`\>

## Παράδειγμα

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
