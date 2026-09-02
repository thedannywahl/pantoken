[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# Функция: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build the InstUI-look prose stylesheet, scoped to `options.scope` (default `:where(body)`, so it
applies automatically without a wrapper class — like `base.css`).

```demo
self:prose
```

## Параметры

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## Возвращаемое значение

`string`

The CSS string.
