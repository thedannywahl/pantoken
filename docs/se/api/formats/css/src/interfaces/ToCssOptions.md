[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Interfáhta: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Options for [toCss](../functions/toCss.md).

## Properties

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
