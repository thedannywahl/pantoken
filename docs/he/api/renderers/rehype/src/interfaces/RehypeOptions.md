[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# ממשק: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## תכונות

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
