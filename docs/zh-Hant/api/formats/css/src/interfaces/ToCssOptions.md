[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# 介面: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Options for [toCss](../functions/toCss.md).

## 屬性

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
