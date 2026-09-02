[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / ToStyledThemeOptions

# インターフェース: ToStyledThemeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Options for [toStyledTheme](../functions/toStyledTheme.md).

## プロパティ

### resolve?

> `optional` **resolve?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Bake concrete values for this colour mode instead of `var(--instui-*)` references. Omit to keep
the theme var()-backed (the default — lets `@pantoken/css` drive runtime theme switching).
