[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# Function: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تسطيح `overlay` (بقوة `percent`%) فوق `base` معتم — بديل CSS فقط لـ ui-color-utils `overlayColors`. يقوم هذا المساعد بمركبة two RGBA colors في نتيجة معتمة واحدة؛ الحالة الشائعة (صبغة شفافة فوق سطح صلب) هي بالضبط `color-mix()` ثنائي اللون. لا يمكن أن يكون التركيب العام RGBA-over-RGBA لون CSS واحد، لذا يغطي هذا حالة opaque-base فقط.

## Parameters

### base

`string`

لون الخلفية المعتم.

### overlay

`string`

اللون الموضوع فوقه.

### percent?

`number` = `50`

كم من `overlay` يظهر من خلاله، 0–100 (افتراضي `50`).

## Returns

`string`

تعبير `color-mix()`.

## Example

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
