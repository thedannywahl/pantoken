[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funkcja: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametry

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Zwraca

`string`

The overlay CSS string.

## Przykład

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
