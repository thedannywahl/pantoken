[pantoken](../../../../../index.md) / [plugins/pantoken/primitives/src](../index.md) / primitivesCss

# Funktion: primitivesCss()

> **primitivesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg det primitive utility stylesheet. Farver får den samme `bg`/`fg`/`border` form som semantiske
farve-utilities, men indekseret på det primitive token navn (`.&lt;prefix&gt;-bg-primitive-color-white`); skrift
primitives kortlægges til deres eneste egenskab via den delte token-to-class transformer. Hver klasse peger kun
altid på et ægte `--instui-primitive-*` token — ingen vilkårlige værdier.

## Parametre

### names

[`PrimitiveTokenNames`](../interfaces/PrimitiveTokenNames.md)

[PrimitiveTokenNames](../interfaces/PrimitiveTokenNames.md).

### options?

[`PrimitivesOptions`](../interfaces/PrimitivesOptions.md) = `{}`

[PrimitivesOptions](../interfaces/PrimitivesOptions.md).

## Returnerer

`string`

CSS-strengen.
