[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Ֆունկցիա: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

De-duplicate tokens անվամբ, պահեք վերջին առաջացումը (այնպես որ հետագա plugins հաղթում են):

## Պարամետրեր

### tokens

[`Token`](../interfaces/Token.md)[]

## Վերադարձվող արժեք

[`Token`](../interfaces/Token.md)[]

## Օրինակ

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
