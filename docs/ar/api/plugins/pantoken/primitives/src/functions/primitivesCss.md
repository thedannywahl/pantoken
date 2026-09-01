[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# دالة: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ورقة الأنماط الأداة الأولية. تحصل الألوان على نفس شكل `bg`/`fg`/`border` مثل أدوات الألوان الدلالية، ولكن مفاتيحها مبنية على اسم الرمز الأولي (`.&lt;prefix&gt;-bg-primitive-color-white`); تُطابق بدائيات الخط إلى خاصيتها الواحدة عبر محول الرموز-إلى-أصناف المشترك. كل صنف يشير دائمًا إلى رمز `--instui-primitive-*` حقيقي — لا توجد قيم عشوائية.

## المعلمات

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.
