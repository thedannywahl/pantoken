[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# تابع: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## پارامترها

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## مقدار بازگشتی

`string`

The overlay CSS string.

## نمونه

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
