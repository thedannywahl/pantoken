[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# Function: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء فئات الأداة المدفوعة بالرمز: فئة واحدة لكل رمز، وتطبيقها على الخاصية
CSS الطبيعية. ذيل `--instui-` للرمز هو اسم الفئة، لذا `--instui-font-weight-body-strong` تحت الخاصية
`font-weight` ينتج `.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. استخدمها لكل عائلة "رمز واحد → خاصية واحدة"
(font-family/weight، line-height، border-radius، border-width، opacity، box-shadow). اللون والتباعد يحتفظان
ببنائهما الخاص — رمز واحد يخطط إلى عدة خصائص هناك. مرر أسماء الرموز لكل خاصية (على سبيل المثال تم تصفيتها من `@pantoken/tokens`).

```demo
self:token-utilities
```

## Parameters

### groups

readonly [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

مجموعة واحدة من [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) لكل خاصية CSS.

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returns

`string`

سلسلة CSS.
