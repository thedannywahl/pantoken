[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# Function: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أضِ بمقدار `percent` نقاط HSL-lightness — المرآة المخصصة بـ CSS فقط لـ ui-color-utils `lighten` (tinycolor يرفع HSL lightness). يستخدم بناء جملة اللون النسبي بحيث يتم الحفاظ على الصبغة والتشبع.

## Parameters

### color

`string`

اللون الأساسي.

### percent?

`number` = `10`

نقاط الإضاءة المراد إضافتها (افتراضي `10`، مطابق الافتراضي من tinycolor).

## Returns

`string`

تعبير لون نسبي `hsl(from …)`.

## Example

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
