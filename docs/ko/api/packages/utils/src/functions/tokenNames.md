[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# 함수: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The set of token names an IR defines.

## 매개변수

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## 반환값

`Set`\<`string`\>

## 예제

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
