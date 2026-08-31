[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# Function: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المقدمة المقروءة — أسود أو أبيض — للمحتوى الموضوع _على_ `surface`. هذا هو شكل CSS فقط من متغيرات `*-on-color` المتكررة في InstUI (حلقة تركيز على زر العلامة التجارية، نص زر primary-inverse، أيقونة على سطح ملون): بدلاً من رمز معكوس ثابت، فإنه يختار التباين من السطح نفسه، لذا يبقى صحيحًا مع تغير السطح.

يقرأ OKLCH lightness للسطح من خلال بناء جملة اللون النسبي وينقره إلى `0` (أسود) أو `1` (أبيض) في `threshold` باستخدام حيلة `calc(… * infinity)` clamp — لا JS، لا hex ثابت.

## Parameters

### surface

`string`

اللون الخلفي الذي يجلس عليه المحتوى (حرفي، `var(--token)`، أو مساعد متداخل).

### threshold?

`number` = `0.62`

OKLCH lightness (0–1) فوقها يتم حساب السطح كـ "فاتح" (افتراضي `0.62`).

## Returns

`string`

تعبير `oklch(from …)` يتحل إلى أسود أو أبيض.

## Example

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```
