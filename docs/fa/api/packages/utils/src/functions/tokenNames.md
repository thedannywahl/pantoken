[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# تابع: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The set of token names an IR defines.

## پارامترها

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## مقدار بازگشتی

`Set`\<`string`\>

## نمونه

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
