[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# 인터페이스: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Options for [toCss](../functions/toCss.md).

## 속성

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
