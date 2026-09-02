[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Funció: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Desduplicar tokens per nom, mantenint l'última aparició (perquè els plugins posteriors guanyin).

## Paràmetres

### tokens

[`Token`](../interfaces/Token.md)[]

## Retorna

[`Token`](../interfaces/Token.md)[]

## Exemple

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
