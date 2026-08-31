[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Function: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Հեռավոր ստուգում: `--instui-*` անունները `text`-ում, որոնք IR-ը չի սահմանում (տեսակավորված; դատարկ նշանակում է հեռավորություն չկա): Օգտագործել արդյունքների համար, որոնք _հղում են անում_ թոքենների, որոնք սահմանված են ուրիշ տեղերում — օր. docusaurus/vitepress կամուրջներ, որոնց `var(--instui-*)` թիրախները պետք է բոլորը իրական թոքեն լինեն:

## Parameters

### text

`string`

Ստեղծված արդյունքը:

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

Աղբյուրի թոքեն IR:

## Returns

`string`[]

Անհայտ թոքենային անունները:

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
