[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# تابع: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Encode swatches as a GIMP `.gpl` palette string.

## پارامترها

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## مقدار بازگشتی

`string`

## نمونه‌ها

**Write a GIMP .gpl palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**With a custom palette name**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
