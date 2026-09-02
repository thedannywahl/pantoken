[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / ToStyledThemeOptions

# इंटरफेस: ToStyledThemeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Options for [toStyledTheme](../functions/toStyledTheme.md).

## प्रॉपर्टीज

### resolve?

> `optional` **resolve?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Bake concrete values for this colour mode instead of `var(--instui-*)` references. Omit to keep
the theme var()-backed (the default — lets `@pantoken/css` drive runtime theme switching).
