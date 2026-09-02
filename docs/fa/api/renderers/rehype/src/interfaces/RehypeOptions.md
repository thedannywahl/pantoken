[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# رابط: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## خصوصیات

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
