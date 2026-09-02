[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / SimpleIconsOptions

# Интерфейс: SimpleIconsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options for the [simpleIcons](../functions/simpleIcons.md) plugin.

## Свойства

### slugs?

> `optional` **slugs?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Brand slugs to emit as `&lt;image&gt;` tokens at the token layer (default: none).

***

### registry?

> `optional` **registry?**: [`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The Simple Icons registry (default: the `simple-icons` package, loaded lazily).

***

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The token-name prefix (default: `--instui-icon-`).
