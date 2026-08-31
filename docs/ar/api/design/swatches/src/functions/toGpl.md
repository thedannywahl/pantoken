[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Function: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تشفير العينات كسلسلة لوحة GIMP `.gpl`.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Returns

`string`

## Examples

**كتابة لوحة GIMP .gpl**

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
