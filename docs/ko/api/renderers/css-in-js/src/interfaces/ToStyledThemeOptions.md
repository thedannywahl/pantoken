[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / ToStyledThemeOptions

# 인터페이스: ToStyledThemeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Options for [toStyledTheme](../functions/toStyledTheme.md).

## 속성

### resolve?

> `optional` **resolve?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Bake concrete values for this colour mode instead of `var(--instui-*)` references. Omit to keep
the theme var()-backed (the default — lets `@pantoken/css` drive runtime theme switching).
