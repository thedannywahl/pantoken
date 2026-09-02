[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# دالة: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ورقة الأنماط المساعدة للألوان الدلالية: `.&lt;prefix&gt;-bg-&lt;name&gt;` (خلفية)،
`.&lt;prefix&gt;-text-&lt;name&gt;` (لون النص)، `.&lt;prefix&gt;-border-&lt;name&gt;` (لون الحدود)، واحد لكل رمز لون دلالي.
يتم إصدار `.&lt;prefix&gt;-color-&lt;name&gt;` جنبًا إلى جنب مع `.&lt;prefix&gt;-text-&lt;name&gt;` كمرادف — نفس الإعلان، أي
اسم صنف منهما يعمل. لذلك فإن التجاوزات دائمًا ما تكون صالحة بالنسبة للرموز — لا بدائل أولية،
ولا ألوان سداسية عشوائية. مرر أسماء الرموز بحسب العائلة (مثلًا من `@pantoken/tokens`)، أو زوج
صريح `[name, token]` لاستخراج اسم من رمز مختلف عن مقياس العائلة.

```demo
self:color-utilities
```

## المعلمات

### names

[`ColorUtilityNames`](../interfaces/ColorUtilityNames.md)

[ColorUtilityNames](../interfaces/ColorUtilityNames.md).

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.
