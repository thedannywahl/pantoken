[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# دالة: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خفف بمقدار `percent` نقاط سطوع HSL — المرآة الخاصة بـ CSS فقط لـ ui-color-utils `lighten`
(يزيد tinycolor سطوع HSL). يستخدم صيغة ألوان نسبية بحيث تُحافَظ الدرجة والتشبع.

## المعلمات

### color

`string`

اللون الأساسي.

### percent?

`number` = `10`

نقاط السطوع المراد إضافتها (الافتراضي `10`، مطابق للقيمة الافتراضية في tinycolor).

## القيم المرجعة

`string`

تعبير relative-color من النوع `hsl(from …)`.

## مثال

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
