[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Интерфейс: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options for [toCss](../functions/toCss.md).

## Свойства

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The selector scoped declarations are emitted under (default `":root"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Plugins whose `css` hooks run after the base CSS is built (default: none).
