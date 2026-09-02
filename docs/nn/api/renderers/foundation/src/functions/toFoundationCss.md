[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funksjon: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametrar

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returnerer

`string`

The overlay CSS string.

## Døme

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
