[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# 関数: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Build the primitive utility stylesheet. Colors get the same `bg`/`fg`/`border` shape as the semantic
color utilities, but keyed on the primitive token name (`.&lt;prefix&gt;-bg-primitive-color-white`); font
primitives map to their one property via the shared token-to-class transformer. Every class only ever
points at a real `--instui-primitive-*` token — no arbitrary values.

## パラメーター

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## 戻り値

`string`

The CSS string.
