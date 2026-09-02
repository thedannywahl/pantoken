[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / SimpleIconsOptions

# 인터페이스: SimpleIconsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Options for the [simpleIcons](../functions/simpleIcons.md) plugin.

## 속성

### slugs?

> `optional` **slugs?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Brand slugs to emit as `&lt;image&gt;` tokens at the token layer (default: none).

***

### registry?

> `optional` **registry?**: [`SimpleIconsRegistry`](../type-aliases/SimpleIconsRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The Simple Icons registry (default: the `simple-icons` package, loaded lazily).

***

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The token-name prefix (default: `--instui-icon-`).
