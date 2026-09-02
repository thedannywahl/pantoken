[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Функция: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Параметры

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Возвращаемое значение

`string`

The overlay CSS string.

## Пример

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
