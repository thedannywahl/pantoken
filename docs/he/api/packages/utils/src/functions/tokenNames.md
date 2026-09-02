[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# פונקציה: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The set of token names an IR defines.

## פרמטרים

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## מחזיר

`Set`\<`string`\>

## דוגמה

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
