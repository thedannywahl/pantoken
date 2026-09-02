[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Mahi: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The set of token names an IR defines.

## Ngā Tawhā

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Whakahokia

`Set`\<`string`\>

## Tauira

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
