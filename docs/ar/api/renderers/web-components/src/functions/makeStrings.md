[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / makeStrings

# Function: makeStrings()

> **makeStrings**(`locale`, `overrides?`): [`WebComponentStrings`](../interfaces/WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بناء كائن `WebComponentStrings` لـ `locale`.
يتم اشتقاق أسماء أيام الأسبوع من `Intl.DateTimeFormat` (وتدوير إلى يوم الأسبوع الأول للإقليم)؛ تعود جميع السلاسل الأخرى إلى اللغة الإنجليزية ما لم يتم توفيرها في `overrides`.

## Parameters

### locale

`string`

### overrides?

`Partial`\<[`WebComponentStrings`](../interfaces/WebComponentStrings.md)\>

## Returns

[`WebComponentStrings`](../interfaces/WebComponentStrings.md)
