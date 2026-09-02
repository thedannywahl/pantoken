[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Hàm: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Tham số

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Trả về

`string`

The overlay CSS string.

## Ví dụ

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
