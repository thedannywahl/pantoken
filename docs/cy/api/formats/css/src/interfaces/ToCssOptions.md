[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Rhyngwyneb: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Options for [toCss](../functions/toCss.md).

## Eiddo

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
