[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Funktion: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Dedupliker tokens efter navn, idet du beholder den sidste forekomst (så senere plugins vinder).

## Parametre

### tokens

[`Token`](../interfaces/Token.md)[]

## Returnerer

[`Token`](../interfaces/Token.md)[]

## Eksempel

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
