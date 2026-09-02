[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# Функция: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).

## Параметры

### tokens

readonly [`Token`](../interfaces/Token.md)[]

## Возвращаемое значение

`Map`\<`string`, `string`\>

## Пример

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
