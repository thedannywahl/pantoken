[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# 函数: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build a `WebComponentStrings` object for `locale`.
Weekday names are derived from `Intl.DateTimeFormat` (and rotated to the locale's first day of
week); all other strings fall back to English unless provided in `overrides`.

## 参数

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## 返回值

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
