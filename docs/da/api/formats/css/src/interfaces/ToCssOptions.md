[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Interface: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder for [toCss](../functions/toCss.md).

## Egenskaber

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den selektor-scopet erklæringer udsendes under (standard `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins hvis `css` hooks kører efter base CSS er bygget (standard: ingen).
