[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# دالة: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تغميق بمقدار `percent` نقاط سطوع HSL — النسخة الخاصة بـ CSS فقط من ui-color-utils `darken`
(تقوم tinycolor بخفض سطوع HSL). يستخدم بناء جملة الألوان النسبية بحيث يتم الحفاظ على الدرجة والتشبع.

في `hsl()` النسبية، تتحول قناة `l` إلى `&lt;number&gt;` على مقياس 0–100 — نفس المقياس
الذي تستخدمه `amount` في tinycolor — لذا تُطرح النقاط مباشرةً (بدون `%`).

## المعلمات

### color

`string`

اللون الأساسي.

### percent?

`number` = `10`

نقاط السطوع التي ستُطرح (الافتراضي `10`، مطابق لافتراضي tinycolor).

## القيم المرجعة

`string`

تعبير لون-نسبي من نوع `hsl(from …)`.

## مثال

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
