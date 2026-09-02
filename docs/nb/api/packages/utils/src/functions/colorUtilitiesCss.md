[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Funksjon: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the semantic-colour utility stylesheet: `.&lt;prefix&gt;-bg-&lt;name&gt;` (background),
`.&lt;prefix&gt;-text-&lt;name&gt;` (text colour), `.&lt;prefix&gt;-border-&lt;name&gt;` (border colour), one per semantic
colour token. `.&lt;prefix&gt;-color-&lt;name&gt;` is emitted alongside `.&lt;prefix&gt;-text-&lt;name&gt;` as an alias — same
declaration, either class name works. Overrides are therefore only ever token-valid — no primitives,
no arbitrary hex. Pass the token names per family (e.g. from `@pantoken/tokens`), or an explicit
`[name, token]` pair to source a name from a different token than the family's own scale.

```demo
self:color-utilities
```

## Parametere

### names

[`ColorUtilityNames`](../interfaces/ColorUtilityNames.md)

[ColorUtilityNames](../interfaces/ColorUtilityNames.md).

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returnerer

`string`

The CSS string.
