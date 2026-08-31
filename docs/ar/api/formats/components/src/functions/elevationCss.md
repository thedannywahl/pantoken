[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Function: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء كتلة رموز الارتفاع: `&lt;selector&gt; { --instui-elevation-*: … }`. موزع داخل
`components.css` (لذا الظلال متأصلة — لا توجد ملحقة، لا استيراد إضافي)، وقابل لإعادة الاستخدام من قبل المخرجات
الأخرى المرقبة (على سبيل المثال مُصيّر Pendo) عبر خيار `selector`.

```demo
self:elevation
```

## Parameters

### options?

`selector` — محدد القاعدة (الافتراضي `:root`).

#### selector?

`string`

## Returns

`string`

سلسلة CSS.

## Example

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
