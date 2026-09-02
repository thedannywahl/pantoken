[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# Interfáhta: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Options for [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

An explicit icon resolver, tried after plugin resolvers and before the built-in set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Plugins whose `rehype` hooks contribute icon resolvers (tried first).

***

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

The class applied to the icon wrapper (default: `pantoken-icon`).

***

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

The class applied to the color-swatch wrapper (default: `pantoken-color-swatch`).

***

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Render `:icon:` codes as inline SVG (default: `true`).

***

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Render standalone color values as swatches (default: `true`).
