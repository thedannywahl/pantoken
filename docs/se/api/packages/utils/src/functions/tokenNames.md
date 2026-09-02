[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Fušla: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The set of token names an IR defines.

## Parametera

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Gullii / Gávdnat

`Set`\<`string`\>

## Exempel

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
