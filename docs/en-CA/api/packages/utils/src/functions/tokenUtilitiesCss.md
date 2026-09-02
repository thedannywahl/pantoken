[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# Function: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build token-driven utility classes: one class per token, applying it to its natural CSS property. The
token's `--instui-` tail is the class name, so `--instui-font-weight-body-strong` under property
`font-weight` yields
`.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. Use it for
every "one token → one property" family (font-family/weight, line-height, border-radius, border-width,
opacity, box-shadow). Colour and spacing keep their own builders — one token maps to several
properties there. Pass the token names per property (e.g. filtered from `@pantoken/tokens`).

```demo
self:token-utilities
```

## Parameters

### groups

readonly [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

one [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) per CSS property.

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returns

`string`

The CSS string.
