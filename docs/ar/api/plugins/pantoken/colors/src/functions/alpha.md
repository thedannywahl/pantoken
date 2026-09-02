[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# دالة: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اضبط عتامة اللون إلى `percent`% — المرآة الخاصة بـ CSS فقط لـ ui-color-utils `alpha`. المزج مع
`transparent` يُنتج بالضبط اللون عند قناة الألفا تلك.

## المعلمات

### color

`string`

اللون الأساسي (قيمة حرفية، `var(--token)`، أو نتيجة مساعد متداخل).

### percent

`number`

العتامة المستهدفة، 0–100.

## القيم المرجعة

`string`

تعبير `color-mix()`.

## مثال

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
