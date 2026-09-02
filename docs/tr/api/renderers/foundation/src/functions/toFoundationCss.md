[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fonksiyon: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametreler

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Döndürür

`string`

The overlay CSS string.

## Örnek

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
