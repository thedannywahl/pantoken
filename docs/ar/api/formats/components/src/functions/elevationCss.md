[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# دالة: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بِنْيَة كتلة توكن الارتفاع: `&lt;selector&gt; { --instui-elevation-*: … }`. تُشحن داخل
`components.css` (لذلك الظلال مضمَّنة — لا مكوِّن إضافي، ولا استيراد إضافي)، وقابلة لإعادة الاستخدام من قِبَل مخرجات
مُدَرَّجة أخرى (مثل مُصيِّغ Pendo) عبر خيار `selector`.

```demo
self:elevation
```

## المعلمات

### options?

`selector` — محدد القاعدة (الافتراضي `:root`).

#### selector?

`string`

## القيم المرجعة

`string`

سلسلة CSS.

## مثال

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
