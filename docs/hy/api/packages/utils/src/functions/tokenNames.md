[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenNames

# Ֆունկցիա: tokenNames()

> **tokenNames**(`ir`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Թոքենային անունների հավաքածու, որը IR-ը սահմանում է:

## Պարամետրեր

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

## Վերադարձվող արժեք

`Set`\<`string`\>

## Օրինակ

```ts
import { tokenNames } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];
tokenNames(ir); // → Set { "--instui-leaf" }
```
