[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Function: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مجموعة أسماء الرموز التي يحددها الأشعة تحت الحمراء.

## Parameters

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Returns

`Set`\<`string`\>

## Example

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
