[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# 関数: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Build a `WebComponentStrings` object for `locale`.
Weekday names are derived from `Intl.DateTimeFormat` (and rotated to the locale's first day of
week); all other strings fall back to English unless provided in `overrides`.

## パラメーター

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## 戻り値

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
