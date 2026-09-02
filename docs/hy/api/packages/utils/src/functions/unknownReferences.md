[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Ֆունկցիա: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Հեռավոր ստուգում: `--instui-*` անունները `text`-ում, որոնք IR-ը չի սահմանում (տեսակավորված; դատարկ նշանակում է հեռավորություն չկա): Օգտագործել արդյունքների համար, որոնք *հղում են անում* թոքենների, որոնք սահմանված են ուրիշ տեղերում — օր. docusaurus/vitepress կամուրջներ, որոնց `var(--instui-*)` թիրախները պետք է բոլորը իրական թոքեն լինեն:

## Պարամետրեր

### text

`string`

Ստեղծված արդյունքը:

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

Աղբյուրի թոքեն IR:

## Վերադարձվող արժեք

`string`[]

Անհայտ թոքենային անունները:

## Օրինակ

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
