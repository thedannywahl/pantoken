[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / SimpleIconsOptions

# Viðmót: SimpleIconsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options for the [simpleIcons](../functions/simpleIcons.md) plugin.

## Eiginleikar

### slugs?

> `optional` **slugs?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Brand slugs to emit as `&lt;image&gt;` tokens at the token layer (default: none).

***

### registry?

> `optional` **registry?**: [`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The Simple Icons registry (default: the `simple-icons` package, loaded lazily).

***

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The token-name prefix (default: `--instui-icon-`).
