[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# Функция: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Build a `WebComponentStrings` object for `locale`.
Weekday names are derived from `Intl.DateTimeFormat` (and rotated to the locale's first day of
week); all other strings fall back to English unless provided in `overrides`.

## Параметры

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## Возвращаемое значение

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
