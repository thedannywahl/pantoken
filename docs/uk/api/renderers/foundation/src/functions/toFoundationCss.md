[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Функція: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Параметри

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Повертає

`string`

The overlay CSS string.

## Приклад

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
