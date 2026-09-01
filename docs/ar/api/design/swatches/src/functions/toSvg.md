[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# دالة: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

عرض عينات الألوان كصفحة نموذج SVG مجمعة.

## المعلمات

### swatches

للقراءة فقط [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان (مثال: من `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## القيم المرجعة

`string`

مستند SVG كسلسلة نصية.

## أمثلة

**عرض صفحة نموذجية لملف README**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**عرض نموذج للوحة الأساسية فقط، مع عنوان وشبكة أوسع**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
