[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# Ֆունկցիա: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ինքնավերացման ստուգում. `--instui-*` անունները, որոնց հղում է կատարում `var()`-ը ձևանմուշում, որ այն երբեք սահմանված չի (որպես `@property` գրանցում կամ `--x:` հայտարարություն): Տեսակավորված; դատարկ նշանակում է յուրաքանչյուր հղում լուծվում է նույն արդյունքում: Օգտագործել ինքնավերացված ձևանմուշների համար (css, pendo):

## Պարամետրեր

### css

`string`

Ստեղծված ձևանմուշ:

## Վերադարձվող արժեք

`string`[]

Կախվածվածի հղումային անունները:

## Օրինակ

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
