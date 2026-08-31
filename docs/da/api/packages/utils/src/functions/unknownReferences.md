[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Function: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Drift-kontrol: `--instui-*` navne i `text` som IR'en ikke definerer (sorteret; tomt betyder ingen
drift). Brug for output, der _refererer_ tokens defineret andre steder — f.eks. docusaurus/vitepress
broer, hvis `var(--instui-*)` targets skal være ægte tokens.

## Parameters

### text

`string`

Det genererede output.

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

Source token IR.

## Returns

`string`[]

De ukendte tokennavn.

## Example

```ts
import { unknownReferences } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];

unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
// → ["--instui-gone"]
unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
```
