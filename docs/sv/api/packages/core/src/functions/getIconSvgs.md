[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Funktion: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Parametrar

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Returnerar

`Map`\<`string`, `string`\>

## Exempel

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
