[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runTokenPlugins

# Ֆունկցիա: runTokenPlugins()

> **runTokenPlugins**(`tokens`, `theme`, `plugins`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գործարկեք յուրաքանչյուր plugin-ի `tokens` hook հերթականությամբ: Յուրաքանչյուր hook ստանում է ընթացիկ ցանկ և վերադարձնում ամբողջ փոխարեն; արդյունքը de-duplicated է անվամբ:

## Պարամետրեր

### tokens

[`Token`](../interfaces/Token.md)[]

### theme

[`Theme`](../type-aliases/Theme.md)

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

## Վերադարձվող արժեք

[`Token`](../interfaces/Token.md)[]

## Օրինակ

```ts
import { runTokenPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
];
const addBrand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens }) => [
    ...tokens,
    defineToken({ name: "--instui-brand", value: "#0374B5" }),
  ],
};

runTokenPlugins(base, "rebrand", [addBrand]); // → base + the --instui-brand token
```
