[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / darken

# Function: darken()

> **darken**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اغمّق بمقدار `percent` نقاط HSL-lightness — المرآة المخصصة بـ CSS فقط لـ ui-color-utils `darken` (tinycolor يقلل HSL lightness). يستخدم بناء جملة اللون النسبي بحيث يتم الحفاظ على الصبغة والتشبع.

في `hsl()` النسبي، يتم حل قناة `l` إلى `&lt;number&gt;` على مقياس 0–100 — نفس المقياس الذي يستخدمه `amount` من tinycolor — لذا يتم طرح النقاط مباشرة (لا `%`).

## Parameters

### color

`string`

اللون الأساسي.

### percent?

`number` = `10`

نقاط الإضاءة المراد طرحها (افتراضي `10`، مطابق الافتراضي من tinycolor).

## Returns

`string`

تعبير لون نسبي `hsl(from …)`.

## Example

```ts
darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
```
