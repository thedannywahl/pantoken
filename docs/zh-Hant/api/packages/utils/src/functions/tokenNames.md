[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# 函式: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The set of token names an IR defines.

## 參數

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## 回傳

`Set`\<`string`\>

## 範例

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
