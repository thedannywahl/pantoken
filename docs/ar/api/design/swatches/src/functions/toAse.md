[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# دالة: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

ترميز عينات الألوان كبايتات ASE. يتم تخطي عينات الألوان غير بصيغة سداسية.

## المعلمات

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان.

## القيم المرجعة

`Uint8Array`

ملف ASE كبايتات.

## مثال

**كتابة لوحة ألوان Adobe .ase**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
