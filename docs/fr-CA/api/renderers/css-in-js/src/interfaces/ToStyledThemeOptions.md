[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / ToStyledThemeOptions

# Interface: ToStyledThemeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Options for [toStyledTheme](../functions/toStyledTheme.md).

## Propriétés

### resolve?

> `optional` **resolve?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Bake concrete values for this colour mode instead of `var(--instui-*)` references. Omit to keep
the theme var()-backed (the default — lets `@pantoken/css` drive runtime theme switching).
