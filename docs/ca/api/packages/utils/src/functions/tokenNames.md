[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Funció: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El conjunt de noms de tokens que defineix un IR.

## Paràmetres

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Retorna

`Set`\<`string`\>

## Exemple

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
