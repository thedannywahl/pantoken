[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Function: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the semantic-colour utility stylesheet: `.<prefix>-bg-<name>` (background),
`.<prefix>-text-<name>` (text colour), `.<prefix>-border-<name>` (border colour), one per semantic
colour token. `.<prefix>-color-<name>` is emitted alongside `.<prefix>-text-<name>` as an alias — same
declaration, either class name works. Overrides are therefore only ever token-valid — no primitives,
no arbitrary hex. Pass the token names per family (e.g. from `@pantoken/tokens`), or an explicit
`[name, token]` pair to source a name from a different token than the family's own scale.

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

The CSS string.
