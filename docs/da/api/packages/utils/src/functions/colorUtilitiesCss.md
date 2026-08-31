[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Function: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg semantisk farveværktøjsstilark: `.&lt;prefix&gt;-bg-&lt;name&gt;` (baggrund),
`.&lt;prefix&gt;-text-&lt;name&gt;` (tekstfarve), `.&lt;prefix&gt;-border-&lt;name&gt;` (kantfarve), en pr. semantisk
farvetoken. `.&lt;prefix&gt;-color-&lt;name&gt;` udsendes sammen med `.&lt;prefix&gt;-text-&lt;name&gt;` som et alias — samme
erklæring, ethvert klassenavn fungerer. Overrides er derfor aldrig token-gyldige — ingen primitiver,
intet vilkårligt hex. Send tokennavn pr. familie (f.eks. fra `@pantoken/tokens`), eller et eksplicit
`[name, token]` par for at hente et navn fra et andet token end familiens egen skala.

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

CSS-strengen.
