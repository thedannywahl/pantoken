[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Fungsi: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De-duplicate tokens by name, keeping the last occurrence (so later plugins win).

## Parameter

### tokens

[`Token`](../interfaces/Token.md)[]

## Mengembalikan

[`Token`](../interfaces/Token.md)[]

## Contoh

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
