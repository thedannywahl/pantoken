[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / onColor

# دالة: onColor()

> **onColor**(`surface`, `threshold?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اللون الأمامي المقروء — أسود أو أبيض — للمحتوى الموضوع *على* `surface`. هذا هو الشكل الخاص بـ CSS فقط من متغيرات InstUI المتكررة `*-on-color` (حلقة التركيز على زر العلامة التجارية، نص زر معكوس-أساسي، أيقونة على سطح ملون): بدلاً من رمز عكسي ثابت، يختار التباين من السطح نفسه، لذلك يبقى صحيحاً مع تغيّر السطح.

يقرأ خفة OKLCH للسطح عبر صيغة الألوان النسبية ويقربها إلى `0` (أسود) أو `1` (أبيض) عند `threshold` باستخدام خدعة الكُمّ `calc(… * infinity)` — لا جافاسكربت، لا ألوان سداسية ثابتة.

## المعلمات

### surface

`string`

لون الخلفية التي يجلس عليها المحتوى (حرفياً، `var(--token)`، أو مُساعد متداخل).

### threshold?

`number` = `0.62`

خفة OKLCH (0–1) التي تُعتبر فوقها السطح "فاتحاً" (الافتراضي `0.62`).

## القيم المرجعة

`string`

تعبير `oklch(from …)` يحلّ إلى اللون الأسود أو الأبيض.

## مثال

```ts
onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
// → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
```
