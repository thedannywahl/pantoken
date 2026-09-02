[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# دالة: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مجموعة أسماء الرموز التي يعرّفها IR.

## المعلمات

### ir

قابل للقراءة فقط [`Token`](../../../core/src/interfaces/Token.md)[]

## القيم المرجعة

`Set`\<`string`\>

## مثال

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
