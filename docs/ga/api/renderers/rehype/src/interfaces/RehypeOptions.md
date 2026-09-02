[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# Comhéadan: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## Airíonna

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
