[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Fonction: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Paramètres

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Retourne

`Map`\<`string`, `string`\>

## Exemple

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
