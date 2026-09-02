[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# इंटरफेस: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Options for [toCss](../functions/toCss.md).

## प्रॉपर्टीज

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
