[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# دالة: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

ترميز عينات الألوان كسلسلة لوحة GIMP `.gpl`.

## المعلمات

### swatches

للقراءة فقط [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## القيم المرجعة

`string`

## أمثلة

**اكتب لوحة GIMP بصيغة .gpl**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**مع اسم لوحة مخصص**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
