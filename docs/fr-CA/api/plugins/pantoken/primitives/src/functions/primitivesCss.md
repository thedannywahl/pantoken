[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# Fonction: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Build the primitive utility stylesheet. Colors get the same `bg`/`fg`/`border` shape as the semantic
color utilities, but keyed on the primitive token name (`.&lt;prefix&gt;-bg-primitive-color-white`); font
primitives map to their one property via the shared token-to-class transformer. Every class only ever
points at a real `--instui-primitive-*` token — no arbitrary values.

## Paramètres

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## Retourne

`string`

The CSS string.
