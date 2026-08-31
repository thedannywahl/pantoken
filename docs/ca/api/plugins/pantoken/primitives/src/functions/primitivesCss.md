[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# Function: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix la full d'estils d'utilitats primitives. Els colors obtenen la mateixa forma `bg`/`fg`/`border` que les utilitats de colors semàntiques, però indexat pel nom de token primitiu (`.&lt;prefix&gt;-bg-primitive-color-white`); els primitius de font es mapegen a la seva única propietat a través del transformador compartit de token a classe. Cada classe només apunta a un token `--instui-primitive-*` real — sense valors arbitraris.

## Parameters

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## Returns

`string`

La cadena CSS.
