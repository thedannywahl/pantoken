[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Function: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կոդավորել նմուշները որպես ASE բայտեր։ Ոչ hex նմուշներ բաց են թողնվում։

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը։

## Returns

`Uint8Array`

ASE ֆայլը որպես բայտեր։

## Example

**Գրել Adobe .ase գունապնակ**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
