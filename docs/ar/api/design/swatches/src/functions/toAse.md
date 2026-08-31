[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Function: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تشفير العينات كبايتات ASE. يتم تخطي العينات غير hex.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان.

## Returns

`Uint8Array`

ملف ASE كبايتات.

## Example

**كتابة لوحة Adobe .ase**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
