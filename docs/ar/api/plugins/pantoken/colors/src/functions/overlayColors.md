[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# دالة: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تسطيح `overlay` (بقوة `percent`%) فوق `base` معتم — بديل يعتمد على CSS فقط لـ
ui-color-utils `overlayColors`. يقوم هذا المُساعد بتركيب مصدر-عبر (source-over) لونهين RGBA إلى نتيجة واحدة معتمة؛ الحالة الشائعة (صبغة نصف شفافة فوق سطح صلب) هي بالضبط `color-mix()` من لونين. لا يمكن أن يكون التجميع العام RGBA فوق RGBA لون CSS واحدًا، لذا يغطي هذا الحالة ذات القاعدة المعتمة فقط.

## المعلمات

### base

`string`

لون الخلفية المعتم.

### overlay

`string`

اللون الموضوع فوقه.

### percent?

`number` = `50`

مدى ظهور `overlay`، من 0–100 (الافتراضي `50`).

## القيم المرجعة

`string`

تعبير `color-mix()`.

## مثال

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
