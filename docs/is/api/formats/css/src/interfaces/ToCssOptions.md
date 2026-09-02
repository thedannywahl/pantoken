[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Viðmót: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options for [toCss](../functions/toCss.md).

## Eiginleikar

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
