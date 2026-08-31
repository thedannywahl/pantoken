[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# Function: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة الأنماط المساعدة الأساسية. تحصل الألوان على نفس شكل `bg`/`fg`/`border` مثل أدوات الألوان الدلالية، لكن مفهرسة باسم الرمز الأساسي (`.&lt;prefix&gt;-bg-primitive-color-white`); تتعامل الخطوط الأساسية مع خاصيتها الواحدة عبر محول الرمز إلى الفئة المشترك. كل فئة تشير فقط إلى رمز `--instui-primitive-*` حقيقي — لا قيم تعسفية.

## Parameters

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## Returns

`string`

سلسلة CSS.
