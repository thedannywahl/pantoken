[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# 関数: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The set of token names an IR defines.

## パラメーター

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## 戻り値

`Set`\<`string`\>

## 例

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
