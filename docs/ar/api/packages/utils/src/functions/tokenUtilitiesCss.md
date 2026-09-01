[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# دالة: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء قواعد مساعدة مدفوعة بالـ tokens: فئة واحدة لكل رمز، تطَبَّق على خاصية CSS الطبيعية له. لاحقة الرمز `--instui-` هي اسم الفئة، لذا `--instui-font-weight-body-strong` تحت الخاصية `font-weight` تُنتج
`.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. استخدمها لكل عائلة "رمز واحد → خاصية واحدة" (font-family/weight, line-height, border-radius, border-width,
opacity, box-shadow). اللون والتباعد يحتفظان بمولِّديهما الخاصين — حيث يُطابق رمز واحد عدة خصائص هناك. مرِّر أسماء الرموز لكل خاصية (مثلاً مُرشَّحة من `@pantoken/tokens`).

```demo
self:token-utilities
```

## المعلمات

### groups

قراءة فقط [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

واحد [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) لكل خاصية CSS.

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.
