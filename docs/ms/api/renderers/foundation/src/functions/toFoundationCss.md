[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fungsi: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parameter

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Mengembalikan

`string`

The overlay CSS string.

## Contoh

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
