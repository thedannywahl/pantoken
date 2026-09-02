[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# ฟังก์ชัน: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The set of token names an IR defines.

## พารามิเตอร์

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## คืนค่า

`Set`\<`string`\>

## ตัวอย่าง

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
