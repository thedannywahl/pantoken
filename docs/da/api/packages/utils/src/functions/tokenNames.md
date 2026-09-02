[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Funktion: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sættet af tokennavn, som en IR definerer.

## Parametre

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Returnerer

`Set`\<`string`\>

## Eksempel

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
