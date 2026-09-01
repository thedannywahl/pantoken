[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# متغير: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

عينات ألوان `rebrand` (لوحة الألوان الافتراضية).

## مثال

**ترميز لوحة الألوان الجاهزة إلى أي تنسيق**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
