[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# Interfáhta: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
