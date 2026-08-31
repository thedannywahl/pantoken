[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# Function: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստեղծել բնական կոմունալ ոճաթերթ: Գույները ստանում են նույն `bg`/`fg`/`border` ձևը, որ իմաստային
գույնի կոմունալներն ունեն, բայց բնական տոկենի անվանման վրա հիմնված (`.&lt;prefix&gt;-bg-primitive-color-white`); տառատեսակի բնականները քարտեզված են
իրենց մեկ հատկության վրա`կիսվածի տոկեն-դասի փոխակերպիչի միջոցով: Յուրաքանչյուր դաս միայն ուղղում է իրական`--instui-primitive-*` տոկենին — ոչ կամայական արժեքներ:

## Parameters

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## Returns

`string`

CSS տողը։
