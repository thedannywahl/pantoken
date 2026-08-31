[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Function: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة أنماط أداة اللون الدلالي: `.&lt;prefix&gt;-bg-&lt;name&gt;` (الخلفية)،
`.&lt;prefix&gt;-text-&lt;name&gt;` (لون النص)، `.&lt;prefix&gt;-border-&lt;name&gt;` (لون الحد)، واحد لكل دلالي
رمز اللون. `.&lt;prefix&gt;-color-&lt;name&gt;` تم إصداره جنباً إلى جنب مع `.&lt;prefix&gt;-text-&lt;name&gt;` كاسم مستعار — نفس
الإعلان، اسم فئة إما يعمل. الإلغاءات لذلك فقط صحيحة الرمز — لا بدائيات،
لا سداسي عشري عشوائي. مرر أسماء الرموز لكل عائلة (على سبيل المثال من `@pantoken/tokens`)، أو صريح
`[name, token]` زوج لمصدر اسم من رمز مختلف من مقياس العائلة الخاص به.

```demo
self:color-utilities
```

## Parameters

### names

[`ColorUtilityNames`](../interfaces/ColorUtilityNames.md)

[ColorUtilityNames](../interfaces/ColorUtilityNames.md).

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returns

`string`

سلسلة CSS.
