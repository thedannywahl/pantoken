[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# 介面: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## 屬性

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
