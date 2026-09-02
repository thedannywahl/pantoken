[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Funktio: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De-duplicate tokens by name, keeping the last occurrence (so later plugins win).

## Parametrit

### tokens

[`Token`](../interfaces/Token.md)[]

## Palauttaa

[`Token`](../interfaces/Token.md)[]

## Esimerkki

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
