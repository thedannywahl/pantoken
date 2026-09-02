[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# फंक्शन: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

De-duplicate tokens by name, keeping the last occurrence (so later plugins win).

## पैरामीटर

### tokens

[`Token`](../interfaces/Token.md)[]

## वापसी

[`Token`](../interfaces/Token.md)[]

## उदाहरण

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
