[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Swyddogaeth: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The set of token names an IR defines.

## Paramedrau

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Yn dychwelyd

`Set`\<`string`\>

## Enghraifft

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
