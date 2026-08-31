[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Function: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

عرض العينات كورقة عينة SVG مجمعة.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان (على سبيل المثال من `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Returns

`string`

مستند SVG كسلسلة نصية.

## Examples

**عرض ورقة عينة لـ README**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**عينة فقط لوحة الألوان الأساسية، مع عنوان وشبكة أوسع**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
