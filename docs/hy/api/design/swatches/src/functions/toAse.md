[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Ֆունկցիա: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կոդավորել նմուշները որպես ASE բայտեր։ Ոչ hex նմուշներ բաց են թողնվում։

## Պարամետրեր

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը։

## Վերադարձվող արժեք

`Uint8Array`

ASE ֆայլը որպես բայտեր։

## Օրինակ

**Գրել Adobe .ase գունապնակ**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
